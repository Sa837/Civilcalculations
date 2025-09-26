"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, StarOff } from 'lucide-react'
import { ComponentType } from 'react'

export type ToolCardProps = {
  id: string
  title: string
  description: string
  color: string
  Icon: ComponentType<{ className?: string }>
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}

export function ToolCard({ id, title, description, color, Icon, isFavorite, onToggleFavorite }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl border border-slate-200/20 bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-hover dark:border-slate-800/20 dark:bg-surface-dark"
    >
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onToggleFavorite(id)
        }}
        className={`absolute right-4 top-4 rounded-full p-2 transition-all hover:scale-110 ${isFavorite ? 'text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20' : 'text-body/40 hover:bg-slate-100/80 dark:text-body-dark/40 dark:hover:bg-slate-800/80'}`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? (
          <Star className="h-5 w-5 fill-current" />
        ) : (
          <StarOff className="h-5 w-5" />
        )}
      </button>
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${color} text-white`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="mb-4">
        <h3 className="mb-2 font-display text-xl font-semibold text-heading group-hover:text-primary transition-colors dark:text-heading-dark">
          {title}
        </h3>
        <p className="font-sans text-body/80 dark:text-body-dark/80 line-clamp-3">{description}</p>
      </div>
      <Link href={`/tools/${id}`} className="absolute inset-0 rounded-2xl" aria-label={`Open ${title}`} />
    </motion.div>
  )
}
