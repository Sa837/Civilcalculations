"use client"

import { useEffect, useRef, useState } from 'react'

function formatArea(m2: number) {
  const ft2 = m2 * 10.7639
  const acre = m2 / 4046.8564224
  const hectare = m2 / 10000
  return { m2, ft2, acre, hectare }
}

function formatLength(m: number) {
  const ft = m * 3.28084
  const km = m / 1000
  const mi = m / 1609.344
  return { m, ft, km, mi }
}

export function PlotMapClient() {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastArea, setLastArea] = useState<ReturnType<typeof formatArea> | null>(null)
  const [lastLength, setLastLength] = useState<ReturnType<typeof formatLength> | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Array<{ display_name: string; lat: string; lon: string }>>([])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any>(null)
  const drawnItemsRef = useRef<any>(null)
  const pinsLayerRef = useRef<any>(null)
  const currentBaseRef = useRef<'osm' | 'sat' | 'carto' | 'hot'>('sat')
  const currentBaseLayerRef = useRef<any>(null)

  const injectCss = (id: string, href: string) => {
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = href
      document.head.appendChild(link)
    }
  }

  const injectScript = (id: string, src: string) =>
    new Promise<void>((resolve, reject) => {
      if (document.getElementById(id)) return resolve()
      const s = document.createElement('script')
      s.id = id
      s.src = src
      s.async = true
      s.onload = () => resolve()
      s.onerror = () => reject(new Error(`Failed to load ${src}`))
      document.body.appendChild(s)
    })

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        injectCss('leaflet-css', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css')
        injectCss('leaflet-draw-css', 'https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.css')

        const L = await import('leaflet')
        await injectScript('leaflet-draw-js', 'https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.js')
        await injectScript('turf-js', 'https://unpkg.com/@turf/turf@7.0.0/turf.min.js')
        if (!mounted) return

        const osm = (L as any).tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' })
        const esriSat = (L as any).tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: 'Tiles © Esri' })
        const cartoVoyager = (L as any).tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: '© OpenStreetMap, © CARTO' })
        const osmHot = (L as any).tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap HOT' })

        const map = (L as any).map(containerRef.current!, { center: [27.7172, 85.3240], zoom: 13, layers: [esriSat], maxZoom: 19 })
        mapRef.current = map
        currentBaseRef.current = 'sat'
        currentBaseLayerRef.current = esriSat

        const baseLayers = { 'Esri Satellite': esriSat, OSM: osm, 'Carto Voyager': cartoVoyager, 'OSM HOT': osmHot }
        const drawnItems = new (L as any).FeatureGroup()
        const pinsLayer = new (L as any).FeatureGroup()
        drawnItemsRef.current = drawnItems
        pinsLayerRef.current = pinsLayer
        map.addLayer(drawnItems)
        map.addLayer(pinsLayer)

        ;(L as any).control.layers(baseLayers, { Drawings: drawnItems, Pins: pinsLayer }).addTo(map)
        ;(L as any).control.scale().addTo(map)
        map.on('tileerror', () => {
          setError('Some tiles are not available at this zoom for the current base. Try Satellite/Map/Voyager/HOT.')
          window.setTimeout(() => setError(null), 4000)
        })

        map.on('contextmenu', (e: any) => {
          const m = (L as any).marker(e.latlng)
          pinsLayer.addLayer(m)
        })

        const drawControl = new (L as any).Control.Draw({
          edit: { featureGroup: drawnItems },
          draw: { polygon: true, polyline: true, rectangle: false, circle: false, marker: false, circlemarker: false },
        })
        map.addControl(drawControl)

        map.on((L as any).Draw.Event.CREATED, function (e: any) {
          const layer = e.layer
          drawnItems.addLayer(layer)
          const gj = layer.toGeoJSON()
          try {
            if (gj.geometry.type === 'Polygon') {
              const areaM2 = (window as any).turf.area(gj)
              setLastArea(formatArea(areaM2))
              const perimeter = (window as any).turf.length((window as any).turf.polygonToLine(gj), { units: 'meters' })
              setLastLength(formatLength(perimeter))
            } else if (gj.geometry.type === 'LineString') {
              const lenM = (window as any).turf.length(gj, { units: 'meters' })
              setLastLength(formatLength(lenM))
              setLastArea(null)
            }
          } catch (err) {
            console.warn('Measure error', err)
          }
        })

        setReady(true)
      } catch (e: any) {
        console.warn('Leaflet or plugins not installed; map disabled.', e)
        setError("Leaflet dependencies missing. Please install 'leaflet', 'leaflet-draw', and '@turf/turf'.")
        setReady(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const addPin = async () => {
    const map = mapRef.current
    const L = await import('leaflet')
    if (map) {
      const center = map.getCenter()
      const m = (L as any).marker(center)
      pinsLayerRef.current.addLayer(m)
    }
  }

  const clearAll = () => {
    if (drawnItemsRef.current) drawnItemsRef.current.clearLayers()
    if (pinsLayerRef.current) pinsLayerRef.current.clearLayers()
    setLastArea(null)
    setLastLength(null)
  }

  const exportGeoJSON = () => {
    const features: any[] = []
    if (drawnItemsRef.current) {
      drawnItemsRef.current.eachLayer((layer: any) => {
        features.push(layer.toGeoJSON())
      })
    }
    if (pinsLayerRef.current) {
      pinsLayerRef.current.eachLayer((layer: any) => {
        features.push(layer.toGeoJSON())
      })
    }
    const geojson = { type: 'FeatureCollection', features }
    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'map-data.geojson'
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportCSV = () => {
    let rows: string[] = ['type,lat,lon']
    const push = (type: string, lat: number, lon: number) => rows.push(`${type},${lat.toFixed(6)},${lon.toFixed(6)}`)
    if (drawnItemsRef.current) {
      drawnItemsRef.current.eachLayer((layer: any) => {
        const gj = layer.toGeoJSON()
        if (gj.geometry.type === 'Polygon') {
          const coords = gj.geometry.coordinates[0]
          coords.forEach((c: any) => push('polygon', c[1], c[0]))
        } else if (gj.geometry.type === 'LineString') {
          const coords = gj.geometry.coordinates
          coords.forEach((c: any) => push('line', c[1], c[0]))
        }
      })
    }
    if (pinsLayerRef.current) {
      pinsLayerRef.current.eachLayer((layer: any) => {
        const gj = layer.toGeoJSON()
        if (gj.geometry.type === 'Point') {
          const [lon, lat] = gj.geometry.coordinates
          push('pin', lat, lon)
        }
      })
    }
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'map-data.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const doSearch = async () => {
    if (!searchQuery.trim()) return
    try {
      const q = encodeURIComponent(searchQuery.trim())
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`)
      const data = await res.json()
      if (data && data[0]) {
        const lat = parseFloat(data[0].lat)
        const lon = parseFloat(data[0].lon)
        const L = await import('leaflet')
        const map = mapRef.current
        map.setView([lat, lon], 16)
        const marker = (L as any).marker([lat, lon])
        pinsLayerRef.current.addLayer(marker)
      }
    } catch (e) {
      console.warn('Search failed', e)
    }
  }

  // Live suggestions for search
  useEffect(() => {
    const t = setTimeout(async () => {
      const q = searchQuery.trim()
      if (!q) {
        setSuggestions([])
        return
      }
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5`
        const res = await fetch(url)
        const data = await res.json()
        setSuggestions(Array.isArray(data) ? data : [])
      } catch (e) {
        setSuggestions([])
      }
    }, 300)
    return () => clearTimeout(t)
  }, [searchQuery])

  const selectSuggestion = async (s: { display_name: string; lat: string; lon: string }) => {
    try {
      const lat = parseFloat(s.lat)
      const lon = parseFloat(s.lon)
      const L = await import('leaflet')
      const map = mapRef.current
      map.setView([lat, lon], 17)
      const marker = (L as any).marker([lat, lon])
      pinsLayerRef.current.addLayer(marker)
      setSuggestions([])
      setSearchQuery(s.display_name)
    } catch {}
  }

  return (
    <div className="rounded-2xl border border-slate-200/20 bg-surface p-4 dark:border-slate-700 dark:bg-surface-dark">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search place or address..."
            className="w-72 rounded-xl border border-slate-200/20 bg-white/70 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
          {suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-slate-200/40 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => selectSuggestion(s)}
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  {s.display_name}
                </button>
              ))}
            </div>
          )}
        </div>
        <button onClick={doSearch} className="rounded-xl bg-primary px-3 py-2 text-sm font-display text-white">Search</button>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200/20 bg-white/70 p-1 dark:border-slate-700 dark:bg-slate-800">
          <button onClick={async () => {
            const L = await import('leaflet')
            const map = mapRef.current
            if (currentBaseLayerRef.current) map.removeLayer(currentBaseLayerRef.current)
            const layer = (L as any).tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: 'Tiles © Esri' })
            layer.addTo(map)
            currentBaseRef.current = 'sat'
            currentBaseLayerRef.current = layer
          }} className={`rounded-lg px-3 py-1 text-sm ${currentBaseRef.current === 'sat' ? 'bg-primary text-white' : ''}`}>Satellite</button>
          <button onClick={async () => {
            const L = await import('leaflet')
            const map = mapRef.current
            if (currentBaseLayerRef.current) map.removeLayer(currentBaseLayerRef.current)
            const layer = (L as any).tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' })
            layer.addTo(map)
            currentBaseRef.current = 'osm'
            currentBaseLayerRef.current = layer
          }} className={`rounded-lg px-3 py-1 text-sm ${currentBaseRef.current === 'osm' ? 'bg-primary text-white' : ''}`}>Map</button>
          <button onClick={async () => {
            const L = await import('leaflet')
            const map = mapRef.current
            if (currentBaseLayerRef.current) map.removeLayer(currentBaseLayerRef.current)
            const layer = (L as any).tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: '© OpenStreetMap, © CARTO' })
            layer.addTo(map)
            currentBaseRef.current = 'carto'
            currentBaseLayerRef.current = layer
          }} className={`rounded-lg px-3 py-1 text-sm ${currentBaseRef.current === 'carto' ? 'bg-primary text-white' : ''}`}>Voyager</button>
          <button onClick={async () => {
            const L = await import('leaflet')
            const map = mapRef.current
            if (currentBaseLayerRef.current) map.removeLayer(currentBaseLayerRef.current)
            const layer = (L as any).tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap HOT' })
            layer.addTo(map)
            currentBaseRef.current = 'hot'
            currentBaseLayerRef.current = layer
          }} className={`rounded-lg px-3 py-1 text-sm ${currentBaseRef.current === 'hot' ? 'bg-primary text-white' : ''}`}>OSM HOT</button>
        </div>
        <button onClick={async () => {
          if (!navigator.geolocation) return
          navigator.geolocation.getCurrentPosition(async (pos) => {
            const L = await import('leaflet')
            const map = mapRef.current
            const latlng = [pos.coords.latitude, pos.coords.longitude] as any
            map.setView(latlng, 17)
            const marker = (L as any).marker(latlng)
            marker.addTo(map)
          })
        }} className="rounded-xl border px-3 py-2 text-sm">Locate Me</button>
        <button onClick={addPin} className="rounded-xl border px-3 py-2 text-sm">Add Pin (Center)</button>
        <button onClick={clearAll} className="rounded-xl border px-3 py-2 text-sm">Clear Map</button>
        <button onClick={exportGeoJSON} className="rounded-xl border px-3 py-2 text-sm">Export GeoJSON</button>
        <button onClick={exportCSV} className="rounded-xl border px-3 py-2 text-sm">Export CSV</button>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      <div className="mb-2 text-xs text-body/60 dark:text-body-dark/60">Tips: Right-click to drop a pin. While drawing, use backspace to undo last point. Use Edit/Remove controls to refine shapes.</div>
      <div ref={containerRef} className="h-[540px] w-full rounded-xl bg-slate-200 dark:bg-slate-800" />

      {(lastArea || lastLength) && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {lastArea && (
            <div className="rounded-xl border border-slate-200/20 bg-white/70 p-3 text-sm dark:border-slate-700 dark:bg-slate-800">
              <div className="font-display font-semibold">Area</div>
              <div>m²: {lastArea.m2.toFixed(2)}</div>
              <div>ft²: {lastArea.ft2.toFixed(2)}</div>
              <div>acres: {lastArea.acre.toFixed(4)}</div>
              <div>hectares: {lastArea.hectare.toFixed(4)}</div>
            </div>
          )}
          {lastLength && (
            <div className="rounded-xl border border-slate-200/20 bg-white/70 p-3 text-sm dark:border-slate-700 dark:bg-slate-800">
              <div className="font-display font-semibold">Perimeter/Length</div>
              <div>m: {lastLength.m.toFixed(2)}</div>
              <div>ft: {lastLength.ft.toFixed(2)}</div>
              <div>km: {lastLength.km.toFixed(4)}</div>
              <div>mi: {lastLength.mi.toFixed(4)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
