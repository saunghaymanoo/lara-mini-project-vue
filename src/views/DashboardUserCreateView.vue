<template>
<div class="g-sidenav-show  bg-gray-200">
        <DashboardAside />
     <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y">
        <DashboardNav :breadcrumbs="breadcrumbs"/>
        
        <div class="min-vh-100 mx-4">
            <div class="card w-md-50">
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-4">
                        <h3>
                            <i class="bi bi-person-plus-fill" style="font-size:32px;"></i>
                            New User
                        </h3>
                        <router-link to="/user-list">
                            <i class="bi bi-list" style="font-size:32px;"></i>
                        </router-link>
                    </div>
                    <form @submit.prevent="storeUser" ref="createUserForm" class="">
                        <div class="row">
                            <div class="col-12">
                                <Input name="name" type="name" placeholder="Enter Name ..." :isLogin="false" :errors="errors"/>
                                <br>
                                <Input name="email" type="email" placeholder="Enter Email ..." :isLogin="false" :errors="errors"/>
                                <br>
                                <select name="role" class="form-control mt-2 mb-0">
                                    <option selected disabled value="" class="text-black-50">Choose User Role</option>
                                    <option :value="r" v-for="r in roles" :key="r">{{r}}</option>
                                </select>
                                <br>
                                <Input name="password" type="password" placeholder="Enter Password ..." :isLogin="false" :errors="errors"/>
                                <br>
                                <Input name="password_confirmation" type="password" placeholder="Confirm Password ..." :isLogin="false" :errors="errors"/>
                                <br>
                                <div class="">
                                    <input type="submit" name="btn" value="Add" class="btn btn-primary ms-auto">
                                </div>
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
                isLoading:false,
                roles: ['admin','editor','author'],
                breadcrumbs: [
                    'home','user create'
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
            storeUser() {
                let formData = new FormData(this.$refs.createUserForm);
                axios.post(this.getUrl('/users'),formData)
                .then(res => {
                    if(res.data.success == true){
                        this.errors = {};
                        this.$refs.createUserForm.reset();
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
        }
    }
</script>

<style lang="scss" scoped>

</style>