<template>
<div class="g-sidenav-show  bg-gray-200">
        <DashboardAside />
     <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y">
        <DashboardNav :breadcrumbs="breadcrumbs"/>
        
        <div class="min-vh-100 mx-4">
            <div class="card w-md-75">
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-4">
                        <h3>Edit Item</h3>
                        <router-link to="/item-list">
                            <i class="bi bi-list" style="font-size:32px;"></i>
                        </router-link>
                    </div>
                    <form @submit.prevent="updateItem" ref="editItemForm" class="row">
                        <div class="col-6">
                            <Input :value="item.name" name="name" type="text" placeholder="" label="Enter Item Name:" :isLogin="false" :errors="errors"/>
                            <Input :value="item.code" name="code" type="text" placeholder="Example: s-0001" label="Enter Item Code:" :isLogin="false" :errors="errors"/>
                            <label for="description" class="form-label">Description: </label>
                            <textarea :value="item.description" name="description" id="description" class="form-control" cols="30" rows="10"></textarea>
                        </div>
                        <div class="col-6">
                            <div class="row">
                                <div class="col-6">
                                    <label for="category" class="form-label">Category: </label>
                                    <Select :categories="categories" @changeSubcategory="fetchSubcategories" :errors="errors"/>
                                </div>
                                <div class="col-6">
                                     <label for="subcategory" class="form-label">SubCategory: </label>
                                        <Select :categories="subcategories" @changeSubcategory="getSubcategory" name="subcategory_id" :errors="errors" v-if="item.subcategory" :selectedCategory="item.subcategory.id"/>
                                </div>
                            </div>
                            <div class="row my-4">
                                <div class="col-6">
                                    <Input :value="item.price" name="price" type="number" placeholder="" label="Enter Price:" :isLogin="false" :errors="errors"/>
                                </div>
                                <div class="col-6">
                                    <Input :value="item.discount" name="discount" type="number" placeholder="0" label="Enter Discount:" :isLogin="false" :errors="errors"/>
                                </div>
                            </div>
                            <!-- <input type="hidden" :value="item.photo" name="oldPhoto" /> -->
                            <Input name="photo" type="file" placeholder="" label="Photo:" :isLogin="false"  :errors="errors"/>

                            <div class="d-flex align-items-baseline my-4 justify-content-end">
                                <div></div>
                                <button class="btn btn-lg btn-primary mt-6">Update Item</button>
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
import Swal from 'sweetalert2'
import axios from 'axios'
import { mapGetters,mapState } from 'vuex'
    export default {
        components: { DashboardAside, DashboardNav, DashboardFooter, Input, Select, },
        data() {
            return {
                errors: {},
                categories:[],
                subcategories:[],
                allsubcategories:[],
                subcategory_id: 0,
                item:{},
                breadcrumbs: [
                    'home','item create'
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
            fetchAllSubcategories(){
                axios.get(this.getUrl('/subcategories'))
                .then(res=>{
                    // console.log(res.data);
                    this.subcategories = res.data.subcategories;
                })
                .catch(err => console.log(err))
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
                // console.log(id);
            },
            fetchItem(id) {
                // this.isLoading = true;
                axios.get(this.getUrl('/items/')+id)
                .then(res => {
                    // console.log(res.data)
                    this.item = res.data.data;
                    // console.log(this.item);
                })
                .catch(err => this.showToast('error',err.message))
            },
            updateItem(){
                let formData = new FormData(this.$refs.editItemForm);
                // const headers = { 'Content-Type': 'multipart/form-data' };
                // console.log(formData);
                axios.put(this.getUrl('/items/'+this.$route.params.id),new URLSearchParams(formData).toString())
                .then(res => {
                    console.log(formData)
                    if(res.data.success === true){
                        this.errors = {}
                       this.showToast('success',res.data.message);
                       this.$router.push('/item-list')
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
            // if(this.token == null){
            //     this.$router.push('/');
            // }
            this.fetchCategories();
            this.fetchSubcategories();
            this.fetchAllSubcategories();
            this.fetchItem(this.$route.params.id)
        },
    }
</script>

<style lang="scss" scoped>

</style>