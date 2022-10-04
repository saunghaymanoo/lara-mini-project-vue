<template>
    <div class="card border-0 border-b-1 mt-4">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <img :src="order.photo" style="width:50px;" alt="">
                <button class="btn btn-outline-primary" @click="delItem(order.id)">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
            <div class="text-primary my-3">
                <h5>{{order.name}}</h5>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex">
                    <button class="btn btn-outline-primary" @click="changeStock(order.id,'plus')">
                        <i class="bi bi-plus-lg"></i>
                    </button>
                    <input type="number" name="stock" id="stock" @keyup="changeStock(order.id)" v-model="order.stock" class="form-control w-25 mx-2 " min="1">
                    <button class="btn btn-outline-primary" @click="changeStock(order.id,'minus')">
                        <i class="bi bi-dash-lg"></i>
                    </button>
                </div>
                <div class="d-flex align-items-end">{{order.amount}} <small class="text-black-50 mx-2">mmk</small></div>
            </div>
        </div>
        <hr>
    </div>
</template>

<script>
    export default {
        props: {
            order: {
                type: Object,
                default: {}
            },
        },
        methods: {
            delItem(id) {
                this.$emit('delItem',id);
            },
            changeStock(id,op){
                this.$emit('changeStock',id,op)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>