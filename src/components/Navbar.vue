<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary position-sticky" style="top:0;z-index: 10">
    <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
        <i class="bi bi-bag-dash" style="font-size: 1.5rem;"></i>
        MyShop
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" v-if="auth != null">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="auth.name != null">
                <li class="nav-item dropdown">
                <router-link class="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{auth.name}}
                </router-link>
                <ul class="dropdown-menu">
                    <li><router-link class="dropdown-item" to="/dashboard">Dashboard</router-link></li>
                    <li><router-link class="dropdown-item" to="#">Another action</router-link></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><button class="dropdown-item" type="button" @click="logout">Logout</button></li>
                </ul>
                </li>
            </ul>

        <!-- <form class="d-flex" role="search">
            <div class="input-group">
                <input class="form-control" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-light" type="submit"><i class="bi bi-search"></i></button>
            </div>
        </form> -->
        </div>
        <div v-else class="">
            <router-link class="navbar-brand" to="/login">
                <!-- <i class="bi bi-bag-dash" style="font-size: 1.5rem;"></i> -->
                Login
            </router-link>
            <router-link class="navbar-brand" to="/register">
                <!-- <i class="bi bi-bag-dash" style="font-size: 1.5rem;"></i> -->
                Register
            </router-link>
        </div>
    </div>
</nav>
</template>

<script>
import { mapState } from 'vuex'
    export default {
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

</style>