import { Resource } from '../types/resources'

export const resources: Resource[] = [
  // Nepal Resources
  {
    slug: 'nepal-building-codes',
    title: 'Nepal Building Codes (NBC)',
    description: 'Complete collection of Nepal Building Codes including NBC 105, 205, and other structural design codes.',
    category: 'Codes',
    region: 'Nepal',
    subItems: [
      { "title": "Nepal Building Code NBC 105:2020 - Seismic Design of Buildings in Nepal", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679824087_98.pdf" },
      { "title": "Nepal Building Code NBC 206:2024 - Architectural Design Requirements", "url": "https://giwmscdntwo.gov.np/media/pdf_upload/NBC_206_ARCHITECTURAL_DESIGN_REQUIREMENTS-signed.pdf" },
      { "title": "Nepal Building Code NBC 207:2003 - Electrical Design Requirements for Public Buildings", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679824531_73.pdf" },
      { "title": "Nepal Building Code NBC 208:2003 - Sanitary and Plumbing Design Requirements", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679824552_72.pdf" },
      { "title": "Nepal Building Code NBC 204:2015 - Guidelines for Earthquake Resistant Building Construction (Earthen Building)", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679824397_8.pdf" },
      { "title": "Nepal Building Code NBC 203:2015 - Guidelines for Earthquake Resistant Building Construction (Low Strength Masonry)", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679826255_5.pdf" },
      { "title": "Nepal Building Code NBC 202:2015 - Guidelines on Load Bearing Masonry", "url": "https://giwmscdnone.gov.np/media/app/public/54/posts/1679824354_21.pdf" },
      { "title": "Nepal Building Code NBC 201:1994 - Mandatory Rules of Thumb for Reinforced Concrete Buildings with Masonry Infill", "url": "https://www.iibh.org/kijun/pdf/Nepal_20_NBC_201_1994_Thumb_RC_with_Masonry.pdf" },
      { "title": "Nepal Building Code NBC 114:1994 - Construction Safety", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679824289_7.pdf" },
      { "title": "Nepal Building Code NBC 113:1994 - Aluminium", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679824268_75.pdf" },
      { "title": "Nepal Building Code NBC 112:1994 - Timber", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679824246_20.pdf" },
      { "title": "Nepal Building Code NBC 111:1994 - Steel", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679824223_46.pdf" },
      { "title": "Nepal Building Code NBC 110:1994 - Plain and Reinforced Concrete", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679824202_6.pdf" },
      { "title": "Nepal Building Code NBC 109:1994 - Unreinforced Masonry", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679824181_36.pdf" },
      { "title": "Nepal Building Code NBC 108:1994 - Site Consideration for Seismic Hazards", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679824158_65.pdf" },
      { "title": "Nepal Building Code NBC 107:1994 - Provisional Recommendation on Fire Safety", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679824137_8.pdf" },
      { "title": "Nepal Building Code NBC 106:1994 - Snow Load", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679824116_40.pdf" },
      { "title": "Nepal Building Code NBC 104:1994 - Wind Load", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679824060_73.pdf" },
      { "title": "Nepal Building Code NBC 103:1994 - Occupancy Load (Imposed Load)", "url": "https://giwmscdntwo.gov.np/media/app/public/54/posts/1679823542_78.pdf" }
    ]
    ,
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
      { title: 'Kathmandu District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://daokathmandu.moha.gov.np/upload/1402a3666bab255e6a3f07937faf522f/files/%E0%A4%9C%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%B2%E0%A4%BE_%E0%A4%A6%E0%A4%B0%E0%A4%B0%E0%A5%87%E0%A4%9F_%E0%A5%A8%E0%A5%A6%E0%A5%AE%E0%A5%A8.%E0%A5%A6%E0%A5%AE%E0%A5%A9_%E0%A4%95%E0%A4%BE%E0%A4%A0%E0%A4%AE%E0%A4%BE%E0%A4%A1%E0%A5%8C%E0%A4%82_Final_rotated_Size_(1).pdf' },
      { title: 'Kaski District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://dcckaski.gov.np/dcc-notice-file/Notices-202508031300507062.pdf' },
      { title: 'Lalitpur District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://dcclalitpur.gov.np/dcc-notice-file/Notices-202410151147141924.pdf' },
      { title: 'Bhaktapur District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://daobhaktapur.moha.gov.np/upload/23c9d1f978cb60dc116b59b903e5975a/files/%E0%A4%9C%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%B2%E0%A4%BE_%E0%A4%A6%E0%A4%B0%E0%A4%B0%E0%A5%87%E0%A4%9F_%E0%A4%86.%E0%A4%B5.%E0%A5%A8%E0%A5%A6%E0%A5%AE%E0%A5%A8.%E0%A5%AE%E0%A5%A9_compressed_(1).pdf' },
      { title: 'Bhojpur District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://daobhojpur.moha.gov.np/upload/0c86b0873e4e04ba18d1308320f56ab7/files/%E0%A4%86.%E0%A4%AC.%E0%A5%A8%E0%A5%A6%E0%A5%AE%E0%A5%A8_%E0%A5%A6%E0%A5%AE%E0%A5%A9_%E0%A4%95%E0%A5%8B_%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A5%80%E0%A4%95%E0%A5%83%E0%A4%A4_%E0%A4%9C%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%B2%E0%A4%BE_%E0%A4%A6%E0%A4%B0%E0%A4%B0%E0%A5%87%E0%A4%9F.pdf' },
      { title: 'Solukhumbu District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://dccsolukhumbu.gov.np/dcc-notice-file/Notices-202507152046175271.pdf' },
      { title: 'Bara District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://dccbara.gov.np/dcc-notice-file/Notices-202507211122442234.pdf' },
      { title: 'Dhanusha District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://dccdhanusha.gov.np/dcc-notice-file/Notices-202508141413503484.pdf' },
      { title: 'Rautahat District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://dccrautahat.gov.np/dcc-notice-file/Notices-202508191105089330.pdf' },
      { title: 'Siraha District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://daosiraha.moha.gov.np/upload/f729da1c8bb603cb3b301f916a396214/files/%E0%A4%9C%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%B2%E0%A4%BE_%E0%A4%A6%E0%A4%B0%E0%A4%B0%E0%A5%87%E0%A4%9F_%E0%A4%AB%E0%A4%BE%E0%A4%87%E0%A4%A8%E0%A4%B2_%E0%A5%A8%E0%A5%A6%E0%A5%AE%E0%A5%A8_%E0%A5%AE%E0%A5%A9_%E0%A4%95%E0%A5%8B_%E0%A4%B2%E0%A4%BE%E0%A4%97%E0%A4%BF.pdf' },
      { title: 'Dhading District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://dccdhading.gov.np/dcc-notice-file/Notices-202507231340323598.pdf' },
      { title: 'Dolakha District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://dccdolakha.gov.np/dcc-notice-file/Notices-202507251012293488.pdf' },
      { title: 'Nuwakot District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://dccnuwakot.gov.np/dcc-notice-file/Notices-202508241316336848.pdf' },
      { title: 'Ramechhap District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://dccramechhap.gov.np/dcc-notice-file/Notices-202507201506558251.pdf' },
      { title: 'Sindhupalchok District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://dccsindhupalchowk.gov.np/dcc-notice-file/Notices-20250724124500789.pdf' },
      { title: 'Baglung District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://dccbaglung.gov.np/dcc-notice-file/Notices-202507241306197560.pdf' },
      { title: 'Gorkha District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'http://wssdogorkha.gandaki.gov.np/upload/6acf52f10c91c26c780d78e8527c7d21/files/District_rate_of_Gorkha_For_2082_083.pdf' },
      { title: 'Lamjung District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'http://wriddlamjung.gandaki.gov.np/upload/22afdd56a563fa604f1442ca7bc02e72/files/%E0%A4%9C%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%B2%E0%A4%BE_%E0%A4%A6%E0%A4%B0%E0%A4%B0%E0%A5%87%E0%A4%9F_%E0%A5%A8%E0%A5%A6%E0%A5%AE%E0%A5%A8_83.pdf' },
      { title: 'Myagdi District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'http://idomyagdi.gandaki.gov.np/upload/a482d14985070398df905fc9e4bb33d9/files/%E0%A4%9C%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%B2%E0%A4%BE_%E0%A4%A6%E0%A4%B0%E0%A4%B0%E0%A5%87%E0%A4%9F_%E0%A5%A8%E0%A5%A6%E0%A5%AE%E0%A5%A8_%E0%A5%A6%E0%A5%AE%E0%A5%A9.pdf' },
      { title: 'Banke District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://wriddobanke.gov.np/storage/notice-news/Rate_082-83/file/62Vbzf5whHAfDgf6JjmQ3pJhdxVWmHhQEWEhjJ4V.pdf' },
      { title: 'Dang District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://dccdang.gov.np/dcc-notice-file/Notices-202507181353529491.pdf' },
      { title: 'Kapilvastu District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://dcckapilvastu.gov.np/dcc-notice-file/Notices-202507201228046353.pdf' },
      { title: 'Rolpa District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://ridorolpa.lumbini.gov.np/media/notices/%E0%A4%86.%E0%A4%B5._%E0%A5%A8%E0%A5%A6%E0%A5%AE%E0%A5%A8-%E0%A5%A6%E0%A5%AE%E0%A5%A9_%E0%A4%B0%E0%A4%B2%E0%A4%AA_%E0%A4%9C%E0%A4%B2%E0%A4%B2%E0%A4%95_%E0%A4%B8%E0%A4%B5%E0%A4%95%E0%A4%A4_%E0%A4%9C%E0%A4%B2%E0%A4%B2_%E0%A4%A6%E0%A4%B0%E0%A4%B0%E0%A4%9F.pdf' },
      { title: 'Kanchanpur District Rate 2082/83 (जिल्ला दर रेट २०८२/८३)', url: 'https://shuklaphantamun.gov.np/sites/shuklaphantamun.gov.np/files/documents/कञ्चनपुर जिल्लाको स्वीकृत दररेट आ.व. २०८२।०८३.pdf' }
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
/*
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
  }*/
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
