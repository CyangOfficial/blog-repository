import 'element-plus/dist/index.css'
// 如果要使用.scss样式文件，则需要引入base.scss文件
// import 'element-plus/packages/theme-chalk/src/base.scss'

// import {
//   // ElAlert,
//   // ElAside,
//   // ElAutocomplete,
//   ElAvatar,
//   // ElBacktop,
//   // ElBadge,
//   ElBreadcrumb,
//   ElBreadcrumbItem,
//   ElButton,
//   // ElButtonGroup,
//   // ElCalendar,
//   ElCard,
//   // ElCarousel,
//   // ElCarouselItem,
//   // ElCascader,
//   // ElCascaderPanel,
//   // ElCheckbox,
//   // ElCheckboxButton,
//   // ElCheckboxGroup,
//   // ElCol,
//   // ElCollapse,
//   // ElCollapseItem,
//   // ElCollapseTransition,
//   // ElColorPicker,
//   // ElContainer,
//   // ElDatePicker,
//   // ElDialog,
//   // ElDivider,
//   // ElDrawer,
//   ElDropdown,
//   ElDropdownItem,
//   ElDropdownMenu,
//   // ElFooter,
//   ElForm,
//   ElFormItem,
//   // ElHeader,
//   ElIcon,
//   ElImage,
//   ElInput,
//   // ElInputNumber,
//   // ElLink,
//   // ElMain,
//   ElMenu,
//   ElMenuItem,
//   // ElMenuItemGroup,
//   // ElOption,
//   // ElOptionGroup,
//   // ElPageHeader,
//   // ElPagination,
//   // ElPopconfirm,
//   ElPopover,
//   // ElPopper,
//   // ElProgress,
//   // ElRadio,
//   // ElRadioButton,
//   // ElRadioGroup,
//   // ElRate,
//   // ElRow,
//   ElScrollbar,
//   // ElSelect,
//   // ElSlider,
//   // ElStep,
//   // ElSteps,
//   // ElSubmenu,
//   ElSwitch,
//   // ElTabPane,
//   ElTable,
//   ElTableColumn,
//   // ElTabs,
//   ElTag,
//   // ElTimePicker,
//   // ElTimeSelect,
//   // ElTimeline,
//   // ElTimelineItem,
//   // ElTooltip,
//   // ElTransfer,
//   // ElTree,
//   ElUpload,
//   // ElInfiniteScroll,
//   // ElLoading,
//   ElMessage
//   // ElMessageBox,
//   // ElNotification,
// } from 'element-plus'

// import { Plus, Edit } from '@element-plus/icons'

// const components = [
//   // Plus,
//   // Edit,
//   // ElAlert,
//   // ElAside,
//   // ElAutocomplete,
//   ElAvatar,
//   // ElBacktop,
//   // ElBadge,
//   ElBreadcrumb,
//   ElBreadcrumbItem,
//   ElButton,
//   // ElButtonGroup,
//   // ElCalendar,
//   ElCard,
//   // ElCarousel,
//   // ElCarouselItem,
//   // ElCascader,
//   // ElCascaderPanel,
//   // ElCheckbox,
//   // ElCheckboxButton,
//   // ElCheckboxGroup,
//   // ElCol,
//   // ElCollapse,
//   // ElCollapseItem,
//   // ElCollapseTransition,
//   // ElColorPicker,
//   // ElContainer,
//   // ElDatePicker,
//   // ElDialog,
//   // ElDivider,
//   // ElDrawer,
//   ElDropdown,
//   ElDropdownItem,
//   ElDropdownMenu,
//   // ElFooter,
//   ElForm,
//   ElFormItem,
//   // ElHeader,
//   ElIcon,
//   ElImage,
//   ElInput,
//   // ElInputNumber,
//   // ElLink,
//   // ElMain,
//   ElMenu,
//   ElMenuItem,
//   // ElMenuItemGroup,
//   // ElOption,
//   // ElOptionGroup,
//   // ElPageHeader,
//   // ElPagination,
//   // ElPopconfirm,
//   ElPopover,
//   // ElPopper,
//   // ElProgress,
//   // ElRadio,
//   // ElRadioButton,
//   // ElRadioGroup,
//   // ElRate,
//   // ElRow,
//   ElScrollbar,
//   // ElSelect,
//   // ElSlider,
//   // ElStep,
//   // ElSteps,
//   // ElSubmenu,
//   ElSwitch,
//   // ElTabPane,
//   ElTable,
//   ElTableColumn,
//   // ElTabs,
//   ElTag,
//   // ElTimePicker,
//   // ElTimeSelect,
//   // ElTimeline,
//   // ElTimelineItem,
//   // ElTooltip,
//   // ElTransfer,
//   // ElTree,
//   ElUpload
// ]

const plugins = [
  // ElInfiniteScroll,
  // ElLoading,
  // ElMessage
  // ElMessageBox,
  // ElNotification,
]

import ElementPlus from 'element-plus'
console.log(ElementPlus)
export default function loadComponent (app) {
  // components.forEach(component => {
  //   app.component(component.name, component)
  // })
  // components.forEach(plugin => {
  //   app.use(plugin)
  // })
  app.use(ElementPlus)
  // app.provide('$message', ElMessage)
}
