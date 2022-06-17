<template>
  <div class="login-container">
    <div class="bg-wrap">
      <div class="mask"></div>
      <img src="@/assets/images/login_bg.webp" alt="">
    </div>
    <div class="form-wrap">
      <h1 id="title">Blog Admin</h1>
      <el-form ref="form" :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.username" placeholder="账 号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password" placeholder="密 码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <button @click="onShow">开始验证</button> -->
          <!-- <Vcode :show="isShow" :imgs="imgArr" @success="onSuccess" @close="onClose" /> -->
          <!-- <slide-verify :l="42" :r="10" :w="310" :h="155" slider-text="向右滑动" @success="onSuccess" @fail="onFail"
            @refresh="onRefresh"></slide-verify> -->
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" size="small" type="primary" @click="loginHandle">登&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    reactive,
    ref,
    toRefs
  } from 'vue'
  import { useRouter } from 'vue-router'
  import Vcode from "vue3-puzzle-vcode"
  import { setToken } from '@/utils/cookie'
  import { inject } from 'vue'
  import {
    loginRequest
  } from '@/api/user'
  export default {
    name: 'Login',
    components: {
      Vcode
    },
    setup() {
      const Msg = inject('$message')
      const loginForm = ref({
        username: '',
        password: ''
      })
      const router = useRouter()
      const loginHandle = () => {
        loginRequest(loginForm.value).then(res => {
          if (res.code === 0) {
            setToken(res.data['access_token'],)
            router.push({
              path: '/'
            })
          }
        })
      }
      return {
        loginForm,
        loginHandle
      }
    }
  }

</script>
<style lang='scss' scoped>
  .login-container {
    width: 100%;
    height: 100%;

    .bg-wrap {
      position: absolute;
      inset: 0;

      .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        left: 0;
        top: 0;
        z-index: 1;
      }

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .form-wrap {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      // width: 400px;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.5);
      padding: 15px 20px;
      z-index: 2;

      #title {
        font-size: 18px;
        text-align: center;
        color: #fff;
        margin: 5px 0 15px;
      }
    }
  }

  // elementui style reset
  /deep/ .el-form {
    .el-form-item {
      .el-input__inner {
        background: rgba(0, 0, 0, 0.1) !important;
        border: 1px solid rgba(255, 255, 255, 0.2);
        width: 300px !important;
        color: #fff !important;

        &::placeholder {
          color: #fff !important;
        }
      }

      .login-btn {
        width: 100% !important;
      }
    }
  }

</style>
