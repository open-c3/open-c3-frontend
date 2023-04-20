<template>
  <div class="login">
    <div class="title f24"> {{ $t('login_title') }} </div>
    <el-form ref="form" :model="formData" status-icon :rules="rules" label-width="0" class="btn-base login-form w400">
      <el-form-item prop="user">
        <el-input v-model.trim="formData.user" :placeholder="$t('userName')" prefix-icon="Stamp" class="light_input" v-on:keyup.enter="loginFun" />
      </el-form-item>
      <el-form-item prop="pass" class="mb16">
        <el-input v-model.trim="formData.pass" :placeholder="$t('password')" show-password prefix-icon="Lock" class="light_input" v-on:keyup.enter="loginFun"/>
      </el-form-item>
      <div class="df jc_sb btn-con">
        <!-- <el-button type="primary" link @click="$jumpPage('/forgetPassword')">{{ $t('forgetPassword') }}</el-button> -->
        <!-- <el-button type="primary" link @click="$jumpPage('/register')">{{ $t('register_now')}}</el-button> -->
      </div>
      <div class="mt32">
        <el-button type="primary" class="wp100 br8 lh40 h40" style="letter-spacing: 15px;" @click="loginFun">{{ $t('login')}}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { login } from '@/api/userCenter/index'
import { getToken, setCookies } from '@/utils/cookie'
export default defineComponent({
  components: { },
  setup () {
    const { proxy } = getCurrentInstance()
    const store = useStore()

    const state = reactive({
      formData: {
        domain: window.location.host,
        user: '',
        pass: ''
      }
    })
    const rules = {
      user: [
        { required: true, trigger: 'blur', message: proxy.$t('requiredText') }
      ],
      pass: [
        { required: true, trigger: 'blur', message: proxy.$t('requiredText') }
      ]
    }
    // 登录 清空上一次服务树选择节点
    const loginFun = () => {
      if (state.formData.user === '') {
        proxy.$notification('account.login.accountText', 'info')
        return
      } 
      if (state.formData.pass === '') {
        proxy.$notification('account.login.passwordText', 'info')
        return
      }
      store.dispatch('setLoading', true)
      login(state.formData).then((data: any) => {
        setCookies('treeId', '')
        setCookies('treeData', '')
        store.dispatch('setTreeId', '')
        store.dispatch('setTreeData', '')
        store.dispatch('setToken', getToken())
        proxy.$jumpPage('/dashboard/index')
      }).catch((error) => {
        proxy.$notification(error.info, 'error')
      }).finally(() => {
        store.dispatch('setLoading', false)
      })
    }

    return {
      ...toRefs(state),
      rules,
      loginFun
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .title {
    color: var(--color_primary);
    line-height: 33px;
    margin-bottom: 24px;
  }
  .btn-con {
    .el-button.is-link + .el-button.is-link {
      border: none;
    }
  }
  .others {
    color: #3E3F57;
  }
}
</style>