import { useState } from 'react'
import { ContentProvider } from '../context/ContentContext.jsx'
import AdminBar from '../components/admin/AdminBar.jsx'
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Services from '../components/Services.jsx'
import About from '../components/About.jsx'
import Machines from '../components/Machines.jsx'
import Gallery from '../components/Gallery.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'
import useReveal from '../hooks/useReveal.js'

function AdminPage({ onLogout }) {
  useReveal()
  return (
    <>
      <AdminBar onLogout={onLogout} />
      <div className="pt-12">
        <Nav />
        <Hero />
        <Services />
        <About />
        <Machines />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        sessionStorage.setItem('adminPassword', password)
        onLogin(password)
      } else {
        setError('Nesprávné heslo.')
      }
    } catch {
      setError('Chyba připojení.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-surface-container-lowest p-10 rounded-3xl shadow-[0_40px_80px_rgba(26,28,29,0.08)]">
        <h1 className="text-2xl font-black tracking-tighter text-on-surface mb-2">Admin</h1>
        <p className="text-sm text-on-surface-variant mb-8">Zadejte heslo pro přístup k editaci.</p>
        {error && (
          <div className="mb-4 p-3 bg-error-container rounded-xl text-on-error-container text-sm font-semibold">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            className="bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 text-sm text-on-surface"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary-gradient text-white font-bold py-3 rounded-xl hover:opacity-95 disabled:opacity-60 transition-all"
          >
            {loading ? 'Ověřuji…' : 'Přihlásit se'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem('adminPassword'))

  const handleLogin = () => setAuthed(true)
  const handleLogout = () => {
    sessionStorage.removeItem('adminPassword')
    setAuthed(false)
  }

  return (
    <ContentProvider isAdmin={authed}>
      {authed ? <AdminPage onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />}
    </ContentProvider>
  )
}
