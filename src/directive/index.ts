import copy from './copy'
import hasPermi from './hasPermi'
import hasPermiAny from './hasPermiAny'
export default function directive (app) {
  app.directive('copy', copy)
  app.directive('hasPermi', hasPermi)
  app.directive('hasPermiAny', hasPermiAny)
}
