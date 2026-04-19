import { useState } from 'react'
import { supabase } from '../../lib/supabase.js'

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Nesprávné přihlašovací údaje.')
    } else {
      onLogin()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-surface-container-lowest p-10 rounded-3xl shadow-[0_40px_80px_rgba(26,28,29,0.08)]">
        <h1 className="text-2xl font-black tracking-tighter text-on-surface mb-8">Admin přihlášení</h1>
        {error && (
          <div className="mb-4 p-3 bg-error-container rounded-xl text-on-error-container text-sm font-semibold">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 text-sm text-on-surface"
          />
          <input
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 text-sm text-on-surface"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary-gradient text-white font-bold py-3 rounded-xl hover:opacity-95 disabled:opacity-60 transition-all mt-2"
          >
            {loading ? 'Přihlašuji…' : 'Přihlásit se'}
          </button>
        </form>
      </div>
    </div>
  )
}
