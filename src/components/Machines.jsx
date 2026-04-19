const machines = [
  {
    id: 'yanmar',
    name: 'Yanmar ViO50',
    chips: ['Pásový minibagr', 'Přesné výkopy'],
    chipStyles: ['bg-secondary-fixed text-on-secondary-fixed', 'bg-primary-fixed text-on-primary-fixed'],
    desc: 'Náš pracovní kůň pro přesné výkopy v omezených prostorách. Ideální pro základy rodinných domů, pokládání inženýrských sítí a práci v zahradách. Branded stroj Novák Jan — zemní práce.',
    specs: [{ label: 'Hmotnost', value: '4,8 t' }, { label: 'Hloubkový dosah', value: '3,5 m' }],
    image: '/assets/machines/Yanmar.jpeg',
    revealClass: 'reveal-left',
    reverse: false,
  },
  {
    id: 'takeuchi',
    name: 'Takeuchi TB295W',
    chips: ['Kolový bagr', 'Mobilní'],
    chipStyles: ['bg-secondary-fixed text-on-secondary-fixed', 'bg-secondary-fixed text-on-secondary-fixed'],
    desc: 'Kolový bagr pro rychlé přesuny po komunikacích. Kombinuje sílu pásového stroje s mobilitou koleček. Vhodný pro terénní úpravy a výkopy v zástavbě.',
    specs: [{ label: 'Hmotnost', value: '9,4 t' }, { label: 'Výkon', value: '55 kW' }],
    image: '/assets/machines/Takeuchi.jpeg',
    revealClass: 'reveal-right',
    reverse: true,
  },
  {
    id: 'wacker',
    name: 'Wacker Neuson EZ36',
    chips: ['Pásový minibagr', 'Nulový přesah'],
    chipStyles: ['bg-secondary-fixed text-on-secondary-fixed', 'bg-primary-fixed text-on-primary-fixed'],
    desc: 'Bagr s nulovým zadním přesahem. Pracuje i v těsných prostorách — u plotů, zdí a v interiérech. Ideální pro práce v zahradách a uzavřených dvorech.',
    specs: [{ label: 'Hmotnost', value: '3,6 t' }, { label: 'Zadní přesah', value: 'Nulový' }],
    image: '/assets/machines/Wackerneusonez 36.jpg',
    revealClass: 'reveal-left',
    reverse: false,
  },
  {
    id: 'tatra',
    name: 'Tatra 815 Sklápěč 15T',
    chips: ['Nákladní vozidlo', '15 tun'],
    chipStyles: ['bg-secondary-fixed text-on-secondary-fixed', 'bg-primary-fixed text-on-primary-fixed'],
    desc: 'Robustní sklápěč pro přepravu zeminy, štěrku, písku a suti. Dostaneme se tam, kam jiná auta nedojedou. Operujeme v okruhu 80 km od Netolic.',
    specs: [{ label: 'Nosnost', value: '15 t' }, { label: 'Objem', value: '10 m³' }],
    image: '/assets/machines/Tatra.jpeg',
    revealClass: 'reveal-right',
    reverse: true,
  },
]

export default function Machines() {
  return (
    <section id="technika" className="bg-surface-container-low py-32 md:py-48">
      <div className="max-w-[1920px] mx-auto px-8 md:px-12">
        <div className="text-center mb-24 reveal">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-4">
            Vybavení pro každý terén.
          </h2>
          <p className="text-on-surface-variant text-xl">
            Špičková technika udržovaná s nejvyšší péčí.
          </p>
        </div>

        <div className="flex flex-col gap-32">
          {machines.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 ${m.revealClass}`}
            >
              <div className="w-full md:w-3/5 overflow-hidden rounded-3xl">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover aspect-[16/10] hover:scale-[1.08] transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              <div className="w-full md:w-2/5 flex flex-col gap-6">
                <div className="flex flex-wrap gap-2">
                  {m.chips.map((chip, i) => (
                    <span
                      key={chip}
                      className={`${m.chipStyles[i]} text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase`}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <h3 className="text-4xl font-bold tracking-tight text-on-surface">{m.name}</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed">{m.desc}</p>
                <div className="flex gap-4">
                  {m.specs.map((spec) => (
                    <div key={spec.label} className="bg-surface-container-lowest p-6 rounded-2xl flex-1">
                      <div className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-1">
                        {spec.label}
                      </div>
                      <div className="text-2xl font-black text-on-surface">{spec.value}</div>
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
