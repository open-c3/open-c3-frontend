<template>
  <Dialog v-bind="$attrs" :config="config" @close="close" :title="editItem.title" @success="close">
    <template #content>
      <el-form ref="form" :rules="rules" :model="importFrom" label-width="200px">
        <div v-if="!ciid">
          <!-- 名称 -->
          <el-form-item :label="$t('name')" prop="name">
            <el-input class="w450" v-model="importFrom.name" :placeholder="`${$t('configFormInput')}${$t('name')}`" />
          </el-form-item>

          <!-- 描述 -->
          <el-form-item :label="$t('describe')" prop="describe">
            <el-input class="w450" v-model="importFrom.describe"
              :placeholder="`${$t('configFormInput')}${$t('describe')}`" />
          </el-form-item>
        </div>

        <!-- 授权 -->
        <el-form-item :label="$t('Authorization')" prop="share">
          <el-radio-group v-model="importFrom.share">
            <el-radio :label="'P'">{{ $t('onlyIndividualsVisible') }}</el-radio>
            <el-radio :label="'T'">{{ $t('readAndWriteSharedOrganize') }}</el-radio>
            <el-radio :label="'O'">{{ $t('AdvanceSharedOrganize') }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 凭据自身编辑权授权 -->
        <el-form-item :label="$t('credentialEditAuthorization')" prop="edit_share">
          <el-input class="w450" v-model="importFrom.edit_share" :placeholder="$t('editAutorizationPlaceholder')" />
        </el-form-item>

        <div v-if="importFrom.share === 'O'">
          <!-- 共享组 -->
          <!-- 读写权限  -->
          <el-form-item :label="$t('sharedGroup')" prop="share_T">
            <div class="share-type">
              <el-input type="textarea" v-model="importFrom.share_T" />
              <div>{{ $t('readWritePermission') }}</div>
            </div>
            <!-- 只读权限 -->
            <div style="margin-left:60px" class="share-type ml160">
              <el-input type="textarea" v-model="importFrom.share_TR" />
              <div>{{ $t('readOnlyPermission') }}</div>
            </div>
          </el-form-item>

          <!-- 用户共享 -->
          <!-- 读写权限  -->
          <el-form-item :label="$t('userSharing')" prop="share_P">
            <div class="share-type">
              <el-input type="textarea" v-model="importFrom.share_P" />
              <div>{{ $t('readWritePermission') }}</div>
            </div>
            <!-- 只读权限 -->
            <div style="margin-left:60px" class="share-type ml160">
              <el-input type="textarea" v-model="importFrom.share_PR" />
              <div>{{ $t('readOnlyPermission') }}</div>
            </div>
          </el-form-item>
        </div>
        <!-- 类型 -->
        <div v-if="!point">
          <el-form-item :label="$t('type')" prop="type">
            <el-radio-group v-model="importFrom.type">
              <el-radio :label="'SSHKey'">SSH Key</el-radio>
              <el-radio :label="'UsernamePassword'">{{ $t('userNamePassword') }}</el-radio>
              <el-radio :label="'JobBuildin'">{{ $t('plugIn') }}</el-radio>
              <el-radio :label="'KubeConfig'">KubeConfig</el-radio>
              <el-radio :label="'Harbor'">Harbor{{ $t('imageHub') }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div v-if="importFrom.ticket">
          <!-- SSH Key -->
          <div v-if="importFrom.type === 'SSHKey'">
            <el-form-item label="SSH Key" prop="ticket.SSHKey">
              <div>
                <el-input class="w450" type="textarea" v-model="importFrom.ticket.SSHKey" />
                <div>{{ $t('sshkeyTextareaMessage') }}</div>
              </div>
            </el-form-item>
          </div>

          <!-- 用户名密码 -->
          <div v-if="importFrom.type === 'UsernamePassword'">
            <el-form-item :label="$t('userName')" prop="ticket.Username">
              <el-input class="w450" v-model="importFrom.ticket.Username"
                :placeholder="`${$t('configFormInput')}${$t('userName')}`" />
            </el-form-item>
            <el-form-item :label="$t('password')" prop="ticket.Username">
              <el-input class="w450" v-model="importFrom.ticket.Password"
                :placeholder="`${$t('configFormInput')}${$t('password')}`" />
            </el-form-item>
          </div>

          <!-- 插件 -->
          <div v-if="importFrom.type === 'JobBuildin'">
            <el-form-item :label="$t('content')" prop="ticket.JobBuildin">
              <div>
                <el-input class="w450" type="textarea" v-model="importFrom.ticket.JobBuildin" />
                <div>{{ $t('jobBuildInTextareaMessage') }}</div>
              </div>
            </el-form-item>
          </div>

          <!-- KubeConfig  -->
          <div v-if="importFrom.type === 'KubeConfig'">
            <!-- pod shell -->
            <el-form-item label="pod shell" prop="pod_shell_relaxed">
              <el-radio-group v-model="importFrom.pod_shell_relaxed">
                <el-radio :label="'0'">{{ $t('onlyEnterWritePermission') }}</el-radio>
                <el-radio :label="'1'">{{ $t('RelaxedEnterWritePermission') }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <!-- kubecti版本 -->
            <el-form-item :label="`kubectl${$t('version')}`" prop="kubectlVersions">
              <el-select class="w450" v-model="importFrom.ticket.kubectlVersion">
                <el-option :label="$t('defaultVersion')" value="v0.0.0" />
                <el-option v-for="item in kubectlVersion" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>

            <!-- 云厂商 -->
            <el-form-item :label="$t('cloudVendors')" prop="subtype">
              <el-radio-group v-model="importFrom.subtype">
                <el-radio label="default">
                  {{ $t('buildOneself') }}
                  <svg-icon icon-class="kubernetes-icon" width="16px" height="16px" />
                </el-radio>
                <el-radio label="AWS">
                  AWS
                  <svg-icon icon-class="aws" width="16px" height="16px" />
                </el-radio>
                <el-radio label="QCloud">
                  {{ $t('qcloud') }}
                  <svg-icon icon-class="qcloud" width="16px" height="16px" />
                </el-radio>

              </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('networkProxy')" prop="ticket.proxyAddr">
              <el-input class="w450" v-model="importFrom.ticket.proxyAddr"
                placeholder="username:password@10.10.10.10:1080 或 10.10.10.10:1080" />
              <div>{{ $t('ProxyinstallationBy') }}: <a href="https://hub.docker.com/r/vimagick/dante"
                  target="_blank">https://hub.docker.com/r/vimagick/dante</a></div>
            </el-form-item>

            <el-form-item :label="$t('content')" prop="ticket.KubeConfig">
              <div>
                <el-input class="w450" type="textarea" v-model="importFrom.ticket.KubeConfig" />
                <div>~/.kube/config {{ $t('fileContent') }}</div>
              </div>
            </el-form-item>
          </div>

          <!-- Harbor -->
          <div v-if="importFrom.type === 'Harbor'">
            <el-form-item :label="$t('serviceAddress')" prop="ticket.Server">
              <div>
                <el-input class="w450" v-model="importFrom.ticket.Server"
                  :placeholder="`${$t('configFormInput')}${$t('serviceAddress')}`" />
                <div>{{ $t('example') }}：https://harbor.xxx.org/api/v2.0/search</div>
              </div>
            </el-form-item>
            <el-form-item :label="$t('userName')" prop="ticket.Username">
              <el-input class="w450" v-model="importFrom.ticket.Username"
                :placeholder="`${$t('configFormInput')}${$t('userName')}`" />
            </el-form-item>
            <el-form-item :label="$t('password')" prop="ticket.Username">
              <el-input class="w450" v-model="importFrom.ticket.Password"
                :placeholder="`${$t('configFormInput')}${$t('password')}`" />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </template>
    <template #footer>
      <div class="import-add-button" v-if="editItem.type !== 'show'">
        <el-button type="primary" v-if="importFrom.type === 'KubeConfig'"
          :disabled="importFrom.name === '' && importFrom.describe === ''" @click="operate('connect', {})">
          {{ $t('connectTest') }}
        </el-button>
        <el-button type="primary" :disabled="importFrom.name === '' && importFrom.describe === ''"
          @click="operate('saveTicket', {})">
          {{ $t('saveCredentials') }}
        </el-button>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'
import store from '@/store'
import Table from '@/components/table/index.vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import type { FormRules } from 'element-plus'
import { ElMessageBox } from 'element-plus'

import {
  IMPORT_CLUSTERMODAL_CONFIG,
  EDIT_RELY_MODEL_THEAD,
} from '../config'
import {
  getK8SDetail,
  connectionTest,
  saveK8STicketId,
} from '@/api/quickentry/index'
import {
  K8SParamsInfo,
} from '@/api/interface/quickentry'

interface Stateinfo {
  importFrom: {
    name?: string;
    describe?: string;
    share?: string;
    edit_share?: string;
    pod_shell_relaxed?: string;
    ticket?: {
      SSHKey?: string;
      KubeConfig?: string;
      kubectlVersion?: string | string[];
      proxyAddr?: string | null;
      Username?: string;
      Password?: string;
      JobBuildin?: string;
      Server?: string;
    };
    subtype?: 'default' | 'AWS' | 'QCloud';
    share_T?: string;
    share_TR?: string;
    share_P?: string;
    share_PR?: string;
    type?: string;
  },
  defaultProps: {
    children: string;
    label: string;
  },
  newrely: any;
  loading: boolean;
  ciid: string;
  kubectlVersion: Array<any>;
  point: string;
}

export default defineComponent({
  components: {
    Table,
    Dialog,
    baseForm
  },

  props: {
    ticketId: {
      required: false,
      type: String,
      default: '',
    },
    config: {
      type: Object,
      default: IMPORT_CLUSTERMODAL_CONFIG
    },
    editItem: {
      type: Object,
      default: {}
    },
    treeId: {
      type: String,
      default: '4000000000',
    },
    treeData: {
      type: Object,
      default: {}
    },
  },

  emits: ['success', 'close'],

  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeArray = computed(() => {
      return store.getters.treeArray
    })

    const state: Stateinfo = reactive({
      importFrom: {
        type: 'SSHKey',
        subtype: 'default',
        share: 'P',
        ticket: {
          kubectlVersion: 'v0.0.0',
        },
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      newrely: {},
      loading: false,
      ciid: '',
      kubectlVersion: [],
      point: '',
    })

    const rules = reactive<FormRules>({
      name: [{ required: true, message: `${proxy.$t('configFormInput')}${proxy.$t('name')}`, trigger: 'blur' }],
      describe: [{ required: true, message: `${proxy.$t('configFormInput')}${proxy.$t('describe')}`, trigger: 'blur' }]
    })

    // 获取编辑集群信息
    const getTickIdDetail = async () => {
      state.importFrom = {}
      const params: K8SParamsInfo = {
        ticketId: props.ticketId,
      }
      if (props.ticketId && props.ticketId !== '') {
        if (props.editItem.type === 'edit') {
          params['detail'] = '?detail=1'
        }
        const dataRet = await getK8SDetail(params)
        if (dataRet) {
          state.importFrom = JSON.parse(JSON.stringify(dataRet))
        }
      }
    }

    const close = () => {
      proxy.$emit('close')
    }

    const operate = (type: string, row: any) => {
      (proxy?.$refs.form as any).validate().then(async (flag: any) => {
        if (flag) {
          switch (type) {
            case 'saveTicket':
              ElMessageBox.confirm(proxy?.$t('saveTicketDesc'), proxy?.$t('saveCredentials'), {
                confirmButtonText: proxy?.$t('config_options_confirm'),
                cancelButtonText: proxy?.$t('config_options_cancel'),
                type: 'warning'
              }).then(() => {
                const params: K8SParamsInfo = {
                  postData: state.importFrom
                }
                if (props.ticketId && props.ticketId !== '') {
                  params.ticketId = props.ticketId
                }
                saveK8STicketId(params).then(res => {
                  proxy?.$notification('operationSuccess')
                  proxy.$emit('success')
                  close()
                })
              }).catch(() => { })
                .finally(() => { })
              break
            case 'connect':
              ElMessageBox.confirm(proxy?.$t('connectDesc'), proxy?.$t('connectTest'), {
                confirmButtonText: proxy?.$t('config_options_confirm'),
                cancelButtonText: proxy?.$t('config_options_cancel'),
                type: 'warning'
              }).then(() => {
                const connectParams: K8SParamsInfo = {
                  ticketData: {
                    kubectlVersion: state.importFrom.ticket.kubectlVersion,
                    kubeconfig: state.importFrom.ticket.KubeConfig,
                    proxyAddr: state.importFrom.ticket.proxyAddr,
                  }
                }
                connectionTest(connectParams).then(res => {
                  proxy?.$notification('operationSuccess')
                })
              })
              break
          }
        }
      })
    }
    const defaultOption: () => void = (): void => {
      state.importFrom = {
        subtype: 'default',
        share: 'P',
        ticket: {
          kubectlVersion: 'v0.0.0',
        },
        type: props.editItem.ticketType ? props.editItem.ticketType : 'SSHKey'
      }
    }

    onMounted(() => {
      state.point = props.editItem.point
      getTickIdDetail()
      defaultOption()
    })

    return {
      treeArray,
      rules,
      ...toRefs(state),
      IMPORT_CLUSTERMODAL_CONFIG,
      EDIT_RELY_MODEL_THEAD,
      close,
      operate,
      getTickIdDetail,
    }
  }
})
</script>

<style scoped lang="scss">
.addr-tooltip {
  display: inline-block;
  margin-left: 10px;
}

.form-confirm {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 150px;
}

.w450 {
  width: 450px
}

.import-add-button {
  text-align: right;
}
</style>