<!-- 登录 -->
<template>
  <div class="login">
    <div class="loginbox">
      <div class="imgbox">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 表单 -->
      <el-form
        class="form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="密码"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    reset() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status != 200) {
          this.$message.error('用户名或密码错误')
          return
        }
        this.$message.success('登陆成功')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },
  },
}
</script>
<style lang='less' scoped>
.login {
  height: 100%;
  background-color: #2b4b6b;
}
.loginbox {
  width: 450px;
  height: 300px;
  position: absolute;
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  .imgbox {
    width: 130px;
    height: 130px;
    background-color: #fff;
    border: 1px solid silver;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      height: 100%;
      width: 100%;
      background-color: rgb(224, 219, 219);
      border-radius: 50%;
    }
  }
}
.form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>