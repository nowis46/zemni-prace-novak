import { useState } from 'react'
import { supabase } from '../../lib/supabase.js'

export default function AdminOverlay({ onLogout }) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    onLogout()
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] bg-on-surface/90 text-inverse-on-surface px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-bold uppercase tracking-widest">Režim editace</span>
        <button
          onClick={handleLogout}
          className="text-xs font-bold uppercase tracking-widest hover:text-primary-fixed-dim transition-colors"
        >
          Odhlásit se
        </button>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="fixed bottom-8 right-8 z-[100] btn-primary-gradient text-white font-bold px-6 py-4 rounded-xl shadow-[0_20px_40px_rgba(26,28,29,0.2)] hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-60"
      >
        {saving ? 'Ukládám…' : saved ? 'Uloženo ✓' : 'Uložit změny'}
      </button>
    </>
  )
}
