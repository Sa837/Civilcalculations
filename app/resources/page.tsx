"use client"

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ArrowUp, Star, StarOff, ChevronDown, BookOpen, FileText, Scale, MapPin, Package, PenTool, MoreHorizontal } from 'lucide-react'
import Fuse from 'fuse.js'
import { resources, getCategoryCounts, getRegionCounts } from '../../lib/data/resources'
import { Resource, ResourceCategory, ResourceRegion, SortOption } from '../../lib/types/resources'

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

const regionColors = {
  'Nepal': 'from-red-500 to-orange-500',
  'India': 'from-orange-500 to-yellow-500',
  'US': 'from-blue-500 to-indigo-500',
  'Europe': 'from-green-500 to-teal-500',
  'Other Regions': 'from-gray-500 to-slate-500'
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'All'>('All')
  const [selectedRegion, setSelectedRegion] = useState<ResourceRegion | 'All'>('All')
  const [sortBy, setSortBy] = useState<SortOption>('Newest')
  const [showScrollTop, setShowScrollTop] = useState(false)
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

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categoryCounts = getCategoryCounts()
  const regionCounts = getRegionCounts()

  // Fuse.js configuration for search - includes sub-items
  const fuse = useMemo(() => {
    // Flatten resources with their sub-items for better search
    const searchableItems = resources.flatMap(resource => {
      const baseItem = {
        ...resource,
        searchType: 'main',
        searchableText: `${resource.title} ${resource.description} ${resource.category} ${resource.region}`
      }
      
      if (resource.subItems && resource.subItems.length > 0) {
        const subItems = resource.subItems.map(subItem => ({
          ...subItem,
          parentResource: resource,
          searchType: 'sub',
          searchableText: `${subItem.title} ${resource.title} ${resource.category} ${resource.region}`
        }))
        return [baseItem, ...subItems]
      }
      
      return [baseItem]
    })
    
    return new Fuse(searchableItems, {
      keys: ['searchableText', 'title', 'description'],
      threshold: 0.4,
      includeScore: true
    })
  }, [])

  // Filter and search resources
  const filteredResources = useMemo(() => {
    let filtered = resources

    // Apply search
    if (searchQuery.trim()) {
      const searchResults = fuse.search(searchQuery)
      const matchingResources = new Set()
      
      searchResults.forEach(result => {
        const item = result.item
        if (item.searchType === 'main') {
          matchingResources.add((item as Resource).slug)
        } else if (item.searchType === 'sub') {
          matchingResources.add((item.parentResource as Resource).slug)
        }
      })
      
      filtered = filtered.filter(resource => matchingResources.has(resource.slug))
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(resource => resource.category === selectedCategory)
    }

    // Apply region filter
    if (selectedRegion !== 'All') {
      filtered = filtered.filter(resource => resource.region === selectedRegion)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'Newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'Oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'A-Z':
          return a.title.localeCompare(b.title)
        case 'Z-A':
          return b.title.localeCompare(a.title)
        case 'Favorite':
          const aFav = favorites.has(a.slug)
          const bFav = favorites.has(b.slug)
          if (aFav && !bFav) return -1
          if (!aFav && bFav) return 1
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, selectedRegion, sortBy, favorites, fuse])

  const toggleFavorite = (slug: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(slug)) {
        newFavorites.delete(slug)
      } else {
        newFavorites.add(slug)
      }
      return newFavorites
    })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const categories: (ResourceCategory | 'All')[] = ['All', 'Codes', 'District Rates', 'Rules and Regulations', 'Notes', 'Notices']
  const regions: (ResourceRegion | 'All')[] = ['All', 'Nepal', 'India', 'US', 'Europe', 'Other Regions']

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="mb-6 font-display text-5xl font-bold text-heading dark:text-heading-dark">
          Engineering Resources
        </h1>
        <p className="mx-auto max-w-2xl font-sans text-xl text-body/80 dark:text-body-dark/80">
          Access comprehensive civil engineering resources including codes, standards, 
          regulations, and industry guidelines from around the world.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-12 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-body/40 dark:text-body-dark/40" />
          <input
            type="text"
            placeholder="Search everything: NBC 105, Kathmandu rates, IS 456, ACI 318..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200/20 bg-surface px-12 py-4 font-sans text-body placeholder:text-body/40 shadow-card transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800/20 dark:bg-surface-dark dark:text-body-dark dark:placeholder:text-body-dark/40"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const IconComponent = category === 'All' ? Filter : categoryIcons[category as ResourceCategory]
            const count = category === 'All' ? resources.length : categoryCounts[category as ResourceCategory] || 0
            const isActive = selectedCategory === category
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`group flex items-center gap-2 rounded-xl border px-3 py-2 font-display font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-primary bg-primary/10 text-primary shadow-soft'
                    : 'border-slate-200/20 bg-surface text-heading hover:border-primary/50 hover:bg-primary/5 dark:border-slate-800/20 dark:bg-surface-dark dark:text-heading-dark dark:hover:bg-slate-800/50'
                }`}
              >
                <IconComponent className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{category}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs flex-shrink-0 ${
                  isActive 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-slate-200/60 text-body/60 dark:bg-slate-700/60 dark:text-body-dark/60'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Region Tabs */}
        <div className="flex flex-wrap gap-3">
          {regions.map((region) => {
            const count = region === 'All' ? resources.length : regionCounts[region as ResourceRegion] || 0
            const isActive = selectedRegion === region
            
            return (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`group flex items-center gap-2 rounded-xl border px-4 py-3 font-display font-medium transition-all ${
                  isActive
                    ? 'border-primary bg-primary/10 text-primary shadow-soft'
                    : 'border-slate-200/20 bg-surface text-heading hover:border-primary/50 hover:bg-primary/5 dark:border-slate-800/20 dark:bg-surface-dark dark:text-heading-dark dark:hover:bg-slate-800/50'
                }`}
              >
                <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${
                  region === 'All' ? 'from-gray-400 to-gray-600' : regionColors[region as ResourceRegion]
                }`} />
                <span>{region}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${
                  isActive 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-slate-200/60 text-body/60 dark:bg-slate-700/60 dark:text-body-dark/60'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
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
            {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {/* Resources by Region */}
      <AnimatePresence mode="wait">
        {filteredResources.length > 0 ? (
          <motion.div
            key="resources-by-region"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {(() => {
              // Group resources by region
              const resourcesByRegion = filteredResources.reduce((acc, resource) => {
                if (!acc[resource.region]) {
                  acc[resource.region] = []
                }
                acc[resource.region].push(resource)
                return acc
              }, {} as Record<string, typeof filteredResources>)

              // Define region display order with Nepal first
              const regionOrder = ['Nepal', 'India', 'US', 'Europe', 'Other Regions']
              const orderedRegions = regionOrder.filter(region => resourcesByRegion[region])

              return orderedRegions.map((region) => {
                const regionResources = resourcesByRegion[region]
                return (
                <motion.div
                  key={region}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Region Header */}
                  <div className="flex items-center gap-4">
                    <div className={`h-8 w-8 rounded-full bg-gradient-to-r ${regionColors[region as ResourceRegion]} flex items-center justify-center`}>
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-heading dark:text-heading-dark">
                      {region} Resources
                    </h2>
                    <span className="rounded-full bg-slate-200/60 px-3 py-1 text-sm font-medium text-body/60 dark:bg-slate-700/60 dark:text-body-dark/60">
                      {regionResources.length} resource{regionResources.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Resources Grid for this Region */}
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {regionResources.map((resource) => {
                      const CategoryIcon = categoryIcons[resource.category]
                      const isFavorite = favorites.has(resource.slug)
                      
                      return (
                        <motion.div
                          key={resource.slug}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="group relative rounded-2xl border border-slate-200/20 bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-surface-dark"
                        >
                          {/* Favorite Button */}
                          <button
                            onClick={(e) => toggleFavorite(resource.slug, e)}
                            className={`absolute right-4 top-4 rounded-full p-2 transition-all hover:scale-110 ${
                              isFavorite 
                                ? 'text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20' 
                                : 'text-body/40 hover:bg-slate-100/80 dark:text-body-dark/40 dark:hover:bg-slate-800/80'
                            }`}
                            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            {isFavorite ? (
                              <Star className="h-5 w-5 fill-current" />
                            ) : (
                              <StarOff className="h-5 w-5" />
                            )}
                          </button>

                          {/* Category Icon */}
                          <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${categoryColors[resource.category]} text-white`}>
                            <CategoryIcon className="h-6 w-6" />
                          </div>

                          {/* Content */}
                          <div className="mb-4">
                            <h3 className="mb-2 font-display text-xl font-semibold text-heading group-hover:text-primary transition-colors dark:text-heading-dark">
                              {resource.title}
                            </h3>
                            <p className="font-sans text-body/80 dark:text-body-dark/80 line-clamp-3">
                              {resource.description}
                            </p>
                          </div>

                          {/* Tags */}
                          <div className="mb-4 flex flex-wrap gap-2">
                            <span className={`rounded-full px-3 py-1 text-xs font-medium bg-gradient-to-r ${categoryColors[resource.category]} text-white`}>
                              {resource.category}
                            </span>
                          </div>

                          {/* Sub Items Count */}
                          {resource.subItems && resource.subItems.length > 0 && (
                            <div className="mb-4 text-sm text-body/60 dark:text-body-dark/60">
                              {resource.subItems.length} sub-item{resource.subItems.length !== 1 ? 's' : ''}
                            </div>
                          )}

                          {/* Date */}
                          <div className="text-xs text-body/40 dark:text-body-dark/40">
                            Updated {new Date(resource.updatedAt).toLocaleDateString()}
                          </div>

                          {/* Click Handler */}
                          <a
                            href={`/resources/${resource.slug}`}
                            className="absolute inset-0 rounded-2xl"
                            aria-label={`View ${resource.title}`}
                          />
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
                )
              })
            })()}
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <Search className="h-12 w-12 text-body/40 dark:text-body-dark/40" />
            </div>
            <h3 className="mb-2 font-display text-2xl font-semibold text-heading dark:text-heading-dark">
              No resources found
            </h3>
            <p className="font-sans text-body/60 dark:text-body-dark/60">
              Try adjusting your search terms or filters to find what you&#39;re looking for.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:bg-primary/90 hover:scale-110"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  )
}
