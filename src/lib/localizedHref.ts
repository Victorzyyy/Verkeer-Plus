import type { Lang } from '@/types'

/** Prefixes an internal path with /ar when needed. Dutch stays unprefixed (default locale). */
export function localizedHref(href: string, lang: Lang): string {
  if (lang !== 'ar') return href
  if (href === '/') return '/ar'
  if (href.startsWith('/#')) return `/ar${href.slice(1)}`
  return `/ar${href}`
}
