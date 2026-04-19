import { EditableText, EditableImage } from './admin/Editable.jsx'

const machines = [
  { id: 1, chips: ['Pásový minibagr', 'Přesné výkopy'], chipStyles: ['bg-secondary-fixed text-on-secondary-fixed', 'bg-primary-fixed text-on-primary-fixed'], revealClass: 'reveal-left', reverse: false },
  { id: 2, chips: ['Kolový bagr', 'Mobilní'], chipStyles: ['bg-secondary-fixed text-on-secondary-fixed', 'bg-secondary-fixed text-on-secondary-fixed'], revealClass: 'reveal-right', reverse: true },
  { id: 3, chips: ['Pásový minibagr', 'Nulový přesah'], chipStyles: ['bg-secondary-fixed text-on-secondary-fixed', 'bg-primary-fixed text-on-primary-fixed'], revealClass: 'reveal-left', reverse: false },
  { id: 4, chips: ['Nákladní vozidlo', '15 tun'], chipStyles: ['bg-secondary-fixed text-on-secondary-fixed', 'bg-primary-fixed text-on-primary-fixed'], revealClass: 'reveal-right', reverse: true },
]

export default function Machines() {
  return (
    <section id="technika" className="bg-surface-container-low py-32 md:py-48">
      <div className="max-w-[1920px] mx-auto px-8 md:px-12">
        <div className="text-center mb-24 reveal">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-4">
            Vybavení pro každý terén.
          </h2>
          <p className="text-on-surface-variant text-xl">Špičková technika udržovaná s nejvyšší péčí.</p>
        </div>

        <div className="flex flex-col gap-32">
          {machines.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 ${m.revealClass}`}
            >
              <div className="w-full md:w-3/5 overflow-hidden rounded-3xl bg-surface-container-low">
                <EditableImage
                  contentKey={`machine_${m.id}_image`}
                  alt={`Machine ${m.id}`}
                  className="w-full aspect-[16/10] object-contain"
                  loading="lazy"
                />
              </div>

              <div className="w-full md:w-2/5 flex flex-col gap-6">
                <div className="flex flex-wrap gap-2">
                  {m.chips.map((chip, ci) => (
                    <span key={chip} className={`${m.chipStyles[ci]} text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase`}>
                      {chip}
                    </span>
                  ))}
                </div>
                <EditableText contentKey={`machine_${m.id}_name`} tag="h3" className="text-4xl font-bold tracking-tight text-on-surface block" />
                <EditableText contentKey={`machine_${m.id}_desc`} tag="p" className="text-on-surface-variant text-lg leading-relaxed" />
                <div className="flex gap-4">
                  {[1, 2].map((s) => (
                    <div key={s} className="bg-surface-container-lowest p-6 rounded-2xl flex-1">
                      <EditableText contentKey={`machine_${m.id}_spec${s}_label`} tag="div" className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-1 block" />
                      <EditableText contentKey={`machine_${m.id}_spec${s}_value`} tag="div" className="text-2xl font-black text-on-surface block" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
