import store from '@/store'
export default {
  mounted (el, binding) {
    const { value } = binding
    const allPermission = '*:*:*'
    const permissions = store.getters && store.getters.permissions
    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value
      const ary = []
      permissionFlag.forEach(per => {
        if (permissions.find(item => item === per) || per === allPermission) {
          ary.push(per)
        }
      })
      if (!ary.length) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('请设置操作权限标签值')
    }
  }
}
