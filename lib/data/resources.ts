import { Resource } from '../types/resources'

export const resources: Resource[] = [
  // Nepal Resources
  {
    slug: 'nepal-building-codes',
    title: 'Nepal Building Codes',
    description: 'Complete collection of Nepal Building Codes including NBC 105, 205, and other structural design codes.',
    category: 'Codes',
    region: 'Nepal',
    subItems: [
      { title: 'Nepal Building Code NBC 105:2020 - Seismic Design of the Building in Nepal', url: 'https://giwmscdntwo.gov.np/media/app/public/54/posts/1679824087_98.pdf' },
      { title: 'Nepal Building Code NBC 205:2024 (Ready-To-Use Detailing Guidelines for Low Rise Reinforced Concrete Buildings Concrete Buildings Without Masonary InFills)', url: 'https://giwmscdntwo.gov.np/media/pdf_upload/NBC_205_READY-TO-USE_DETAILING_GUIDELINE_FOR-signed.pdf' },
      { title: 'NBC 206 - Steel Design', url: '/resources/nepal-building-codes/nbc-206' },
      { title: 'NBC 207 - Masonry Design', url: '/resources/nepal-building-codes/nbc-207' },
      
      { title: 'NBC 208 - Masonry Design', url: '/resources/nepal-building-codes/nbc-208' }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    slug: 'nepal-district-rates',
    title: 'Nepal District Rates',
    description: 'Construction material rates, labor costs, and equipment rental rates for all districts in Nepal.',
    category: 'District Rates',
    region: 'Nepal',
    subItems: [
      { title: 'Kathmandu District Rates', url: '/resources/nepal-district-rates/kathmandu' },
      { title: 'Pokhara District Rates', url: '/resources/nepal-district-rates/pokhara' },
      { title: 'Lalitpur District Rates', url: '/resources/nepal-district-rates/lalitpur' },
      { title: 'Bhaktapur District Rates', url: '/resources/nepal-district-rates/bhaktapur' }
    ],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    slug: 'nepal-construction-regulations',
    title: 'Construction Rules and Regulations',
    description: 'Rules and regulations governing construction activities in Nepal.',
    category: 'Rules and Regulations',
    region: 'Nepal',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  },
  {
    slug: 'nepal-construction-notes',
    title: 'Construction Notes',
    description: 'Practical notes and guidelines for construction projects in Nepal.',
    category: 'Notes',
    region: 'Nepal',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    slug: 'nepal-construction-notices',
    title: 'Construction Notices',
    description: 'Latest notices and updates from Nepal construction industry.',
    category: 'Notices',
    region: 'Nepal',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },

  // India Resources
  {
    slug: 'indian-building-codes',
    title: 'Indian Building Codes',
    description: 'Complete collection of Indian Standards (IS) codes for civil engineering and construction.',
    category: 'Codes',
    region: 'India',
    subItems: [
      { title: 'IS 456 - Concrete Code', url: '/resources/indian-building-codes/is-456' },
      { title: 'IS 800 - Steel Design', url: '/resources/indian-building-codes/is-800' },
      { title: 'IS 875 - Load Standards', url: '/resources/indian-building-codes/is-875' },
      { title: 'IS 1893 - Seismic Design', url: '/resources/indian-building-codes/is-1893' }
    ],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14')
  },
  {
    slug: 'indian-district-rates',
    title: 'Indian District Rates',
    description: 'Construction material rates, labor costs, and equipment rental rates for major Indian cities.',
    category: 'District Rates',
    region: 'India',
    subItems: [
      { title: 'Delhi District Rates', url: '/resources/indian-district-rates/delhi' },
      { title: 'Mumbai District Rates', url: '/resources/indian-district-rates/mumbai' },
      { title: 'Bangalore District Rates', url: '/resources/indian-district-rates/bangalore' },
      { title: 'Chennai District Rates', url: '/resources/indian-district-rates/chennai' }
    ],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  {
    slug: 'indian-building-regulations',
    title: 'Building Rules and Regulations',
    description: 'Building codes and regulations for construction in India.',
    category: 'Rules and Regulations',
    region: 'India',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    slug: 'indian-construction-notes',
    title: 'Construction Notes',
    description: 'Engineering notes and guidelines for construction projects in India.',
    category: 'Notes',
    region: 'India',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  },
  {
    slug: 'indian-construction-notices',
    title: 'Construction Notices',
    description: 'Latest notices and updates from Indian construction industry.',
    category: 'Notices',
    region: 'India',
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06')
  },

  // US Resources
  {
    slug: 'us-building-codes',
    title: 'US Building Codes',
    description: 'American building codes and standards including ACI, AISC, and other structural design codes.',
    category: 'Codes',
    region: 'US',
    subItems: [
      { title: 'ACI 318 - Building Code', url: '/resources/us-building-codes/aci-318' },
      { title: 'AISC Steel Manual', url: '/resources/us-building-codes/aisc-steel' },
      { title: 'IBC - International Building Code', url: '/resources/us-building-codes/ibc' },
      { title: 'ASCE 7 - Load Standards', url: '/resources/us-building-codes/asce-7' }
    ],
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13')
  },
  {
    slug: 'us-district-rates',
    title: 'US District Rates',
    description: 'Construction material rates and labor costs for major US cities and regions.',
    category: 'District Rates',
    region: 'US',
    subItems: [
      { title: 'New York Construction Rates', url: '/resources/us-district-rates/new-york' },
      { title: 'California Construction Rates', url: '/resources/us-district-rates/california' },
      { title: 'Texas Construction Rates', url: '/resources/us-district-rates/texas' },
      { title: 'Florida Construction Rates', url: '/resources/us-district-rates/florida' }
    ],
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11')
  },
  {
    slug: 'us-building-regulations',
    title: 'Building Rules and Regulations',
    description: 'Building codes and regulations for construction in the United States.',
    category: 'Rules and Regulations',
    region: 'US',
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-09')
  },
  {
    slug: 'us-construction-notes',
    title: 'Construction Notes',
    description: 'Engineering notes and guidelines for construction projects in the US.',
    category: 'Notes',
    region: 'US',
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-07')
  },
  {
    slug: 'us-construction-notices',
    title: 'Construction Notices',
    description: 'Latest notices and updates from US construction industry.',
    category: 'Notices',
    region: 'US',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },

  // Europe Resources
  {
    slug: 'european-building-codes',
    title: 'European Building Codes',
    description: 'Eurocodes and European standards for structural design and construction.',
    category: 'Codes',
    region: 'Europe',
    subItems: [
      { title: 'EN 1992 - Eurocode 2', url: '/resources/european-building-codes/en-1992' },
      { title: 'EN 1993 - Eurocode 3', url: '/resources/european-building-codes/en-1993' },
      { title: 'EN 1990 - Basis of Design', url: '/resources/european-building-codes/en-1990' },
      { title: 'EN 1991 - Actions on Structures', url: '/resources/european-building-codes/en-1991' }
    ],
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13')
  },
  {
    slug: 'european-district-rates',
    title: 'European District Rates',
    description: 'Construction material rates and labor costs for major European cities.',
    category: 'District Rates',
    region: 'Europe',
    subItems: [
      { title: 'London Construction Rates', url: '/resources/european-district-rates/london' },
      { title: 'Paris Construction Rates', url: '/resources/european-district-rates/paris' },
      { title: 'Berlin Construction Rates', url: '/resources/european-district-rates/berlin' },
      { title: 'Madrid Construction Rates', url: '/resources/european-district-rates/madrid' }
    ],
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04')
  },
  {
    slug: 'europe-building-regulations',
    title: 'Building Rules and Regulations',
    description: 'Building codes and regulations for construction in Europe.',
    category: 'Rules and Regulations',
    region: 'Europe',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  },
  {
    slug: 'europe-construction-notes',
    title: 'Construction Notes',
    description: 'Engineering notes and guidelines for construction projects in Europe.',
    category: 'Notes',
    region: 'Europe',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  {
    slug: 'europe-construction-notices',
    title: 'Construction Notices',
    description: 'Latest notices and updates from European construction industry.',
    category: 'Notices',
    region: 'Europe',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // Other Regions Resources
  {
    slug: 'international-building-codes',
    title: 'International Building Codes',
    description: 'Building codes and standards from various countries worldwide.',
    category: 'Codes',
    region: 'Other Regions',
    subItems: [
      { title: 'Canadian Building Codes', url: '/resources/international-building-codes/canada' },
      { title: 'Australian Building Codes', url: '/resources/international-building-codes/australia' },
      { title: 'Japanese Building Codes', url: '/resources/international-building-codes/japan' },
      { title: 'Singapore Building Codes', url: '/resources/international-building-codes/singapore' }
    ],
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    slug: 'global-district-rates',
    title: 'Global District Rates',
    description: 'Construction material rates and labor costs from various countries worldwide.',
    category: 'District Rates',
    region: 'Other Regions',
    subItems: [
      { title: 'Canada Construction Rates', url: '/resources/global-district-rates/canada' },
      { title: 'Australia Construction Rates', url: '/resources/global-district-rates/australia' },
      { title: 'Japan Construction Rates', url: '/resources/global-district-rates/japan' },
      { title: 'Singapore Construction Rates', url: '/resources/global-district-rates/singapore' }
    ],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14')
  },
  {
    slug: 'international-regulations',
    title: 'International Regulations',
    description: 'Construction regulations and standards from various countries.',
    category: 'Rules and Regulations',
    region: 'Other Regions',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  {
    slug: 'global-construction-notes',
    title: 'Global Construction Notes',
    description: 'Engineering notes and guidelines from various countries.',
    category: 'Notes',
    region: 'Other Regions',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    slug: 'global-construction-notices',
    title: 'Global Construction Notices',
    description: 'Latest notices and updates from global construction industry.',
    category: 'Notices',
    region: 'Other Regions',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  }
]

export const getResourcesByCategory = (category: string) => {
  return resources.filter(resource => resource.category === category)
}

export const getResourcesByRegion = (region: string) => {
  return resources.filter(resource => resource.region === region)
}

export const getResourceBySlug = (slug: string) => {
  return resources.find(resource => resource.slug === slug)
}

export const getCategoryCounts = () => {
  const counts: Record<string, number> = {}
  resources.forEach(resource => {
    counts[resource.category] = (counts[resource.category] || 0) + 1
  })
  return counts
}

export const getRegionCounts = () => {
  const counts: Record<string, number> = {}
  resources.forEach(resource => {
    counts[resource.region] = (counts[resource.region] || 0) + 1
  })
  return counts
}
