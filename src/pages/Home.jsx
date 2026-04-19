import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Services from '../components/Services.jsx'
import About from '../components/About.jsx'
import Machines from '../components/Machines.jsx'
import Gallery from '../components/Gallery.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'
import CookieBanner from '../components/CookieBanner.jsx'
import useReveal from '../hooks/useReveal.js'

export default function Home() {
  useReveal()

  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <About />
      <Machines />
      <Gallery />
      <Contact />
      <Footer />
      <CookieBanner />
    </>
  )
}
