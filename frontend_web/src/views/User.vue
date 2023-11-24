<script>
import HeaderShopVue from "../components/HeaderShop.vue";
import ListUser from "../components/ListUser.vue";
import UserService from "../services/User.service";
import toastsVue from "../components/toasts.vue";
import ProductService from "../services/Product.service";
import ListProduct from "../components/ListProduct.vue";
import Productcard from "../components/Productcard.vue";
import Usercard from "../components/Usercard.vue";
import toast from "../assets/js/toasts";
    export default{
        data(){
            return{
                users:[],
                products:[],
                activeIndex:-1,
                activeUser:-1,
                toasts:{
                    title:"Warning",
                    msg:"Bạn không phải ADMIN",
                    type:"warn",
                    duration:3000
                 },
            }
        },
        computed:{
             getindex(){
                 if(this.activeIndex!=-1){
                     const list = document.querySelectorAll(".product-item");
                     list.forEach(element => {
                         element.classList.remove("active");
                     });
                     list[this.activeIndex].classList.add("active");
                    return this.products[this.activeIndex];
                 }
            },
              getindexuser(){
                 if(this.activeUser!=-1){
                     const list = document.querySelectorAll(".user-item");
                     list.forEach(element => {
                         element.classList.remove("active");
                     });
                     list[this.activeUser].classList.add("active");
                    return this.users[this.activeUser];
                 }
            }
        },
        components:{
            HeaderShopVue,
            ListUser,
            ListProduct,
            toastsVue,
            Productcard,
            Usercard
        },
        methods:{
            toast,
                async getall(){
            try{
                 this.products = await ProductService.getAll();
                 this.users = await UserService.getAll();
            }catch(error){
                console.log(error);
                this.toast();
                setTimeout(()=>{
                    this.$router.push({name:"ShopMain"});
                },1000);
                }
            },
        },
    created(){
        this.getall();
    },
}
</script>

<template>
     
        <HeaderShopVue></HeaderShopVue>
        <!-- <toastsVue></toastsVue> -->
        <div class="header text-center">
            <h2>ADMIN QUẢN LÝ</h2>
        </div>
        
        <div  style="margin-top:30px; margin-left: 100px;">

            <div  >
                <div >
                    <h4>Danh Sách Người dùng</h4>
                </div>
                    <div class="list_item_user d-flex" id="user">
                        <ListUser :users="users"  :refeshlist="getall" v-model:activeUser="activeUser"></ListUser>
                           <div class="card_product border border-light border-2 h-100 bg-light text-dark" style="padding: 10px;" v-if="getindexuser">  
                            <h5>Chi tiết người dùng</h5>
                            <Usercard :users="getindexuser"></Usercard>
                            
                        </div>
                    </div>
            </div>
            <br>

        </div>
</template>
<style scoped>
.list_item_product,.list_item_user{
    max-height: 500px;
    overflow-y:scroll;
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
#product::-webkit-scrollbar,#user::-webkit-scrollbar  {
    width: 6px;
    background-color: #f8eeee;
} 
</style>