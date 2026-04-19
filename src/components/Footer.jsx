export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#f3f3f5' }} className="pt-32 pb-12 px-8 md:px-12">
      <div className="max-w-[1920px] mx-auto border-t border-slate-200/50 pt-12 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <div className="text-lg font-black text-on-surface mb-2 uppercase tracking-tighter">
            Zemní Práce Novák
          </div>
          <p className="text-xs font-medium tracking-widest uppercase text-secondary">
            © 2024 Zemní práce Novák. Tradice poctivé práce od základů.
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          {['Obchodní podmínky', 'Ochrana osobních údajů', 'Cookies', 'Mapa webu'].map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs font-medium tracking-widest uppercase text-secondary hover:text-primary transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
