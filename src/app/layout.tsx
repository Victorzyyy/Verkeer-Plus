import type { Metadata } from 'next'
import { Inter, Space_Grotesk, Space_Mono, Noto_Sans_Arabic } from 'next/font/google'
import { LangProvider } from '@/lib/langContext'
import { siteConfig } from '@/data/content'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})
const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Verkeersplus — Verkeersregelaars inhuren, 24 uur geregeld',
    template: '%s | Verkeersplus',
  },
  description: 'Gecertificeerde verkeersregelaars inhuren voor wegwerkzaamheden, evenementen en calamiteiten. Verkeersplus Services — landelijke dekking, 24/7 bereikbaar.',
  keywords: ['verkeersregelaars', 'wegwerkzaamheden', 'CROW', 'verkeersbegeleiding', 'Nederland', 'inhuren'],
  authors: [{ name: 'Verkeersplus Services B.V.' }],
  creator: 'Verkeersplus',
  metadataBase: new URL(siteConfig.baseUrl),
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'ar',
    url: siteConfig.baseUrl,
    siteName: 'Verkeersplus',
    title: 'Verkeersplus — Verkeersregelaars inhuren, 24 uur geregeld',
    description: 'Gecertificeerde verkeersregelaars voor wegwerkzaamheden, evenementen en spoedklussen. Landelijke dekking, 24/7.',
    images: [{ url: '/images/road-bg.jpg', width: 1376, height: 768, alt: 'Verkeersplus — verkeersregelaars op de weg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verkeersplus — 24 uur verkeersregelaars',
    description: 'CROW-gecertificeerde verkeersregelaars, landelijk actief, dag en nacht bereikbaar.',
    images: ['/images/road-bg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.baseUrl,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  areaServed: {
    '@type': 'Country',
    name: 'Nederland',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'NL',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="nl"
      dir="ltr"
      className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable} ${notoArabic.variable}`}
    >
      <body className="bg-bg text-text font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  )
}
