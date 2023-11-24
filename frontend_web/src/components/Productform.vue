
<script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  export default {
    props: {
      product: { type: Object, required: true },
      resetAfterSubmit: { type: Boolean, default: false },
    },
    data() {
      const productform = yup.object().shape({
        name: yup
          .string()
          .required("Tên phải có giá trị.")
          .min(5, "Tên phải ít nhất 5 ký tự."),
        img: yup.string().required("Hình ảnh phải có giá trị."),
        price: yup.string().required("Giá sản phẩm phải có giá trị."),
        description: yup
          .string()
          .required("Mô tả sản phẩm phải có giá trị.")
          .min(5, "Tên phải ít nhất 5 ký tự."),
        category: yup.string().required("Loại sản phẩm phải có giá trị."),
        size: yup.string().required("Kích thước sản phẩm phải có giá trị."),
        color: yup.string().required("Màu sắc sản phẩm phải có giá trị."),
      });
      return {
        productLocal: this.product,
        productform,
        isImageInputVisible: false,
      };
    },
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    emits: ["submit:product"],
    methods: {
      addImage() {
        this.isImageInputVisible = true;
      },
      submitproduct() {
        this.$emit("submit:product", this.productLocal);
        if (this.resetAfterSubmit) {
          this.$refs.contactForm.resetForm();
        }
      },
    },
  };
</script>

<template>
  <div class="wrapper">
    <Form :validation-schema="productform" @submit="submitproduct">
      <div class="form-group">
        <label for="nameproduct">TÊN GIÀY</label>
        <Field
          type="text"
          class="form-control"
          id="nameproduct"
          name="name"
          v-model="productLocal.title"
        />
        <ErrorMessage name="name" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="imgproduct">HÌNH ẢNH</label>
        <div style="display: flex; flex-direction: row;">
          <Field
            type="text"
            class="form-control"
            id="imgproduct"
            name="img"
            v-model="productLocal.img[0]"
          />
          <i
            class="bi bi-file-plus btn_img-add"
            @click="addImage()"
          ></i>
        </div>
        <input
          type="text"
          class="form-control"
          id="imgproduct2"
          name="img"
          style="display:none; margin: 10px 0;"
          v-show="isImageInputVisible"
          v-model="productLocal.img[1]"
        />
        <ErrorMessage name="img" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="priceproduct">GIÁ GIÀY</label>
        <Field
          type="number"
          class="form-control"
          id="priceproduct"
          name="price"
          v-model="productLocal.price"
        />
        <ErrorMessage name="price" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="nameproduct">MÔ TẢ GIÀY</label>
        <Field
          type="text"
          class="form-control"
          id="nameproduct"
          name="description"
          v-model="productLocal.desc"
        />
        <ErrorMessage name="description" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="categoryproduct">LOẠI</label>
        <Field
          type="text"
          class="form-control"
          id="categoryproduct"
          name="category"
          v-model="productLocal.categories"
        />
        <ErrorMessage name="category" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="sizeproduct">KÍCH THƯỚC</label>
        <Field
          type="text"
          class="form-control"
          id="sizeproduct"
          name="size"
          v-model="productLocal.size"
        />
        <ErrorMessage name="size" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="colorproduct">MÀU</label>
        <Field
          type="text"
          class="form-control"
          id="colorproduct"
          name="color"
          v-model="productLocal.color"
        />
        <ErrorMessage name="color" class="text-danger" />
      </div>
      <button type="submit" class="btn btn-primary">Lưu</button>
      <router-link to="/ListSP" style="margin: 10px;">
        <button class="btn btn-danger">Trở về</button>
      </router-link>
      <br />
    </Form>
  </div>
</template>

<style scoped>
  .wrapper {
    margin: 50px 200px;
  }
  .btn_img-add {
    font-size: 30px;
    color: rgb(0, 0, 0);
  }
</style>
