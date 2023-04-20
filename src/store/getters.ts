const getters = {
  locale: state => state.app.locale,
  loading: state => state.app.loading,
  token: state => state.app.token,
  userInfo: state => state.app.userInfo,
  userName: state => state.app.userName,
  treeId: state => state.app.treeId,
  treeData: state => state.app.treeData,
  treeArray:state => state.app.treeArray,

  // quickentry
  selectName: state => state.quickentry.selectName,
  selectIpArray: state => state.quickentry.selectIpArray,
  selectGroupArray: state => state.quickentry.selectGroupArray,
  variableArray: state => state.quickentry.variableArray,
  customArray: state => state.quickentry.customArray,
}
export default getters
