import { createContext, useContext, useState, useEffect } from 'react'
import { defaults } from '../content/defaults.js'

const ContentContext = createContext(null)

const getPassword = () => sessionStorage.getItem('adminPassword') || ''

export function ContentProvider({ children, isAdmin = false }) {
  const [fetched, setFetched] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState(null) // 'ok' | 'error:<msg>'
  const [uploading, setUploading] = useState({})

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => { setFetched(data); setLoaded(true) })
      .catch(() => setLoaded(true))
  }, [])

  const get = (key) => fetched[key] ?? defaults[key] ?? ''

  const update = (key, value) => setFetched((prev) => ({ ...prev, [key]: value }))

  const uploadImage = async (key, file) => {
    setUploading((u) => ({ ...u, [key]: true }))
    try {
      const base64 = await fileToBase64(file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': getPassword() },
        body: JSON.stringify({ key, base64, filename: file.name, contentType: file.type }),
      })
      const data = await res.json()
      if (data.url) update(key, data.url)
      return data.url
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setUploading((u) => ({ ...u, [key]: false }))
    }
  }

  const saveAll = async () => {
    setSaving(true)
    setSaveStatus(null)
    const pwd = getPassword()
    console.log('Saving with password length:', pwd.length, 'content keys:', Object.keys(fetched).length)
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': pwd },
        body: JSON.stringify(fetched),
      })
      const body = await res.json().catch(() => ({}))
      console.log('Save response:', res.status, body)
      setSaveStatus(res.ok ? 'ok' : `error:${res.status}`)
    } catch (err) {
      console.error('Save network error:', err)
      setSaveStatus('error:network')
    } finally {
      setSaving(false)
      setTimeout(() => setSaveStatus(null), 4000)
    }
  }

  return (
    <ContentContext.Provider value={{ get, isAdmin, update, uploadImage, uploading, saveAll, saving, saveStatus, loaded }}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
