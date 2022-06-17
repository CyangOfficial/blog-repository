import * as echarts from 'echarts/core'
import { LineChart, TitleComponent, LegendComponent, GridComponent } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
// import { ref } from 'vue'
echarts.use([LineChart, CanvasRenderer, TitleComponent, LegendComponent, GridComponent])
export default function () {
  const initHandle = () => {
    console.log('init')
  }
  return {
    initHandle
  }
}
