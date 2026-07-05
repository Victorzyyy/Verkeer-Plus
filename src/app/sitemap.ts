import type { MetadataRoute } from 'next'
import { siteConfig } from '@/data/content'

const base = siteConfig.baseUrl

const pages = [
  { path: '/',             priority: 1.0,  freq: 'weekly'  },
  { path: '/contact',      priority: 0.9,  freq: 'monthly' },
  { path: '/werken-bij',   priority: 0.8,  freq: 'monthly' },
  { path: '/diensten/wegwerkzaamheden', priority: 0.8, freq: 'monthly' },
  { path: '/diensten/evenementen',      priority: 0.8, freq: 'monthly' },
  { path: '/diensten/spoed',            priority: 0.8, freq: 'monthly' },
  { path: '/privacy',      priority: 0.3,  freq: 'yearly'  },
  { path: '/voorwaarden',  priority: 0.3,  freq: 'yearly'  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const page of pages) {
    const url = `${base}${page.path}`
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: page.freq as MetadataRoute.Sitemap[number]['changeFrequency'],
      priority: page.priority,
      alternates: {
        languages: {
          'nl': url,
          'ar': `${url}${page.path === '/' ? '' : ''}?lang=ar`,
        },
      },
    })
  }

  return entries
}
