import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import LightStreakDivider from '@/components/canvas/LightStreakDivider'
import OverOns from '@/components/sections/OverOns'
import Network from '@/components/sections/Network'
import TrainingBanner from '@/components/sections/TrainingBanner'
import FAQ from '@/components/sections/FAQ'
import ContactSnippet from '@/components/sections/ContactSnippet'
import { faqItems } from '@/data/content'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.nl.q,
    acceptedAnswer: { '@type': 'Answer', text: item.nl.a },
  })),
}

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main className="grain">
        <Hero />
        <Services />
        <LightStreakDivider />
        <OverOns />
        <Network />
        <TrainingBanner />
        <FAQ />
        <ContactSnippet />
      </main>
      <Footer />
    </>
  )
}
