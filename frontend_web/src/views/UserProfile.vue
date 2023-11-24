
<script>
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/Auth.store";
import HeaderShop from "../components/HeaderShop.vue";
import EditUser from "../components/EditUser.vue";
import toastsVue from "../components/toasts.vue";
export default {
	data(){
		return{
			checkedit:false,
		}
	},
	components:{
		HeaderShop,
		EditUser,
		toastsVue
	},
	computed: {
		...mapState(useAuthStore, {
			currentUser: "user",
		}),
	},
	methods:{
		showedit(){
			if(!this.checkedit){
				this.checkedit=true;
			}
			else{
				this.checkedit=false;
			}
		},

	}
};
</script>
<template>
	<HeaderShop></HeaderShop>
	<toastsVue></toastsVue>
	<div style="display: flex;">
	<div v-if="currentUser" style="margin-left: 600px; padding-bottom: 140px;">
		<header>
			<h3 style="text-align: center;">
				THÔNG TIN KHÁCH HÀNG 
				 

			</h3>
		</header>
		<div class="row">
			<div class="col-md-8">
				<p class="text-break">
					<strong>Tên tài khoản:</strong>
					{{ currentUser.username }}
				</p>
				<p>
					<strong>Email:</strong>
					{{ currentUser.email }}
				</p>
			</div>
		</div>
		<router-link to="/">
			<!-- <button class="btn btn-danger">Trở về</button> -->
		</router-link>
		<button class="btn btn-success text-light" style="margin-left: 20px;" @click="showedit">Chỉnh sửa</button>
	</div>
	<div v-if="checkedit" style="display: flex;flex-direction: column;justify-content: center;">
			<EditUser :user="currentUser"></EditUser>
	</div>	
</div>
</template>

