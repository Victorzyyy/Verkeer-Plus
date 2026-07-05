export type Lang = 'nl' | 'ar'

export interface Service {
  id: string
  nl: { title: string; description: string; features: string[] }
  ar: { title: string; description: string; features: string[] }
}

export interface TrustItem {
  nl: { title: string; body: string }
  ar: { title: string; body: string }
}

export interface ContactInfo {
  key: string
  nl: { label: string; value: string }
  ar: { label: string; value: string }
  href?: string
}

export interface NavLink {
  href: string
  nl: string
  ar: string
}

export interface FitItem {
  nl: string
  ar: string
}

export interface FaqItem {
  nl: { q: string; a: string }
  ar: { q: string; a: string }
}
