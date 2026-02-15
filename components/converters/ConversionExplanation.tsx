import { Converter } from '@/lib/registry/converters/types'
import { UnitDef } from '@/lib/convert'
import { Info } from 'lucide-react'

type ConversionExplanationProps = {
  converter: Converter
  fromUnit?: string
  toUnit?: string
  fromValue?: string
  toValue?: string
}

export function ConversionExplanation({
  converter,
  fromUnit = '',
  toUnit = '',
  fromValue = '1',
  toValue = '1',
}: ConversionExplanationProps) {
  // Get the base unit and conversion factors
  const baseUnit = (converter as any)?.baseUnit || ''
  const fromUnitDef = (converter as any)?.units?.find((u: UnitDef) => u.symbol === fromUnit)
  const toUnitDef = (converter as any)?.units?.find((u: UnitDef) => u.symbol === toUnit)

  // Generate example conversion
  const getExampleConversion = () => {
    if (!fromUnitDef || !toUnitDef) return null

    const fromFactor = fromUnitDef.factor || 1
    const toFactor = toUnitDef.factor || 1
    const baseValue = Number(fromValue) * fromFactor
    const convertedValue = baseValue / toFactor

    return (
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-blue-100 dark:border-blue-800 mt-4">
        <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Example Conversion</h4>
        <p className="text-sm mb-2">
          Converting {fromValue} {fromUnit} to {toUnit}:
        </p>
        <code className="block bg-gray-100 dark:bg-slate-700 p-2 rounded text-sm mb-2">
          {fromValue} {fromUnit} → ({fromValue} × {fromFactor}) = {baseValue} {baseUnit}
          <br />
          {baseValue} {baseUnit} ÷ {toFactor} = {convertedValue.toFixed(6)} {toUnit}
        </code>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Where 1 {fromUnit} = {fromFactor} {baseUnit} and 1 {toUnit} = {toFactor} {baseUnit}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8">
      <div className="flex items-start">
        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
        <div>
          <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">
            How {converter.title} Conversion Works
          </h2>
          <div className="prose dark:prose-invert text-blue-700 dark:text-blue-300 text-sm">
            <p className="mb-3">
              Our {converter.title.toLowerCase()} converter uses a precise two-step process through
              the base unit ({baseUnit}) to ensure accurate results across all units.
            </p>

            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-blue-800 dark:text-blue-100">
                  1. Convert to Base Unit
                </h3>
                <p>
                  The input value is first converted to the base unit using the conversion factor
                  for the source unit.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-blue-800 dark:text-blue-100">
                  2. Convert to Target Unit
                </h3>
                <p>
                  The value in the base unit is then converted to the target unit by dividing by the
                  target unit&apos;s factor.
                </p>
              </div>

              {fromUnit && toUnit && fromUnit !== toUnit && getExampleConversion()}

              <div className="text-xs text-blue-600/80 dark:text-blue-300/80 mt-4">
                <p>
                  This conversion method ensures maximum accuracy by minimizing floating-point
                  errors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
