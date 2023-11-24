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
export default {
    data() {
        return {
            users: [],
            products: [],
            activeIndex: -1,
            activeUser: -1,
            toasts: {
                title: "Warning",
                msg: "Bạn không phải ADMIN",
                type: "warn",
                duration: 3000
            },
        }
    },
    computed: {
        getindex() {
            if (this.activeIndex != -1) {
                const list = document.querySelectorAll(".product-item");
                list.forEach(element => {
                    element.classList.remove("active");
                });
                list[this.activeIndex].classList.add("active");
                return this.products[this.activeIndex];
            }
        },
        getindexuser() {
            if (this.activeUser != -1) {
                const list = document.querySelectorAll(".user-item");
                list.forEach(element => {
                    element.classList.remove("active");
                });
                list[this.activeUser].classList.add("active");
                return this.users[this.activeUser];
            }
        }
    },
    components: {
        HeaderShopVue,
        ListUser,
        ListProduct,
        toastsVue,
        Productcard,
        Usercard
    },
    methods: {
        toast,
        async getall() {
            try {
                this.products = await ProductService.getAll();
                this.users = await UserService.getAll();
            } catch (error) {
                console.log(error);
                this.toast();
                setTimeout(() => {
                    this.$router.push({ name: "ShopMain" });
                }, 1000);
            }
        },
    },
    created() {
        this.getall();
    },
}
</script>

<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href=""><router-link to="/admin" class="text-white">
                            ADMIN</router-link></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href=""><router-link to="/ListKH" class="text-white">Danh Sách Người
                            Dùng</router-link></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href=""><router-link to="/ListSP" class="text-white">Danh Sách Sản
                            Phẩm</router-link></a>
                </li>
                <!-- <li class="nav-item">
            <a class="nav-link" href="">Download</a>
        </li> -->
            </ul>
        </div>
    </nav>
    <!-- <HeaderShopVue></HeaderShopVue> -->
    <!-- <toastsVue></toastsVue> -->
    <div class="header text-center bg-primary text-white">
        <h2>QUẢN LÝ TÀI KHOẢN</h2>
    </div>

    <div style="margin-top:50px; margin-left: 50px;">

        <div>
            <div>
                <h4>Danh Sách Người Dùng</h4>

            </div>

            <div class="list_item_user d-flex" id="user">
                <ListUser :users="users" :refeshlist="getall" v-model:activeUser="activeUser"></ListUser>
                <div class="card_product border border-light border-2 h-100 bg-light text-dark" style="padding: 10px;"
                    v-if="getindexuser">
                    <h5>Vai Trò</h5>
                    <Usercard :users="getindexuser"></Usercard>

                </div>
            </div>
        </div>

        <br>
    </div>   
</template>
<style scoped>
.list_item_product,
.list_item_user {
    max-height: 500px;
    overflow-y: scroll;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

#product::-webkit-scrollbar,
#user::-webkit-scrollbar {
    width: 6px;
    background-color: #f8eeee;
}
.background{
    background-image: url('../assets/img/bg1.jpg');
}
</style>