import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const TO_EMAIL = 'novaja46@seznam.cz'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, content-type',
      },
    })
  }

  const { name, email, phone, type, message } = await req.json()

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const notifyRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'web@zemni-prace-novak.cz',
      to: [TO_EMAIL],
      subject: `Nová poptávka — ${type || 'obecná'} — ${name}`,
      text: `Jméno: ${name}\nEmail: ${email}\nTelefon: ${phone || '—'}\nTyp: ${type || '—'}\nZpráva:\n${message}\n\n---\nOdesláno z webu zemni-prace-novak.cz`,
    }),
  })

  const autoReplyRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'web@zemni-prace-novak.cz',
      to: [email],
      subject: 'Potvrzení poptávky — Zemní práce Novák',
      text: `Dobrý den, ${name},\n\nděkujeme za Vaši poptávku. Vaši zprávu jsme přijali a ozveme se Vám do 24 hodin.\n\nS pozdravem,\nNovák Jan — Zemní práce\nTel: +420 723 753 374`,
    }),
  })

  if (!notifyRes.ok) {
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
})
