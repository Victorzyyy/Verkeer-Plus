import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { services } from '@/data/content'
import ServiceContent from './ServiceContent'
import type { Lang } from '@/types'

export function generateStaticParams() {
  return services.map(s => ({ slug: s.id }))
}

export function generateMetadata({ params }: { params: { lang: Lang; slug: string } }): Metadata {
  const { lang, slug } = params
  const service = services.find(s => s.id === slug)
  if (!service) return {}

  const svc = service[lang]
  const bare = `/diensten/${service.id}`
  const path = lang === 'ar' ? `/ar${bare}` : bare
  const suffix = lang === 'ar' ? '— فيركيرسبلوس' : '— Verkeersregelaars inhuren'

  return {
    title: `${svc.title} ${suffix}`,
    description: svc.description,
    openGraph: {
      title: `${svc.title} — Verkeersplus`,
      description: svc.description,
    },
    alternates: {
      canonical: path,
      languages: { 'nl-NL': bare, ar: `/ar${bare}` },
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
