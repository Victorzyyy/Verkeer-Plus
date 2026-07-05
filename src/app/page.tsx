import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import LightStreakDivider from '@/components/canvas/LightStreakDivider'
import OverOns from '@/components/sections/OverOns'
import Network from '@/components/sections/Network'
import TrainingBanner from '@/components/sections/TrainingBanner'
import ContactSnippet from '@/components/sections/ContactSnippet'

export const metadata: Metadata = {
  title: 'Verkeersplus — Verkeersregelaars inhuren, 24 uur geregeld',
  alternates: {
    canonical: '/',
    languages: {
      'nl-NL': '/',
      'ar':    '/?lang=ar',
    },
  },
}

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
        <TrainingBanner />
        <ContactSnippet />
      </main>
      <Footer />
    </>
  )
}
