<script>
import CartService from '../services/Cart.service';
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "@/stores/Auth.store";
import toast from '../assets/js/toasts';
export default {
  data() {
    return {
      carts: [],
      toasts: {
        title: "Warning",
        msg: "Bạn chưa đăng nhập",
        type: "warn",
        duration: 3000
      },
    }
  },
  computed: {
    ...mapState(useAuthStore, {
      currentUser: "user",
    }),
    getlengthcarts() {
      return this.carts.length;
    },
  },
  methods: {
    toast,
    ...mapActions(useAuthStore, ["logout", "loadAuthState"]),
    slideSearch: function () {
      this.$el.querySelector("#input_search").classList.toggle("input_search");
      this.$el.querySelector("#input_search").focus();
    },
    async showcarts() {
      try {
        this.showuser();
        if (this.currentUser != null) {
          this.carts = await CartService.get(this.currentUser._id);
        }
      } catch (error) {
        console.log(error);
      }
    },
    showuser() {
      if (this.currentUser == null) {
        document.querySelector('.login').style.display = "none";
        document.querySelector('.not-login').style.display = "block";
      } else {
        document.querySelector('.login').style.display = "block";
        document.querySelector('.not-login').style.display = "none";
        document.querySelector('.data_user').innerHTML = this.currentUser.username;
      }
    },
    handlelogout() {
      this.logout();
      this.$router.push({ name: "login" });
    },
    gotocart() {
      if (!this.currentUser) {
        this.toast();
      } else {
        this.$router.push({ name: "CartShop" });
      }
    }
  },
  created() {
    this.loadAuthState();
  },
  mounted() {
    this.showcarts();
  },
};
</script>
<template>
  <nav class="navbar navbar-expand navbar-light ">
    <div class="container-fluid">

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto  ">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-dark font-weight-normal" aria-current="page">
              TRANG CHỦ
            </router-link>
          </li>

        </ul>
        <!-- <form class="d-flex flex-mb">
        <input class="form-control me-2 " id="input_search" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-dark" type="button" @click="slideSearch()"><i class="bi bi-search icon"></i></button>
      </form> -->

        <div class="Cart">
          <div class="wrapper_cart">
            <div class="cart_link" id="cart_link">
              <div>
                <div>
                  <!-- <h4 class="text-light">Shopping Cart</h4> -->
                  <router-link to="/cart" style="text-decoration: none;">
                  </router-link>
                </div>
              </div>
            </div>
            <i class="bi bi bi-cart3 icon  " @click="gotocart"></i>
            <!-- <span class="quantity_cart">{{ getlengthcarts }}</span> -->
          </div>
        </div>

        <div class="User">
          <div class="not-login">
            <i class="bi bi-person-circle icon" data-bs-toggle="collapse" href="#user"></i>
            <div class="collapse user_link" id="user">
              <div class="card card-body bg-light connect-shop">
                <router-link to="/login" class="text-black">Đăng nhập</router-link>
                <router-link to="/logup" class="text-black">Đăng ký</router-link>
              </div>
            </div>
          </div>
          <div>
            <span class="text-light data_user" data-bs-toggle="collapse" href="#user"></span>
            <div class="collapse user_link" id="user">
              <div class="card card-body bg-light connect-shop">
                <router-link to="/profile" class="text-black">Trang cá nhân</router-link>
                <a to="/" class="text-black" @click="handlelogout()">Đăng xuất</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.container-fluid{
  background-image: url('../assets/img/bg1.jpg');
}
.connect-shop {
  padding: 0;
}

.connect-shop a:hover {
  background-color: rgba(5, 5, 5, 0.8);
}

.connect-shop a {
  padding: 10px 10px;
}

.navbar-dark .navbar-nav .nav-link {
  color: white;
}

.User,
.Cart {
  margin-left: 20px;
}

.wrapper_cart {
  position: relative;
  width: 50px;
  height: 50px;
}

.quantity_cart {
  position: absolute;
  top: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  line-height: 20px;
  color: #fff;
  font-size: 16px;
  background: #ee4266;
  right: 10px;
  text-align: center;
}

.cart_link {
  position: absolute;
  top: 100%;
  right: 0;
  width: 500px;
  display: none;
  z-index: 100;
  overflow-y: scroll;
  max-height: 500px;
}

#cart_link::-webkit-scrollbar {
  width: 6px;
  background-color: #F5F5F5;
}

.wrapper_cart:hover>.cart_link {
  cursor: pointer;
  display: block;
  animation: fadeIn .8s ease;
}

.cart-info {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.cart-info::-webkit-scrollbar {
  width: 3px;
  background-color: #fff;
}

.cart-info::-webkit-scrollbar-thumb {
  background-color: #000000;
  border-radius: 6px;
}

.hiden {
  visibility: hidden;
}

.input_search {
  visibility: visible;
  animation: Search 0.5s linear;
}


.user_link {
  width: 150px;
  text-align: end;
  position: absolute;
  top: 97%;
  right: 10px;
  z-index: 10;
}

.user_link a {
  display: block;
  text-decoration: none;
}

@keyframes Search {
  0% {
    transform: translateX(5%);
  }

  100% {
    transform: translateX(0%);
  }
}

.item_cart {
  display: flex;
  justify-content: space-around;
  margin: 40px 0;
}

.item-img {
  margin-right: 10px;
}

.img-product {
  width: 100px;
  height: 100px;
  border-radius: 5px;
}

.item-name {
  width: 250px;
}

.name-product {
  white-space: wrap;
  min-width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.item_cart:hover {
  background-color: rgb(122, 122, 122);
}

.footer-cart {
  display: flex;
  justify-content: space-around;
}

@media only screen and (max-width:1024px) {

  .User,
  .Cart {
    display: none;
  }

  @keyframes Search {
    0% {
      transform: translateX(5%);
    }

    100% {
      transform: translateX(0%);
    }
  }
}

@keyframes fadeIn {
  0% {
    /* opacity: 0.5; */
    transform: translateY(-100%);
  }

  100% {
    /* opacity: 1; */
    transform: translateY(0%);
  }
}
</style>