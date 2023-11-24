<script>
    import FormloginVue from "../components/Formlogin.vue";
    import toastsVue from "../components/toasts.vue";
    export default {
        components: {
            FormloginVue,
            toastsVue
        },
    };
</script>
<template>
<toastsVue></toastsVue>
    <h1 style="margin-top: 100px ; margin-left: 100px; text-align: center;">ĐĂNG NHẬP </h1>
<div class="h-100">
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center h-100">
      
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <FormloginVue></FormloginVue>
      </div>
    </div>
  </div>
</div>  

</template>
<style>
.container{
  background-image: url("../assets/img/bg4.jpg");
}
</style>