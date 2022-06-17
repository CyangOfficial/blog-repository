<template>
  <div
    id="homeLineChart"
    :class="className"
    :style="{ height: height, width: width }"
  ></div>
</template>

<script>
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  LegendComponent,
  GridComponent,
  TooltipComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { reactive, toRefs, onMounted, nextTick, watch } from 'vue'
echarts.use([
  LineChart,
  CanvasRenderer,
  TitleComponent,
  LegendComponent,
  GridComponent,
  TooltipComponent
])
export default {
  name: 'LineChart',
  props: {
    chartData: {
      type: Object,
      required: true
    },
    className: {
      type: String,
      default: 'chartComponents'
    },
    height: {
      type: String,
      default: '350px'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  setup (props) {
    const state = reactive({
      chart: null
    })
    const setOption = (chartData) => {
      if (state.chart) {
        state.chart.setOption({
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: 8
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['expected', 'actual']
          },
          series: [
            {
              name: 'expected',
              itemStyle: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              },
              smooth: true,
              type: 'line',
              data: chartData.expectedData,
              animationDuration: 2800,
              animationEasing: 'cubicInOut'
            },
            {
              name: 'actual',
              smooth: true,
              type: 'line',
              itemStyle: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              },
              data: chartData.actualData,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            }
          ]
        })
      }
    }
    const initChart = () => {
      const chartDom = document.getElementById('homeLineChart')
      state.chart = echarts.init(chartDom)
      setOption(props.chartData)
    }
    watch(() => props.chartData, () => {
      props.chartData && setOption(props.chartData)
    })
    onMounted(() => {
      nextTick(() => {
        initChart()
      })
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
