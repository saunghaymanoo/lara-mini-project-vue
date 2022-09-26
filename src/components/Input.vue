<template>
    <div class="">
        <label :for="name" class="form-label">{{label}}</label> <br>
        <input :type="type" :name="name" :value="value" :placeholder="placeholder" :class="{'login-input':isLogin,'is-invalid':errors[name],'form-control': !isLogin}"/>
        <div :class="{'invalid-feedback':errors[name]}" v-if="errors[name]">{{errors[name][0]}}</div>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: null
            },
            type: {
                type: String,
                default: "text"
            },
            name: {
                type: String,
                default: "Input Name"
            },
            placeholder: {
                type: String,
                default: null
            },
            isLogin: {
                type: Boolean,
                default: false
            },
            errors:{
            },
            value:{
                default:''
            }
        },
        
    }
</script>

<style lang="scss" scoped>
.login-input {
    width: 280px;
    height: 15px;
    font-size: 16px;
    color: #262526;
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 1px solid coral;
    outline: none;
  }
</style>