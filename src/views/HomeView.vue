<template>
  <div class="row min-vh-100 container mx-auto">
    <div class="col-lg-8 vh-100 overflow-scroll pr-2">
      <Navbar />
      <div class="min-vh-100" v-if="isLoading">
            <div class="d-flex justify-content-center align-items-center vh-100">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
            </div>
       </div>
       <div class="v-else">
          <template v-if="isItem">
              <div class="">
                <Search :categories="categories" :subcategories="subcategories" @changeSubcategory="fetchSubcategories" @search="search"/>
              </div> 
              <div class="row row-cols-1 row-cols-md-3 g-4 mt-4">
                <Card v-for="item in items.data" :item="item" :key="item.id" @order="order"/>
              </div>
              <div class="my-5" style="float: right;">
                <Pagination v-if="items.meta" :links="items.meta.links" @fetchLink="fetchItems"/>
              </div>
          </template>
          <template v-else>
              <div class="alert alert-warning mt-5" role="alert">
                <h3>There is no items</h3>
              </div>
          </template>
       </div>
    </div>
    <div class="col-lg-4 vh-100 overflow-scroll px-3 py-3">
      <div class="text-primary d-flex justify-content-between align-items-center">
        <h4>My Cart</h4>
        <div class="position-relative">
          <i class="bi bi-cart" style="font-size:1.5rem;"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
           {{orders.length}}
          </span>
        </div>
      </div>

      <div class="row row-cols-1">
        <template v-if="orders.length>0">
          <CartItem v-for="order in orders" :order="order" :key="order.id" @delItem="delItem" @changeStock="changeStock"/>
          <div class="d-flex justify-content-between align-items-center pr-4">
            <h3>Total:</h3>
            <div class="mr-2">
              <h4>{{ TotalPrice }} <small class="text-black-50">mmk</small></h4>
            </div>
          </div>
          <div class="my-4 d-flex justify-content-end">
            <button class="btn btn-primary mr-2" @click="storeOrder">Order</button>
            <button class="btn btn-outline-primary mx-2" @click="deleteOrder">Cancel</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Card from '@/components/Card.vue'
import { mapGetters, mapState } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import CartItem from '@/components/CartItem.vue'
import Pagination from '@/components/Pagination.vue'
import Search from '@/components/Search.vue'
// @ is an alias to /src
export default {
  components: { Navbar, Card, CartItem, Pagination, Search },
  name: 'HomeView',
  data() {
    return {
      items: {},
      item: {},
      orders:[],
      categories:[],
      subcategories:[],
      isItem: false,
      isLoading: false,
      totalPrice: 0
    }
  },
  computed: {
    ...mapState([
      'auth'
    ]),
    ...mapGetters([
      'getUrl'
    ]),
    TotalPrice(){
     return this.totalPrice = this.orders.map((z)=>z.amount).reduce((x,y) => {
        return parseInt(x+y);
      });
    }
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
            //   order(id) {
            //     let formData = new FormData();
            //     formData.append('item_id',id);
            //     axios.post(this.getUrl('/orders'),formData).then(json => {
            //         if(json.data.success == true){
            //             this.showToast('success',json.data.message);
            //             this.fetchOrders();
            //         }else{
            //             this.showToast('error',json.data.message);
            //         }
            //     }).catch(e => {
            //       this.showToast('error',e.response.data.message);
            //       })
            // },
            order(id){
              // console.log(this.orders.filter(el => el.id == id));
              if(this.auth == null){
                this.$router.push('/login');
              }
              if(this.orders.filter(el => el.id == id).length != 0){
                this.showToast('error','This item is already exists')
              }else{ 
                this.fetchItem(id);
                console.log(this.orders);
              }
              // console.log(this.orders);
            },
            // delItem(id){
            //       axios.delete(this.getUrl('/orders/')+id)
            //       .then(json => {
            //         console.log(json);
            //         if(json.data.success == true){
            //           this.showToast('success',json.data.message);
            //           this.fetchOrders();
            //         }else{
            //           this.showToast('error',json.data.message);
            //         }
            //       })
            //       .catch(err => {
            //         // console.log(err.response.data.message);
            //         this.showToast('error',err.response.data.message);
            //       })
            // },
            delItem(id){
               this.orders = this.orders.filter(element => {
                return element.id != id;
              }); 
            },
            changeStock(id,op){
              this.orders = this.orders.filter(el => {
                if(el.id == id){
                  if(op == 'plus'){
                    el.stock = el.stock +1;
                    el.amount = parseInt(el.price * el.stock);
                  }else if(op == 'minus'){
                    if(el.stock>1){
                      el.stock = el.stock -1;
                      el.amount = parseInt(el.price * el.stock);
                    }else{
                      el.stock = 1;
                      el.amount = parseInt(el.price);
                    }
                  }else{
                    if(el.stock>1){
                      el.amount = parseInt(el.price * el.stock);
                    }else{
                      el.stock = 1;
                      el.amount = parseInt(el.price);
                    }
                  }
                }
                return el;
              })
            },
            search(keyword,subcategory_id=0){
              if(subcategory_id == 0){
                this.fetchItems(this.getUrl('/itemsnoauth?keyword='+keyword));
              }else{
                this.fetchItems(this.getUrl('/itembysubcategory?keyword='+keyword+"&&subcategory_id="+subcategory_id))
              }
            },
            storeOrder(){
              // console.log(this.orders);
              var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + 
            today.getSeconds();
            var dateTime = date+' '+time;
              let formData = new FormData();
              let list = [];
              this.orders.forEach((order) => {
                // console.log(order);
                  list.push( {
                    // 'id'      : index+1,
                    'user_id' : order.user_id,
                    'item_id' : order.id,
                    'stock'    : order.stock,
                    'amount'  : order.amount,
                    'created_at' : dateTime,
                    'updated_at' : dateTime
                  });
              });
              // formData.append('orders_list', JSON.stringify(list));
              // console.log(formData)
              let payload = {
                  orders_list: list
              };
              axios.post(this.getUrl('/orders'),payload)
              .then(res => {
                console.log(res);
                this.orders = [];
              })
              .catch(err=>{
                console.log(err)
              })
            },
            deleteOrder(){
              this.orders = [];
            },
    fetchOrders(){
      axios.get(this.getUrl('/orderbyauth'))
      .then(res=>{
        // console.log(res.data.orders);
        if(res.data.success == true){
          this.orders = res.data.orders;
        }
      })
      .catch(err => this.showToast('error',err.message))
    },
    fetchItems(url) {
      this.isLoading = true;
      axios.get(url)
      .then(res => {
        // console.log(res.data)
          this.isItem=true
          this.items = res.data
      })
      .catch(err => this.showToast('error',err.message))
      .finally(_=>this.isLoading=false)
    },
    fetchItem(id) {
      // this.isLoading = true;
      axios.get(this.getUrl('/items/')+id)
      .then(res => {
        // console.log(res.data)
          this.item = res.data.data;
          this.orders.push({
            'id' : this.item.id,
            'user_id' : this.$store.state.auth.id,
            'code' : this.item.code,
            'discount' : this.item.discount,
            'name' : this.item.name,
            'stock' : 1,
            'price' : this.item.price,
            'photo' : this.item.photo,
            'amount' : this.item.price
          })
          // console.log(this.item);
      })
      .catch(err => this.showToast('error',err.message))
    },
    fetchCategories(){
      axios.get(this.getUrl('/categoriesnoauth'))
      .then(res=>{
        if(res.data.success == true){ 
          // console.log(res.data);
          this.categories = res.data.categories;
        }
      })
      .catch(err => console.log(err));
    },
    fetchSubcategories(category_id){
      axios.get(this.getUrl('/subcategorybycategory/')+category_id)
      .then(res => {
        if(res.data.success == true){ 
          // console.log(res);
          this.subcategories = res.data.subcategories;
        }
      })
      .catch(err => console.log(err));
    },
  },
  mounted(){
    this.fetchItems(this.getUrl('/itemsnoauth'));
    // this.fetchOrders();
    this.fetchCategories();
    this.fetchSubcategories();
  }
}
</script>
<style lang="scss" scoped>
$primary:coral;
@import "bootstrap/scss/bootstrap.scss";
</style>
