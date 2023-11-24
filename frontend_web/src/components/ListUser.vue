

<script>
import UserService from "../services/User.service";
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
        users: Array,
        refeshlist: Function,
        activeUser: { type: Number, default: -1 },
    },
    emits: ['update:activeUser'],
    methods: {
        toastjs,
        async deluser(id) {
            try {
                await UserService.delete(id);
                this.refeshlist();
                this.toasts.title = "Success";
                this.toasts.msg = "Đã xóa người dùng";
                this.toasts.type = "success";
                this.toasts.duration = 2000;
                this.toastjs();
            } catch (error) {
                console.log(error);
                this.toasts.title = "Warning";
                this.toasts.msg = "Tài khoản không phải ADMIN";
                this.toasts.type = "warn";
                this.toasts.duration = 2000;
                this.toastjs();
            }
        },
        updateuserindex(index) {
            this.$emit("update:activeUser", index)
        }
    }
}
</script>
<template>
    <ul class="list-group">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Tên tài khoản</th>
                    <th scope="col">Xóa</th>
                </tr>
            </thead>
            <tbody>
                <td>
                    <li class="user-item d-flex justify-content-between" v-for="(user, index) in users"
                        v-show="!user.isAdmin" :key="user._id" @click="updateuserindex(index)">
                        <span>{{ user.username }}</span>
                        &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;
                        <span>{{ user.email }}</span>
                        &ensp; &ensp; &ensp; &ensp;
                        <div class="bi bi-trash3-fill" @click="deluser(user._id)"></div>
                    </li>
                </td>
            </tbody>
        </table>
    </ul>
</template>
<style scoped>
.list-group-item:hover {
    background-color: #c62704;
    color: azure;
}
</style>
