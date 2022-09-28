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
                           Change Password
                        </h3>
                        <!-- <router-link to="/user-list">
                            <i class="bi bi-list" style="font-size:32px;"></i>
                        </router-link> -->
                    </div>
                    <form @submit.prevent="changePassword(auth.id)" ref="changePasswordForm" class="">
                        <div class="row">
                            <div class="col-12">
                                <input type="hidden" name="user_id" :value="auth.id">
                                <Input label="Old Password" name="old_password" type="password" placeholder="" :isLogin="false" :errors="errors"/>
                                <br>
                                <Input label="New Password" name="password" type="password" placeholder="" :isLogin="false" :errors="errors"/>
                                <br>
                                <Input label="Confirm Password" name="password_confirmation" type="password" placeholder="" :isLogin="false" :errors="errors"/>
                                <div class="mt-4">
                                    <input type="submit" name="btn" value="Change Password" class="btn btn-primary ms-auto">
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
                breadcrumbs: [
                    'home','password change'
                    ]
            }
        },
        computed: {
           ...mapGetters(['getUrl']),
           ...mapState(['token','auth'])

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
            changePassword(id) {
                    let formData = new FormData(this.$refs.changePasswordForm);
                    axios.put(this.getUrl('/changepassword/'+id),new URLSearchParams(formData).toString()).then(res => {
                        console.log(res);
                        this.showToast('error',res.data.message)

                        if(res.data.success==true){
                            this.showToast('success',res.data.message)
                            this.$refs.changePasswordForm.reset();
                        }
                        
                    })
                    .catch(err => {
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