import { createContext, useContext, useState, useEffect } from 'react'
import { defaults } from '../content/defaults.js'

const ContentContext = createContext(null)

export function ContentProvider({ children, isAdmin = false }) {
  const [fetched, setFetched] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState(null) // 'ok' | 'error'
  const [uploading, setUploading] = useState({}) // key → bool

  const password = isAdmin ? sessionStorage.getItem('adminPassword') : null

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
    const base64 = await fileToBase64(file)
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ key, base64, filename: file.name, contentType: file.type }),
    })
    const data = await res.json()
    if (data.url) update(key, data.url)
    setUploading((u) => ({ ...u, [key]: false }))
    return data.url
  }

  const saveAll = async () => {
    setSaving(true)
    setSaveStatus(null)
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify(fetched),
      })
      setSaveStatus(res.ok ? 'ok' : 'error')
    } catch {
      setSaveStatus('error')
    } finally {
      setSaving(false)
      setTimeout(() => setSaveStatus(null), 3000)
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
