import { useState, useRef, useEffect } from 'react'
import { useContent } from '../context/ContentContext.jsx'

function MachineField({ value, onChange, tag: Tag = 'span', className, isAdmin, placeholder = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current) {
      ref.current.innerText = value || placeholder
    }
  }, [value, placeholder])

  if (!isAdmin) return <Tag className={className}>{value}</Tag>

  return (
    <Tag
      ref={ref}
      className={`${className} outline-none cursor-text ring-2 ring-dashed ring-primary/30 hover:ring-primary/70 focus:ring-primary transition-all rounded-sm`}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.innerText.trim())}
    />
  )
}

function MachineCard({ machine, index, isAdmin, onFieldChange, onImageChange, onDelete, uploadRaw, allMachines }) {
  const { saveMachines } = useContent()
  const reverse = index % 2 !== 0
  const revealClass = isAdmin ? '' : (reverse ? 'reveal-right' : 'reveal-left')
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadRaw(`machine_${machine.id}`, file)
      if (url) {
        onImageChange(url)
        // Build updated list explicitly and save — avoids React state timing issues
        const updated = allMachines.map((m) =>
          m.id === machine.id ? { ...m, image: url } : m
        )
        await saveMachines(updated)
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 ${revealClass} relative`}>

      {isAdmin && (
        <button
          onClick={onDelete}
          className="absolute -top-8 right-0 z-10 bg-error text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">delete</span>
          Smazat stroj
        </button>
      )}

      <div className="w-full md:w-3/5 overflow-hidden rounded-3xl bg-surface-container-low">
        {isAdmin ? (
          <div className="relative group">
            <img
              src={machine.image || 'https://placehold.co/900x600/eeeef0/837560?text=Klikněte+pro+foto'}
              alt={machine.name}
              className={`w-full aspect-[16/10] object-contain transition-opacity ${uploading ? 'opacity-40' : ''}`}
              loading="lazy"
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white gap-2 transition-opacity"
            >
              <span className="material-symbols-outlined text-4xl">photo_camera</span>
              <span className="text-sm font-bold tracking-widest uppercase">
                {uploading ? 'Nahrávám…' : 'Změnit foto'}
              </span>
            </button>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </div>
        ) : (
          <img
            src={machine.image}
            alt={machine.name}
            className="w-full aspect-[16/10] object-contain"
            loading="lazy"
          />
        )}
      </div>

      <div className="w-full md:w-2/5 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {[['chip1', 'bg-secondary-fixed text-on-secondary-fixed'], ['chip2', 'bg-primary-fixed text-on-primary-fixed']].map(([field, style]) => (
            <MachineField
              key={field}
              value={machine[field]}
              onChange={(v) => onFieldChange(field, v)}
              isAdmin={isAdmin}
              className={`${style} text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase`}
              placeholder="Štítek"
            />
          ))}
        </div>

        <MachineField
          value={machine.name}
          onChange={(v) => onFieldChange('name', v)}
          isAdmin={isAdmin}
          tag="h3"
          className="text-3xl font-bold tracking-tight text-on-surface block"
          placeholder="Název stroje"
        />

        <MachineField
          value={machine.desc}
          onChange={(v) => onFieldChange('desc', v)}
          isAdmin={isAdmin}
          tag="p"
          className="text-on-surface-variant text-base leading-relaxed"
          placeholder="Popis stroje..."
        />

        <div className="flex gap-4">
          {[1, 2].map((s) => (
            <div key={s} className="bg-surface-container-lowest p-4 rounded-2xl flex-1">
              <MachineField
                value={machine[`spec${s}_label`]}
                onChange={(v) => onFieldChange(`spec${s}_label`, v)}
                isAdmin={isAdmin}
                tag="div"
                className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-1 block"
                placeholder="Parametr"
              />
              <MachineField
                value={machine[`spec${s}_value`]}
                onChange={(v) => onFieldChange(`spec${s}_value`, v)}
                isAdmin={isAdmin}
                tag="div"
                className="text-xl font-black text-on-surface block"
                placeholder="—"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Machines() {
  const { isAdmin, getMachines, updateMachines, uploadRaw } = useContent()
  const machines = getMachines()

  const updateField = (id, field, value) =>
    updateMachines(machines.map((m) => (m.id === id ? { ...m, [field]: value } : m)))

  const addMachine = () => {
    updateMachines([
      ...machines,
      {
        id: `m${Date.now()}`,
        name: 'Nový stroj',
        desc: 'Popis stroje — klikněte pro úpravu.',
        image: '',
        chip1: 'Typ stroje',
        chip2: 'Kategorie',
        spec1_label: 'Parametr 1',
        spec1_value: '—',
        spec2_label: 'Parametr 2',
        spec2_value: '—',
      },
    ])
  }

  const removeMachine = (id) => {
    if (!window.confirm('Smazat tento stroj?')) return
    updateMachines(machines.filter((m) => m.id !== id))
  }

  return (
    <section id="technika" className="bg-surface-container-low py-16 md:py-24">
      <div className="max-w-[1920px] mx-auto px-8 md:px-12">
        <div className="text-center mb-10 reveal">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-on-surface mb-4">
            Vybavení pro každý terén.
          </h2>
          <p className="text-on-surface-variant text-xl">Špičková technika udržovaná s nejvyšší péčí.</p>
        </div>

        <div className="flex flex-col gap-16">
          {machines.map((m, i) => (
            <MachineCard
              key={m.id}
              machine={m}
              index={i}
              isAdmin={isAdmin}
              onFieldChange={(field, value) => updateField(m.id, field, value)}
              onImageChange={(url) => updateField(m.id, 'image', url)}
              onDelete={() => removeMachine(m.id)}
              uploadRaw={uploadRaw}
              allMachines={machines}
            />
          ))}
        </div>

        {isAdmin && (
          <div className="mt-24 flex justify-center">
            <button
              onClick={addMachine}
              className="btn-primary-gradient text-white font-bold px-10 py-5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-3 text-lg"
            >
              <span className="material-symbols-outlined">add</span>
              Přidat stroj
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
