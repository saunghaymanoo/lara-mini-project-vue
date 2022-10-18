<template>
<div class="g-sidenav-show  bg-gray-200">
        <DashboardAside />
     <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y">
        <DashboardNav :breadcrumbs="breadcrumbs"/>
        
        <div class="min-vh-100 mx-4">
            <div class="card w-md-75">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h3>Dashboard</h3>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <BarChart/>
                        </div>
                        <div class="col-6">
                            <LineChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DashboardFooter />
     </main>
</div>
</template>
<script>
import DashboardAside from '@/components/DashboardAside.vue'
import DashboardNav from '@/components/DashboardNav.vue'
import DashboardFooter from '@/components/DashboardFooter.vue'
import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import axios from 'axios'
import { mapGetters } from 'vuex'
import BarChart from '@/components/BarChart.vue'
import LineChart from '@/components/LineChart.vue'
    export default {
        components: { DashboardAside, DashboardNav, DashboardFooter, Input, Select, BarChart, LineChart },
        data() {
            return {
                errors: {},
                categories:[],
                subcategories:[],
                subcategory_id: 0,
                breadcrumbs: [
                    'dashboard'
                    ],
                // dateArr: [],
                // dataArr: [],
            }
        },
        computed: {
        ...mapGetters(['getUrl']),
        },
        methods: {
            // getData(url) {
            //     axios.get(url)
            //         .then(res => {
            //             this.dateArr = res.data.dateArr;
            //             this.dataArr = res.data.dataArr;
            //         })
            //     .catch(err => console.log('error',err.message))
            // }
        },
         
    }
</script>

<style lang="scss" scoped>

</style>