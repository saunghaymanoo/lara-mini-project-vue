<template>
<div class="g-sidenav-show  bg-gray-200">
        <DashboardAside />
     <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y">
        <DashboardNav :breadcrumbs="breadcrumbs"/>
        
        <div class="min-vh-100 mx-4">
            <div class="card w-md-75">
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-4">
                        <h3>Create Item</h3>
                        <router-link to="/item-list">
                            <i class="bi bi-list" style="font-size:32px;"></i>
                        </router-link>
                    </div>
                    <form @submit.prevent="storeItem" ref="createItemForm" class="row">
                        <div class="col-6">
                            <Input name="name" type="text" placeholder="" label="Enter Item Name:" :isLogin="false" :errors="errors"/>
                            <Input name="code" type="text" placeholder="Example: s-0001" label="Enter Item Code:" :isLogin="false" :errors="errors"/>
                            <label for="description" class="form-label">Description: </label>
                            <textarea name="description" id="description" class="form-control" cols="30" rows="10"></textarea>
                        </div>
                        <div class="col-6">
                            <div class="row">
                                <div class="col-6">
                                    <label for="category" class="form-label">Category: </label>
                                    <Select :categories="categories" @changeSubcategory="fetchSubcategories" :errors="errors" :selectedCategory="0"/>
                                </div>
                                <div class="col-6">
                                     <label for="subcategory" class="form-label">SubCategory: </label>
                                        <Select :categories="subcategories" @changeSubcategory="getSubcategory" name="subcategory_id" :errors="errors" :selectedCategory="0"/>
                                </div>
                            </div>
                            <div class="row my-4">
                                <div class="col-6">
                                    <Input name="price" type="number" placeholder="" label="Enter Price:" :isLogin="false" :errors="errors"/>
                                </div>
                                <div class="col-6">
                                    <Input name="discount" type="number" placeholder="0" label="Enter Discount:" :isLogin="false" :errors="errors"/>
                                </div>
                            </div>
                            <Input name="photo" type="file" placeholder="" label="Photo:" :isLogin="false" :errors="errors"/>

                            <div class="d-flex align-items-baseline my-4 justify-content-end">
                                <div></div>
                                <button class="btn btn-lg btn-primary mt-6">Add Item</button>
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
import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'
    export default {
        components: { DashboardAside, DashboardNav, DashboardFooter, Input, Select, },
        data() {
            return {
                errors: {},
                categories:[],
                subcategories:[],
                subcategory_id: 0,
                breadcrumbs: [
                    'home','item create'
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
            fetchSubcategories(category_id){
                axios.get(this.getUrl('/subcategorybycategory/')+category_id)
                .then(res => {
                    if(res.data.success == true){ 
                    // console.log(res);
                    this.subcategories = res.data.subcategories;
                    }
                })
                .catch(err => console.log(err));
            },
            getSubcategory(id){
                console.log(id);
            },
            storeItem(){
                let formData = new FormData(this.$refs.createItemForm);
                // console.log(formData);
                axios.post(this.getUrl('/items'),formData)
                .then(res => {
                    console.log(res)
                    if(res.data.success === true){
                        this.errors = {}
                        this.$refs.createItemForm.reset()

                       this.showToast('success',res.data.message);
                    }
                })
                .catch(e=>{
                    console.log(e)
                    if(e.response){
                        this.errors = e.response.data.errors;
                        this.showToast('error',e.response.data.message);
                    }
                    
                })
            }
        },
        mounted () {
            this.fetchCategories();
            this.fetchSubcategories();
        },
    }
</script>

<style lang="scss" scoped>

</style>