import { EditableText, EditableImage } from './admin/Editable.jsx'

const gridClasses = [
  { grid: 'md:col-span-8 md:row-span-1', height: 'h-80 md:h-full' },
  { grid: 'md:col-span-4 md:row-span-2', height: 'h-80 md:h-full' },
  { grid: 'md:col-span-4 md:row-span-1', height: 'h-64 md:h-full' },
  { grid: 'md:col-span-4 md:row-span-1', height: 'h-64 md:h-full' },
  { grid: 'md:col-span-4 md:row-span-1', height: 'h-64 md:h-full' },
]

export default function Gallery() {
  return (
    <section id="projekty" className="bg-surface py-32 md:py-48">
      <div className="max-w-[1920px] mx-auto px-8 md:px-12">
        <div className="mb-12 reveal">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-4">
            Realizace.
          </h2>
          <div className="h-1 w-24 bg-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:h-[1100px]">
          {gridClasses.map((g, i) => (
            <div key={i} className={`${g.grid} relative group overflow-hidden rounded-3xl reveal`}>
              <EditableImage
                contentKey={`gallery_${i + 1}_image`}
                alt={`Gallery ${i + 1}`}
                className={`w-full ${g.height} object-cover transition-transform duration-700 group-hover:scale-[1.08]`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10 pointer-events-none">
                <EditableText
                  contentKey={`gallery_${i + 1}_label`}
                  tag="span"
                  className="text-white text-2xl font-bold pointer-events-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
