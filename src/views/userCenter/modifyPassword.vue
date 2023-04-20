<template>
  <div class="modify-password body-layout1">
    <div v-loading="loading" class="main">
      <el-form ref="form" :model="formData" status-icon :rules="rules" label-position="top" class="per-info-form">
        <el-form-item :label="$t('originalPassword')" prop="old">
          <el-input v-model.trim="formData.old" show-password />
        </el-form-item>
        <el-form-item :label="$t('newPassword')" prop="new1">
          <el-input v-model.trim="formData.new1" show-password/>
        </el-form-item>
        <el-form-item :label="$t('repeatNewPassword')" prop="new2">
          <el-input v-model.trim="formData.new2" show-password/>
        </el-form-item>
      </el-form>
      <el-divider class="costv-divider mt16 mb16 "></el-divider>
      <div class="tr">
        <el-button :disabled="formData.old === '' || formData.new1 === '' || formData.new2 === ''" type="primary" @click="confirm">{{ $t('changePassword') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { updatePassword } from '@/api/userCenter/index'
import { useStore } from 'vuex'
import { setCookies } from '@/utils/cookie'
export default {
  setup () {
    const store = useStore()
    const { proxy } = getCurrentInstance()
    const state = reactive({
      loading: false,
      account: '',
      formData: {
        old: '',
        new1: '',
        new2: ''
      }
    })
    const validatePass = (rule, value, callback) => {
      const reg = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,}$/
      if (!reg.test(value)) {
        callback(new Error(proxy.$t('passwordFormat')))
      } else if (state.formData.new2 !== '' && value !== state.formData.new2) {
        callback(new Error(proxy.$t('passwordError')))
      } else {
        callback()
      }
    }
    // 密码必须至少8位数，同时必须包含数字，大写字母，小写字母
    const validatePass2 = (rule, value, callback) => {
      const reg = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,}$/
      if (!reg.test(value)) {
        callback(new Error(proxy.$t('passwordFormat')))
      } else if (state.formData.new1 !== '' && value !== state.formData.new1) {
        callback(new Error(proxy.$t('passwordError')))
      } else {
        callback()
      }
    }

    const rules = {
      old: [
        { required: true, message: proxy.$t('requiredText'), trigger: 'blur' }
      ],
      new1: [
        { required: true, message: proxy.$t('requiredText'), trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
      ],
      new2: [
        { required: true, message: proxy.$t('requiredText'), trigger: 'blur' },
        { validator: validatePass2, trigger: 'blur' }
      ]
    }
    // 更改密码后 清空cookie 并重新登录
    const confirm = () => {
      (proxy.$refs.form as any).validate(valid => {
        if (valid) {
          state.loading = true
          updatePassword(state.formData).then(() => {
            setCookies('treeId', '')
            setCookies('treeData', '')
            setCookies('sid', '')
            setCookies('userName', '')
            setCookies('userInfo', '')
            store.dispatch('setTreeId', '')
            store.dispatch('setTreeData', '')
            store.dispatch('setToken', '')
            store.dispatch('setUserInfo', '')
            store.dispatch('setUserName', '')
            proxy.$jumpPage('/login')
            proxy.$notification('updatePasswordSuccess')
          }).finally(() => {
            state.loading = false
          })
        }
      })
    }

    onMounted(() => {
    })
    return {
      ...toRefs(state),
      rules,
      confirm
    }
  }
}
</script>

<style lang="scss" scoped>
.modify-password {
  position: relative;
  overflow: auto;
  .main {
    margin: 26px auto;
    @include font-base(14px, var(--color_text));
    .per-info-form {
      margin: 0 auto 40px;
      width: 420px;
      :deep(.el-form-item__label) {
        color: #687591;
      }
      :deep(.el-input__inner) {
        border-color: #EFF2F5;
      }
      :deep(.el-input.is-disabled .el-input__inner) {
        background-color: #F3F6FA;
      }
    }
  }
}
</style>
