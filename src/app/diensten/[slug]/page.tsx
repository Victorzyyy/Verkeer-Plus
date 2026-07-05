import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { services } from '@/data/content'
import ServiceContent from './ServiceContent'

export function generateStaticParams() {
  return services.map(s => ({ slug: s.id }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services.find(s => s.id === params.slug)
  if (!service) return {}

  return {
    title: `${service.nl.title} — Verkeersregelaars inhuren`,
    description: service.nl.description,
    openGraph: {
      title: `${service.nl.title} — Verkeersplus`,
      description: service.nl.description,
    },
    alternates: {
      canonical: `/diensten/${service.id}`,
      languages: { 'nl-NL': `/diensten/${service.id}`, ar: `/diensten/${service.id}?lang=ar` },
    },
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find(s => s.id === params.slug)
  if (!service) notFound()

  return (
    <>
      <Header />
      <main>
        <ServiceContent serviceId={service.id} />
      </main>
      <Footer />
    </>
  )
}
