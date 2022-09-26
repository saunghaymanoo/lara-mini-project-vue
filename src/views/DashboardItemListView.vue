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
                    <div class="d-flex justify-content-between">
                        <h3>Item List</h3>
                        <router-link to="/dashboard">
                            <i class="bi bi-plus-circle-dotted" style="font-size:32px;"></i>
                        </router-link>
                    </div>
                    <table class="table table-striped text-end align-middle">
                    <thead>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Code</th>
                        <th>Subcategory</th>
                        <th>Owner</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Photo</th>
                        <th>Control</th>
                    </thead>
                    <tbody>
                        <tr v-for="row in rows.data" :key="row.id">
                            <td>{{row.id}}</td>
                            <td>{{row.name}}</td>
                            <td>{{row.code}}</td>
                            <td>{{row.subcategory}}</td>
                            <td>{{row.owner}}</td>
                            <td>{{row.description.substr(0,50)+"..."}}</td>
                            <td>{{row.price}}</td>
                            <td v-if="row.discount!=null">{{row.discount}}</td>
                            <td v-else>0</td>
                            <td> 
                                <img :src="row.photo" width="50px" height="50px" alt="">
                            </td>
                            <td>
                                <button 
                                class="btn btn-sm btn-outline-info ms-2"
                                 @click="fetchItem(row.id)"
                                 >
                                    <i class="bi bi-info" style="font-size:18px;"/>
                                </button>
                                <button 
                                    class="btn btn-sm btn-outline-danger ms-2"
                                    @click="deleteItem(row.id)"
                                >
                                    <i class="bi bi-trash3" style="font-size:18px;"/>
                                </button>
                                <router-link :to="'/item-edit/'+row.id" class="btn btn-sm btn-outline-warning ms-2">
                                    <i class="bi bi-pencil-square" style="font-size:18px;"/>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                    <div class="d-flex justify-content-between">
                        <Pagination v-if="rows.meta" :links="rows.meta.links" @fetchLink = "fetchItems"/>
                        <div class="w-50">
                            <Search @search="search" :categories="categories" :subcategories="subcategories"/>
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
import Search from '@/components/Search.vue'
import axios from 'axios'
import { mapGetters } from 'vuex'
    export default {
        components: { DashboardAside, DashboardNav, DashboardFooter, Pagination, Search },
        data() {
            return {
                errors: {},
                rows: [],
                categories: [],
                subcategories: [],
                isLoading:false,
                breadcrumbs: [
                    'home','item list'
                    ]
            }
        },
        computed: {
           ...mapGetters(['getUrl'])
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
                fetchItems(url) {
                this.isLoading = true;
                axios.get(url)
                .then(res => {
                    // console.log(res.data)
                    this.isItem=true
                    this.rows = res.data
                })
                .catch(err => this.showToast('error',err.message))
                .finally(_=>this.isLoading=false)
                },
                search(keyword,subcategory_id=0){
                    if(subcategory_id == 0){
                        this.fetchItems(this.getUrl('/items?keyword='+keyword));
                    }else{
                        this.fetchItems(this.getUrl('/itembysubcategory?keyword='+keyword+"&&subcategory_id="+subcategory_id))
                    }
                },
        },
        mounted () {
        this.fetchItems(this.getUrl('/items'));
        },
    }
</script>

<style lang="scss" scoped>

</style>