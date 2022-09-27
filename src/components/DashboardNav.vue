<template>
            <!-- Navbar -->
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-2 my-4 border-radius-xl shadow-none" id="navbarBlur" data-scroll="true">
        <div class="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">

        <li class="breadcrumb-item text-sm" v-for="(b, index) in breadcrumbs" :key="b" :class="{'active':index == breadcrumbs.length-1}">
            <router-link class="opacity-5" v-if="index == breadcrumbs.length-1" to="#">{{b}}</router-link>
            <router-link class="opacity-5 text-dark" v-else :to="{name:b}">{{b}}</router-link>
        </li>
        <!-- <li class="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li> -->
        </ol>
        </nav>

        <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div class="ms-md-auto pe-md-3 d-flex align-items-center">
        <div class="input-group input-group-outline">
        <label class="form-label">Type here...</label>
        <input type="text" class="form-control" onfocus="focused(this)" onfocusout="defocused(this)">
        </div>
        </div>
        <ul class="navbar-nav  justify-content-end">
            <li class="nav-item d-flex align-items-center">
            <router-link class="btn btn-outline-primary btn-sm mb-0 me-3" target="_blank" to="/">Product Items</router-link>
            </li>
        <!-- <li class="nav-item d-flex align-items-center"> -->
        <!-- <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="auth.name != null"> -->
                <li class="nav-item dropdown">
                <router-link class="nav-link dropdown-toggle d-flex align-items-center" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="material-icons opacity-10">manage_accounts</i>
                    <span v-if="auth">{{auth.name}}</span>
                </router-link>
                <ul class="dropdown-menu">
                    <li><router-link class="dropdown-item" to="/dashboard">Dashboard</router-link></li>
                    <li><router-link class="dropdown-item" to="#">Another action</router-link></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><button class="dropdown-item" type="button" @click="logout">Logout</button></li>
                </ul>
                </li>
            <!-- </ul> -->
        
        </ul>
        </div>
        </div>
    </nav>
            <!-- End Navbar -->
</template>
<script type="text/javascript" src="https://kit.fontawesome.com/42d5adcbca.js"></script>
<script>
import { mapState } from 'vuex'
    export default {
        props: {
            breadcrumbs: {
                type: Array,
                default: []
            },
        },
        computed: {
            ...mapState([
                'auth'
            ])
        },
        methods: {
            logout() {
                this.$store.dispatch('logout');
                this.$router.push('/');
            }
        },
    }
</script>

<style lang="scss" scoped>
$primary:coral;
    @import '@/assets/css/material-dashboard.css';
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700');
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');
    @import '@/assets/css/nucleo-icons.css';
</style>