import { EditableText } from './admin/Editable.jsx'

export default function About() {
  return (
    <section id="onas" className="bg-surface py-32 md:py-48">
      <div className="max-w-[1920px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-8">
            <EditableText contentKey="about_label" tag="p" className="text-sm font-bold tracking-widest uppercase text-primary mb-6 reveal" />
            <EditableText contentKey="about_h2" tag="h2" className="text-4xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-tight reveal stagger-1" />
          </div>
          <div className="md:col-span-4 flex items-end pb-2">
            <EditableText contentKey="about_body" tag="p" className="text-on-surface-variant text-lg leading-relaxed reveal stagger-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 border-t border-surface-container pt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`reveal stagger-${i}`}>
              <EditableText contentKey={`stat_${i}_value`} tag="div" className="font-black text-5xl text-primary mb-2 block" />
              <EditableText contentKey={`stat_${i}_label`} tag="div" className="text-sm uppercase tracking-widest text-on-surface-variant font-medium block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
