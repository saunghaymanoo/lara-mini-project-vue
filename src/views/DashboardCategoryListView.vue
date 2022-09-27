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
            <div class="card w-lg-75 overflow-scroll" v-else>
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-4">
                        <h3>Category List</h3>
                        <router-link to="/category-create">
                            <i class="bi bi-plus-circle-dotted" style="font-size:32px;"></i>
                        </router-link>
                    </div>
                    <table class="table table-striped text-end align-middle">
                    <thead>
                        <th>#</th>
                        <th>title</th>
                        <th>Owner</th>
                        <th>Control</th>
                    </thead>
                    <tbody>
                        <tr v-for="row in categories" :key="row.id">
                            <td>{{row.id}}</td>
                            <td>{{row.title}}</td>
                            <td>{{row.owner.name}}</td>
                            <td>
                                <!-- <button 
                                class="btn btn-sm btn-outline-info ms-2"
                                 @click="fetchItem(row.id)"
                                 >
                                    <i class="bi bi-info" style="font-size:18px;"/>
                                </button> -->
                                <button 
                                    class="btn btn-sm btn-outline-danger ms-2"
                                    @click="deleteCategory(row.id)"
                                >
                                    <i class="bi bi-trash3" style="font-size:18px;"/>
                                </button>
                                <router-link :to="'/category-edit/'+row.id" class="btn btn-sm btn-outline-warning ms-2">
                                    <i class="bi bi-pencil-square" style="font-size:18px;"/>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                    </table>
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
import Swal from 'sweetalert2'
import { mapGetters, mapState } from 'vuex'
    export default {
        components: { DashboardAside, DashboardNav, DashboardFooter, Pagination, Search },
        data() {
            return {
                errors: {},
                categories: [],
                isLoading:false,
                breadcrumbs: [
                    'home','category list'
                    ]
            }
        },
        computed: {
           ...mapGetters(['getUrl']),
           ...mapState(['token'])
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
               fetchCategories(){
                axios.get(this.getUrl('/categories'))
                .then(res=>{
                    if(res.data.success == true){ 
                    // console.log(res.data);
                        this.categories = res.data.categories;
                    }
                })
                .catch(err => console.log(err));
                },
                deleteCategory(id){
                    axios.delete(this.getUrl('/categories/'+id))
                    .then(res => {
                        //  console.log(res);
                        if(res.data.success == true){
                            this.fetchCategories()
                            this.showToast('success',res.data.message)
                        }
                    }).catch(err => this.showToast('error',err.response.data.message))
                }
                
        },
        mounted () {
            // if(this.token == null){
            //     this.$router.push('/');
            // }
            this.fetchCategories();
        },
    }
</script>

<style lang="scss" scoped>

</style>