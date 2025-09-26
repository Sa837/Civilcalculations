import { BBSInputItem, BBSResult, BBSResultItem, BBSOptions, DesignCode } from './schema'
import { CalculationUtils, unitWeightKgPerM, defaultHookLengthM, totalBendAllowanceM, suggestLapLengthM } from './utils'

export class BBSEngine {
  static calculate(inputs: BBSInputItem[], options?: BBSOptions): BBSResult {
    const code: DesignCode = options?.code ?? 'NBC'
    const defaultStock = options?.stock_length_m ?? 12
    const defaultCover = options?.default_cover_mm ?? 25
    const defaultWastage = options?.wastage_percent_default ?? 3

    const results: BBSResultItem[] = []
    const complianceNotes = new Set<string>()
    const barCounters: Record<string, number> = {}

    for (const item of inputs) {
      const dMm = item.bar_diameter_mm
      const cover = item.cover_mm ?? defaultCover
      const clearLen = item.clear_length_m
      // Development length defaults per chosen code (simplified): tension ~ 40d NBC/IS; ACI ~ 40d placeholder
      const defaultLdM = (dMm / 1000) * 40
      const devLen = item.development_length_m ?? defaultLdM
      const bends = item.bend_angles ?? []
      const stockLen = item.stock_length_m ?? defaultStock
      const wperc = item.wastage_percent ?? defaultWastage

      const hookEach = defaultHookLengthM(item.hook_type as any, dMm, item.hook_length_mm)
      const hookTotal = hookEach > 0 ? hookEach * 2 : 0
      const bendAllowance = totalBendAllowanceM(bends, dMm)
      const endDeduct = (2 * cover) / 1000

      let baseCutLen = clearLen - endDeduct + hookTotal + bendAllowance + devLen

      let lapLenUsed = item.lap_length_m ?? 0
      if (baseCutLen > stockLen) {
        const lap = suggestLapLengthM(dMm)
        const barsNeeded = Math.ceil(baseCutLen / stockLen)
        const splices = Math.max(0, barsNeeded - 1)
        lapLenUsed += splices * lap
        baseCutLen = clearLen - endDeduct + hookTotal + bendAllowance + devLen + lapLenUsed
      }

      const cuttingLen = baseCutLen
      const totalLen = cuttingLen * item.num_bars
      const uw = unitWeightKgPerM(dMm)
      const totalWtBare = uw * totalLen
      const totalWt = totalWtBare * (1 + wperc / 100)
      const rate = item.steel_rate_per_kg ?? 0
      const totalCost = rate > 0 ? totalWt * rate : undefined

      const hook_details = item.hook_type ? `${item.hook_type}°${hookEach>0?` - ${hookEach.toFixed(3)} m each end`:''}` : undefined

      // Generate bar mark per member (e.g., B1-01)
      const memberKey = item.member_id || 'MEM'
      const nextIdx = (barCounters[memberKey] = (barCounters[memberKey] ?? 0) + 1)
      const bar_mark = `${memberKey}-${String(nextIdx).padStart(2,'0')}`

      // Determine shape code (user preference takes priority, otherwise derive)
      let shape_code: BBSResultItem['shape_code'] = item.shape_preference ?? 'straight'
      if (!item.shape_preference) {
        if ((item.hook_type && item.hook_type !== 'custom') || hookEach > 0) shape_code = 'L'
        if (bends.length >= 2) shape_code = 'U'
        if (bends.some(a=>a>=30 && a<=60)) shape_code = 'crank'
        if (item.bar_type === 'Stirrups/Ties') shape_code = 'stirrup'
      }

      // Simple compliance checks
      const itemNotes: string[] = []
      if (cover < defaultCover) {
        const note = `Cover provided (${cover} mm) is less than default (${defaultCover} mm)`
        itemNotes.push(note)
        complianceNotes.add(note)
      }
      // Spacing check (very simplified): min spacing >= max(25 mm, 1.5d)
      if (item.spacing_mm !== undefined) {
        const minSpacing = Math.max(25, 1.5 * dMm)
        if (item.spacing_mm < minSpacing) {
          const note = `Spacing (${item.spacing_mm} mm) < recommended min (${Math.round(minSpacing)} mm)`
          itemNotes.push(note)
          complianceNotes.add(note)
        }
      }

      results.push({
        bar_mark,
        shape_code,
        member_id: item.member_id,
        bar_type: item.bar_type,
        bar_diameter_mm: item.bar_diameter_mm,
        num_bars: item.num_bars,
        cutting_length_m: CalculationUtils.roundTo(cuttingLen, 3),
        total_length_m: CalculationUtils.roundTo(totalLen, 3),
        unit_weight_kg_per_m: CalculationUtils.roundTo(uw, 3),
        total_weight_kg: CalculationUtils.roundTo(totalWt, 2),
        hook_details,
        lap_length_m: lapLenUsed ? CalculationUtils.roundTo(lapLenUsed, 3) : undefined,
        total_cost: totalCost ? CalculationUtils.roundTo(totalCost, 2) : undefined,
        remarks: wperc ? `${wperc}% wastage included` : undefined,
        notes: [ `${wperc}% wastage included`, ...itemNotes ]
      })
    }

    const summary = results.reduce((acc, r) => {
      acc.total_steel_weight_kg += r.total_weight_kg
      acc.total_bars += r.num_bars
      acc.grand_total_length_m += r.total_length_m
      acc.total_cost = (acc.total_cost ?? 0) + (r.total_cost ?? 0)
      return acc
    }, { total_steel_weight_kg: 0, total_bars: 0, grand_total_length_m: 0, total_cost: 0 as number | undefined })

    // Aggregate by diameter
    const byDiameterMap = new Map<number, { bar_diameter_mm: number, total_length_m: number, total_weight_kg: number, count: number }>()
    for (const r of results) {
      const ent = byDiameterMap.get(r.bar_diameter_mm) ?? { bar_diameter_mm: r.bar_diameter_mm, total_length_m: 0, total_weight_kg: 0, count: 0 }
      ent.total_length_m += r.total_length_m
      ent.total_weight_kg += r.total_weight_kg
      ent.count += r.num_bars
      byDiameterMap.set(r.bar_diameter_mm, ent)
    }
    const by_diameter = Array.from(byDiameterMap.values()).map(v=>({
      bar_diameter_mm: v.bar_diameter_mm,
      total_length_m: CalculationUtils.roundTo(v.total_length_m, 2),
      total_weight_kg: CalculationUtils.roundTo(v.total_weight_kg, 2),
      count: v.count,
    }))

    const human_summary = `Total steel required is ${CalculationUtils.roundTo(summary.total_steel_weight_kg/1000, 2)} tonnes across ${summary.total_bars} bars.`

    return {
      project: 'BBS Calculator',
      code_used: code,
      project_meta: options ? {
        project_name: options.project_name,
        location: options.location,
        designer: options.designer,
      } : undefined,
      inputs,
      results,
      summary: {
        total_steel_weight_kg: CalculationUtils.roundTo(summary.total_steel_weight_kg, 1),
        total_bars: summary.total_bars,
        grand_total_length_m: CalculationUtils.roundTo(summary.grand_total_length_m, 2),
        total_cost: summary.total_cost ? CalculationUtils.roundTo(summary.total_cost, 2) : undefined,
        by_diameter,
      },
      human_summary,
      compliance_notes: Array.from(complianceNotes)
    }
  }
}
