
<script>
import toastjs from "../assets/js/toasts";
import toastsVue from "../components/toasts.vue";
import ProductService from "../services/Product.service";
import HeaderShop from "../components/HeaderShop.vue";
import Productform from "../components/Productform.vue";
export default {
  data(){
    return {
         toasts:{
              title:"Success",
              msg:"Thêm sản phẩm thành công",
              type:"success",
              duration:2000
              },
    }
  },
  components: {
    HeaderShop,
    Productform,
    toastsVue
    },
	methods: {
    toastjs,
        async addproduct(data) {
            try {
                await ProductService.create(data);
                this.toastjs();
                setTimeout(()=>{
                  location.reload();
                },2000);
            }catch(error) {
                console.log(error);
                    this.toasts.title = "Warning",
                    this.toasts.msg="Tài khoản không phải ADMIN",
                    this.toasts.type = "warn",
                    this.toasts.duration=2000
                    this.toastjs();
                }
            },  
	},
};
</script>
<template>
<HeaderShop></HeaderShop>
<toastsVue></toastsVue>
	<div class="page">
		<div>
			<h4>THÊM SẢN PHẨM</h4>
			<Productform
				:product="{img:[]}"
        @submit:product="addproduct"
        :resetAfterSubmit="false"
			/>
		</div>
	</div>
</template>
