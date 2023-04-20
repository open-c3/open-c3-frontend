// 添加全局函数或变量
export {}
 
declare module 'vue' {
  interface ComponentCustomProperties {
    $jumpPage: any,
    $notification: any,
    $downFile: any
  }
}