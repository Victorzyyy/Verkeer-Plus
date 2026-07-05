import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WerkenBijContent from './WerkenBijContent'

export const metadata: Metadata = {
  title: 'Werken bij Verkeersplus — Word verkeersregelaar',
  description: 'Solliciteer als verkeersregelaar bij Verkeersplus Services. Met of zonder ervaring welkom. Goede verdiensten, flexibele inzet, landelijk actief.',
  openGraph: {
    title: 'Werken bij Verkeersplus',
    description: 'Word verkeersregelaar. Met of zonder ervaring, landelijk actief.',
  },
  alternates: {
    canonical: '/werken-bij',
    languages: { 'nl-NL': '/werken-bij', ar: '/werken-bij?lang=ar' },
  },
}

export default function WerkenBijPage() {
  return (
    <>
      <Header />
      <main>
        <WerkenBijContent />
      </main>
      <Footer />
    </>
  )
}
