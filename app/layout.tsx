import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import Nav from '../components/nav'
import Footer from '../components/footer'
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CivilPro - Professional Civil Engineering Tools',
  description: 'Fast calculators, smart converters, and essential tools built specifically for civil engineers. Save time and eliminate errors in your calculations.',
  metadataBase: new URL('https://civilpro.local'),
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'CivilPro - Professional Civil Engineering Tools',
    description: 'Fast calculators, smart converters, and essential tools built specifically for civil engineers.',
    url: 'https://civilpro.local',
    siteName: 'CivilPro',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} min-h-screen bg-background text-body antialiased dark:bg-background-dark dark:text-body-dark`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Nav />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          {process.env.PLAUSIBLE_DOMAIN ? (
            <script
              defer
              data-domain={process.env.PLAUSIBLE_DOMAIN}
              src="https://plausible.io/js/script.js"
            />
          ) : null}
        </ThemeProvider>
      </body>
    </html>
  )
}


