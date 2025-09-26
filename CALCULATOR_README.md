# Civil Calculation - Calculator Documentation

## Overview
This application provides professional-grade civil engineering calculators with accurate unit conversions and industry-standard formulas.

## Calculators

### 1. Concrete Calculator — Developer Friendly
- **Purpose**: Calculate concrete volume and material requirements
- **Features**: 
  - Multiple mix ratios (M10, M15, M20)
  - Wastage factor consideration
  - Unit conversion (Metric/Imperial)
  - Developer-friendly formulas display

### 2. Brickwork Calculator
- **Purpose**: Calculate bricks, mortar volume, cement & sand quantity
- **Features**:
  - Wall dimension calculations
  - Brick size specifications (mm/in)
  - Mortar mix ratios (1:6, 1:4)
  - Wastage factor consideration
  - Step-by-step calculation display
  - Developer formulas panel

### 3. Bar Bending Schedule (BBS) Calculator
- Purpose: Compute cutting lengths, total lengths, unit weights, and total weights for reinforcement bars and produce a printable/exportable schedule.
- Files:
  - Logic: `lib/registry/calculator/bbs-calculator.ts`
  - Types: `lib/registry/calculator/bbs-schema.ts`
  - UI Card: `components/calculators/bbs-calculator.tsx` (rendered under `components/calculators/steel-reinforcement-calculator.tsx`)
- Input (per row):
  - `element_type`: 'beam' | 'column' | 'slab' | 'footing' | 'wall' | 'stair' | 'custom'
  - `member_id`: string
  - `bar_type`: 'Main' | 'Secondary' | 'Stirrups/Ties' | 'Distribution' | 'Extra'
  - `bar_diameter_mm`: number (6, 8, 10, 12, 16, 20, 25, 32)
  - `num_bars`: number
  - `clear_length_m`: number
  - Optional: `spacing_mm`, `hook_type` ('90'|'135'|'180'|'custom'), `hook_length_mm`, `bend_angles` (e.g., [90,45]), `development_length_m`, `cover_mm`, `wastage_percent` (default 3), `lap_length_m`, `stock_length_m` (default 12)
- Output JSON:
```
{
  project: 'BBS Calculator',
  inputs: BBSInputItem[],
  results: BBSResultItem[],
  summary: { total_steel_weight_kg, total_bars, grand_total_length_m },
  human_summary: string
}
```
- Core formulas:
  - Cutting Length (m) = Clear Length − cover deductions + hook lengths + bend allowances + development length + lap length
  - Hook length defaults: 90°=9d, 135°=12d, 180°=16d (d in meters). Custom supported.
  - Bend allowance (simplified): 45°→0.5d; 90°→1.0d; 135°→1.5d; 180°→2.0d per bend.
  - Development length default (tension): 40d for Main bars if not provided.
  - Auto lap if cutting length > stock: adds (ceil(L/stock)-1) × (40d).
  - Unit weight (kg/m) = d² / 162 (d in mm).
  - Wastage: applied to cutting length (default 3%).
- Example (Beam B1):
```
Input: { member_id: 'Beam B1', bar_type: 'Main', bar_diameter_mm: 16, num_bars: 10, clear_length_m: 5.0, hook_type: '135' }
Hook length each end = 12d = 12 × 0.016 = 0.192 m → both ends = 0.384 m
Cutting length ≈ 5.000 + 0.384 = 5.384 m
Total length ≈ 5.384 × 10 = 53.84 m
Unit weight = 16²/162 ≈ 1.580 kg/m
Total weight ≈ 1.580 × 53.84 ≈ 85.1 kg
```

## Unit Conversions

### Length Conversions
- **Metric to Imperial**: 1 meter = 3.28084 feet
- **Imperial to Metric**: 1 foot = 0.3048 meters

### Brick Dimensions
- **Metric**: Input in millimeters (mm), converted to meters for calculations
- **Imperial**: Input in inches (in), converted to millimeters then to meters
  - Conversion: 1 inch = 25.4 millimeters

## Material Densities

### Concrete Calculator
- **Cement**: 1440 kg/m³
- **Sand**: 1450 kg/m³
- **Aggregate**: 1500 kg/m³
- **Cement Bag**: 50 kg per bag

### Brickwork Calculator
- **Cement**: 1440 kg/m³
- **Sand**: 1450 kg/m³
- **Cement Bag**: 50 kg per bag

## Mortar Mix Ratios

### Brickwork Calculator
- **Non-load bearing**: 1:6 (Cement:Sand)
- **Standard load bearing**: 1:4 (Cement:Sand)

## Calculation Formulas

All formulas are implemented exactly as specified in the requirements and are available in the "Developer Formulas" panel for copy-paste use. The formulas use:

1. **Internal calculations**: Always in meters (m) and kilograms (kg)
2. **Unit conversions**: Applied at input/output boundaries
3. **Rounding rules**:
   - Bricks: Round up to nearest integer
   - Weights: Round to 1 decimal place
   - Cement bags: Round up to nearest whole bag

## Validation Rules

- All numeric inputs must be greater than 0
- Wastage factor must be between 0% and 30%
- Mortar volume validation (prevents negative values)
- Real-time error display with helpful messages

## Browser Compatibility

- Modern browsers with ES6+ support
- Responsive design for mobile and desktop
- Dark/light theme support

## Technical Notes

- Built with Next.js 14 and React
- Uses Framer Motion for animations
- Tailwind CSS for styling
- TypeScript for type safety
- All calculations performed client-side for privacy
