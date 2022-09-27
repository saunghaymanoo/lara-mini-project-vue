<template>
<div class="g-sidenav-show  bg-gray-200">
        <DashboardAside />
     <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y">
        <DashboardNav :breadcrumbs="breadcrumbs"/>
        
        <div class="min-vh-100 mx-4">
            <div class="card w-md-75">
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-4">
                        <h3>Edit Subcategory</h3>
                        <router-link to="/subcategory-list">
                            <i class="bi bi-list" style="font-size:32px;"></i>
                        </router-link>
                    </div>
                    <form @submit.prevent="updateSubcategory" ref="editSubcategoryForm" class="">
                        <div class="row">
                            <div class="col-10 ">
                                <div class="row d-flex align-items-end">
                                    <div class="col-6">
                                        <label for="">Category:</label>
                                        <Select name="category_id" :categories="categories" :errors="errors" v-if="subcategory.category" :selectedCategory="subcategory.category.id" />
                                    </div>
                                    <div class="col-6">
                                        <Input name="title" type="text" placeholder="" label="Subcategory Title:" :isLogin="false" :errors="errors" :value="subcategory.title"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2 mt-2">
                                <button class="btn btn-primary mt-4">Edit Subcategory</button>
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
    import Select from '@/components/Select.vue'

    import { mapGetters, mapState } from 'vuex'
    export default {
        components: { DashboardAside, DashboardNav, DashboardFooter, Pagination, Search, Input, Select },
        data() {
            return {
                errors: {},
                categories: [],
                subcategory: {},
                isLoading:false,
                breadcrumbs: [
                    'home','subcategory edit'
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
            fetchSubcategory(id){
                this.isLoading=true
                axios.get(this.getUrl('/subcategories/'+id))
                .then(res => {
                    // console.log(res.data.data);
                    this.subcategory = res.data.data
                })
                .catch(err => {
                    this.showToast('error',err.response.data.message)
                })
                .finally(_=>this.isLoading=false)
            },
            updateSubcategory() {
                let formData = new FormData(this.$refs.editSubcategoryForm);
                axios.put(this.getUrl('/subcategories/'+this.$route.params.id),new URLSearchParams(formData).toString())
                .then(res => {
                    // console.log(res);
                    if(res.data.success == true){
                        this.errors = {};
                        // this.$refs.editSubcategoryForm.reset();
                        // this.fetchSubcategory(this.$route.params.id);
                        this.$router.push('/subcategory-list')
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
            this.fetchCategories()
            this.fetchSubcategory(this.$route.params.id)
        }
    }
</script>

<style lang="scss" scoped>

</style>