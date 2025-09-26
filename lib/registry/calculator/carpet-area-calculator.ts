// lib/registry/calculator/carpet-area-calculator.ts
import CalculationUtils from '@/lib/registry/utils'

export interface RoomInput {
  name?: string
  length: number // m
  width: number // m
}

export interface CarpetAreaInput {
  rooms: RoomInput[]
  wallThickness?: number // m (for info; deduction typically already in room usable area)
  deductions?: number // m² total deductions (shafts, balconies, ducts), optional
}

export interface CarpetAreaResult {
  totalRoomArea: number // m²
  totalDeductions: number // m²
  carpetArea: number // m²
  human_summary?: string
}

export class CarpetAreaCalculator {
  static getDefaults() {
    return { wallThickness: 0.115, deductions: 0 }
  }

  static calculate(input: CarpetAreaInput): CarpetAreaResult {
    if (!input.rooms || input.rooms.length === 0) {
      throw new Error('Add at least one room')
    }
    const rooms = input.rooms
    let totalRoomArea = 0
    for (const r of rooms) {
      CalculationUtils.validatePositive(r.length, `${r.name || 'Room'} length`)
      CalculationUtils.validatePositive(r.width, `${r.name || 'Room'} width`)
      totalRoomArea += CalculationUtils.calculateRectangularArea(r.length, r.width)
    }
    const totalDeductions = Math.max(0, input.deductions ?? 0)
    const carpetArea = Math.max(0, totalRoomArea - totalDeductions)

    return {
      totalRoomArea,
      totalDeductions,
      carpetArea,
      human_summary: `Total carpet area is ${carpetArea.toFixed(2)} m² after deducting ${(totalDeductions).toFixed(2)} m² from ${(totalRoomArea).toFixed(2)} m² of room areas.`,
    }
  }
}

export default CarpetAreaCalculator
