import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact — Verkeersplus Services',
  description: 'Neem contact op met Verkeersplus Services. Vrijblijvende offerte of direct bellen voor spoedklussen. Bereikbaar 24/7, landelijk actief.',
  openGraph: {
    title: 'Contact — Verkeersplus',
    description: 'Direct een team nodig? Bel of mail ons. 24/7 bereikbaar.',
  },
  alternates: {
    canonical: '/contact',
    languages: { 'nl-NL': '/contact', ar: '/contact?lang=ar' },
  },
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactContent />
      </main>
      <Footer />
    </>
  )
}
