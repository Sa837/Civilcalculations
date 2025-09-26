"use server"

import { BrickworkCalculator, BrickworkCalculationInput, BrickworkCalculationResult } from '@/lib/registry/calculator/brickwork-calculator'
import { ConcreteCalculator, ConcreteCalculationInput, ConcreteCalculationResult } from '@/lib/registry/calculator/concrete-calculator'
import { EarthworkCalculatorLib, EarthworkInput, EarthworkResult } from '@/lib/registry/calculator/earthwork-calculator'
import { SteelRebarCalculator, SteelRebarInput, SteelRebarResult } from '@/lib/registry/calculator/steel-reinforcement-calculator'
import { FormworkCalculatorLib, FormworkInput, FormworkResult } from '@/lib/registry/calculator/formwork-calculator'
import { RoadPavementCalculatorLib, RoadPavementInput, RoadPavementResult } from '@/lib/registry/calculator/road-pavement-calculator'
import { RoofAreaCalculatorLib, RoofAreaInput, RoofAreaResult } from '@/lib/registry/calculator/roof-area-calculator'
import { StoneMasonryCalculatorLib, StoneMasonryInput, StoneMasonryResult } from '@/lib/registry/calculator/stone-masonry-calculator'
import { TilesCalculatorLib, TilesInput, TilesResult } from '@/lib/registry/calculator/tiles-calculator'
import { calcIsolatedFooting, FootingInput, FootingOutput } from '@/lib/registry/structural/calc/footing'
import { calcRetainingWallCantilever, RetainingWallInput, WallOutput } from '@/lib/registry/structural/calc/wall'
import { calcStairStraight, StairInput, StairOutput } from '@/lib/registry/structural/calc/staircase'

// Server actions to make logic backend-ready without changing UI behavior

export async function calculateBrickwork(input: BrickworkCalculationInput): Promise<BrickworkCalculationResult> {
  // In a real backend, you could persist audits or apply permissions here
  return BrickworkCalculator.calculate(input)
}

export async function calculateConcrete(input: ConcreteCalculationInput): Promise<ConcreteCalculationResult> {
  return ConcreteCalculator.calculate(input)
}

export async function calculateEarthwork(input: EarthworkInput): Promise<EarthworkResult> {
  return EarthworkCalculatorLib.calculate(input)
}

export async function calculateSteelRebar(input: SteelRebarInput): Promise<SteelRebarResult> {
  return SteelRebarCalculator.calculate(input)
}

export async function calculateFormwork(input: FormworkInput): Promise<FormworkResult> {
  return FormworkCalculatorLib.calculate(input)
}

export async function calculateRoadPavement(input: RoadPavementInput): Promise<RoadPavementResult> {
  return RoadPavementCalculatorLib.calculate(input)
}

export async function calculateRoofArea(input: RoofAreaInput): Promise<RoofAreaResult> {
  return RoofAreaCalculatorLib.calculate(input)
}

export async function calculateStoneMasonry(input: StoneMasonryInput): Promise<StoneMasonryResult> {
  return StoneMasonryCalculatorLib.calculate(input)
}

export async function calculateTiles(input: TilesInput): Promise<TilesResult> {
  return TilesCalculatorLib.calculate(input)
}

// Structural calculators (backend-ready) — JSON schema outputs
export async function calculateFootingIsolated(input: FootingInput): Promise<FootingOutput> {
  return calcIsolatedFooting(input)
}

export async function calculateRetainingWallCantilever(input: RetainingWallInput): Promise<WallOutput> {
  return calcRetainingWallCantilever(input)
}

export async function calculateStaircaseStraight(input: StairInput): Promise<StairOutput> {
  return calcStairStraight(input)
}
