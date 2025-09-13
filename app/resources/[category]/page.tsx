"use client"

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowLeft, Star, StarOff, ExternalLink, ChevronDown, BookOpen, FileText, Scale, MapPin, PenTool } from 'lucide-react'
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
  const [sortBy, setSortBy] = useState<SortOption>('Newest')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

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
        case 'Newest':
          return b.title.localeCompare(a.title) // Simple alphabetical for demo
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
              
              return (
                <motion.div
                  key={subItem.url}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative rounded-xl border border-slate-200/20 bg-surface p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-surface-dark"
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
                  <div className="pr-8">
                    <h3 className="mb-2 font-display text-lg font-semibold text-heading group-hover:text-primary transition-colors dark:text-heading-dark">
                      {subItem.title}
                    </h3>
                  </div>

                  {/* External Link Icon */}
                  <div className="mt-3 flex justify-end">
                    <ExternalLink className="h-4 w-4 text-body/40 dark:text-body-dark/40" />
                  </div>

                  {/* Click Handler */}
                  <a
                    href={subItem.url}
                    className="absolute inset-0 rounded-xl"
                    aria-label={`View ${subItem.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
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
    </main>
  )
}
