<template>
<div class="g-sidenav-show  bg-gray-200">
        <DashboardAside />
     <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y">
        <DashboardNav :breadcrumbs="breadcrumbs"/>
        
        <div class="min-vh-100 mx-4">
            <div class="card w-md-75">
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-4">
                        <h3>Create Category</h3>
                        <router-link to="/category-list">
                            <i class="bi bi-list" style="font-size:32px;"></i>
                        </router-link>
                    </div>
                    <form @submit.prevent="storeCategory" ref="createCategoryForm" class="">
                        <div class="row">
                            <div class="col-7">
                                <Input name="title" type="text" placeholder="" label="Enter Category Title:" :isLogin="false" :errors="errors"/>
                            </div>
                            <div class="col-4 mt-2">
                                <button class="btn btn-primary mt-4">Add Category</button>
                            </div>
                        </div>
                    </form>
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
    import Input from '@/components/Input.vue'
    import { mapGetters, mapState } from 'vuex'
    export default {
        components: { DashboardAside, DashboardNav, DashboardFooter, Pagination, Search, Input },
        data() {
            return {
                errors: {},
                categories: [],
                isLoading:false,
                breadcrumbs: [
                    'home','category create'
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
            storeCategory() {
                let formData = new FormData(this.$refs.createCategoryForm);
                axios.post(this.getUrl('/categories'),formData)
                .then(res => {
                    if(res.data.success == true){
                        this.errors = {};
                        this.$refs.createCategoryForm.reset();
                        this.showToast('success',res.data.message)
                    }
                })
                .catch(err => {
                    // console.log(err);
                    this.errors=err.response.data.errors;
                    this.showToast('error',err.response.data.message)
                })
            }
        },
        mounted(){
            // if(this.token == null){
            //     this.$router.push('/');
            // }
        }
    }
</script>

<style lang="scss" scoped>

</style>