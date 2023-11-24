<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import { mapActions } from "pinia";
    import { useAuthStore } from "@/stores/Auth.store";
    import toast from "../assets/js/toasts";
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        data() {
        const Loginform = yup.object().shape({
            username: yup
            .string()
            .required("Tên phải có giá trị.")
            .min(2, "Tên phải ít nhất 2 ký tự."),
           password: yup
            .string()
            .required("Mật khẩu phải có giá trị.")
            });
            return {
            Loginform,
            toasts:{
                    title:"Warning",
                    msg:"Tên đăng nhập hoặc tài khoản không đúng!",
                    type:"warn",
                    duration:2000
                 },
            }
        },
        methods:{
            toast,
            showPwd(){
            if(document.querySelector("#checkpwd").checked == true){
                  document.querySelector("#pwd").type = 'text';
            }else{
                  document.querySelector("#pwd").type = 'password';
            }
          },
          	...mapActions(useAuthStore, ["login"]),
            async handleLogin(user) {
              try {
                await this.login(user);
                location.href='http://localhost:8001/';
              } catch (error) {
                this.toast();
                console.log(error);
              }
            },
        },
    };
</script>
<template>
        <Form :validation-schema="Loginform" @submit="handleLogin">
          
          <div class="form-outline mb-4">
            <label class="form-label " for="username">Tên Tài Khoản</label>
            <Field 
                id="name"
                placeholder="Nhập tài khoản"
                name="username"
                type="text"
                class="form-control form-control-lg"
            />
            <ErrorMessage name="username" class="text-danger" />
          </div>

          <!-- Password input -->
          <div class="form-outline mb-3">
            <label class="form-label" for="pwd">Mật khẩu</label>
             <Field 
                id="pwd"
                placeholder="Nhập mật khẩu"
                name="password"
                type="password"
                class="form-control form-control-lg"
            />
            <ErrorMessage name="password" class="text-danger"/>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <!-- Checkbox -->
            <div class="form-check mb-0">
              <input class="form-check-input me-2" type="checkbox" value="" id="checkpwd" @click="showPwd()" />
              <label class="form-check-label" for="checkpwd">
                Hiện mật khẩu
              </label>
            </div>
          </div>
          <div class="text-center tex t-lg-start mt-4 pt-2">
              <button class="btn btn-primary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem;">Đăng Nhập</button>
            <p class="small fw-bold mt-2 pt-1 mb-0">Bạn chưa có tài khoản? <router-link to="/logup"
                class="link-danger">Đăng Ký </router-link></p>
          </div>
        </Form>
</template>