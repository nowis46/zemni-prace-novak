const items = [
  {
    src: 'https://placehold.co/800x600/1a1c1d/ffb800?text=Výkopové+práce',
    label: 'Výkopové práce – základy RD',
    gridClass: 'md:col-span-8 md:row-span-1',
    heightClass: 'h-80 md:h-full',
  },
  {
    src: 'https://placehold.co/400x1100/2f3132/ffba20?text=Inženýrské+sítě',
    label: 'Inženýrské sítě',
    gridClass: 'md:col-span-4 md:row-span-2',
    heightClass: 'h-80 md:h-full',
  },
  {
    src: 'https://placehold.co/400x500/514532/ffdea8?text=Terénní+úpravy',
    label: 'Terénní úpravy svahů',
    gridClass: 'md:col-span-4 md:row-span-1',
    heightClass: 'h-64 md:h-full',
  },
  {
    src: 'https://placehold.co/400x500/1a1c1d/e4e2e4?text=Doprava+materiálu',
    label: 'Doprava materiálu',
    gridClass: 'md:col-span-4 md:row-span-1',
    heightClass: 'h-64 md:h-full',
  },
  {
    src: 'https://placehold.co/400x500/7c5800/ffffff?text=Základové+desky',
    label: 'Zakládání staveb',
    gridClass: 'md:col-span-4 md:row-span-1',
    heightClass: 'h-64 md:h-full',
  },
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
          {items.map((item) => (
            <div
              key={item.label}
              className={`${item.gridClass} relative group overflow-hidden rounded-3xl reveal`}
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className={`w-full ${item.heightClass} object-cover transition-transform duration-700 group-hover:scale-[1.08]`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                <span className="text-white text-2xl font-bold">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
