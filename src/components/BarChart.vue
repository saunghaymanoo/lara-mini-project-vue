<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
    color="pink"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { mapGetters } from 'vuex'
import axios from 'axios'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: 'primary',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    },
    // chartData: {
    //     type: Object,
    //     required: true
    //   },
    // chartOptions: {
    //   type: Object,
    //   default: () => {}
    // }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  data() {
    return {
        dateArr: {
        default: [],
    },
    dataArr: {
        default: [],
    },
      chartData: {
                    labels: this.dateArr,
                    datasets: [ 
                        { 
                            data: null,
                            backgroundColor: "#d63384"
                        },
                    ],
                },
                chartOptions: {
                    responsive: true
                }
    }
  },
        async mounted () {
            try {
                await axios.get(this.getUrl('/barChart'))
                    .then(res => {
                        this.chartData.labels = res.data.dateArr;
                        this.chartData.datasets[0].data = res.data.dataArr;
                    })
                .catch(err => console.log('error',err.message))
            } catch (e) {
            console.error(e)
            }
        }
}
</script>