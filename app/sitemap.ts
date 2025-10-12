import { MetadataRoute } from 'next'

const URL = 'https://www.civilcalculation.com';

const routes = [
  '',
  'calculators',
  'converters',
  'about',
  'contact',
  'privacy',
  'terms',
  'disclaimer',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${URL}/${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
