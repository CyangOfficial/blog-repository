import SvgIcon from '@/components/SvgIcon' // 引入自定义组件

export default function loadComponent (app) {
  const requireAll = requireContext => requireContext.keys().map(requireContext)
  const req = require.context('../icons/svg', false, /\.svg$/)
  requireAll(req)
  app.component('svg-icon', SvgIcon)
}
