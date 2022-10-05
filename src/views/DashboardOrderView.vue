<template>
<div class="g-sidenav-show  bg-gray-200">
        <DashboardAside />
     <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y">
        <DashboardNav :breadcrumbs="breadcrumbs"/>
        
        <div class="min-vh-100 mx-4">
            <div class="min-vh-100" v-if="isLoading">
                <div class="d-flex justify-content-center align-items-center vh-100">
                    <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
            <div class="card overflow-scroll" v-else>
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-4">
                        <h3>Order List</h3>
                    </div>
                    <table class="table table-striped text-end align-middle">
                    <thead>
                        <th>#</th>
                        <th>Owner</th>
                        <th>Item Name</th>
                        <th>Stock</th>
                        <th>Amount</th>
                        <th>Control</th>
                    </thead>
                    <tbody>
                        <tr v-for="row in rows.data" :key="row.id">
                            <td>{{row.id}}</td>
                            <td>{{row.owner}}</td>
                            <td>{{row.item.name}}</td>
                            <td>{{row.stock}}</td>
                            <td>{{row.amount}}</td>
                            <td>
                                <!-- <button 
                                class="btn btn-sm btn-outline-info ms-2"
                                 @click="fetchItem(row.id)"
                                 >
                                    <i class="bi bi-info" style="font-size:18px;"/>
                                </button> -->
                                <button 
                                    class="btn btn-sm btn-outline-danger ms-2"
                                    @click="deleteItem(row.id)"
                                >
                                    <i class="bi bi-trash3" style="font-size:18px;"/>
                                </button>
                                <!-- <router-link :to="'/item-edit/'+row.id" class="btn btn-sm btn-outline-warning ms-2">
                                    <i class="bi bi-pencil-square" style="font-size:18px;"/>
                                </router-link> -->
                            </td>
                        </tr>
                    </tbody>
                    </table>
                    <div class="d-flex justify-content-between align-items-center">
                        <Pagination v-if="rows.meta" :links="rows.meta.links" @fetchLink = "fetchOrders"/>
                        <div class="w-50 d-flex align-items-baseline justify-content-between">
                            <label for="">Start Date:</label>
                            <input v-model="startDate" type="date" name="startDate" class="form-control w-25 mx-2">
                            <label for="">End Date:</label>
                            <input v-model="endDate" type="date" name="endDate" class="form-control w-25 mx-2">
                            <button
                                class="btn btn-primary"
                                @click="searchByDate"
                            >
                                Search
                            </button>
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
import Pagination from '@/components/Pagination.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapGetters, mapState } from 'vuex'
    export default {
        components: { DashboardAside, DashboardNav, DashboardFooter, Pagination, },
        data() {
            return {
                errors: {},
                rows: [],
                categories: [],
                subcategories: [],
                isLoading:false,
                startDate: '',
                endDate: new Date().getFullYear()+'-'+(new Date().getMonth()+1 )+'-'+new Date().getDate(),
                breadcrumbs: [
                    'home','order list'
                    ]
            }
           
        },
        computed: {
           ...mapGetters(['getUrl']),
        },
        methods: {
            showToast(icon,message){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: icon,
                    title: message
                })
              },
                async fetchOrders(url) {
                    this.isLoading = true;
                    await axios.get(url)
                    .then(res => {
                        // console.log(res.data)
                        this.rows = res.data
                    })
                    .catch(err => this.showToast('error',err.message))
                    .finally(_=>this.isLoading=false)
                },
                deleteOrder(id){
                    axios.delete(this.getUrl('/orders/'+id))
                    .then(res=>{
                        // console.log(res);
                        if(res.data.success == true){
                            this.showToast('success',res.data.message)
                            this.fetchOrders(this.rows.meta.links.find(link => link.active === true).url)
                        }
                    })
                    .catch(err=>{
                        // console.log(err)
                        this.showToast('error',err.response.data.message)
                    })
                },
                searchByDate(){
                    this.fetchOrders(this.getUrl('/orders/?startDate='+this.startDate+'&&endDate='+this.endDate));
                }
        },
        mounted () {
            this.fetchOrders(this.getUrl('/orders'));
        },
        created(){
           
        }
    }
</script>

<style lang="scss" scoped>

</style>