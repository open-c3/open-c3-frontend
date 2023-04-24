<template>
  <span class="hand dib wp100" style="padding: 5px 16px;" @click="logOut">{{ $t('logOut') }}</span>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'

  // import { logout } from '@/api'
  
  import { setToken } from '@/utils/cookie'


  export default defineComponent({
    setup () {
      const store = useStore()
      const { proxy } = getCurrentInstance()
      const logOut = () => {
        store.dispatch('setLoading', true)
        // logout().then(() => {
        //   proxy.$notification(proxy.$t('logout_success'))
        //   proxy.$jumpPage('/login')
        //   store.dispatch('setUserInfo', null)
        // }).finally(() => {
        //   store.dispatch('setToken', '')
        //   setToken('')
        //   store.dispatch('setLoading', false)
        // })
      }
      return {
        logOut
      }
    }
  })
</script>