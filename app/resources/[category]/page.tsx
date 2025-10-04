/* eslint-disable react-hooks/rules-of-hooks */
"use client"


import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowLeft, Star, StarOff, ExternalLink, ChevronDown, BookOpen, FileText, Scale, MapPin, PenTool, Download, Eye, X, Share2, Copy, Check, AlertCircle } from 'lucide-react'
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
  const [downloading, setDownloading] = useState<Set<string>>(new Set())
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
 const safeFileName = (title: string) =>  `${title.replace(/[^\w\s-]/gi, '').trim().replace(/\s+/g, '_')}.pdf`
 const handleDownload = async (
  url: string,
  title: string,
  setDownloading: React.Dispatch<React.SetStateAction<Set<string>>>,
  event?: React.MouseEvent
) => {
  event?.preventDefault()
  event?.stopPropagation()

  setDownloading(prev => new Set([...prev, url]))
  const filename = safeFileName(title)

  try {
    // --- Attempt automatic download via fetch ---
    try {
      const response = await fetch(url)
      if (response.ok) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = filename
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 200)
        return
      }
    } catch (err) {
      console.warn('Fetch failed (likely CORS):', err)
    }

    // --- XHR fallback ---
    try {
      const blob = await xhrFetchAsPromise(url)
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 200)
      return
    } catch (err) {
      console.warn('XHR failed (likely CORS):', err)
    }

    // --- Popup fallback for manual download ---
    const modal = document.createElement('div')
    modal.innerHTML = `
      <div style="
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:9999;
        font-family: 'Inter', Arial, sans-serif;
      ">
        <div style="
          background: #fff; padding: 25px 30px; border-radius: 12px; max-width: 420px; width: 90%;
          text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        ">
          <h2 style="margin-bottom:15px; font-size:1.4rem; color:#111;">Manual Download Required</h2>
          <p style="margin-bottom:px; font-size:1rem; color:#333;">
            Open PDF in a new tab and save it manually. 
            Automatically redirecting to new tab in 20 seconds.
          </p>
          <div style="display:flex; justify-content:center; gap:10px;">
            <a href="${url}" target="_blank" style="
              padding: 8px 18px; background:#0070f3; color:white; border-radius:6px; text-decoration:none;
              font-weight:500; font-size:0.95rem;
            ">Open PDF</a>
            <button id="close-modal-btn" style="
              padding: 8px 18px; background:#e0e0e0; color:#111; border:none; border-radius:6px;
              font-weight:500; font-size:0.95rem; cursor:pointer;
            ">Close</button>
          </div>
        </div>
      </div>
    `
    document.body.appendChild(modal)

    const closeBtn = modal.querySelector('#close-modal-btn') as HTMLElement
    closeBtn.onclick = () => { if (document.body.contains(modal)) document.body.removeChild(modal) }

    // Open in new tab automatically
    // Open in new tab after ~20 seconds
setTimeout(() => window.open(url, '_blank', 'noopener'), 20000)


  } finally {
    setDownloading(prev => {
      const newSet = new Set(prev)
      newSet.delete(url)
      return newSet
    })
  }
} 
 
 
 
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

  // PROPER DOWNLOAD FUNCTION - Forces actual download
// --- Safe file name for download ---


// --- XHR helper for fallback download ---
const xhrFetchAsPromise = (url: string, timeoutMs = 30000) =>
  new Promise<Blob>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    const to = setTimeout(() => { xhr.abort(); reject(new Error('XHR timeout')) }, timeoutMs)

    xhr.onload = () => { clearTimeout(to); xhr.status === 200 ? resolve(xhr.response) : reject(new Error(`XHR status ${xhr.status}`)) }
    xhr.onerror = () => { clearTimeout(to); reject(new Error('XHR network error')) }
    xhr.send()
  })

// --- Universal download handler ---




  // Open PDF in new tab (replaces quick view)
  const handleOpenInNewTab = (url: string, title: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    window.open(url, '_blank')
  }

  // Close PDF viewer
  const closePdfViewer = () => {
    setPdfViewerOpen(false)
    setCurrentPdfUrl('')
    setCurrentPdfTitle('')
    document.body.style.overflow = 'auto'
  }

  // Copy URL to clipboard
  const copyToClipboard = async (url: string, event?: React.MouseEvent) => {
    event?.preventDefault()
    event?.stopPropagation()
    
    try {
      await navigator.clipboard.writeText(url)
      setCopiedUrl(url)
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch (err) {
      // Fallback
      const textArea = document.createElement('textarea')
      textArea.value = url
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopiedUrl(url)
        setTimeout(() => setCopiedUrl(null), 2000)
      } catch (fallbackErr) {
        console.error('Failed to copy:', fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  // Share URL
  const shareUrl = async (url: string, title: string, event?: React.MouseEvent) => {
    event?.preventDefault()
    event?.stopPropagation()
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this resource: ${title}`,
          url: url,
        })
      } catch (err) {
        console.log('Share cancelled or failed')
      }
    } else {
      await copyToClipboard(url)
    }
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
            The category you&#39;re looking for doesn&#39;t exist.
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
    <div className="min-h-screen bg-background dark:bg-background-dark">
      {/* Top Ad Banner */}
      <div className="w-full dark: py-3">
        <div className="mx-auto max-w-6xl px-4">
          <div className="h-20 flex items-center justify-center rounded-lg bg-slate-200/70 dark:bg-slate-700/50">
            <span className="text-sm text-slate-500 dark:text-slate-400"><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2472384896413922"
     crossorigin="anonymous"></script></span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Right Sidebar Ad */}
          <div className="lg:w-72 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24 rounded-xl bg-slate-100 dark:bg-slate-800 p-4 h-96 flex items-center justify-center">
              <span className="text-sm text-slate-500 dark:text-slate-400"><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2472384896413922"
     crossorigin="anonymous"></script></span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
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
              transition={{ duration: 0.3, ease: "easeOut" }}
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
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
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
                      <option value="All">All</option>
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
                  transition={{ duration: 0.3 }}
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-2"
                >
                  {filteredSubItems.map((subItem, index) => {
                    const isFavorite = favorites.has(subItem.url)
                    const isDownloading = downloading.has(subItem.url)
                    const isCopied = copiedUrl === subItem.url
                    
                    return (
                      <motion.div
                        key={subItem.url}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                        className="group relative flex flex-col rounded-xl border border-slate-200/20 bg-surface p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-surface-dark"
                      >
                        {/* Favorite Button */}
                        <button
                          onClick={(e) => toggleFavorite(subItem.url, e)}
                          className={`absolute right-4 top-4 rounded-full p-1.5 transition-all hover:scale-110 ${
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
                        <div className="pr-10 flex-grow">
                          <h3 className="mb-3 font-display text-lg font-semibold text-heading group-hover:text-primary transition-colors dark:text-heading-dark">
                            {subItem.title}
                          </h3>
                          {/* Clear indicator that this will open in new tab */}
                          <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                            <AlertCircle className="h-3 w-3" />
                            <span>Opens in new tab</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-5 flex justify-between items-center">
                          <div className="flex gap-2">
                            {/* Open in New Tab Button - Clear label */}
                            <button
                              onClick={(e) => handleOpenInNewTab(subItem.url, subItem.title, e)}
                              className="flex items-center gap-1.5 rounded-xl border border-slate-200/20 bg-surface px-3 py-2 font-display text-sm font-medium text-heading transition-colors hover:bg-slate-50 dark:border-slate-800/20 dark:bg-surface-dark dark:text-heading-dark dark:hover:bg-slate-700"
                              aria-label="Open in new tab"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Open
                            </button>
                            
                            {/* Download Button */}
                           <button
  onClick={(e) => handleDownload(subItem.url, subItem.title, setDownloading, e)}
  disabled={isDownloading}
  className={`flex items-center gap-1.5 rounded-xl border border-slate-200/20 px-3 py-2 font-display text-sm font-medium transition-colors ${
    isDownloading 
      ? 'text-gray-400 cursor-not-allowed dark:text-gray-500' 
      : 'text-heading hover:bg-slate-50 dark:text-heading-dark dark:hover:bg-slate-700'
  }`}
>
  {isDownloading ? (
    <>
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      <span>Saving...</span>
    </>
  ) : (
    <>
      <Download className="h-4 w-4" />
      <span>Download</span>
    </>
  )}
</button>

                          </div>
                          
                          {/* Right side buttons */}
                          <div className="flex gap-2 items-center">
                            {/* Copy Button */}
                            <button
                              onClick={(e) => copyToClipboard(subItem.url, e)}
                              className={`p-1.5 rounded-full transition-colors ${
                                isCopied 
                                  ? 'text-green-500 bg-green-50 dark:bg-green-900/20' 
                                  : 'text-body/40 hover:bg-slate-100/80 dark:text-body-dark/40 dark:hover:bg-slate-800/80'
                              }`}
                              aria-label={isCopied ? 'Copied!' : 'Copy URL'}
                            >
                              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </button>
                            
                            {/* Share Button */}
                            <button
                              onClick={(e) => shareUrl(subItem.url, subItem.title, e)}
                              className="p-1.5 rounded-full text-body/40 hover:bg-slate-100/80 dark:text-body-dark/40 dark:hover:bg-slate-800/80"
                              aria-label="Share resource"
                            >
                              <Share2 className="h-4 w-4" />
                            </button>
                          </div>
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
                  transition={{ duration: 0.3 }}
                  className="text-center py-12"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <Search className="h-8 w-8 text-body/40 dark:text-body-dark/40" />
                  </div>
                  <h3 className="mb-2 font-display text-xl font-semibold text-heading dark:text-heading-dark">
                    No items found
                  </h3>
                  <p className="font-sans text-body/60 dark:text-body-dark/60">
                    Try adjusting your search terms to find what you&#39;re looking for.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <div className="w-full dark: py-6 mt-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="h-24 flex items-center justify-center rounded-lg bg-slate-200/70 dark:bg-slate-700/50">
            <span className="text-sm text-slate-500 dark:text-slate-400"><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2472384896413922"
     crossorigin="anonymous"></script></span>
          </div>
        </div>
      </div>
    </div>
  )
}
