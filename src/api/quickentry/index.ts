// 配置相关的api
import request from '@/utils/request'
import {
  TaskDataParams,
  TaskDataTestParams,
  TaskDataListProps,
} from '../interface/dashboard'
import {
  GroupInfo,
  EditDeplymentInfo,
  NameSpaceInfo,
  AppNameInfo,
  JobListInfo,
  AddRelyInfo,
  RelyRowInfo,
  K8SParamsInfo,
  CiShellInfo,
  KillBuildsInfo,
  CreateTaskInfo,
  ConfirmBuildInfo,
  FavoritesInfo,
  FlowBlankLine,
  CreateJobLine,
  FlowDeleteLine,
  ReNameFlowLine,
  FavoritesParams,
  MachineBatchInfo,
  GetAppInfomation,
  FlowLineDetailInfo,
  ManuralSubmitInfo,
  QuickentryPromiseInfo,
  NodeCheckStatusInfo,
  GetCredentialsInfo,
  AssistanceInputParameterInfo,
  TempOperateInfo,
  DockerCOnfigJSONInfo,
  AutoSecretInfo,
} from '../interface/quickentry'

/**
 * 获取测试状态信息 get
 * /api/jobx/task/{treeId}allowslavenull=1&name=_ci_
 * @param treeId
 */

export const getJobxTaskList = (data: TaskDataParams): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/jobx/task/${data.treeId}?allowslavenull=1&name=_ci_`,
    method: 'get',
    data
  })
}

/**
 * 添加收藏 post
 * /api/ci/favorites/{treeId}
 * @param treeId
 * @param name
 * @param ciid
 */

export const addToFavoriteOperate = (treeId, data: FavoritesParams): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/favorites/${treeId}`,
    method: 'post',
    data
  })
}

/**
 * 取消收藏 delete
 * /api/ci/favorites/{treeId}
 * @param treeId
 * @param ciid
 */

export const delToFavoriteOperate = (params: FavoritesParams): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/favorites/${params.treeId}`,
    method: 'delete',
    params
  })
}

/**
 * 可见的流水线列表 get 
 * /api/ci/group/all/{treeId}
 * @param treeId
 * @param ciid
 */
export const getAllFlowLineList = (data: FavoritesInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/group/all/${data.treeId}`,
    method: 'get',
    data
  })
}

/**
 * 流水线/获取某个服务树下流水线列表 get
 * /api/ci/group/{treeId}
 * @param treeId
 * @param name
 */

export const getBuildLineList = (data: FavoritesInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/group/${data.treeId}`,
    method: 'get',
    data
  })
}

/**
 * 新建流水线 post
 * /api/ci/group/{treeId}
 * @param treeId
 * @param name
 */

export const createLineList = (data: FavoritesInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/group/${data.treeId}`,
    method: 'post',
    data
  })
}

/**
 * 新建流水线 post
 * /api/ci/group/{treeId}
 * @param treeId
 * @param name
 */

export const createBlankLines = (treeId: string | number | string[], data: FlowBlankLine): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/group/${treeId}`,
    method: 'post',
    data
  })
}


/**
 * 新建作业 post
 * /api/job/jobs/{treeId}/copy/byname
 * @param treeId
 * @param name
 */

export const createJobLine = (treeId: string | number | string[], data: CreateJobLine): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/job/jobs/${treeId}/copy/byname`,
    method: 'post',
    data
  })
}

/**
 * 机器分批通过名称新建测试环境、线上环境  post
 * 
 * @param treeId/copy/byname'
 */

export const createJobxEnv = (treeId: string | number | string[], data: CreateJobLine): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/jobx/group/${treeId}/copy/byname`,
    method: 'post',
    data,
  })
}

/**
 * 机器分批通过名称新建线上环境 post
 * 
 * @param treeId/copy/byname'
 */

/**
 * 删除作业 delete
 * /api/job/jobs/{treeId}/_ci_{id}_/byname
 * @param treeId
 * @param name
 */

export const deleteFlowLine = (treeId: string | number | string[], params: FlowDeleteLine): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/job/jobs/${treeId}/_ci_${params.id}_/byname`,
    method: 'delete',
  })
}

/**
 * 删除流水线配置 delete
 * /api/ci/project/{treeId}/{projectid}'
 * @param treeId
 * @param id
 */

export const deleteProjectLine = (treeId: string | number | string[], params: FlowDeleteLine): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/project/${treeId}/${params.id}`,
    method: 'delete',
  })
}

/**
 * 机器分批通过名称删除测试环境 delete
 * 
 * @param treeId/_ci_test_/{projectId}_/byname'
 * @param treeId
 * @param projectId => id
 */

export const deleteJobxTest = (treeId: string | number | string[], params: FlowDeleteLine): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/jobx/group/${treeId}/_ci_test_${params.id}_/byname`,
    method: 'delete',
  })
}

/**
 * 机器分批通过名称删除线上环境 delete
 * 
 * @param treeId/_ci_online_/{projectId}_/byname'
 * @param treeId
 * @param projectId => id
 */

export const deleteJobxOnline = (treeId: string | number | string[], params: FlowDeleteLine): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/jobx/group/${treeId}/_ci_online_${params.id}_/byname`,
    method: 'delete',
  })
}

/**
 * 修改流水线名称 post
 * /api/ci/project/${treeId}/${sourceid}/rename
 * @param treeId
 * @param sourceid => id
 * @param name
 */

export const modiftNameLine = (treeId: string | number | string[], data: ReNameFlowLine): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/project/${treeId}/${data.id}/rename`,
    method: 'post',
    data
  })
}

/**
 * 编辑流水线信息 post
 * /api/ci/project/${treeId}/${sourceid}/rename
 * @param treeId
 * @param projectid => id
 * @param name
 */

export const modifLineeInfo = (treeId: string | number | string[], projectid: string | number | string[], data: any): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/project/${treeId}/${projectid}/rename`,
    method: 'post',
    data
  })
}

/**
 * 流水线详情版本列表 get
 * /api/ci/version/{treeId}/{projectid}?limit={limit}
 * @param treeId
 * @param projectId => id
 * @param limit
 */
export const getLineDetaulList = (treeId: string | number | string[], params: FlowLineDetailInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/version/${treeId}/${params.id}?limit=${params.limit}`,
    method: 'get',
  })
}

/**
 * 单个流水线详情 get
 * /api/ci/project/{treeId}/{projectid}
 * @param treeId
 * @param projectId => id
 */
export const getLineDetail = (treeId: string | number | string[], params: FlowLineDetailInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/project/${treeId}/${params.id}`,
    method: 'get',
  })
}

/**
 * 机器分批/获取机器分组内容/通过分组名查询 get
 * 
 * @param treeId/:name/node/byname
 * @param treeId
 * @param id
 * @param envname
 */
export const getMachineBatchName = (treeId: string | number | string[], params: MachineBatchInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/jobx/group/${treeId}/_ci_${params.envname}_${params.id}_/node/byname`,
    method: 'get',
  })
}

/**
 * CI/进入构建调试的shell中
 * /api/ci/dockershell?image={image}&projectid={id}&tag={tag}&siteaddr={siteaddr}
 * @param image 
 * @param projectid => id
 * @param tag
 * @param siteaddr
 */


export const onCiShell = (params: CiShellInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/dockershell`,
    method: 'get',
    params
  })
}

/**
 * 获取测试状态信息params get
 * /api/jobx/task/{treeId}allowslavenull=1&name=_ci_
 * @param treeId
 * @param projectid => id
 */

export const getJobxTaskListParams = (data: TaskDataTestParams): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/jobx/task/${data.treeId}?allowslavenull=1&name=_ci_${data.id}_`,
    method: 'get',
    data
  })
}

/**
 * 业务管理/变量查看/信息查询
 * /api/job/vv/{treeid}?name=APP__ci_{projectid}__VERSION
 * @param treeId
 * @param projectid => id
 */

export const getJobVersionParams = (data: TaskDataTestParams): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/job/vv/${data.treeId}?name=APP__ci_${data.id}__VERSION`,
    method: 'get',
    data
  })
}

/**
 * 获取最新构建版本
 * /api/jobx/flowline_version/
 * @param treeId
 */

export const getLastVersionDetail = (data: { id: string | string[] }): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/jobx/flowline_version/${data.id}`,
    method: 'get',
  })
}

/**
 * 获取版本列表
 * /api/job/vv/{data.treeId}/analysis/version
 * @param treeId
 */

export const getVersionList = (data: TaskDataParams): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/job/vv/${data.treeId}/analysis/version`,
    method: 'get',
  })
}

/**
 * 获取job列表
 * /api/job/jobs/{treeid}/byname?name=_ci_{projectid}_ 
 * @param treeId
 * @param projectid => id
 */
export const getJobListInfo = (data: TaskDataTestParams): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/job/jobs/${data.treeId}/byname?name=_ci_${data.id}_ `,
    method: 'get',
    data
  })
}

/**
 * 确认构建  put
 * /api/ci/version/{data.treeId}/{data.id}/{data.uuid}/build
 * @param treeId
 * @param projectid => id
 * @param uuid
 */

export const onBuildOperate = (data: ConfirmBuildInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/version/${data.treeId}/${data.id}/${data.uuid}/build`,
    method: 'put',
    data
  })
}

/**
 * 流水线全部停止构建 put
 * api/ci/version/{treeId}/{projectId}/stop_project
 * @param treeId
 * @param projectId => id
 */

export const stopAllBuildOperate = (data: TaskDataTestParams): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `api/ci/version/${data.treeId}/${data.id}/stop_project`,
    method: 'put',
    data
  })
}

/**
 * 单个流水线停止构建 put
 * /api/ci/slave/{slave}/killbuild/{uuid}  
 * killbuild
 */

export const killBuildOperate = (data: KillBuildsInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/slave/${data.slave}/killbuild/${data.uuid}`,
    method: 'put',
    data
  })
}

/**
 * 获取所有组信息 get
 * /api/jobx/group/{treeId}
 * @param treeId
 */

export const getAllGroupList = (params: FavoritesInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/jobx/group/${params.treeId}`,
    method: 'get',
  })
}

/**
 * 获取用户登录信息
 * /api/connector/connectorx/sso/userinfo get 
 */

export const getConnector = (params: object): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/connector/connectorx/sso/userinfo`,
    method: 'get',
  })
}

/**
 * 获取所有job信息
 * /api/job/variable/{treeId}/{uuid}?empty=1&usrext=1&env={jobType}  get
 * @param treeId
 * @param uuid
 * @param jobType
 */

export const getAllJobsList = (params: JobListInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/job/variable/${params.treeId}/${params.uuid}?empty=1&usrext=1&env=${params.jobType}`,
    method: 'get',
  })
}

/**
 * 获取服务树下job信息
 * /api/job/jobs/{treeId} get
 * @param treeId
 * @param uuid
 * @param jobType
 */

export const getTreeJobs = (params: FavoritesInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/job/jobs/${params.treeId}`,
    method: 'get',
  })
}
// ManuralSubmitInfo
/**
 * 流水线/手动提交版本 post
 * /api/ci/version/:groupid/:projectid/record
 */

export const flowLinemManualSub = (data: ManuralSubmitInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/version/${data.treeId}/${data.id}/record`,
    method: 'post',
    data: data.data
  })
}

/**
 * 创建任务 post
 * /api/jobx/task/{treeId}/job/byname
 * @param data: CreateTaskInfo
 */

export const createNewTask = (data: CreateTaskInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/jobx/task/${data.id}/job/byname`,
    method: 'post',
    data: data.data
  })
}

/**
 * 查看 deployment 应用信息 get
 * /api/ci/v2/kubernetes/app/describe/deployment?ticketid={ticketid}&type={type}&name={name}&namespace={namespace}
 */

export const getAppInformation = (params: GetAppInfomation): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/v2/kubernetes/app/describe/deployment?ticketid=${params.ticketid}&type=${params.type}&name=${params.name}&namespace=${params.namespace}`,
    method: 'get',
  })
}
// /api/ci/v2/kubernetes/app/describe?ticketid=" + ticketid + '&type=' + type + '&name=' + name + '&namespace=' + namespace 

/**
 * 查看 describe 应用信息 get
 * /api/ci/v2/kubernetes/app/describe?ticketid=={ticketid}&type={type}&name={name}&namespace={namespace}
 */

export const getDescAppInformation = (params: GetAppInfomation): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/v2/kubernetes/app/describe?ticketid=${params.ticketid}&type=${params.type}&name=${params.name}&namespace=${params.namespace}`,
    method: 'get',
  })
}

/**
 * 获取代码仓库凭据 get
 * /api/ci/ticket?projectid={projectid}
 * @param projectid => id
 */

export const getCodeTicket = (params: FlowDeleteLine): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/ticket?projectid=${params.id}`,
    method: 'get',
  })
}

export const getCodeTicketNoPath = (params: FlowDeleteLine): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/ticket`,
    method: 'get',
  })
}
/**
 * 添加新依赖规则 post 
 * /api/ci/rely/{projectid}, vm.newrely
 * @param projectid => id
 * @param newrely => data
 */
export const addNewRely = (data: AddRelyInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/rely/${data.id}`,
    method: 'post',
    data: data.data
  })
}

/**
 * 获取依赖规则列表 get 
 * /api/ci/rely/{projectid}, vm.newrely
 * @param projectid => id
 */
export const getRelyList = (params: FlowDeleteLine): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/rely/${params.id}`,
    method: 'get',
  })
}

/**
 * 删除依赖 delete 
 * '/api/ci/rely/{projectid}/{id}
 * @param projectId
 * @param id
 */

export const deleteRelyRow = (params: RelyRowInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/rely/${params.projectId}/${params.id}`,
    method: 'delete',
  })
}

/**
 * 获取所有build镜像 get
 * /api/ci/images
 */

export const getBuildImageList = (params: FlowDeleteLine): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/images`,
    method: 'get',
  })
}

/**
 * 获取K8S集群列表 get
 * /api/ci/ticket/KubeConfig
 */

export const getClusterLists = (params: FlowDeleteLine): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/ticket/KubeConfig`,
    method: 'get',
  })
}

/**
 * K8S集群保存凭据
 * /api/ci/ticket/{ticketId}?{detail}
 * @param ticketid => ticketId
 * @param detail
 */

export const saveK8STicketId = (params: K8SParamsInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/ticket${params.ticketId && params.ticketId !== '' ? `/${params.ticketId}` : ''}`,
    method: 'post',
    data: params.postData,
  })
}

/**
 * K8S集群连接测试
 * /api/ci/v2/kubernetes/cluster/connectiontest
 * @param ticketid => ticketId
 * @param detail
 */

export const connectionTest = (params: K8SParamsInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/v2/kubernetes/cluster/connectiontest`,
    method: 'post',
    data: params.ticketData,
    timeout: 120000
  })
}

/**
 * 获取集群NAMESPACE数据
 * /api/ci/v2/kubernetes/namespace?ticketid=${ticketid}
 * @param ticketid => id
 */

export const getNameSpaceList = (params: FlowDeleteLine): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/v2/kubernetes/namespace?ticketid=${params.id}`,
    method: 'get',
  })
}

/**
 * 获取应用名称列表 get 
 * /api/ci/v2/kubernetes/{ci_type_kind}?ticketid={ci_type_ticketid}&namespace={ci_type_namespace}
 * @param kind
 * @param ticketId
 * @param namespace
 */

export const getAppNameList = (params: AppNameInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/v2/kubernetes/${params.kind}?ticketid=${params.ticketId}&namespace=${params.namespace}`,
    method: 'get',
  })
}

/**
 * 获取Container列表 get 
 * /api/ci/v2/kubernetes/app/flowlineinfo?ticketid={ticketId}&type={kind}&namespace={namespace}&name={name}
 * @param kind
 * @param ticketId
 * @param namespace
 * @param name
 */

export const getContainerList = (params: AppNameInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/v2/kubernetes/app/flowlineinfo?ticketid=${params.ticketId}&type=${params.kind}&namespace=${params.namespace}&name=${params.name}`,
    method: 'get',
  })
}

/**
 * 检查机器状态 get
 * /api/ci/v2/kubernetes/nodecheck?type=' + type + '&treeid=' + vm.treeid + '&node=' + ip 
 * @param type
 * @param treeId
 * @param node
 */

export const getNodeCheckStatus = (params: NodeCheckStatusInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/v2/kubernetes/nodecheck?type=${params.type}&treeid=${params.treeId}&node=${params.node}`,
    method: 'get',
  })
}

// /api/job/jobs/' + vm.treeid+"/byname?name="+'_ci_' + projectid + '_'

/**
 * 添加命名空间 post
 * /api/ci/v2/kubernetes/namespace
 * @param ticketid
 * @param namespace
 */

export const addNewNameSpace = (data: NameSpaceInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/v2/kubernetes/namespace`,
    method: 'post',
    data
  })
}

/**
 * 提交操作协助 post
 * /api/ci/assignment
 * @param ticketid
 * @param namespace
 */

export const submitOperationRequest = (data: AssistanceInputParameterInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/assignment`,
    method: 'post',
    data
  })
}

/**
 * 获取凭据信息表格数据 get
 * /api/ci/v2/kubernetes/harbor/repository?ticketid={ticketid}
 * @param ticketid
 */

export const getHarborTableList = (params: GetCredentialsInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/v2/kubernetes/harbor/repository`,
    method: 'get',
    params
  })
}

/**
 * 获取下拉Harbor凭据信息列表 get
 * /api/ci/ticket?type={type}
 * @param type
 */

export const getHarborSelectList = (params: GetCredentialsInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/ticket`,
    method: 'get',
    params
  })
}

/**
 * 获取具体分组信息 get
 * /api/jobx/group/{treeId}/{groupId}
 * @param treeId
 * @param groupId
 */

export const getGroupDetailinfo = (data: GroupInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/jobx/group/${data.treeId}/${data.groupId}`,
    method: 'get',
  })
}

/**
 * 创建分组 post
 * /api/jobx/group/{treeId}/{groupId}
 * @param treeId
 * @param groupId
 */

export const createGroupxx = (data: GroupInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/jobx/group/${data.treeId}`,
    method: 'post',
  })
}

/**
 * 删除分组 delete
 * /api/jobx/group/{treeId}/{groupId}
 * @param treeId
 * @param groupId
 */

export const deleteGroup = (data: GroupInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/jobx/group/${data.treeId}/${data.groupId}`,
    method: 'delete',
  })
}

/**
 * 更新分组 post
 * /api/jobx/group/{treeId}/{groupId}
 * @param treeId
 * @param groupId
 */

export const updateGroupxx = (data: GroupInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/jobx/group/${data.treeId}/${data.groupId}`,
    method: 'post',
    data: data.data
  })
}


/**
 * 创建分组 post
 * /api/jobx/group/{treeId}/{groupId}
 * @param treeId
 * @param groupId
 */

export const createJobxx = (data: GroupInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/jobx/group/${data.treeId}`,
    method: 'post',
  })
}

/**
 * 更新Job post
 * /api/jobx/group/{treeId}/{groupId}
 * @param treeId
 * @param groupId
 */

export const updateJobxx = (data: GroupInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/job/jobs/${data.treeId}/${data.groupId}`,
    method: 'post',
    data: data.data
  })
}

/**
 * 获取服务器信息表格 get
 * /api/agent/nodeinfo/{treeId}
 * @param treeId
 */
export const getMachineTable = (data: FavoritesInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/agent/nodeinfo/${data.treeId}`,
    method: 'get',
  })
}

/**
 * 获取分组选择列表 get
 * /api/job/nodegroup/{treeId}
 * @param treeId
 */
export const getGroupListTable = (data: FavoritesInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/job/nodegroup/${data.treeId}`,
    method: 'get',
  })
}

/**
 * 编辑流水线信息 post
 * /api/ci/project/${treeId}/${sourceid}/rename
 * @param treeId
 * @param projectid => id
 * @param name
 */

export const modifyFlowline = (treeId: string | number | string[], projectid: string | number | string[], data: any): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/project/${treeId}/${projectid}`,
    method: 'post',
    data
  })
}

/**
 * 获取K8S集群信息     GET
 * /api/ci/ticket/{ticketId}?{detail}
 * @param ticketid => ticketId
 */

export const getK8sDeploy = (params: K8SParamsInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/ticket/${params.ticketId}`,
    method: 'get',
  })
}

/**
 * 获取K8S集群详情     GET
 * /api/ci/ticket/{ticketId}?{detail}
 * @param ticketid => ticketId
 * @param detail
 */

export const getK8SDetail = (params: K8SParamsInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/ticket/${params.ticketId}`,
    method: 'get',
    params: params.detail
  })
}

/**
 * 获取无状态应用默认信息      GET
 * /api/ci/kubernetes/data/template/deployment
 */

export const getDeployment = (params): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/kubernetes/data/template/deployment`,
    method: 'get',
  })
}

/**
 * 获取无状态应用的编辑信息    GET
 * /api/ci/v2/kubernetes/app/json?ticketid={ticketid}&type=deployment&name={name}&namespace={namespace}
 */
export const getEditDeployment = (params: EditDeplymentInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/v2/kubernetes/app/json?ticketid=${params.ticketId}&type=deployment&name=${params.name}&namespace=${params.namespace}`,
    method: 'get'
  })
}

/**
 * 获取无状态应用模版容器信息    GET
 * /api/ci/kubernetes/data/template/container
 */
export const getTempContainer = (params): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/kubernetes/data/template/container`,
    method: 'get'
  })
}


/**
 * 获取无状态应用节点信息 node | node_pod     GET
 * /api/ci/v2/kubernetes/util/labels/{node | node_pod}?ticketid={ticketid}&namespace={namespace}
 * @param ticketid => ticketid
 * @param namespace
 */
export const getTempOperate = (params: TempOperateInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/v2/kubernetes/util/labels/${params.nodeType}`,
    method: 'get',
    params: params.data
  })
}

/**
 * 加载service_lb_annotations模版信息     GET
 * /api/ci/kubernetes/data/template/service_lb_annotations
 */

export const getServiceLBAnnote = (params): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/kubernetes/data/template/service_lb_annotations`,
    method: 'get',
  })
}

/**
 * 获取无状态应用json信息       POST
 * /api/ci/kubernetes/data/json2yaml
 * 
 */

export const getJSONYamlData = (data): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: `/api/ci/kubernetes/data/json2yaml`,
    method: 'post',
    data
  })
}

/**
 * /api/ci/ticket?type=Harbor    GET
 * 获取TICKET数据
 */

export const getHarborTicket = (data): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: '/api/ci/ticket?type=Harbor',
    method: 'get',
  })
}


/**
 * 添加dockerconfigjson   POST
 * /api/ci/v2/kubernetes/secret/dockerconfigjson
 */
export const addDockerConfigJson = (data: DockerCOnfigJSONInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: '/api/ci/v2/kubernetes/secret/dockerconfigjson',
    method: 'post',
    data,
  })
}


/**
 * 获取secret信息  GET
 * /api/ci/v2/kubernetes/secret
 * @param ticketid
 * @param namespace
 */
export const getSecretList = (params: AutoSecretInfo): Promise<QuickentryPromiseInfo | any> => {
  return request({
    url: '/api/ci/v2/kubernetes/secret',
    method: 'get',
    params,
  })
}
