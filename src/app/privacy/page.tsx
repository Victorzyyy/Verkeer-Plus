import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { siteConfig } from '@/data/content'

export const metadata: Metadata = {
  title: 'Privacyverklaring',
  description: 'Hoe Verkeersplus Services B.V. omgaat met persoonsgegevens die via de website worden verzameld.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-24">
          <div className="max-w-[760px] mx-auto px-6 md:px-12">
            <span className="stripe" />
            <p className="eyebrow">{'// Privacy'}</p>
            <h1 className="font-display font-bold text-[clamp(26px,4vw,38px)] text-white mb-8">
              Privacyverklaring
            </h1>

            <div className="space-y-8 text-[15px] leading-relaxed text-muted">
              <p>
                {siteConfig.legalName} (&quot;Verkeersplus&quot;, &quot;wij&quot;) hecht waarde aan een zorgvuldige omgang met
                persoonsgegevens. Deze pagina legt uit welke gegevens wij verzamelen via deze website, waarvoor
                we ze gebruiken en welke rechten je hebt.
              </p>

              <div>
                <h2 className="font-display font-bold text-[18px] text-white mb-2">Welke gegevens verzamelen we</h2>
                <p>
                  Wanneer je het contactformulier of het sollicitatieformulier invult, ontvangen wij de gegevens
                  die je zelf invoert: onder andere naam, telefoonnummer, e-mailadres, woonplaats en — bij een
                  sollicitatie — eventueel een cv. Wij verzamelen geen gegevens via trackingcookies of
                  advertentienetwerken.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-[18px] text-white mb-2">Waarvoor gebruiken we deze gegevens</h2>
                <p>
                  Uitsluitend om contact met je op te nemen naar aanleiding van je aanvraag of sollicitatie, en om
                  een eventuele opdracht of samenwerking uit te voeren. Wij verkopen of delen jouw gegevens niet
                  aan derden voor marketingdoeleinden.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-[18px] text-white mb-2">Bewaartermijn</h2>
                <p>
                  We bewaren gegevens niet langer dan nodig is om je aanvraag af te handelen of, bij een
                  sollicitatie, gedurende de duur van de sollicitatieprocedure plus een redelijke termijn
                  daarna, tenzij je eerder om verwijdering vraagt.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-[18px] text-white mb-2">Jouw rechten</h2>
                <p>
                  Je hebt recht op inzage, correctie en verwijdering van je gegevens. Neem hiervoor contact op
                  via <a className="text-accent-soft hover:underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
                </p>
              </div>

              <p className="text-[13px] text-dim pt-4 border-t border-concrete">
                Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long' })}.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
