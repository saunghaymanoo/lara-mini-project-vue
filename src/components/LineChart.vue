<template>
  <div></div>
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)
  import { mapGetters } from 'vuex'
  export default {
    name: 'LineChart',
    components: {
        Line
    },
     computed: {
           ...mapGetters(['getUrl'])
        },
    data () {
      return {
        chartData: {
          labels: ["Babol",	"Cabanatuan",	"Daegu",	"Jerusalem",	"Fairfield",	"New York",	"Gangtok", "Buenos Aires", "Hafar Al-Batin", "Idlib"],
          datasets: [
            {
              label: 'Line Chart',
              data: [600,	1150,	342,	6050,	2522,	3241,	1259,	157,	1545, 9841],
              fill: false,
              borderColor: '#2554FF',
              backgroundColor: '#2554FF',
              borderWidth: 1
            }
          ]
        },
       
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }