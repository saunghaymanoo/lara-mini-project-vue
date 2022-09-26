<template>
        <div class="col">
            <div class="card product">
                <img :src="item.photo" class="card-img-top" alt="...">
                <div class="card-body border rounded">
                    <h4 class="card-title font-weight-bold text-nowrap overflow-hidden text-primary">{{item.name}}</h4>
                    <div class="">
                        <i class="bi"></i>
                    </div>
                    <p class="card-text text-black-50">{{item.description.substr(0,100)+"..." }}</p>
                    <hr>
                    <div class="d-flex justify-content-between align-items-end mt-3">
                        <span class="font-weight-bold">{{item.price}} <small class="text-black-50">mmk</small></span>
                        <button class="btn btn-sm btn-outline-primary add-to-cart" @click="order(item.id)">
                            Add <i class="bi bi-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'
    export default {
        props: {
            item: {
                type: Object,
                default: {}
            },
        },
        computed: {
            ...mapGetters([
                'getUrl'
            ])
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
            order(id) {
               this.$emit('order',id);
            }
        },
    }
</script>

<style lang="scss" scoped>
        .product{
            border:none !important;
        }
        .product img{
            height: 160px;
            width: auto;
            margin-bottom: -50px;
            margin-left: 1rem;
            transition: 0.5s;
            position: relative;
            z-index: 5px;
        }
        .product:hover img{
            transform: scale(1.05) rotate(-10deg);
        }
        .product .card-title{
            margin-top: 50px;
        }

        .img-in-cart{
            height: 50px;
        }
        .overflow-scroll{
            overflow: scroll;
        }
</style>