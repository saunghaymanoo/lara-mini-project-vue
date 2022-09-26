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

            
            <li class="nav-item">
            <a class="nav-link text-white " href="./virtual-reality.html">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">view_in_ar</i>
                </div>
                
                <span class="nav-link-text ms-1">Virtual Reality</span>
            </a>
            </li>

            
            <li class="nav-item">
            <a class="nav-link text-white " href="./rtl.html">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">format_textdirection_r_to_l</i>
                </div>
                
                <span class="nav-link-text ms-1">RTL</span>
            </a>
            </li>

            
            <li class="nav-item">
            <a class="nav-link text-white " href="./notifications.html">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">notifications</i>
                </div>
                
                <span class="nav-link-text ms-1">Notifications</span>
            </a>
            </li>

            
                <li class="nav-item mt-3">
                <h6 class="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>
                </li>
            
            <li class="nav-item">
            <a class="nav-link text-white " href="./profile.html">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">person</i>
                </div>
                
                <span class="nav-link-text ms-1">Profile</span>
            </a>
            </li>

            
            <li class="nav-item">
            <a class="nav-link text-white " href="./sign-in.html">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">login</i>
                </div>
                
                <span class="nav-link-text ms-1">Sign In</span>
            </a>
            </li>

            
            <li class="nav-item">
            <a class="nav-link text-white " href="./sign-up.html">
                
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="material-icons opacity-10">assignment</i>
                </div>
                
                <span class="nav-link-text ms-1">Sign Up</span>
            </a>
            </li>

            </ul>
        </div>
        <div class="sidenav-footer position-absolute w-100 bottom-0 ">
            <div class="mx-3">
            <a class="btn bg-gradient-primary mt-4 w-100" href="https://www.creative-tim.com/product/material-dashboard-pro?ref=sidebarfree" type="button">Upgrade to pro</a>
            </div>
            
        </div>
    
    </aside>
</template>
<script type="text/javascript" src="https://kit.fontawesome.com/42d5adcbca.js"></script>
<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
$primary:coral;
    @import '@/assets/css/material-dashboard.css';
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700');
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');
    @import '@/assets/css/nucleo-icons.css';
</style>