import { useContent } from '../../context/ContentContext.jsx'

export default function AdminBar({ onLogout }) {
  const { saveAll, saving, saveStatus } = useContent()

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] bg-on-surface text-inverse-on-surface flex items-center justify-between px-6 py-3 gap-4">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest">Režim editace — klikněte na text nebo obrázek pro úpravu</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={saveAll}
          disabled={saving}
          className={`text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-xl transition-all disabled:opacity-50 ${
            saveStatus === 'ok'
              ? 'bg-green-500 text-white'
              : saveStatus === 'error'
              ? 'bg-error text-white'
              : 'btn-primary-gradient text-white hover:opacity-90'
          }`}
        >
          {saving ? 'Ukládám…' : saveStatus === 'ok' ? 'Uloženo ✓' : saveStatus === 'error' ? 'Chyba ✗' : 'Uložit změny'}
        </button>
        <button
          onClick={onLogout}
          className="text-xs font-medium uppercase tracking-widest text-inverse-on-surface/60 hover:text-inverse-on-surface transition-colors"
        >
          Odhlásit
        </button>
      </div>
    </div>
  )
}
