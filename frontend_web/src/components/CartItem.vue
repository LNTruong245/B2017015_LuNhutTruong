<script>
    export default{
        data(){
            return{
                products:[],
            }
        },
        props:{
            refeshlistcart:Function,
            carts:Array,
        },
        emit:[
            "deleted:cartIndex"
        ],
        methods:{
        deletedcart(index){
            this.$emit("deleted:cartIndex",index);
        },
    },
}
</script>
<template>
    
   <div class="row mb-4   align-items-center" 
            v-for="(item,index) in carts">
          <div class="col-md-2 col-lg-2 col-xl-2">
            <img
                :src="item.img"
                class="img-fluid" alt="Cotton T-shirt">
            </div>
            <div class="col-md-6 col-lg-6 col-xl-6">
                <h6 >{{item.title}}</h6>
                    <div>
                        <span >Màu sắc :<span>{{item.color}}</span></span>
                        <br>
                        <span >Kích Thước :<span>{{item.size}}</span></span>
                        <br>
                        <span >Số lượng :<span>{{item.quantity}}</span></span>
                      </div>
            </div>
    
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 class="mb-0 price">{{item.price *item.quantity}} VNĐ</h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 bi bi-trash"  @click="deletedcart(index)" >
            </div>
    </div>   
     
</template>