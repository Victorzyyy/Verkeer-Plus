import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { siteConfig } from '@/data/content'

export const metadata: Metadata = {
  title: 'Algemene voorwaarden',
  description: 'Algemene voorwaarden voor het inhuren van verkeersregelaars bij Verkeersplus Services B.V.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/voorwaarden' },
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-24">
          <div className="max-w-[760px] mx-auto px-6 md:px-12">
            <span className="stripe" />
            <p className="eyebrow">{'// Voorwaarden'}</p>
            <h1 className="font-display font-bold text-[clamp(26px,4vw,38px)] text-white mb-8">
              Algemene voorwaarden
            </h1>

            <div className="space-y-8 text-[15px] leading-relaxed text-muted">
              <p>
                Deze voorwaarden gelden voor opdrachten die worden afgesloten met {siteConfig.legalName}
                (&quot;Verkeersplus&quot;), gevestigd in Nederland en ingeschreven bij de KvK onder nummer {siteConfig.kvk}.
              </p>

              <div>
                <h2 className="font-display font-bold text-[18px] text-white mb-2">Offertes en opdrachten</h2>
                <p>
                  Offertes van Verkeersplus zijn vrijblijvend en gebaseerd op de informatie die de opdrachtgever
                  vooraf verstrekt (locatie, duur, aantal verkeersregelaars, aard van de werkzaamheden). Een
                  opdracht komt tot stand zodra beide partijen schriftelijk (waaronder per e-mail) akkoord zijn.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-[18px] text-white mb-2">Uitvoering</h2>
                <p>
                  Verkeersregelaars die door Verkeersplus worden ingezet, werken conform de geldende CROW-richtlijnen
                  en wettelijke vereisten voor verkeersregeling in Nederland. Wijzigingen in de opdracht (bijvoorbeeld
                  in duur of locatie) worden zo snel mogelijk onderling afgestemd.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-[18px] text-white mb-2">Annulering</h2>
                <p>
                  Annulering van een opdracht dient zo vroeg mogelijk te gebeuren, bij voorkeur telefonisch of per
                  e-mail, zodat wij ingeplande verkeersregelaars tijdig kunnen informeren. Bij annulering op zeer
                  korte termijn kunnen kosten in rekening worden gebracht; dit wordt per situatie beoordeeld.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-[18px] text-white mb-2">Aansprakelijkheid</h2>
                <p>
                  Verkeersplus spant zich in om de afgesproken dienstverlening zorgvuldig en volgens de geldende
                  richtlijnen uit te voeren. Voor specifieke aansprakelijkheidsafspraken verwijzen we naar de
                  offerte of overeenkomst die voor de betreffende opdracht is opgesteld.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-[18px] text-white mb-2">Contact</h2>
                <p>
                  Vragen over deze voorwaarden of een lopende opdracht? Neem contact op via{' '}
                  <a className="text-accent-soft hover:underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
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
