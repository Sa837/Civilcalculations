import { BBSEngine } from './bbs/engine'
import { BBSInputItem, BBSResult, BBSOptions, DesignCode } from './bbs/schema'
export {
  type BBSResultItem,
  type BBSInputItem as BBSInputItemExport,
  type BBSResult as BBSResultExport,
  type BBSOptions as BBSOptionsExport,
  type DesignCode as DesignCodeExport,
} from './bbs/schema'

// Public wrapper
export function calculateBBS(inputs: BBSInputItem[], options?: BBSOptions): BBSResult {
  return BBSEngine.calculate(inputs, options)
}
