import { t } from './language'
// 邮箱验证
export const validateEmail = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error(t('configFormInput') + t('emailAddress')))
  } else if (value.length > 128) {
    callback(new Error(t('check128')))
  } else {
    const reg = /^([a-zA-Z0-9_\\.-]+)@([\da-z\\.-]+)\.([a-z\\.]{2,6})$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error(t('validErrorFormat')))
    }
  }
}
// 邮箱验证 邮箱为非必填
export const validateEmailNoRequired = (rule, value, callback) => {
  if (value === '') {
    callback()
  } else if (value.length > 128) {
    callback(new Error(t('check128')))
  } else {
    const reg = /^([a-zA-Z0-9_\\.-]+)@([\da-z\\.-]+)\.([a-z\\.]{2,6})$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error(t('validErrorFormat')))
    }
  }
}
// 手机号验证 手机号非必填
export const validatePhoneNoRequired = (rule: any, value: any, callback: any) => {
  const reg = /^1[3456789]\d{9}$/
  if (value !== '' && !reg.test(value)) {
    callback(new Error(t('config.form.validPhone')))
  } else {
    callback()
  }
}

// 手机号验证
export const validatePhone = (rule, value, callback) => {
  const reg = /^1[3456789]\d{9}$/
  if (value === '') {
    callback(new Error(t('config.form.input') + t('account_register_mobile')))
  } else if (!reg.test(value)) {
    callback(new Error(t(`validate_mobile_error_text`)))
  } else {
    callback()
  }
}

// 验证码验证
export const validateCode = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(t('config.form.input') + t('verify_code')))
  } else {
    const reg = /^\d{6}$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error(t('forget_pwd_code_text')))
    }
  }
}
  
// 最大支持128个字符，首字符不能为空格
export const validText128 = (rule: any, value: any, callback: any) => {
  if (value.startsWith(' ') || value.length > 128 || value.length === 0) {
    callback(new Error(t('config.form.validErrorFormat')))
  } else {
    callback()
  }
}

// 大支持10个字符，只支持汉字、英文、数字
export const validText = (rule, value, callback) => {
  const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{0,10}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error(t('config.form.validErrorFormat')))
  }
}

// 验证不能全是空格 不能为空
export const validateSpace = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(t('config.validate.required')))
  } else {
    const reg = new RegExp(/^[\s]*$/)
    if (reg.test(value)) {
      callback(new Error(t('config.form.validErrorFormat')))
    } else {
      callback()
    }
  }
}

// 最大支持32个字符 中文、英文、空格 英文小数点
export const validText32 = (rule, value, callback) => {
  const reg = /^[a-zA-Z\u4e00-\u9fa5\s.]{0,32}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error(t('config.form.validErrorFormat')))
  }
}

// 5-11位 非必填座机或者手机号都可以
export const validatePhoneNoRequired2 = (rule, value, callback) => {
  const reg = /^[0-9-]{5,11}$/
  if (value !== '' && !reg.test(value)) {
    callback(new Error(t('config.form.validPhone')))
  } else {
    callback()
  }
}

// 最大支持128个字符，首字符不能为空格
export const validText50 = (rule: any, value: any, callback: any) => {
  if (value.startsWith(' ') || value.length > 50 || value.length === 0) {
    callback(new Error(t('config.form.validErrorFormat')))
  } else {
    callback()
  }
}