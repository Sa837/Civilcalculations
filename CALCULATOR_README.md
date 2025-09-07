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
