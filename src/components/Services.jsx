import { EditableText } from './admin/Editable.jsx'

const nums = ['01', '02', '03', '04']

export default function Services() {
  return (
    <section id="sluzby" className="bg-surface py-32 md:py-48">
      <div className="max-w-[1920px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <EditableText contentKey="services_label" tag="p" className="text-sm font-bold tracking-widest uppercase text-primary mb-4 reveal" />
            <EditableText contentKey="services_h2" tag="h2" className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface reveal stagger-1" />
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {nums.map((num, i) => (
              <div key={num} className={`bg-surface-container-lowest p-8 rounded-2xl reveal stagger-${i + 1}`}>
                <div className="text-6xl font-black text-primary/10 leading-none mb-4">{num}</div>
                <EditableText contentKey={`service_${i + 1}_name`} tag="h3" className="text-xl font-bold mb-3 text-on-surface block" />
                <EditableText contentKey={`service_${i + 1}_desc`} tag="p" className="text-on-surface-variant leading-relaxed" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
