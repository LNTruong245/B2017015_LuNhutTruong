<script>
import ProductService from "../services/Product.service";
import toastjs from "../assets/js/toasts";
export default {
    data() {
        return {
            toasts: {
                title: "",
                msg: "",
                type: "",
                duration: 0
            },
        }
    },
    props: {
        products: Array,
        refeshlist: Function,
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        toastjs,
        async delproduct(id) {
            try {
                await ProductService.delete(id);
                this.refeshlist();
                this.toasts.title = "Success",
                    this.toasts.msg = "Đã xóa người dùng",
                    this.toasts.type = "success",
                    this.toasts.duration = 2000
                this.toastjs();
            } catch (error) {
                console.log(error);
                this.toasts.title = "Warning",
                    this.toasts.msg = "Bạn chưa đăng nhập hoặc bạn không phải ADMIN",
                    this.toasts.type = "warn",
                    this.toasts.duration = 2000
                this.toastjs();
            }
        },
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
    }
}
</script>
<template>
    <ul class="list-group">
        
        <li class="list-group-item product-item d-flex justify-content-between" v-for="(product, index) in products"
            :key="product._id" @click="updateActiveIndex(index)">
            
            <span>{{ product.title }}</span>
            <span>{{ product.price }}</span>
            <span>{{ product.size }}</span>
            <span>{{ product.color }}</span>

            <!-- <span>{{ product.img }}</span> -->

            <div class="bi bi-trash3-fill"  @click="delproduct(product._id)">
                <!-- <button @click="delproduct(product._id)"> </button> -->
            </div>
         
            

        </li>
    </ul>
</template>
<style scoped>
.list-group-item:hover {
    background-color: #c62704;
    color: azure;
}
.list-group{
    background-image: url('../assets/img/gh.jpg');
}

</style>