import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import AdminLogin from '../components/admin/AdminLogin.jsx'
import AdminOverlay from '../components/admin/AdminOverlay.jsx'
import Home from './Home.jsx'

export default function Admin() {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (session === undefined) return null

  if (!session) return <AdminLogin onLogin={() => {}} />

  return (
    <>
      <AdminOverlay onLogout={() => setSession(null)} />
      <div className="pt-12">
        <Home />
      </div>
    </>
  )
}
