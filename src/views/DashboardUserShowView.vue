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
                        <h3>User List</h3>
                        <router-link to="/dashboard">
                            <i class="bi bi-plus-circle-dotted" style="font-size:32px;"></i>
                        </router-link>
                    </div>
                    <table class="table table-striped text-end align-middle">
                    <thead>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Control</th>
                    </thead>
                    <tbody>
                        <tr v-if="row">
                            <td>
                                <span>
                                    1
                                </span>
                            </td>
                            <td>
                                <input type="text" class="form-control" name="name" v-model="editRow.name" v-if="isEdit && isEditId == row.id">
                                <!-- <Input  name="name" type="text" placeholder="" :isLogin="false" :errors="errors" v-model="editRow.name" v-if="isEdit && isEditId == row.id"/> -->
                                <span v-else>
                                    {{row.name}}
                                </span>
                            </td>
                            <td>
                                <input type="text" class="form-control" name="email" v-model="editRow.email" v-if="isEdit && isEditId == row.id">
                                <!-- <Input  name="email" type="text" placeholder="" :isLogin="false" :errors="errors" v-model="editRow.email" v-if="isEdit && isEditId == row.id"/> -->
                                <span v-else>
                                    {{row.email}}
                                </span>
                            </td>
                            <td>
                                
                                <button @click="updateUser(row.id)" class="btn btn-sm btn-outline-info ms-2" v-if="isEdit && isEditId == row.id">
                                   <i class="bi bi-save2-fill" style="font-size:18px;"></i>
                                </button>
                                <button @click="editUser(row.id)" class="btn btn-sm btn-outline-warning ms-2" v-else>
                                    <i class="bi bi-pencil-square" style="font-size:18px;"/>
                                </button>
                                <router-link 
                                class="btn btn-sm btn-outline-info ms-2"
                                 to="/change-password"
                                 >
                                    <i class="bi bi-lock" style="font-size:18px;"/>Change Password
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
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapGetters, mapState } from 'vuex'
import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
    export default {
        components: { DashboardAside, DashboardNav, DashboardFooter, Pagination, Input, Select},
        data() {
            return {
                errors: {},
                row: [],
                editRow : {},
                isLoading:false,
                isEdit : false,
                isEditId : '',
                breadcrumbs: [
                    'home','user list'
                    ]
            }
           
        },
        computed: {
           ...mapGetters(['getUrl']),
           ...mapState(['auth'])
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
                async fetchUser(url) {
                    this.isLoading = true;
                    await axios.get(url)
                    .then(res => {
                        // console.log(res.data)
                        this.row = res.data.data
                    })
                    .catch(err => this.showToast('error',err.message))
                    .finally(_=>this.isLoading=false)
                },
                editUser(id){
                    this.isEdit = true;
                    this.isEditId = id;
                    axios.get(this.getUrl('/users/'+id))
                    .then(res => {
                        this.editRow = res.data.data
                    })
                    .catch(err => {
                        this.showToast('error',err.response.data.message)
                    })
                },
                updateUser(id){
                    // console.log(this.editRow);
                    const params = new URLSearchParams();
                    params.append('name', this.editRow.name);
                    params.append('email', this.editRow.email);
                    params.append('role', this.editRow.role);
                    axios.put(this.getUrl('/users/'+id),params).then(res => {
                        console.log(res);
                        this.isEdit = false;
                        this.showToast('success',res.data.message)
                        this.fetchUser(this.getUrl('/users/'+this.auth.id))
                    })
                    .catch(err => {
                        this.showToast('error',err.response.data.message)
                    })
                }
        },
        mounted () {
            this.fetchUser(this.getUrl('/users/'+this.auth.id));
        },
        created(){
           
        }
    }
</script>

<style lang="scss" scoped>

</style>