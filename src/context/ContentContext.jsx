import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { defaults, defaultMachines } from '../content/defaults.js'

const ContentContext = createContext(null)

const getPassword = () => sessionStorage.getItem('adminPassword') || ''

export function ContentProvider({ children, isAdmin = false }) {
  const [fetched, setFetched] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState(null)
  const [uploading, setUploading] = useState({})
  const fetchedRef = useRef({})

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        setFetched(data)
        fetchedRef.current = data
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  const get = (key) => fetched[key] ?? defaults[key] ?? ''

  const getMachines = () => {
    const stored = fetched.machines
    return Array.isArray(stored) ? stored : defaultMachines
  }

  const updateMachines = (machines) => update('machines', machines)

  // Upload a file and return the blob URL without updating flat content
  const uploadRaw = async (blobKey, file) => {
    const compressed = await compressImage(file)
    const base64 = await fileToBase64(compressed)
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': getPassword() },
      body: JSON.stringify({ key: blobKey, base64, filename: `${blobKey}.jpg`, contentType: 'image/jpeg' }),
    })
    const data = await res.json()
    return data.url || null
  }

  const update = (key, value) => {
    setFetched((prev) => {
      const next = { ...prev, [key]: value }
      fetchedRef.current = next
      return next
    })
  }

  const doSave = async (contentToSave) => {
    const pwd = getPassword()
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': pwd },
      body: JSON.stringify(contentToSave),
    })
    return res
  }

  const uploadImage = async (key, file) => {
    setUploading((u) => ({ ...u, [key]: true }))
    setSaveStatus(null)
    try {
      const compressed = await compressImage(file)
      const base64 = await fileToBase64(compressed)
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': getPassword() },
        body: JSON.stringify({ key, base64, filename: `${key}.jpg`, contentType: 'image/jpeg' }),
      })
      const data = await res.json()
      if (data.url) {
        update(key, data.url)
        // Auto-save after image upload so it persists immediately
        setSaving(true)
        const saveRes = await doSave({ ...fetchedRef.current, [key]: data.url })
        setSaveStatus(saveRes.ok ? 'ok' : `error:${saveRes.status}`)
        setSaving(false)
        setTimeout(() => setSaveStatus(null), 3000)
      } else {
        console.error('Upload returned no URL:', data)
        setSaveStatus(`error:upload`)
      }
      return data.url
    } catch (err) {
      console.error('Upload failed:', err)
      setSaveStatus('error:network')
    } finally {
      setUploading((u) => ({ ...u, [key]: false }))
    }
  }

  const saveAll = async () => {
    setSaving(true)
    setSaveStatus(null)
    try {
      const res = await doSave(fetchedRef.current)
      const body = await res.json().catch(() => ({}))
      console.log('Save response:', res.status, body)
      setSaveStatus(res.ok ? 'ok' : `error:${res.status}`)
    } catch (err) {
      console.error('Save error:', err)
      setSaveStatus('error:network')
    } finally {
      setSaving(false)
      setTimeout(() => setSaveStatus(null), 4000)
    }
  }

  return (
    <ContentContext.Provider value={{ get, isAdmin, update, getMachines, updateMachines, uploadImage, uploadRaw, uploading, saveAll, saving, saveStatus, loaded }}>
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

async function compressImage(file, maxWidth = 1920, quality = 0.82) {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(img, 0, 0, width, height)
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality)
    }
    img.src = url
  })
}
