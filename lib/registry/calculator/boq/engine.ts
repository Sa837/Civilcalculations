import { BOQInput, RateInput, BOQOptions, BOQResult, BOQResultItem, BOQSummary, WorkCategory } from './schema'

function round(n: number, d = 2) { return Number.isFinite(n) ? parseFloat(n.toFixed(d)) : 0 }

function baseGeomQuantity(i: BOQInput): number {
  if (typeof i.quantity === 'number') return i.quantity
  if (typeof i.volume_m3 === 'number') return i.volume_m3
  if (typeof i.area_m2 === 'number') return i.area_m2
  // Generic geometry
  const L = i.length_m ?? 0
  const B = i.breadth_m ?? 0
  const H = i.height_m ?? 0
  const T = i.thickness_m ?? 0
  // Try volume (L*B*H) then area (L*B) then linear (L)
  const vol = L * B * (H || T)
  if (vol > 0) return vol
  const area = L * (B || H || T)
  if (area > 0) return area
  return L || 0
}

export function deriveQuantity(i: BOQInput): number {
  const base = baseGeomQuantity(i)
  const count = i.count_no ?? 1
  return base * (count > 0 ? count : 1)
}

function rateOf(material: RateInput['material'], rates: RateInput[]): number | undefined {
  const r = rates.find(r => r.material === material)
  return r?.rate
}

export class BOQEngine {
  static calculate(inputs: BOQInput[], rates: RateInput[], options?: BOQOptions): BOQResult {
    const overheads = options?.overheads_percent ?? 10
    const profit = options?.profit_percent ?? 15

    const results: BOQResultItem[] = []

    // Material rate lookups
    const cementRate = rateOf('cement_bag', rates) ?? 0
    const sandRate = rateOf('sand_m3', rates) ?? 0
    const aggRate = rateOf('aggregate_m3', rates) ?? 0
    const steelRate = rateOf('steel_kg', rates) ?? 0
    const bricksRate = rateOf('bricks_no', rates) ?? 0
    const formRate = rateOf('formwork_m2', rates) ?? 0
    const laborUnitRate = rateOf('labor_unit', rates) ?? 0

    // Totals for material summary
    let totalCement = 0, totalSand = 0, totalAgg = 0, totalSteel = 0, totalBricks = 0

    for (const item of inputs) {
      const qty = deriveQuantity(item)
      const wastageFactor = 1 + (item.wastage_percent ?? 0) / 100

      // If per_unit_rate provided, we can short-circuit to a direct pricing mode.
      if (typeof item.per_unit_rate === 'number' && item.per_unit_rate >= 0) {
        const applyOH = item.apply_overheads !== false
        const base = qty * item.per_unit_rate
        const overheadsAmt = applyOH ? base * overheads / 100 : 0
        const profitAmt = (base + overheadsAmt) * profit / 100
        const total = base + overheadsAmt + profitAmt
        const rate_overheads = qty > 0 ? overheadsAmt / qty : overheadsAmt

        results.push({
          item_code: item.item_code,
          description: item.description,
          category: item.category,
          group: item.group,
          unit: item.unit,
          quantity: round(qty, 3),
          rate_material: 0,
          rate_labor: round(item.per_unit_rate, 2),
          rate_overheads: round(rate_overheads, 2),
          rate_total: round(total / (qty || 1), 2),
          amount: round(total, 2),
        })
        continue
      }

      // Material cost from explicit material markers if provided
      const matCost =
        (item.cement_bags ?? 0) * cementRate +
        (item.sand_m3 ?? 0) * sandRate +
        (item.aggregate_m3 ?? 0) * aggRate +
        (item.steel_kg ?? 0) * steelRate +
        (item.bricks_no ?? 0) * bricksRate

      totalCement += item.cement_bags ?? 0
      totalSand += item.sand_m3 ?? 0
      totalAgg += item.aggregate_m3 ?? 0
      totalSteel += item.steel_kg ?? 0
      totalBricks += item.bricks_no ?? 0

      // Labor cost: if labor_qty given, use it; otherwise proportionate to qty
      const laborQty = item.labor_qty ?? qty
      const laborCost = laborQty * laborUnitRate

      // Overheads and profit
      const base = (matCost + laborCost) * wastageFactor
      const overheadsAmt = base * overheads / 100
      const profitAmt = (base + overheadsAmt) * profit / 100
      const total = base + overheadsAmt + profitAmt

      const rate_total = qty > 0 ? total / qty : total
      const rate_overheads = qty > 0 ? overheadsAmt / qty : overheadsAmt

      results.push({
        item_code: item.item_code,
        description: item.description,
        category: item.category,
        group: item.group,
        unit: item.unit,
        quantity: round(qty, 3),
        rate_material: round((matCost * wastageFactor) / (qty || 1), 2),
        rate_labor: round((laborCost * wastageFactor) / (qty || 1), 2),
        rate_overheads: round(rate_overheads, 2),
        rate_total: round(rate_total, 2),
        amount: round(total, 2),
      })
    }

    // Subtotals by category
    const catMap = new Map<WorkCategory, number>()
    for (const r of results) {
      catMap.set(r.category, (catMap.get(r.category) ?? 0) + r.amount)
    }
    const categories = Array.from(catMap.entries()).map(([category, subtotal]) => ({ category, subtotal: round(subtotal, 2) }))
    const grand_total = round(results.reduce((s, r) => s + r.amount, 0), 2)

    const summary: BOQSummary = {
      categories,
      grand_total,
      materials: {
        cement_bags: round(totalCement, 2),
        sand_m3: round(totalSand, 2),
        aggregate_m3: round(totalAgg, 2),
        steel_kg: round(totalSteel, 2),
        bricks_no: round(totalBricks, 0),
      }
    }

    return {
      project: 'Rate Analysis & BOQ Calculator',
      code_used: options?.code ?? 'NBC',
      project_meta: {
        project_name: options?.project_name,
        location: options?.location,
        client: options?.client,
        designer: options?.designer,
        building_type: options?.building_type,
      },
      inputs,
      rates,
      results,
      summary,
      human_summary: `Complete BOQ as per ${options?.code ?? 'NBC'} with Grand Total NPR ${grand_total.toLocaleString()}.`
    }
  }
}
