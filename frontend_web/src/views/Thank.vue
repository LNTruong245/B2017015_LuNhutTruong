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
    <h2 style="text-align: center;">CẢM ƠN VÌ ĐÃ ĐẶT HÀNG</h2>
    <div class="wrapper">

        
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
    margin: 30px 100px;
    background-image: url("../assets/img/camon.png");
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