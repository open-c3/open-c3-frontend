<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel">
    <template #content>
      <base-form ref="form" :config="config.form" :params="params"/>
      <template v-if="info">
        <el-divider class="costv-divider mt16 mb16"/>
        <div class="df">
          <span class="mr10 mt5">{{ $t('imageFileInformation') }}</span>
          <el-upload v-if="file.status === 0" :action="uploadUrl" show-file-list>
            <el-button icon="UploadFilled" type="primary">{{ $t('uploadImage') }}</el-button>
          </el-upload>
          <div v-if="file.status === 1" class="mt5">
            {{ $t('uploadTime') }} {{ file.time }}
            {{ $t('imageSize') }} {{ bytesToSize(file.size) }}
          </div>
        </div>
        <p v-if="file.status === 0">
          <a :href="`${siteAddr}/book/我的镜像/`" target='_blank' class="c2 ml5">
            {{ $t('viewImageGenerationWay') }}<el-icon><QuestionFilled /></el-icon>
          </a>
        </p>
        <el-divider class="costv-divider mt16 mb16"/>
        <div>
          <p>
            <span class="mr5">1.{{ $t('install') }}AGENT:</span>
            <span class="c-error">curl -L {{siteAddr}}/api/scripts/installAgent.sh |sudo OPEN_C3_ADDR={{siteAddr}} bash</span>
          </p>
          <p>
            <span class="mr5">2.{{ $t('addPublicKey') }}</span>
            <span class="c-error">wget {{siteAddr}}/api/ci/images/{{params.id}}/sshkey.pub -O /opt/mydan/etc/agent/auth/c3_ci_{{params.id}}.pub </span>
          </p>
        </div>
      </template>
    </template>
    <template #footer>
      <el-button @click="cancel">{{ $t('cancel') }}</el-button>
      <el-button @click="confirm" type="primary">{{ $t('saveImage') }}</el-button>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, computed, watch, onMounted } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { ADD_CONFIG } from '../config'
import { addImages, getImagesDetail, getImagesFileDetail, updateImages } from '@/api/userCenter/images'
import { g_url, bytesToSize } from '@/utils/index'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  components: { Dialog, Table, baseForm },
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  emits: ['close', 'success'],
  setup (props, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      config:ADD_CONFIG,
      loading: false,
      params: { // 镜像信息
        id: '',
        name: '',
        describe: '',
        share: ''
      },
      file: { // 镜像文件信息
        size: 0,
        status: 0,
        time: ''
      },
      uploadUrl: '',
      siteAddr: g_url
    })
    // 文件列表移除文件时的钩子
    const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
      console.log(file, uploadFiles)
    }

    // 点击文件列表中已上传的文件时的钩子
    const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
      console.log(uploadFile)
    }
    // 当超出限制时，执行的钩子函数
    const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
      // ElMessage.warning(
      //   `The limit is 3, you selected ${files.length} files this time, add up to ${
      //     files.length + uploadFiles.length
      //   } totally`
      // )
    }
    // 删除文件之前的钩子
    const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
      return ElMessageBox.confirm(
        `Cancel the transfer of ${uploadFile.name} ?`
      ).then(
        () => true,
        () => false
      )
    }
    const cancel = () => { // 关闭弹框
      context.emit('close')
    }
    // 保存镜像信息
    const confirm = () => { // 确定
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          const data = state.params
          delete data.id
          if (props.info) {
            updateImages(props.info.id, data).then(res => {
              proxy.$notification('operationSuccess')
              context.emit('success')
            })
          } else {
            addImages(data).then(res => {
              proxy.$notification('operationSuccess')
              context.emit('success')
            })
          }
        }
      })
    }
    // 获取镜像信息 镜像文件信息
    watch(() => props.info, val => {
      state.config.title = val ? 'editMirror' : 'newImage'
      state.config.form.config[0].hidden = val === null
      state.uploadUrl = val ? `/api/ci/uploadv2/images/${val.id}/upload` : ''
      if (val) {
        getImagesDetail(val.id).then((res: any) => {
          state.params = {
            id: val.id,
            name: res.name,
            share: res.share,
            describe: res.describe
          }
        })
        getImagesFileDetail(val.id).then((res: any) => {
          state.file = {
            size: res.size,
            status: res.status * 1,
            time: res.time
          }
        })
      }
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      cancel,
      confirm,
      bytesToSize,
      handleRemove,
      handlePreview,
      handleExceed,
      beforeRemove
    }
  }
}
</script>
<style lang="scss">
</style>
