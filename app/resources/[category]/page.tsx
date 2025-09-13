"use client"

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowLeft, Star, StarOff, ExternalLink, ChevronDown, BookOpen, FileText, Scale, MapPin, PenTool, Download, Eye, X } from 'lucide-react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { resources } from '../../../lib/data/resources'
import { Resource, ResourceCategory, SortOption } from '../../../lib/types/resources'

const categoryIcons = {
  'Codes': BookOpen,
  'District Rates': MapPin,
  'Rules and Regulations': Scale,
  'Notes': PenTool,
  'Notices': FileText
}

const categoryColors = {
  'Codes': 'from-blue-500 to-cyan-500',
  'District Rates': 'from-orange-500 to-red-500',
  'Rules and Regulations': 'from-purple-500 to-violet-500',
  'Notes': 'from-yellow-500 to-amber-500',
  'Notices': 'from-green-500 to-emerald-500'
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('All')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false)
  const [currentPdfUrl, setCurrentPdfUrl] = useState('')
  const [currentPdfTitle, setCurrentPdfTitle] = useState('')
  const [downloading, setDownloading] = useState<string | null>(null)
  const [loadingPdf, setLoadingPdf] = useState(false)

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('resource-favorites')
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)))
    }
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('resource-favorites', JSON.stringify(Array.from(favorites)))
  }, [favorites])

  // Get resources for this category
  const categoryResources = useMemo(() => {
    return resources.filter(resource => resource.slug === params.category)
  }, [params.category])

  const mainResource = categoryResources[0]

  // Handle PDF download
  const handleDownload = async (url: string, title: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    
    setDownloading(url)
    
    try {
      // Show loading for a minimum time to provide feedback
      await Promise.all([
        new Promise(resolve => setTimeout(resolve, 800)),
        (async () => {
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          a.download = title + '.pdf'
          a.target = '_self'
          
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        })()
      ])
    } catch (error) {
      console.error('Download failed:', error)
      window.location.href = url
    } finally {
      setDownloading(null)
    }
  }

  // Handle PDF view
  const handleViewPdf = (url: string, title: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setCurrentPdfUrl(url)
    setCurrentPdfTitle(title)
    setPdfViewerOpen(true)
    setLoadingPdf(true)
    document.body.style.overflow = 'hidden'
  }

  // Close PDF viewer
  const closePdfViewer = () => {
    setPdfViewerOpen(false)
    setCurrentPdfUrl('')
    setCurrentPdfTitle('')
    setLoadingPdf(false)
    document.body.style.overflow = 'auto'
  }

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePdfViewer()
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  if (!mainResource) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center">
          <h1 className="mb-4 font-display text-4xl font-bold text-heading dark:text-heading-dark">
            Category Not Found
          </h1>
          <p className="mb-8 font-sans text-body/60 dark:text-body-dark/60">
            The category you're looking for doesn't exist.
          </p>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-display font-medium text-white transition-colors hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>
        </div>
      </main>
    )
  }

  // Fuse.js configuration for search
  const fuse = useMemo(() => new Fuse(mainResource.subItems || [], {
    keys: ['title'],
    threshold: 0.3,
    includeScore: true
  }), [mainResource.subItems])

  // Filter and search sub-resources
  const filteredSubItems = useMemo(() => {
    if (!mainResource.subItems) return []

    let filtered = mainResource.subItems

    // Apply search
    if (searchQuery.trim()) {
      const searchResults = fuse.search(searchQuery)
      filtered = searchResults.map(result => result.item)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'All':
          return 0;
        case 'Newest':
          return b.title.localeCompare(a.title)
        case 'Oldest':
          return a.title.localeCompare(b.title)
        case 'A-Z':
          return a.title.localeCompare(b.title)
        case 'Z-A':
          return b.title.localeCompare(a.title)
        case 'Favorite':
          const aFav = favorites.has(a.url)
          const bFav = favorites.has(b.url)
          if (aFav && !bFav) return -1
          if (!aFav && bFav) return 1
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, sortBy, favorites, fuse, mainResource.subItems])

  const toggleFavorite = (url: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(url)) {
        newFavorites.delete(url)
      } else {
        newFavorites.add(url)
      }
      return newFavorites
    })
  }

  const CategoryIcon = categoryIcons[mainResource.category]

  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      {/* Back Button */}
      <Link
        href="/resources"
        className="mb-8 inline-flex items-center gap-2 rounded-xl border border-slate-200/20 bg-surface px-4 py-2 font-display font-medium text-heading transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-heading-dark dark:hover:bg-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Resources
      </Link>

      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-start gap-4">
          <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r ${categoryColors[mainResource.category]} text-white`}>
            <CategoryIcon className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h1 className="mb-2 font-display text-4xl font-bold text-heading dark:text-heading-dark">
              {mainResource.title}
            </h1>
            <p className="font-sans text-xl text-body/80 dark:text-body-dark/80">
              {mainResource.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search and Sort */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-body/40 dark:text-body-dark/40" />
          <input
            type="text"
            placeholder="Search within this category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200/20 bg-surface px-12 py-4 font-sans text-body placeholder:text-body/40 shadow-card transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800/20 dark:bg-surface-dark dark:text-body-dark dark:placeholder:text-body-dark/40"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-medium text-body/60 dark:text-body-dark/60">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none rounded-xl border border-slate-200/20 bg-surface px-4 py-2 pr-8 font-display font-medium text-heading transition-colors focus:border-primary/50 focus:outline-none dark:border-slate-800/20 dark:bg-surface-dark dark:text-heading-dark"
              >
                <option value="Favorite">All</option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Favorite">Favorite</option>
                
              </select>
              <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-body/40 dark:text-body-dark/40" />
            </div>
          </div>
          <div className="text-sm text-body/60 dark:text-body-dark/60">
            {filteredSubItems.length} item{filteredSubItems.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </motion.div>

      {/* Sub Resources Grid */}
      <AnimatePresence mode="wait">
        {filteredSubItems.length > 0 ? (
          <motion.div
            key="sub-resources-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredSubItems.map((subItem, index) => {
              const isFavorite = favorites.has(subItem.url)
              const isDownloading = downloading === subItem.url
              
              return (
                <motion.div
                  key={subItem.url}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative flex flex-col rounded-xl border border-slate-200/20 bg-surface p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-surface-dark"
                >
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(subItem.url, e)}
                    className={`absolute right-3 top-3 rounded-full p-1.5 transition-all hover:scale-110 ${
                      isFavorite 
                        ? 'text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20' 
                        : 'text-body/40 hover:bg-slate-100/80 dark:text-body-dark/40 dark:hover:bg-slate-800/80'
                    }`}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isFavorite ? (
                      <Star className="h-4 w-4 fill-current" />
                    ) : (
                      <StarOff className="h-4 w-4" />
                    )}
                  </button>

                  {/* Content */}
                  <div className="pr-8 flex-grow">
                    <h3 className="mb-2 font-display text-lg font-semibold text-heading group-hover:text-primary transition-colors dark:text-heading-dark">
                      {subItem.title}
                    </h3>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex justify-between items-end">
                    <div className="flex gap-2">
                      {/* View PDF Button */}
                      <button
                        onClick={(e) => handleViewPdf(subItem.url, subItem.title, e)}
                        className="flex items-center gap-1.5 rounded-xl border border-slate-200/20 bg-surface px-3 py-2 font-display text-sm font-medium text-heading transition-colors hover:bg-slate-50 dark:border-slate-800/20 dark:bg-surface-dark dark:text-heading-dark dark:hover:bg-slate-700"
                        aria-label="View PDF"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                      
                      {/* Download Button */}
                      <button
                        onClick={(e) => handleDownload(subItem.url, subItem.title, e)}
                        disabled={isDownloading}
                        className={`flex items-center gap-1.5 rounded-xl border border-slate-200/20 bg-surface px-3 py-2 font-display text-sm font-medium transition-colorshover:bg-slate-50 dark:border-slate-800/20 dark:bg-surface-dark dark:text-heading-dark dark:hover:bg-slate-700"
                           ${
                          isDownloading 
                            ? 'text-gray-400 cursor-not-allowed dark:text-gray-500' 
                            : 'text-heading hover:bg-slate-50 dark:text-heading-dark dark:hover:bg-slate-700'
                        }`}
                        aria-label={isDownloading ? 'Downloading...' : 'Download PDF'}
                      >
                        {isDownloading ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                            <span>Downloading</span>
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                          </>
                        )}
                      </button>
                    </div>
                    
                    {/* External Link Icon (for visual consistency) */}
                    <ExternalLink className="h-4 w-4 text-body/40 dark:text-body-dark/40 mb-2" />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <Search className="h-8 w-8 text-body/40 dark:text-body-dark/40" />
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-heading dark:text-heading-dark">
              No items found
            </h3>
            <p className="font-sans text-body/60 dark:text-body-dark/60">
              Try adjusting your search terms to find what you're looking for.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {pdfViewerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              onClick={closePdfViewer}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed inset-4 z-50 mx-auto my-8 flex max-w-6xl flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-900"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800">
                <h3 className="font-display font-medium text-heading dark:text-heading-dark max-w-[80%] truncate">
                  {currentPdfTitle}
                </h3>
                <button
                  onClick={closePdfViewer}
                  className="rounded-full p-1.5 text-body/60 transition-colors hover:bg-slate-200/80 hover:text-primary dark:text-body-dark/60 dark:hover:bg-slate-700/80"
                  aria-label="Close PDF viewer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* PDF Loading State */}
              {loadingPdf && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                    <p className="font-sans text-body/60 dark:text-body-dark/60">Loading document...</p>
                  </div>
                </div>
              )}
              
              {/* PDF Content */}
              <div className="flex-1 overflow-hidden">
                <iframe
                  src={currentPdfUrl}
                  className="h-full w-full"
                  frameBorder="0"
                  title="PDF document"
                  onLoad={() => setLoadingPdf(false)}
                  style={{ display: loadingPdf ? 'none' : 'block' }}
                />
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between border-t border-slate-200 bg-slate-20 px-6 py-3 dark:border-slate-700 ">
                <button
                  onClick={() => {
                    const a = document.createElement('a')
                    a.href = currentPdfUrl
                    a.download = currentPdfTitle + '.pdf'
                    a.target = '_self'
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                  }}
                  className="flex items-center gap-2 rounded-xl border border-slate-200/20 bg-surface px-4 py-2 font-display text-sm font-medium text-heading transition-colors hover:bg-slate-50 dark:border-slate-800/20 dark:bg-surface-dark dark:text-heading-dark dark:hover:bg-slate-700"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}