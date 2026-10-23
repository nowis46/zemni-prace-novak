import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'

// Build-time render of the homepage so crawlers (Seznam, Google) get real HTML.
export function render(content) {
  return renderToString(
    <MemoryRouter initialEntries={['/']}>
      <Home initialContent={content} />
    </MemoryRouter>,
  )
}
