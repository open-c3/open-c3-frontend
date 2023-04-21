<template>
  <div class="body-layout3">
    <div v-if="titleFlag" class="layout-title top mb8 df ai_c br8">
      <div class="w30 h30 icon-box df hand mr16 layout-title-left" @click="backList">
        <svg-icon icon-class="reportLeft" class="layout-title-left-svg" />
      </div>
      <div class="layout-title-header">{{ $t('editConfig') }} - {{ selectName }}</div>
    </div>

    <div class="con br8" v-loading="loading">
      <!-- 基础配置 -->
      <el-card class="box-card" style="margin-top:0px">
        <template #header>
          <div class="deploy-config-title">{{ $t('basicConfig') }}</div>
        </template>
        <el-form class="editor-form" :inline="true" v-model="projectForm" label-width="200px">
          <el-form-item :label="$t('Switch')">
            <el-switch v-model="projectForm.status" active-text="ON" inactive-text="OFF" inline-prompt size="large" />
          </el-form-item>
          <el-form-item :label="$t('withinAudit')">
            <el-switch v-model="projectForm.audit_level" active-text="ON" inactive-text="OFF" inline-prompt
              size="large" />
          </el-form-item>
          <el-form-item :label="$t('autoFindTags')">
            <el-switch v-model="projectForm.autofindtags" active-text="ON" inactive-text="OFF" inline-prompt
              size="large" />
          </el-form-item>
          <el-form-item :label="$t('autoBuild')">
            <el-switch v-model="projectForm.autobuild" active-text="ON" inactive-text="OFF" inline-prompt size="large" />
          </el-form-item>
        </el-form>

        <base-form ref="form" :config="formConfig" :params="projectForm" class="mt20 editor-form">
          <template #addr>
            <el-input class="w450" v-model="projectForm.addr" :placeholder="$t('addrPlaceholder')"
              @mouseenter="onMouseEnterAddr" @mouseleave="onMouseOutAddr" @change="onChangeAddr" />
            <div class="addr-tooltip">
              <el-tooltip class="box-item" effect="dark" :content="$t('viewCodeHelp')" placement="top">
                <a target='_blank' href="#/book/流水线多种代码来源/">
                  <svg-icon icon-class="blankLink" width="16px" height="16px" />
                </a>
              </el-tooltip>
            </div>
          </template>

          <template #rely>
            <el-switch v-model="projectForm.rely" inline-prompt active-text="ON" inactive-text="OFF" size="large" />
            <el-button :disabled="!projectForm.rely" style="margin-left:20px" type="primary"
              @click="operate('editRely', {})">{{ $t('editRely') }}</el-button>
          </template>

          <template #webhook>
            <div class="webhook">
              <el-switch v-model="projectForm.webhook" active-text="ON" inactive-text="OFF" size="large" inline-prompt />
              <div v-if="projectForm.webhook" class="webhook-input-content">
                <div class="webhook-input-content-items">
                  <span>{{ $t('password') }}</span>
                  <el-input v-model="projectForm.webhook_password"
                    :placeholder="`${$t('configFormInput')}${$t('password')}`" />
                </div>
                <div class="webhook-input-content-items">
                  <span>{{ $t('matchBranch') }}</span>
                  <el-input v-model="projectForm.webhook_release"
                    :placeholder="`${$t('configFormInput')}${$t('password')}`" />
                </div>
                <div class="webhook-input-content-items">
                  <span>{{ $t('callbackUrl') }}</span>
                  <div>{{ `${siteaddr}/api/ci/webhooks` }}</div>
                </div>
              </div>
            </div>
          </template>
          <template #buildimage>
            <div class="build-image">
              <div>
                <el-select class="w450" clearable v-model="projectForm.buildimage" placeholder="Select">
                  <el-option v-for="item in buildimageOption" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-button v-if="projectForm.buildimage !== ''" class="ml10 mr10" type="primary">
                  {{ $t('debug') }}
                </el-button>
                <div class="addr-tooltip">
                  <el-tooltip class="box-item" effect="dark" :content="$t('buildImageTooltip')" placement="top">
                    <a target='_blank' href="#/book/我的镜像/">
                      <svg-icon icon-class="blankLink" width="16px" height="16px" />
                    </a>
                  </el-tooltip>
                </div>
              </div>
              <div v-if="projectForm.buildimage !== ''">
                <div class="buildimage-input-content-items">
                  <div class="buildimage-input-content-items-message">
                    <span>{{ $t('cacheDirectory') }}</span>
                    <el-input v-model="projectForm.buildcachepath" style="width:350px"
                      :placeholder="`${$t('configFormInput')}${$t('cacheDirectory')}`" />
                  </div>
                  <div class="buildimage-input-content-items-text">{{ $t('cacheDirectoryMessageFirst') }}</div>
                  <div class="buildimage-input-content-items-text">{{ $t('cacheDirectoryMessageSecond') }}</div>
                </div>

                <div class="buildimage-input-content-items">
                  <div class="buildimage-input-content-items-message">
                    <span>{{ $t('buildScripts') }}</span>
                    <el-input type="textarea" v-model="projectForm.buildscripts" style="width:350px" />
                  </div>
                  <div class="buildimage-input-content-items-text">{{ $t('buildScriptsMessageFirst') }}</div>
                  <div class="buildimage-input-content-items-text">{{ $t('buildScriptsMessageSecond') }}</div>
                </div>
              </div>
            </div>
          </template>
        </base-form>
        <!-- <el-divider class="costv-divider mt0 mb16" /> -->
      </el-card>

      <!-- 发布类型配置 -->
      <el-card class="box-card">
        <template #header>
          <div class="deploy-config-title">{{ $t('deployConfig') }}</div>
        </template>
        <el-form class="editor-form" :model="projectForm" label-width="200px">
          <el-form-item :label="$t('deployConfig')" prop="ci_type_open">
            <div class="switch-not-text">
              <el-tooltip class="box-item" effect="dark"
                :content="projectForm.ci_type_open ? $t('hideAdvConfig') : $t('showAdvConfig')" placement="top">
                <el-switch v-model="projectForm.ci_type_open" />
              </el-tooltip>
            </div>
          </el-form-item>

          <div v-if="projectForm.ci_type_open">
            <el-form-item label="" prop="ci_type">
              <el-radio-group v-model="projectForm.ci_type" @change="setcitype">
                <el-tooltip class="box-item" effect="dark" :content="$t('deploykubernetesServer')" placement="top">
                  <el-radio label="kubernetes">{{ $t('Kubernetes') }}</el-radio>
                </el-tooltip>
                <el-tooltip class="box-item" effect="dark" :content="$t('custom')" placement="top">
                  <el-radio label="default">{{ $t('general') }}</el-radio>
                </el-tooltip>
              </el-radio-group>
            </el-form-item>
            <div v-if="projectForm.ci_type === 'kubernetes'">
              <el-form-item :label="$t('K8SCluster')" prop="ci_type_ticketid">
                <el-select class="w450" @change="onTicketIdChange" filterable clearable
                  v-model="projectForm.ci_type_ticketid" :placeholder="$t('K8SClusterPlaceholder')">
                  <el-option v-for="item in clusterList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-tooltip class="box-item" effect="dark" :content="$t('importCluster')" placement="right">
                  <el-button class="ml60" type="primary" @click="operate('addK8S', {})" :icon="Plus">
                    {{ $t('add') }}
                  </el-button>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="Namespace" prop="ci_type_namespace">
                <el-select clearable class="w450" filterable :disabled="projectForm.ci_type_ticketid == ''"
                  v-model="projectForm.ci_type_namespace" :placeholder="$t('K8SClusterPlaceholder')">
                  <el-option v-for="item in nameSpaceList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>

                <el-tooltip class="box-item" effect="dark" :content="$t('createNamespace')" placement="right">
                  <el-button class="ml60" type="primary" @click="operate('createNameSpace', {})" :icon="Plus">
                    {{ $t('create') }}
                  </el-button>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="Kind" prop="ci_type">
                <el-select clearable class="w450" v-model="projectForm.ci_type_kind" :placeholder="$t('KindPlaceholder')">
                  <el-option label="deployment" value="deployment"></el-option>
                  <el-option label="daemonset" value="daemonset"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item :label="$t('applyName')" prop="ci_type">
                <el-select clearable class="w450" v-model="projectForm.ci_type_name" :placeholder="$t('KindPlaceholder')">
                  <el-option v-for="item in AppList" :key="item" :value="item.value" :label="item.label" />
                </el-select>
                <div class="ml10 mr10 app-name-content switch-not-text">
                  <el-tooltip class="box-item" effect="dark"
                    :content="isSingleApp ? $t('publishSingApp') : $t('publishMultApp')" placement="top">
                    <el-switch v-model="isSingleApp" />
                  </el-tooltip>
                </div>
                <div>
                  <!-- <el-tooltip class="box-item" effect="dark" :content="$t('createApp')" placement="right">
                    <el-button type="primary" :icon="Plus">{{ $t('create') }}</el-button>
                  </el-tooltip> -->
                </div>
              </el-form-item>
              <el-form-item v-if="isSingleApp" :label="$t('ConcurrencyNumber')" prop="ci_type_concurrent">
                <el-input-number v-model="projectForm.ci_type_concurrent" :min="1" :step="1" />
              </el-form-item>

              <el-form-item label="Container" prop="ci_type_concurrent">
                <el-select class="w450" v-model="projectForm.ci_type_container">
                  <el-option value="__app_name__" :label="$t('appSameName')" />
                  <el-option v-for="item in containerList" :key="item.value" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>

              <el-form-item
                :label="projectForm.ci_type_dockerfile === '_buildin_' ? $t('dockfileContent') : $t('dockfilePath')"
                prop="ci_type_dockerfile">
                <div v-if="projectForm.ci_type_dockerfile === '_buildin_'">
                  <el-input class="w450" type="textarea" v-model="projectForm.ci_type_dockerfile_content" />
                </div>
                <div v-else>
                  <el-input class="w450" v-model="projectForm.ci_type_dockerfile" />
                </div>
                <div class="ml60">
                  <el-button type="primary" @click="projectForm.ci_type_dockerfile === '_buildin_' ? projectForm.ci_type_dockerfile = 'Dockerfile' :
                      projectForm.ci_type_dockerfile = '_buildin_'; projectForm.ci_type_dockerfile_content = '' ">
                    <svg-icon icon-class="flowline-switch" wdith="16px" height="16px" style="margin-right:8px" />
                    {{ $t('switch') }}
                  </el-button>
                </div>
              </el-form-item>

              <el-form-item :label="$t('imageCredentials')" prop="follow_up_ticketid">
                <el-select class="w450" v-model="projectForm.follow_up_ticketid">
                  <el-option v-for="item in ticketinfok8s" :key="item.value" :value="item.id" :label="item.name" />
                </el-select>
                <div class="addr-tooltip">
                  <el-tooltip class="box-item" effect="dark" :content="$t('viewCredHelp')" placement="top">
                    <a target='_blank' href="#/book/凭据/">
                      <svg-icon icon-class="blankLink" width="16px" height="16px" />
                    </a>
                  </el-tooltip>
                </div>
                <div style="margin-left:35px">
                  <el-tooltip class="box-item" effect="dark" :content="$t('createNewHarbor')" placement="right">
                    <el-button type="primary" :icon="Plus" @click="operate('addImageCredential', {})">
                      {{ $t('add') }}
                    </el-button>
                  </el-tooltip>
                </div>
              </el-form-item>

              <el-form-item :label="isFllowupOpen ? $t('triggerScript') : $t('imageType')" prop="follow_up">
                <div v-if="!isFllowupOpen">
                  <el-select class="w450" v-model="projectForm.follow_up">
                    <el-option value="harbor_push_image.pl" label="Harbor" />
                    <el-option value="awsecr_push_image.pl" label="ECR" />
                    <el-option value="no_push_image.pl" :label="$t('notBuildUploadImages')" />
                  </el-select>
                </div>
                <div v-else>
                  <el-input v-model="projectForm.follow_up" class="w450" />
                  <div class="addr-tooltip">
                    <el-tooltip class="box-item" effect="dark" :content="$t('redefineScript')" placement="top">
                      <a target='_blank' href="#/book/凭据/">
                        <svg-icon icon-class="blankLink" width="16px" height="16px" />
                      </a>
                    </el-tooltip>
                  </div>
                </div>
                <div class="switch-not-text" :style="isFllowupOpen ? 'margin-left:36px' : 'margin-left:60px'">
                  <el-tooltip class="box-item" effect="dark" :content="$t('redefineScript')" placement="top">
                    <el-switch v-model="isFllowupOpen" />
                  </el-tooltip>
                </div>
              </el-form-item>

              <el-form-item :label="$t('imageAddress')" prop="follow_up">
                <el-input class="w450" v-model="projectForm.ci_type_repository"
                  :placeholder="projectForm.ci_type_repository" />
                <div class="ml60">
                  <el-button :disabled="!projectForm.ci_type_container" class="mr10" type="primary"
                    @click="operate('container', {})">
                    {{ $t('containerImage') }}
                  </el-button>
                  <el-button type="primary" :disabled="!projectForm.follow_up_ticketid" @click="operate('credential', {})"
                    v-if="projectForm.follow_up === 'harbor_push_image.pl'">{{
                    $t('credentialImage') }}</el-button>
                </div>
              </el-form-item>

              <el-form-item :label="$t('deployApprover')" prop="ci_type_approver2">
                <el-input class="w450" v-model="projectForm.ci_type_approver2" :disabled="projectForm.ci_type_approver1"
                  placeholder="foo@openc3.com" />
                <div class="ml10 mr10 app-name-content switch-not-text">
                  <el-tooltip class="box-item" effect="dark" :content="$t('curstonSteps')" placement="top">
                    <el-switch v-model="projectForm.ci_type_approver1" />
                  </el-tooltip>
                </div>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item :label="$t('triggerScript')" prop="follow_up">
                <el-input v-model="projectForm.follow_up" class="w450" />
                <div class="addr-tooltip">
                  <el-tooltip class="box-item" effect="dark" :content="$t('viewScripthelp')" placement="top">
                    <a target='_blank' href="#/book/构建触发脚本/">
                      <svg-icon icon-class="blankLink" width="16px" height="16px" />
                    </a>
                  </el-tooltip>
                </div>
              </el-form-item>

              <el-form-item :label="$t('scriptCredentials')" prop="follow_up_ticketid">
                <el-select class="w450" v-model="projectForm.follow_up_ticketid">
                  <el-option v-for="item in ticketinfoall" :key="item.id" :value="item.id" :label="item.name" />
                </el-select>
                <div class="addr-tooltip">
                  <el-tooltip class="box-item" effect="dark" :content="$t('viewCredentialhelp')" placement="top">
                    <a target='_blank' href="#/book/凭据/">
                      <svg-icon icon-class="blankLink" width="16px" height="16px" />
                    </a>
                  </el-tooltip>
                </div>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <!-- <el-divider class="costv-divider mt0 mb16" /> -->
      </el-card>

      <!-- 消息通知人 -->
      <el-card class="box-card">
        <template #header>
          <div class="deploy-config-title">{{ $t('messageRecipients') }}</div>
        </template>
        <el-form class="editor-form" :model="projectForm" label-width="200px">
          <el-form-item :label="$t('messageRecipients')" prop="notify">
            <el-input class="w450" v-model="projectForm.notify" :placeholder="$t('messageUserDesc')" />
          </el-form-item>
        </el-form>
        <!-- <el-divider class="costv-divider mt0 mb16" /> -->
      </el-card>

      <!-- 资源限制  -->
      <el-card class="box-card">
        <template #header>
          <div class="deploy-config-title">{{ $t('resourceLimit') }}</div>
        </template>
        <el-form class="editor-form" :model="projectForm" label-width="200px">
          <el-form-item label="CPU" prop="cpulimit">
            <!-- <el-input-number v-model="projectForm.cpulimit" class="mx-4" /> -->
            <el-input class="w100" v-model="projectForm.cpulimit" :placeholder="`${$t('default')}：2`" />
            <div class="ml10">
              ({{ $t('core') }})
            </div>
          </el-form-item>

          <el-form-item :label="`${$t('memoryLabel')}`" prop="memlimit">
            <el-input class="w100" v-model="projectForm.memlimit" :placeholder="`${$t('default')}：2048`" />
            <div class="ml10">
              ({{ $t('M') }})
            </div>
          </el-form-item>
        </el-form>
        <!-- <el-divider class="costv-divider mt0 mb16" /> -->
      </el-card>

      <!-- 高级设置 -->
      <el-card class="box-card">
        <template #header>
          <div class="deploy-config-title">{{ $t('advancedSetting') }}</div>
        </template>
        <el-form class="editor-form" :model="projectForm" label-width="200px">
          <el-form-item :label="$t('advancedSetting')">
            <div class="ml10 mr10 switch-not-text">
              <el-tooltip class="box-item" effect="dark"
                :content="isProfessional ? $t('hideConfiguration') : $t('displayConfiguration')" placement="top">
                <el-switch v-model="isProfessional" />
              </el-tooltip>
            </div>
          </el-form-item>

          <div v-if="isProfessional">
            <!-- 目录 -->
            <el-form-item :label="$t('buildSavedDirectory')" prop="saveasdir">
              <div class="ml10 mr10 switch-not-text">
                <el-tooltip class="box-item" effect="dark"
                  :content="projectForm.saveasdir ? $t('clickSaveFile') : $t('clickSaveDir')" placement="top">
                  <el-switch v-model="projectForm.saveasdir" :active-text="$t('currentSavedDirectory')"
                    :inactive-text="$t('savetarPackage')" />
                </el-tooltip>
              </div>
            </el-form-item>
            <!-- git缓存目录 -->
            <el-form-item :label="$t('directoryUsedGit')" prop="gitclonebycache">
              <div class="ml10 mr10 switch-not-text">
                <el-tooltip class="box-item" effect="dark"
                  :content="projectForm.gitclonebycache ? $t('clickNotUseCacheDir') : $t('clickUseCacheDir')"
                  placement="top">
                  <el-switch v-model="projectForm.gitclonebycache" :active-text="$t('currentCacheSavedDirectory')"
                    :inactive-text="$t('currentNotCacheSavedDirectory')" />
                </el-tooltip>
              </div>
            </el-form-item>
            <!-- 邮件 -->
            <el-form-item :label="$t('buildNotEmail')" prop="nomail">
              <div class="ml10 mr10 switch-not-text">
                <el-tooltip class="box-item" effect="dark"
                  :content="projectForm.nomail ? $t('clickNotSendEmail') : $t('clickSendEmail')" placement="top">
                  <el-switch v-model="projectForm.nomail" :active-text="$t('notSendEmail')"
                    :inactive-text="$t('sendEmail')" />
                </el-tooltip>
              </div>
            </el-form-item>
            <!-- 短信 -->
            <el-form-item :label="$t('buildNotSMS')" prop="nomesg">
              <div class="ml10 mr10 switch-not-text">
                <el-tooltip class="box-item" effect="dark"
                  :content="projectForm.nomesg ? $t('clickNotSendSMS') : $t('clickSendSMS')" placement="top">
                  <el-switch v-model="projectForm.nomesg" :active-text="$t('currentNotSMS')"
                    :inactive-text="$t('selectionSendSMS')" />
                </el-tooltip>
              </div>
            </el-form-item>
            <!-- CI -->
            <el-form-item :label="`CI${$t('messageRecipients')}`" prop="notifyci">
              <div class="ml10 mr10 switch-not-text">
                <el-input class="w450" v-model="projectForm.notifyci" :placeholder="$t('CIMessageUserDesc')" />
              </div>
            </el-form-item>
            <!-- CD -->
            <el-form-item :label="`CD${$t('messageRecipients')}`" prop="notifycd">
              <div class="ml10 mr10 switch-not-text">
                <el-input class="w450" v-model="projectForm.notifycd" :placeholder="$t('CDMessageUserDesc')" />
              </div>
            </el-form-item>
          </div>
        </el-form>
        <!-- <el-divider class="costv-divider mt0 mb16" /> -->
      </el-card>


      <!-- 发布配置 -->
      <el-card class="box-card">
        <template #header>
          <div class="deploy-config-title">{{ $t('DeployConfig') }}</div>
        </template>
        <div>
          <div v-if="projectForm.ci_type === 'kubernetes'">
            <el-form :model="projectForm" label-width="200px">
              <el-form-item :label="$t('autoOnlineDeploy')" prop="callonlineenv">
                <el-switch v-model="projectForm.callonlineenv" active-text="ON" inactive-text="OFF" inline-prompt
                  size="large" />
              </el-form-item>
              <el-form-item :label="$t('autoTestDeploy')" prop="calltestenv">
                <el-switch v-model="projectForm.calltestenv" active-text="ON" inactive-text="OFF" inline-prompt
                  size="large" />
              </el-form-item>
            </el-form>
          </div>
          <div v-else>
            <!-- 测试分组 -->
            <el-form :model="projectForm" label-width="200px">
              <el-button class="add-groups mt20 mb20" type=primary :icon="Plus" @click="onAddGroups('test')">
                {{ $t('testEnvGroup') }}
              </el-button>
              <el-form-item :label="$t('autoTestDeploy')" prop="calltestenv">
                <el-switch v-model="projectForm.calltestenv" active-text="ON" inactive-text="OFF" inline-prompt
                  size="large" />
              </el-form-item>

              <el-form-item v-for="(items, index) in showIPstr['test']" :key="index"
                :label="`${items.num}${$t('NumMachines')}`">
                <div class="mb20" v-for="cItem in items.infos" :key="cItem">
                  <el-tooltip class="box-item" effect="dark" :content="$t('checkMachineStatus')" placement="top">
                    <el-button type="primary" link @click="onNodeCheck('call', cItem)">{{ cItem }}</el-button>
                  </el-tooltip>
                </div>
              </el-form-item>
            </el-form>
            <el-divider class="costv-divider mt0 mb16" />

            <!-- 线上分组 -->
            <el-form :model="projectForm" label-width="200px">
              <el-button class="add-groups mt20 mb20" type="primary" :icon="Plus" @click="onAddGroups('online')">
                {{ $t('onlineEnvGroup') }}
              </el-button>
              <el-form-item :label="$t('autoOnlineDeploy')" prop="callonlineenv">
                <el-switch v-model="projectForm.callonlineenv" active-text="ON" inactive-text="OFF" inline-prompt
                  size="large" />
              </el-form-item>

              <el-form-item v-for="(items, index) in showIPstr['online']" :key="index"
                :label="`${items.num}${$t('NumMachines')}`">
                <div class="mb20" v-for="cItem in items.infos" :key="cItem">
                  <el-tooltip class="box-item" effect="dark" :content="`${$t('checkMachineStatus')}`" placement="top">
                    <el-button type="primary" link @click="onNodeCheck('call', cItem)">{{ cItem }}</el-button>
                  </el-tooltip>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <!-- <el-divider class="costv-divider mt0 mb16" /> -->
      </el-card>

      <!-- 作业步骤 -->
      <el-card class="box-card">
        <template #header>
          <div class="card-headers">
            <div class="deploy-config-title">{{ $t('jobStep') }}</div>
            <!-- <el-button class="add-groups mt20 mb20" type="primary" :icon="Plus" @click="onJobStep" link>
              {{ $t('jobStep') }}
            </el-button> -->
          </div>
        </template>
        <div>
          <el-form class="editor-form" :model="projectForm" label-width="300px">
            <!-- <el-button class="add-groups mt20 mb20" type="primary" :icon="Plus" @click="onJobStep">
              {{ $t('jobStep') }}
            </el-button> -->
            <el-form-item v-for="(items, index) in jobStepList" :ley="index"
              :label="`${$t('step')}${index + 1}:(${items.name})`">
              <span class="job-step-color" v-if="items.batches === 'firsttime'">[{{ $t('firstBatchOnly') }}]</span>
              <span class="job-step-color" v-if="items.batches === 'thelasttime'">[{{ $t('lastBatchOnly') }}]</span>
              <span class="job-step-color" v-if="items.batches === 'notfirsttime'">[{{ $t('notFirstBatch') }}]</span>
              <span class="job-step-color" v-if="items.batches === 'notthelasttime'">[{{ $t('notLastBatch') }}]</span>
              <span class="job-step-color" v-if="items.deployenv === 'test'">[{{ $t('testEnvOnly') }}]</span>
              <span class="job-step-color" v-if="items.deployenv === 'online'">[{{ $t('onlineEnvOnly') }}]</span>
              <span class="job-step-color" v-if="items.action === 'deploy'">[{{ $t('deployOnly') }}]</span>
              <span class="job-step-color" v-if="items.action === 'rollback'">[{{ $t('rollbackOnly') }}]</span>
              <span class="job-step-pause-color " v-if="items.pause">[{{ $t('pauseInspection') }}]</span>
            </el-form-item>
          </el-form>
        </div>
      </el-card>

      <!-- 操作 -->
      <div class="tr edit-footer">
        <el-button @click="backList">{{ $t('config.options.cancel') }}</el-button>
        <el-button type="primary" @click="onSave">{{ $t('save') }}</el-button>
      </div>
    </div>
  </div>
  <component :is="compType" :types="opType" :conTypes="compType" :treeId="String(treeId)" :treeData="treeData" :config="opConfig"
    :editItem="editItem" @close="compFlag = false" :clusterinfo="clusterinfo" @success="success" v-if="compFlag"
    v-model="compFlag" @selectRepo="selectRepo" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import store from '@/store'
import router from '@/router'
import { Plus } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import baseForm from '@/components/baseForm/index.vue'

import EditRelyModal from './operate/EditRelyModal.vue'
import ImportClusterModal from './operate/ImportClusterModal.vue'
import CreateNameSpaceModal from './operate/CreateNameSpaceModal.vue'
import MirrorWarehouseSelection from '../../components/MirrorWarehouseSelection.vue'
import AddEnvGroups from '../../components/AddEnvGroups.vue'
import {
  tempdata0,
  tempdata1,
  tempdata2,
  EDIT_FROM_FORM_CONFIG,
  NAME_SPACE_FORM_CONFIG,
  EDIT_RELY_DIALOG_CONFIG,
  IMPORT_CLUSTERMODAL_CONFIG,
} from './config'
import {
  ADD_ENV_GROUPS_CONFIG,
  MIRROR_WAREHOUSE_SELECTION_FORM_CONFIG,
} from '../../components/config'
import {
  AppNameInfo,
  FavoritesInfo,
  TicketAllInfo,
  FlowDeleteLine,
  MachineBatchInfo,
  ProjectDetailInfo,
  NodeCheckStatusInfo,
} from '@/api/interface/quickentry'
import { TaskDataTestParams } from '@/api/interface/dashboard'
import {
  updateGroupxx,
  createGroupxx,
  updateJobxx,
  createJobxx,
  getAllGroupList,
  getLineDetail,
  getCodeTicket,
  getAppNameList,
  getJobListInfo,
  getClusterLists,
  getNameSpaceList,
  getContainerList,
  getBuildImageList,
  getNodeCheckStatus,
  getMachineBatchName,
  modifyFlowline,
} from '@/api/quickentry/index'
import { deepClone } from '@/utils'

interface StateInfo {
  loading: boolean;
  formConfig: any;
  selectName: string;
  selectTreeId: string[] | string | number;
  selectSourceId: string[] | string | number;
  k8sname: string;
  projectForm: ProjectDetailInfo;
  ciType: 'default' | 'kubernetes'
  addrDemo: string;
  ticketinfogit: Array<any>;
  ticketinfok8s: Array<any>;
  ticketinfoall: TicketAllInfo[];
  compType: string;
  editItem: any;
  compFlag: boolean;
  opType: string;
  opConfig: any;
  buildimageOption: Array<any>;
  clusterList: Array<any>;
  siteaddr: string;
  nameSpaceList: Array<any>;
  isSingleApp: boolean;
  AppList: Array<any>;
  containerList: Array<any>;
  isFllowupOpen: boolean;
  isApproverFirst: boolean;
  isProfessional: boolean;
  showIPstr: { 'test': Array<any>, 'online': Array<any> };
  jobStepList: Array<any>;
  clusterinfo: any;
  addGroupFlag: boolean;
  info: any;
  groupIdArr: { test?: any, online?: any }
  groupid: any;
  jobUuid: string;
}

export default defineComponent({
  components: {
    baseForm,
    AddEnvGroups,
    EditRelyModal,
    ImportClusterModal,
    CreateNameSpaceModal,
    MirrorWarehouseSelection,
  },
  props: {
    treeId: {
      required: false,
      type: String,
      default: '4000000000',
    },
    treeData: {
      required: false,
      type: Array,
      default: [],
    },
    sourceIds: {
      required: false,
      type: String,
      default: ''
    },
    titleFlag: {
      required: false,
      type: Boolean,
      default: true,
    }
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance

    const route = useRoute()

    const treeId = computed(() => {
      return store.getters.treeId
    })

    const treeData = computed(() => {
      return store.getters.treeData
    })

    const state: StateInfo = reactive({
      loading: false,
      formConfig: deepClone(EDIT_FROM_FORM_CONFIG),
      opConfig: deepClone(EDIT_RELY_DIALOG_CONFIG),
      selectName: '',
      selectTreeId: '',
      selectSourceId: '',
      k8sname: '',
      projectForm: {
        status: 0,
        audit_level: 0,
        autofindtags: 0,
        autobuild: 0,
        buildimage: '',
        ci_type_name: '',
      },
      siteaddr: `${window.location.protocol}//${window.location.host}`,
      addrDemo: 'https://github.com/open-c3/ci-demo.git',
      ticketinfogit: [],
      ticketinfok8s: [],
      ticketinfoall: [],
      compType: 'EditRelyModal',
      editItem: {},
      compFlag: false,
      opType: 'editRely',
      buildimageOption: [],
      clusterList: [],
      nameSpaceList: [],
      isSingleApp: false,
      AppList: [],
      containerList: [],
      isFllowupOpen: false,
      isApproverFirst: false,
      ciType: 'default',
      isProfessional: false,
      showIPstr: { 'test': [], 'online': [] },
      jobStepList: [],
      clusterinfo: {},
      addGroupFlag: false,
      info: null,
      groupIdArr: {},
      groupid: {},
      jobUuid: '',
    })

    // 获取流水线详情信息
    const getDetail = async () => {
      state.loading = true
      let followUpArr = ['harbor_push_image.pl', 'awsecr_push_image.pl', 'no_push_image.pl']
      const dataRet = await getLineDetail(state.selectTreeId, { id: route.params.sourceId }).catch(err => state.loading = false)
      if (dataRet) {
        state.loading = false
        const newData = JSON.parse(JSON.stringify(dataRet))
        state.selectName = dataRet.name
        if (dataRet.ci_type === 'kubernetes') {
          state.k8sname = dataRet.ci_type_name.split(",");
        }
        newData.status = Boolean(Number(newData.status))
        newData.audit_level = Boolean(Number(newData.audit_level))
        newData.autobuild = Boolean(Number(newData.autobuild))
        newData.autofindtags = Boolean(Number(newData.autofindtags))
        newData.rely = Boolean(Number(newData.rely))
        newData.webhook = Boolean(Number(newData.webhook))
        newData.ci_type_open = Boolean(Number(newData.ci_type_open))
        newData.ci_type_approver1 = Boolean(Number(newData.ci_type_approver1))
        newData.callonlineenv = Boolean(Number(newData.callonlineenv))
        newData.calltestenv = Boolean(Number(newData.calltestenv))
        newData.ci_type_concurrent = Number(newData.ci_type_concurrent)

        state.projectForm = newData
        state.isSingleApp = Array.isArray(newData.ci_type_name)

        if (followUpArr.includes(state.projectForm.follow_up) || !state.projectForm.follow_up) {
          state.isFllowupOpen = false
        } else {
          state.isFllowupOpen = false
        }

        if (/,/.test(state.projectForm.ci_type_name)) {
          let ciTypeName = state.projectForm.ci_type_name.split(',')
          if (ciTypeName.length > 1) {
            state.projectForm.ci_type_name = ciTypeName
          }
        }
        await getContainerData()
        await getAppNameData()
      }
    }

    // 获取机器发布环境分组内容
    const getNodeByName = async (envname: 'test' | 'online') => {
      state.showIPstr[envname] = [];
      const nodeParams: MachineBatchInfo = {
        envname: envname,
        id: route.params.sourceId
      }
      const dataRet = await getMachineBatchName(state.selectTreeId, nodeParams)
      if (dataRet) {
        const newData = JSON.parse(JSON.stringify(dataRet))
        newData.forEach((item) => {
          const subAll = []
          let oneLen = item.length
          if (oneLen > 0) {
            let ss = 0
            let groupNum = 0
            let ipStr = []
            item.forEach((cItem, cIndex) => {
              if (ss === 8) {
                subAll.push(ipStr.join())
                ss = 0
                ipStr = []
              }
              ipStr.push(cItem)
              if (oneLen === cIndex + 1) {
                subAll.push(ipStr.join())
              }
              ss += 1
              groupNum += 1
            })
            let infos = { 'num': groupNum, 'infos': subAll }
            state.showIPstr[envname].push(infos)
          }
        })
      }
    }

    // 获取组信息 
    const getGroupInfo = async () => {
      const params: FavoritesInfo = {
        treeId: route.params.treeId || props.treeId
      }
      const dataRet = await getAllGroupList(params)
      if (dataRet) {
        const newData = JSON.parse(JSON.stringify(dataRet))
        newData.forEach(item => {
          if (item.name === `_ci_test_${route.params.sourceId || props.sourceIds}_`) {
            state.groupIdArr['test'] = item.id
          }
          if (item.name === `_ci_online_${route.params.sourceId || props.sourceIds}_`) {
            state.groupIdArr['online'] = item.id
          }
        })
      }
    }

    // 获取代码仓库凭据
    const getCodeTicketData = async () => {
      const params: FlowDeleteLine = {
        id: route.params.sourceId
      }
      const dataRet = await getCodeTicket(params)
      if (dataRet) {
        state.ticketinfoall = [...dataRet]
        dataRet.forEach(item => {
          item['label'] = item.name
          if (item.type === 'Harbor' || item.type === 'JobBuildin') {
            state.ticketinfok8s.push(item)
          }

          if (item.type === 'SSHKey' || item.type === 'UsernamePassword' || item.type === 'Harbor') {
            state.ticketinfogit.push(item)
          }
        })
        state.formConfig.config.filter(item => item.prop === 'ticketid')[0].data = [...state.ticketinfogit]
      }
    }

    // 获取build镜像 
    const getBuildImageData = async () => {
      const dataRet = await getBuildImageList({})
      if (dataRet) {
        const config = state.formConfig.config.filter(item => item.prop === 'buildimage')[0].data
        config.push(...dataRet)
        const newData = JSON.parse(JSON.stringify(config))
        newData.map(item => {
          item.value = item.id
          item.label = item.name
        })
        state.buildimageOption = [...newData]
      }
    }

    // // 代码仓库地址相关
    const onMouseEnterAddr = () => {
      if (state.projectForm.addr === state.addrDemo) {
        state.projectForm.addr = ''
      }
    }

    const onMouseOutAddr = () => {
      if (state.projectForm.addr === undefined || state.projectForm.addr === '') {
        state.projectForm.addr = state.addrDemo
      }
    }

    const onChangeAddr = (value) => {
    }

    // // K8S相关
    // 集群列表
    const getClusterData = async () => {
      const dataRet = await getClusterLists({})
      if (dataRet) {
        const newData = JSON.parse(JSON.stringify(dataRet))
        state.clusterList = newData.map(item => {
          if (String(item.id) === state.projectForm.ci_type_ticketid) {
            state.clusterinfo = item
          }
          item.value = String(item.id)
          item.label = item.name
          return item
        })
      }
    }

    const KubernetesSaveGroupByEnv = async (env: 'test' | 'online') => {
      const projectId = route.params.sourceId || props.sourceIds
      let postData = {};
      postData['group_type'] = 'list';
      postData['name'] = `_ci_${env}_${projectId}_`
      postData['node'] = `${env}.env`
      postData['note'] = 'ci';
      let groupid = state.groupIdArr[env];
      const params = {
        treeId: route.params.treeId,
        groupId: groupid,
        data: postData
      }
      // 编辑分组
      if (groupid) {
        await updateGroupxx(params)
        // 创建分组
      } else {
        await createGroupxx(params)
      }
    }

    const KubernetesSaveJob = async () => {
      let data = []
      if (state.projectForm.ci_type_approver2 !== undefined && state.projectForm.ci_type_approver2 !== '') {
        tempdata0.approver = state.projectForm.ci_type_approver2
        data.push(tempdata0)
      }
      data.push(tempdata1)
      data.push(tempdata2)
      const projectId = route.params.sourceId || props.sourceIds
      let post_data = {
        name: `_ci_${projectId}_`,
        mon_ids: 0,
        mon_status: false,
        data: data,
        permanent: 'permanent'
      }
      if (state.jobUuid) {
        const params = {
          treeId: route.params.treeId,
          groupId: state.jobUuid,
          data: post_data
        }
        // 编辑分组
        await updateJobxx(params)

      } else {
        const params = {
          treeId: route.params.treeId,
          groupId: state.jobUuid,
          data: post_data
        }
        // 创建分组
        await createJobxx(params)
      }
    }

    const setjobuuid = (uuid: string) => {
      state.jobUuid = uuid
    }

    // 命名空间
    const getNameSpaceData = async () => {
      if (state.projectForm.ci_type_ticketid && state.projectForm.ci_type_ticketid === '') {
        state.nameSpaceList = []
        return
      }
      const dataRet = await getNameSpaceList({ id: state.projectForm.ci_type_ticketid })
      if (dataRet) {
        const newData = JSON.parse(JSON.stringify(dataRet))
        state.nameSpaceList = newData.map(item => {
          item.value = String(item.NAME)
          item.label = item.NAME
          return item
        })
      }
    }

    // 应用名称
    const getAppNameData = async (param?: AppNameInfo) => {
      if (state.projectForm.ci_type_ticketid === '') {
        return false
      }
      const params: AppNameInfo = {
        kind: state.projectForm.ci_type_kind,
        ticketId: state.projectForm.ci_type_ticketid,
        namespace: state.projectForm.ci_type_namespace,
      }
      const dataRet = await getAppNameList(params)
      if (dataRet) {
        const newData = JSON.parse(JSON.stringify(dataRet))
        state.AppList = newData.map(item => {
          item.value = String(item.NAME)
          item.label = item.NAME
          return item
        })
      }
    }

    // 获取 container容器
    const getContainerData = async () => {
      if (state.projectForm.ci_type_ticketid === '') {
        return false
      }
      if (state.projectForm.ci_type_name === '' || !state.projectForm.ci_type_name) {
        return false
      }
      let ciTypeName: string = ''
      if (state.projectForm.ci_type_name.constructor === Array) {
        if (state.projectForm.ci_type_name['length'] > 0) {
          ciTypeName = state.projectForm.ci_type_name[0];
        } else {
          state.clusterList = []
        }
      } else {
        ciTypeName = state.projectForm.ci_type_name
      }
      const params: AppNameInfo = {
        kind: state.projectForm.ci_type_kind,
        ticketId: state.projectForm.ci_type_ticketid,
        namespace: state.projectForm.ci_type_namespace,
        name: ciTypeName,
      }
      const dataRet = await getContainerList(params)
      if (dataRet) {
        const newData = JSON.parse(JSON.stringify(dataRet))
        state.containerList = newData.map(item => {
          item.value = item.container
          item.label = item.container
          return item
        })
      }
    }

    // 获取作业步骤列表
    const getJobStepData = async () => {
      const params: TaskDataTestParams = {
        treeId: state.selectTreeId,
        id: route.params.sourceId || props.sourceIds
      }
      const dataRet = await getJobListInfo(params)
      if (dataRet) {
        const newData = JSON.parse(JSON.stringify(dataRet))
        state.jobUuid = dataRet.uuid
        if (newData.data) {
          newData.data.forEach(item => {
            state.jobStepList.push(item)
          })
        }
      }
    }

    const onTicketIdChange = async (value) => {
    }

    //  切换发布类型配置
    const setcitype = (type: 'default' | 'kubernetes') => {
      state.projectForm.ci_type = type;
      if (type = 'kubernetes') {
        state.projectForm.ci_type_kind = "deployment";
        state.projectForm.follow_up = "harbor_push_image.pl";
        state.projectForm.ci_type_dockerfile = "Dockerfile";
      }
      getCodeTicketData()
    }

    // 检查机器状态
    const onNodeCheck = async (type: string, node: string) => {
      const params: NodeCheckStatusInfo = {
        type, node, treeId: treeId.value
      }
      const dataRet = await getNodeCheckStatus(params).catch(err => {
        proxy.$notification(`${proxy.$t('nodeAnomaly')} ${err.info}`, 'error')
      })
      if (dataRet) {
        proxy.$notification(proxy.$t('nodeNormal'))
      }
    }

    // 添加分组 
    const onAddGroups = async (type: 'test' | 'online') => {
      state.compFlag = true
      state.compType = 'AddEnvGroups'
      state.opConfig = deepClone(ADD_ENV_GROUPS_CONFIG)
      state.editItem = {
        grouptype: type,
        ciid: route.params.sourceId || props.sourceIds,
        groupid: state.groupIdArr[type]
      }
    }

    const editAddGroupLoad = () => {

    }

    // 添加作业步骤
    const onJobStep = async () => {

    }

    // 操作
    const operate = async (type: string, row: any) => {
      state.opType = type
      switch (type) {
        case 'editRely':
          state.compFlag = true
          state.compType = 'EditRelyModal'
          state.editItem = {
            title: `${treeData.value.parent} - ${state.selectName} ${proxy.$t('editRely')}`,
            sourceId: route.params.sourceId || props.sourceIds
          }
          break

        case 'addK8S':
          state.compFlag = true
          state.compType = 'ImportClusterModal'
          state.opConfig = deepClone(IMPORT_CLUSTERMODAL_CONFIG)
          state.editItem = {
            title: proxy.$t('addKubernetesTitle'),
            type: 'create',
            point: 'KubeConfig',
            ticketType: 'KubeConfig',
            sourceId: route.params.sourceId || props.sourceIds,
          }
          break

        case 'addImageCredential':
          state.compFlag = true
          state.compType = 'ImportClusterModal'
          state.opConfig = deepClone(IMPORT_CLUSTERMODAL_CONFIG)
          state.editItem = {
            title: proxy.$t('addKubernetesTitle'),
            type: 'create',
            ticketType: 'Harbor',
            point: 'Harbor',
            sourceId: route.params.sourceId || props.sourceIds,
          }
          break

        case 'createNameSpace':
          if (!state.clusterinfo?.id) {
            await getClusterData()
          }
          state.compFlag = true
          state.compType = 'CreateNameSpaceModal'
          state.opConfig = deepClone(NAME_SPACE_FORM_CONFIG)
          state.editItem = {
            title: proxy.$t('createNameSpace'),
            ticketId: state.projectForm.ci_type_ticketid
          }
          break

        // 提取镜像的两种方式
        case 'container':
          let matched = false
          let matchName: string = state.projectForm.ci_type_container
          if (matchName === '__app_name__') {
            matchName = state.projectForm.ci_type_name
          }
          state.containerList.forEach(item => {
            if (item.container === matchName) {
              state.projectForm.ci_type_repository = item.repository
              matched = true
            }
          })
          if (matched) {
            proxy.$notification(proxy.$t('sucessfullyExtracted'));
          }
          else {
            proxy.$notification({ title: proxy.$t('extractionFailure'), type: 'error' });
          }
          break

        case 'credential':
          state.compFlag = true
          state.compType = 'MirrorWarehouseSelection'
          state.opConfig = deepClone(MIRROR_WAREHOUSE_SELECTION_FORM_CONFIG)
          state.editItem = {
            ticketId: state.projectForm.follow_up_ticketid
          }
          break
      }
    }

    // 提交
    const onSave = async () => {
      (proxy?.$refs.form as any).validFun().then(async (flag: any) => {
        if (flag) {
          ElMessageBox.confirm(proxy?.$t('saveConfigDesc'), proxy?.$t('saveConfig'), {
            confirmButtonText: proxy?.$t('config_options_confirm'),
            cancelButtonText: proxy?.$t('config_options_cancel'),
            type: 'warning'
          }).then(async () => {
            state.projectForm.status = Number(state.projectForm.status)
            state.projectForm.audit_level = Number(state.projectForm.audit_level)
            state.projectForm.autobuild = Number(state.projectForm.autobuild)
            state.projectForm.autofindtags = Number(state.projectForm.autofindtags)
            state.projectForm.rely = Number(state.projectForm.rely)
            state.projectForm.webhook = Number(state.projectForm.webhook)
            state.projectForm.ci_type_open = String(Number(state.projectForm.ci_type_open))
            state.projectForm.ci_type_approver1 = Boolean(state.projectForm.ci_type_approver1)
            state.projectForm.callonlineenv = Number(state.projectForm.callonlineenv)
            state.projectForm.calltestenv = Number(state.projectForm.calltestenv)
            state.projectForm.ci_type_concurrent = Number(state.projectForm.ci_type_concurrent)
            const dataRet = await modifyFlowline(route.params.treeId, route.params.sourceId, state.projectForm)
            if (dataRet) {
              if (state.projectForm.ci_type === 'kubernetes') {
                KubernetesSaveGroupByEnv('test')
                KubernetesSaveGroupByEnv('online')
                if (!state.projectForm.ci_type_approver1) {
                  KubernetesSaveJob()
                }
              }
              proxy.$notification('operationSuccess')
              backList()
            }
          }).catch(() => { })

        }
      })
    }

    // 组件成功回调
    const success = (type?: 'test' | 'online') => {
      if (type) {
        getGroupInfo()
        getNodeByName(type)
      } else {
        getNameSpaceData()
      }
      close()
    }
    const close = () => {
      state.compFlag = false
    }

    // 组件调用函数接口
    const selectRepo = async (repo: string) => {
      state.projectForm.ci_type_repository = repo
    }

    // 返回流水线列表
    const backList = () => {
      if (route.query.ids) router.push({ query: {} })
      router.push('/quickentry/flowline')
    }

    watch(() => state.projectForm.ci_type_ticketid, (value) => {
      if (value && value !== '') {
        getNameSpaceData()
      }
    })
    watch(() => treeId.value, (acc, cur) => {
      if (String(acc) !== String(route.params.treeId)) {
        router.push('/quickentry/flowline')
      }
    })

    onMounted(() => {
      state.selectTreeId = route.params.treeId || props.treeId
      state.selectSourceId = route.params.sourceId || props.sourceIds
      getDetail()
      getGroupInfo()
      getClusterData()
      getJobStepData()
      getCodeTicketData()
      getBuildImageData()
      getNodeByName('test')
      getNodeByName('online')
    })

    return {
      Plus,
      treeId,
      treeData,
      EDIT_FROM_FORM_CONFIG,
      EDIT_RELY_DIALOG_CONFIG,
      MIRROR_WAREHOUSE_SELECTION_FORM_CONFIG,
      ...toRefs(state),
      close,
      onSave,
      success,
      operate,
      backList,
      getDetail,
      onJobStep,
      setcitype,
      selectRepo,
      onNodeCheck,
      onAddGroups,
      onChangeAddr,
      getNodeByName,
      getAppNameData,
      onMouseOutAddr,
      onTicketIdChange,
      getContainerData,
      onMouseEnterAddr,
      getCodeTicketData,
      getBuildImageData,
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &-left {
    display: flex;
    justify-content: center;
    align-items: center;

    &-svg {
      color: var(--color_btn_bg);
    }
  }

  &-header {
    color: var(--color_text)
  }
}

.layout-content {
  &-operation {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-find {
      font-size: 14px;
    }

    &-create {
      font-size: 14px;
    }
  }

  &-table {
    margin: 20px auto;
  }
}

.con {
  // background-color: var(--color_bg_con);
  padding: 24px 20px;

  :deep(.el-switch__core) {
    width: 60px !important;
  }
}

.box-card {
  margin: 20px auto;
}
.card-headers {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.switch-not-text {
  :deep(.el-switch__core) {
    width: 38px !important;
  }
}

.addr-tooltip {
  display: inline-block;
  margin-left: 10px;
}

.webhook-input-content {
  margin: 20px 0;

  &-items {
    margin: 10px 0;

    span {
      display: inline-block;
      width: 100px
    }

    ;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}

.buildimage-input-content-items {
  margin: 10px 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  &-message {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      display: inline-block;
      width: 80px
    }
  }

  &-text {
    color: var(--color_menu_text);
  }
}

.webhook {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}

.ci-type-open {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}

.build-image {
  display: flex;
  flex-direction: column;
}

.app-name-content {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.w450 {
  width: 450px;
}

.deploy-config-title {
  // margin-left: 40px !important;
  font-size: 12px;
  font-weight: 600;
  margin: 5px 0;
  color: var(--el-text-color-regular)
}
.edit-footer {
  font-size: 12px;
}

.add-groups {
  margin-left: 75px !important;
}

.job-step-color {
  color: var(--el-color-gray);
}

.job-step-pause-color {
  color: var(--color-chart-9);
}

.editor-form {
  :deep(.el-form-item__label) {
    font-size: 12px !important;
  }

  :deep(.el-form-item__content) {
    font-size: 12px !important;
  }
}
</style>