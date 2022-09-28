<template>
   <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-primary" id="sidenav-main">

        <div class="sidenav-header d-flex align-items-center">
            <i class="bi bi-bag text-white ms-4" style="font-size:20px"></i>
            <a class="navbar-brand m-0" href="#" target="">
            <!-- <img src="@/assets/img/logo-ct.png" class="navbar-brand-img h-100" alt="main_logo"> -->
            <span class="ms-1 font-weight-bold text-white">My Shop</span>
            </a>
        </div>


        <hr class="horizontal light mt-0 mb-2">

        <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
            <ul class="navbar-nav">
            
            <li class="nav-item">
            <a class="nav-link text-white " href="#">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">dashboard</i>
                </div>
                
                <span class="nav-link-text ms-1">Dashboard</span>
            </a>
            </li>

            <li class="nav-item mt-3">
                <h6 class="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Items Management</h6>
            </li>
            <li class="nav-item">
            <router-link class="nav-link text-white " to="/item-create">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">add_circle_outline</i>
                </div>
                
                <span class="nav-link-text ms-1">Create Item</span>
            </router-link>
            </li>
            <!-- <li class="nav-item">
            <a class="nav-link text-white " href="./billing.html">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">receipt_long</i>
                </div>
                
                <span class="nav-link-text ms-1">Billing</span>
            </a>
            </li> -->
            <li class="nav-item">
            <router-link class="nav-link text-white " to="/item-list">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">format_list_bulleted</i>
                </div>
                
                <span class="nav-link-text ms-1">Item List</span>
            </router-link>
            </li>

            <li class="nav-item mt-3">
                <h6 class="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Categories Management</h6>
            </li>
            <li class="nav-item">
            <router-link class="nav-link text-white " to="/category-list">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">view_in_ar</i>
                </div>
                
                <span class="nav-link-text ms-1">Category List</span>
            </router-link>
            </li>

            
            <li class="nav-item">
            <router-link class="nav-link text-white " to="/category-create">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">library_add</i>
                    <!-- <i class="material-icons opacity-10">format_textdirection_r_to_l</i> -->
                </div>
                
                <span class="nav-link-text ms-1">Category Create</span>
            </router-link>
            </li>

            <li class="nav-item mt-3">
                <h6 class="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Subcategory Management</h6>
            </li>
            <li class="nav-item">
            <router-link class="nav-link text-white " to="/subcategory-list">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">grid_views</i>
                </div>
                
                <span class="nav-link-text ms-1">Subcategory List</span>
            </router-link>
            </li>
            <li class="nav-item">
            <router-link class="nav-link text-white " to="/subcategory-create">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">domain_add</i>
                </div>
                
                <span class="nav-link-text ms-1">Subcategory Create</span>
            </router-link>
            </li>
            
            <li class="nav-item mt-3">
                <h6 class="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Order</h6>
            </li>
            <li class="nav-item">
            <router-link class="nav-link text-white " to="/order">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">redeem</i>
                </div>
                
                <span class="nav-link-text ms-1">Order List</span>
            </router-link>
            </li>
                <li class="nav-item mt-3">
                <h6 class="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>
                </li>
            
            <li class="nav-item" v-if="auth.role == 'admin'">
            <router-link class="nav-link text-white " to="/user-create">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">person_add_alt</i>
                </div>
                
                <span class="nav-link-text ms-1">Add User</span>
            </router-link>
            </li>

            
            <li class="nav-item" v-if="auth.role == 'admin'">
            <router-link class="nav-link text-white " to="/user-list">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">people</i>
                </div>
                
                <span class="nav-link-text ms-1">User List</span>
            </router-link>
            </li>

            
            <li class="nav-item">
            <router-link class="nav-link text-white " to="/user-show">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">person</i>
                </div>
                
                <span class="nav-link-text ms-1">Your Account</span>
            </router-link>
            </li>

            <li class="nav-item">
            <router-link class="nav-link text-white " to="/change-password">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">lock</i>
                </div>
                
                <span class="nav-link-text ms-1">Change Password</span>
            </router-link>
            </li>

            </ul>
        </div>
        <div class="sidenav-footer position-absolute w-100 bottom-0 ">
            <div class="mx-3">
            <router-link class="btn bg-gradient-primary mt-4 w-100" to="/" type="button">
            <i class="material-icons opacity-10">add_shopping_cart</i>
            Products
            </router-link>
            </div>
            
        </div>
    
    </aside>
</template>
<script type="text/javascript" src="https://kit.fontawesome.com/42d5adcbca.js"></script>
<script>
import { mapState } from 'vuex'
    export default {
        computed: {
            ...mapState([
                'auth'
            ])
        },
    }
</script>

<style scoped >
/* $primary:coral; */

    @import '@/assets/css/material-dashboard.css';
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700');
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');
    @import '@/assets/css/nucleo-icons.css';
</style>