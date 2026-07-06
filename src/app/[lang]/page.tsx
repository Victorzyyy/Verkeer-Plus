import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import LightStreakDivider from '@/components/canvas/LightStreakDivider'
import OverOns from '@/components/sections/OverOns'
import Network from '@/components/sections/Network'
import BecomeSteward from '@/components/sections/BecomeSteward'
import ContactSnippet from '@/components/sections/ContactSnippet'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="grain">
        <Hero />
        <Services />
        <LightStreakDivider />
        <OverOns />
        <Network />
        <BecomeSteward />
        <ContactSnippet />
      </main>
      <Footer />
    </>
  )
}
