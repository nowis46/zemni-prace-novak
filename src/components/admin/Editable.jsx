import { useRef, useEffect, useCallback } from 'react'
import { useContent } from '../../context/ContentContext.jsx'

export function EditableText({ contentKey, tag: Tag = 'span', className }) {
  const { get, isAdmin, update } = useContent()
  const value = get(contentKey)
  const ref = useRef(null)

  // Sync DOM when value changes externally (e.g. initial load from API)
  // but don't interrupt while the user is typing
  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current) {
      ref.current.innerText = value
    }
  }, [value])

  const onBlur = useCallback(
    (e) => update(contentKey, e.currentTarget.innerText.trim()),
    [contentKey, update]
  )

  if (!isAdmin) return <Tag className={className}>{value}</Tag>

  return (
    <Tag
      ref={ref}
      className={`${className} outline-none cursor-text ring-2 ring-dashed ring-primary/30 hover:ring-primary/70 focus:ring-primary transition-all rounded-sm`}
      contentEditable
      suppressContentEditableWarning
      onBlur={onBlur}
    />
  )
}

export function EditableImage({ contentKey, defaultSrc, alt, className, style, loading, persistent = false }) {
  const { get, isAdmin, uploadImage, uploading } = useContent()
  const src = get(contentKey) || defaultSrc
  const inputRef = useRef(null)
  const isUploading = uploading[contentKey]

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (file) uploadImage(contentKey, file)
  }

  if (!isAdmin) return <img src={src} alt={alt} className={className} style={style} loading={loading} />

  // persistent = always show the button (used when hover is blocked by overlapping elements)
  const buttonClass = persistent
    ? 'absolute top-4 left-4 z-50 bg-black/70 text-white flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm hover:bg-primary transition-colors'
    : 'absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white font-bold transition-opacity gap-2'

  return (
    <div className="relative group">
      <img
        src={src}
        alt={alt}
        className={`${className} ${isUploading ? 'opacity-50' : ''} transition-opacity`}
        style={style}
        loading={loading}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={buttonClass}
      >
        {isUploading ? (
          <span className="text-sm">Nahrávám…</span>
        ) : (
          <>
            <span className="material-symbols-outlined text-4xl">photo_camera</span>
            <span className={persistent ? '' : 'text-sm tracking-widest uppercase'}>
              {persistent ? 'Změnit hlavní foto' : 'Změnit foto'}
            </span>
          </>
        )}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  )
}
