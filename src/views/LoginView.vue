<template>
<div class="">
    <div class="con">
        <div class="box">
            <h1>Login Form</h1>
            <!-- <form action="post" class="login-form"> -->
        
            <form method="POST" @submit.prevent="login" class="login-form" ref="loginForm">
                <Input name="email" type="email" placeholder="Enter Email ..." :isLogin="true" :errors="errors"/>
                <br>
                <Input name="password" type="password" placeholder="Enter Password ..." :isLogin="true" :errors="errors"/>
                <br>
                <input type="submit" name="btn" value="Login " class="btn">
                <input type="button" @click="goToRegister" name="btn" value="Register" class="btn">
            </form>
        </div>
    </div>
    <div class="res">
        <h2>Copyright © <span>JDkhan</span></h2>
    </div>
</div>
</template>

<script>
import Input from '@/components/Input.vue'
import { mapGetters } from 'vuex';
    export default {
        components: { Input },
        data() {
          return {
            errors: {}
          }
        },
        computed: {
            ...mapGetters([
                'getUrl'
            ])
        },
        methods: {
            login() {
                let formData = new FormData(this.$refs.loginForm);
                fetch(this.getUrl('/login'),{
                    method : 'POST',
                    body : formData
                }).then(res => res.json())
                .then(json => {
                  console.log(json);
                  this.errors = json.errors;
                    if(json.success == true){
                      this.errors = {}
                       localStorage.setItem('token',json.token);
                       localStorage.setItem('auth',JSON.stringify(json.user));
                       this.$store.dispatch('setToken',json.token);
                       this.$store.dispatch('setAuth',json.user);
                       this.$router.push('/');
                    }
                })
            },
            goToRegister(){
                this.$router.push('/register');
            }
        },
    }
</script>

<style lang="scss" scoped>
body {
    background: #fff;
    font-family: arial;
  }
   
  .con {
    margin-top: 150px;
    width: 670px;
    height: 400px;
    background: #fff;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #ddd;
    border-top-left-radius: 250px;
    border-bottom-right-radius: 250px;
    border-left: 2px solid #3292f2;
    border-right: 2px solid #ea4335f2;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
   
  .box {
    margin-top: 0px;
    width: 610px;
    height: 410px;
    background: #fff;
    margin-left: auto;
    margin-right: auto;
    -webkit-box-shadow: 0px 4px 62px -36px rgba (36, 36, 36, 0.85);
    -moz-box-shadow: 0px 4px 62px -36px rgba(36, 36, 36, 0.85);
    box-shadow: 0px 4px 62px -36px rgba(36, 36, 36, 0.85);
    border-bottom-left-radius: 250px;
    border-top-right-radius: 250px;
  }
   
  h1 {
    font-size: 35px;
    font-weight: bold;
    padding-top: 65px;
    margin-left: 160px;
    color: coral;
    margin-bottom: 30px;
  }
   
  h2 {
    font-size: 14px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
   margin-left: -150px;
    color: #ccc;
  }

  .res {
    width: 400px;
    height: 20px;
    margin-left: auto;
    margin-right: auto;
  }
   
  .login-form {
    width: 300px;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
  }
   

  .btn {
    width: 100px;
    height: 40px;
    background: coral;
    border: 1.5px solid #fff;
    color: #fff;
    border-radius: 50px;
    font-weight: bold;
    margin-right: 2px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  }
   
  .btn:hover {
    background: #fff;
    color: coral;
    border: 1.5px solid coral;
    transition: .5s;
    cursor: pointer;
  }
</style>