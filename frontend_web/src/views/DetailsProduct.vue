<script>
import HeaderShop from '@/components/HeaderShop.vue'
import ProductService from '../services/Product.service'
import CartService from '../services/Cart.service'
import toastsVue from '../components/toasts.vue'
import toastsjs from '../assets/js/toasts.js'
import { mapState } from 'pinia'
import { useAuthStore } from "@/stores/Auth.store";
export default {
    data() {
        return {
            detailproduct: [],
            cartitem: {
                userId: '',
                productId: this.$route.params.id,
                quantity: 1,
                title: "",
                img: "",
                price: "",
                size: "",
                color: "",
            },
            carts: [],
            toasts: {
                // title: "THÊM VÀO GIỎ HÀNG THÀNH CÔNG",
                // msg: "+1 sp",
                // type: "success",
                // duration: 2000
            },
            sub_quantity: 1,
        }
    },
    computed: {
        ...mapState(useAuthStore, {
            currentUser: "user",
        }),
    },
    components: {
        HeaderShop,
        toastsVue
    },
    methods: {
        toastsjs,
        async getproduct() {
            try {
                this.detailproduct = await ProductService.get(this.$route.params.id);
                this.cartitem.title = this.detailproduct.title;
                this.cartitem.img = this.detailproduct.img[0];
                this.cartitem.price = this.detailproduct.price;
                this.cartitem.size = this.detailproduct.size;
                this.cartitem.color = this.detailproduct.color;
            } catch (error) {
                console.log(error);
            }
        },
        async getidcart() {
            this.cartitem.quantity = this.sub_quantity;
            var exitcart = false;

            try {
                this.carts = await CartService.get(this.currentUser._id);
                this.cartitem.userId = this.currentUser._id;
                this.carts.map((cartproduct) => {
                    if (cartproduct.productId == this.cartitem.productId) {
                        this.cartitem.quantity += cartproduct.quantity;
                        CartService.update(cartproduct._id, this.cartitem);
                        exitcart = true;
                        this.toastsjs();
                        setTimeout(() => {
                            this.$router.push({ name: 'CartShop' });
                        }, 1000);
                    }
                })
                if (exitcart === false) {
                    this.cartitem.userId = this.currentUser._id;
                    CartService.create(this.cartitem);
                    this.toastsjs();
                    setTimeout(() => {
                        this.$router.push({ name: 'CartShop' });
                    }, 1000);
                }
            } catch (error) {
                // this.toasts.title = "Message",
                    this.toasts.msg = "ĐĂNG NHẬP ĐỂ MUA HÀNG",
                    this.toasts.type = "warn",
                    this.toasts.duration = 3000,
                    this.toastsjs();
                console.log(error);
            }
        },
    },
    created() {
        this.getproduct();
    },

}
</script>
<template>
    <HeaderShop></HeaderShop>
    
    <toastsVue></toastsVue>
    <h2 style="text-align: center;">CHI TIẾT SẢN PHẨM</h2>
    <div class="wrapper">

        <div class="details d-flex justify-content-between flex-wrap">
            <div class="img_product">
                <div id="carouselExampleControls"  data-bs-ride="carousel">
                    <div >
                        <div  v-for="(img, index) in detailproduct.img" :class="{ active: index == 0 }">
                            <img :src="img" class="d-block w-50" alt="..." >
                        </div>
                    </div>

            
                </div>
            </div>
            <div class="info_product col" style="margin-right: 50px; font:medium; color:black">
                <h4 style="font-weight: 600;">{{ detailproduct.title }}</h4>
                <p>{{ detailproduct.desc }}
                </p>
                <h5>Giá: {{ detailproduct.price }} VNĐ</h5>


                <div class="size_product">
                    <h6>Size:{{ detailproduct.size }}</h6>

                </div>
                <div class="color_product">
                    <h6>Màu sắc: {{ detailproduct.color }} </h6>

                </div>
                <div class="quatitly-product">
                    <h6>Số lượng </h6> <input id="quantity" name="quantity" type="number" v-model="sub_quantity"
                        class="form-control form-control-sm" style="width:50px; border: none;" />
                </div>
                
                <div class="btn_product">
                    <button type="submit" class="btn btn-dark" style="width:100px;  background-color:red; color:aqua" @click="getidcart()">Đặt hàng</button>
                    <!-- <router-link to="/">
                        <button type="button" class="btn btn-dark" style="width:150px;">Trở về</button>
                    </router-link> -->
                </div>
            </div>
            <!-- <div class="describe_product col">
                <h4>Mô tả sản phẩm</h4>
                <p>{{detailproduct.desc}}
                </p>
            </div> -->
        </div>
    </div>
</template>
<style scoped>
.btn_product {
    display: flex;
    justify-content: space-around;
}

.size_product,
.color_product {
    display: flex;
    flex-direction: column;
    max-width: 400px;
}

.list_btn_size,
.list_btn_color {
    margin: 0 10px;
    display: flex;
    flex-wrap: wrap;
}

.list_btn_size button,
.list_btn_color button {
    margin: 10px 5px;
}

.btn {
    width: 100px;
}

.wrapper {
    margin:30px 100px;
    background-image: url("../assets/img/bg3.jpg");
    /* width: 1; */
    height: 300px;

}

.heading {
    margin: 0 100px;
}

.title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100px;
}

</style>