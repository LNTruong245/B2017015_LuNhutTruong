<script>
import HeaderShop from '@/components/HeaderShop.vue';
import CartService from '../services/Cart.service';
import toastsVue from '../components/toasts.vue';
import toastsjs from '../assets/js/toasts.js'
import CartItem from "../components/CartItem.vue";
export default {
  data() {
    return {
      carts: [],
      toasts: {
        title: "",
        msg: "",
        type: "",
        duration: 0
      },
    }
  },
  components: {
    HeaderShop,
    toastsVue,
    CartItem
  },
  methods: {
    getiduser() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user._id;
    },
    async getcarts() {
      try {
        this.carts = await CartService.get(this.getiduser());
      } catch (error) {
        console.log(error);
      }
    },
    async delcart(index) {
      // this.toasts.title = "Deleted",
      // this.toasts.msg = "XÓA SẢN PHẨM THÀNH CÔNG",
      // this.toasts.type = "error",
      // this.toasts.duration = 2000
      // this.toastsjs();
      await CartService.delete(this.carts[index]._id)
      this.refeshlistcart();
    },
    toastsjs,
    refeshlistcart() {
      this.getcarts();
    },
    registerproduct() {
      if (this.carts.length > 0) {

        this.toasts.msg = "THANH TOÁN THÀNH CÔNG",
          this.toasts.type = "success",
          this.toasts.duration = 2000,
          this.toastsjs();
      } else {
        this.toasts.title = "Failed",
          this.toasts.msg = "Bạn chưa có sản phẩm",
          this.toasts.type = "error",
          this.toasts.duration = 2000,
          this.toastsjs();
      }
    },
    total() {
      var total = 0;
      for (var i in this.carts) {
        total += (this.carts[i].price * this.carts[i].quantity);
      }
      return total;
    }
  },
  created() {
    this.refeshlistcart();
  },
}
</script>

<template>
  <HeaderShop></HeaderShop>
  <toastsVue></toastsVue>
  <h2 style="text-align: center;">CHI TIẾT ĐẶT HÀNG</h2>
  <!-- <h4 >CHI TIẾT ĐẶT HÀNG</h4> -->

  <section>
    <div class="container">
      <div class=" h-200">
        <div class="col-12">
          <div>
            <div>
              <div>
                <div class="col-lg-8">
                  <div>
                    <div>
                      <!-- <h6 class="mb-0 text-muted">{{carts.length}} sản phẩm</h6> -->
                    </div>
                    <hr class="my-4">
                    <CartItem :refeshlistcart="refeshlistcart" :carts="carts" @deleted:cartIndex="delcart"></CartItem>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="container d-flex justify-content-center mt-5 mb-5">



        <div class="row g-3">

          <div class="col-md-6">

            <span>Thanh toán trực tuyến</span>
            <div class="card">

              <div class="accordion" id="accordionExample">

                <div class="card">
                  <div class="card-header p-0" id="headingTwo">
                    <h2 class="mb-0">
                      <button class="btn btn-light btn-block text-left collapsed p-3 rounded-0 border-bottom-custom"
                        type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false"
                        aria-controls="collapseTwo">
                        <div class="d-flex align-items-center justify-content-between">

                          <span>Paypal</span>
                          <img src="https://i.imgur.com/7kQEsHU.png" width="30">

                        </div>
                      </button>
                    </h2>
                  </div>
                  <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                    <div class="card-body">
                      <input type="text" class="form-control" placeholder="Paypal email">
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-header p-0">
                    <h2 class="mb-0">
                      <button class="btn btn-light btn-block text-left p-3 rounded-0" data-toggle="collapse"
                        data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <div class="d-flex align-items-center justify-content-between">

                          <span>Loại thẻ: </span>
                          <div class="icons">
                            <img src="https://i.imgur.com/2ISgYja.png" width="30">
                            <img src="https://i.imgur.com/W1vtnOV.png" width="30">
                            <img src="https://i.imgur.com/35tC99g.png" width="30">
                            <img src="https://i.imgur.com/2ISgYja.png" width="30">
                          </div>

                        </div>
                      </button>
                    </h2>
                  </div>

                  <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                    data-parent="#accordionExample">
                    <div class="card-body payment-card-body">

                      <span class="font-weight-normal card-text">Số thẻ</span>
                      <div class="input">

                        <i class="fa fa-credit-card"></i>
                        <input type="text" class="form-control" placeholder="0000 0000 0000 0000">

                      </div>

                      <div class="row mt-3 mb-3">

                        <div class="col-md-6">

                          <span class="font-weight-normal card-text">Ngày </span>
                          <div class="input">

                            <i class="fa fa-calendar"></i>
                            <input type="text" class="form-control" placeholder="MM/YY">

                          </div>

                        </div>


                        <div class="col-md-6">

                          <span class="font-weight-normal card-text">CVC/CVV</span>
                          <div class="input">

                            <i class="fa fa-lock"></i>
                            <input type="text" class="form-control" placeholder="000">

                          </div>

                        </div>


                      </div>

                      <!-- <span class="text-muted certificate-text"><i class="fa fa-lock"></i> Your transaction is secured
                        with ssl certificate</span> -->

                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

          <div class="col-md-6">
            <h5>TỔNG TIỀN: {{ total() }} VNĐ</h5>

            <div class="col-lg-4 text-align-center">

              <!-- <h3>THANH TOÁN</h3> -->


              <div class="d-flex justify-content-between mb-5 ">
               
                <!-- <h5><span> VNĐ</span></h5> -->
                <button class="btn btn-dark" @click="registerproduct()"><router-link to="/thank" class="text-white">Thanh
                    Toán</router-link></button>

              </div>



            </div>
          </div>

        </div>


      </div>


    </div>
  </section>
</template>
<style scoped>
@media (min-width: 1025px) {
  .h-custom {
    height: 100%;
  }
}

.card-registration .select-input.form-control[readonly]:not([disabled]) {
  font-size: 1rem;
  line-height: 2.15;
  padding-left: .75em;
  padding-right: .75em;
}

.card-registration .select-arrow {
  top: 13px;
}

.bg-grey {
  background-color: #ffffff;
}

@media (min-width: 992px) {
  .card-registration-2 .bg-grey {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}

@media (max-width: 991px) {
  .card-registration-2 .bg-grey {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}

.container {
  background-color: grey;

}
</style>