export interface ProjectDetailInfo {
  autofindtags?: string | number;
  ci_type_container?: string;
  saveasdir?: string;
  notify?: string,
  audit_level?: string | number;
  last_findtags?: string
  excuteflow?: string;
  addr?: string;
  edit_time?: string;
  cpulimit?: string;
  follow_up?: string;
  nomesg?: string;
  ci_type_repository?: string;
  autobuild?: string | number;
  ticketid?: string;
  buildscripts?: string;
  ci_type_namespace?: string;
  webhook?: string | number;
  ci_type_kind?: string;
  id?: number | string | string[];
  ci_type_concurrent?: string | number;
  name?: string;
  webhook_release?: string;
  ci_type_dockerfile_content?: string;
  ci_type_ticketid?: string;
  calljob?: string;
  nomail?: string;
  groupid?: string;
  gitclonebycache?: string;
  callonlineenv?: string | number;
  memlimit?: string;
  webhook_password?: string;
  buildimage?: string;
  edit_user?: string;
  callback?: string;
  findtags_at_once?: string;
  ci_type_name?: any;
  rely?: string | number;
  ci_type_open?: string;
  status?: string | number;
  last_findtags_success?: string;
  ci_type_approver2?: string;
  buildcachepath?: string;
  ci_type_dockerfile?: string;
  ci_type?: string;
  tag_regex?: string;
  ci_type_approver1?: string | boolean;
  follow_up_ticketid?: string;
  calltestenv?: string | number;
  slave?: string;
  calljobx?: string;
  siteaddr?: string;
  lastbuild?: {
    calltype?: string;
    create_time?: string;
    finishtime?: string;
    finishtimems?: string;
    id?: number | string;
    name?: string;
    pid?: number | string;
    projectid?: string;
    reason?: string;
    runtime?: string;
    slave?: string;
    starttime?: string;
    starttimems?: string;
    status?: string;
    user?: string;
    uuid?: string;
  };
  notifyci?: string;
  notifycd?: string;
}

export interface TicketAllInfo {
  create_time?: string;
  create_user?: string;
  describe?: string;
  edit_share?: string;
  edit_time?: string;
  edit_user?: string;
  id?: number | string;
  name?: string;
  pod_shell_relaxed?: string;
  self?: number | string;
  share?: string;
  subtype?: string;
  ticket?: {
    KubeConfig?: string;
  },
  type?: string;
  label?: string;
}
export interface GetCredentialsInfo {
  ticketid?: string;
  type?: string;
}

export interface NameSpaceInfo {
  ticketid?: string;
  namespace?: string
}

export interface AssistanceInputParameterInfo {
  type?: string;
  name?: string;
  handler?: string;
  url?: string;
  method?: string;
  submit_reason?: string;
  remarks?: string;
  data?: NameSpaceInfo
}

export interface LastBuildColorProps {
  success?: string;
  fail?: string;
  refuse?: string;
  running?: string;
  decision?: string;
  ignore?: string;
}

export interface QuickentryPromiseInfo {
  stat: boolean;
  data?: object | Array<any>;
  info: string
}

export interface FavoritesInfo {
  treeId?: string | number | string[]
}
export interface FlowDeleteLine {
  id?: string | number | string[]
}

export interface FavoritesParams extends FavoritesInfo {
  name?: string;
  ciid: string | number | string[];
}
export interface FlowBlankLine extends FavoritesInfo {
  name: string;
  status?: number;
  sourceid?: string | number
}
export interface CreateJobLine extends FavoritesInfo {
  fromname: string;
  toname: string;
  toprojectid: string | number;
}

export interface ReNameFlowLine extends FlowDeleteLine {
  name: string
}

export interface FlowLineDetailInfo extends FlowDeleteLine {
  limit?: number | string
}

export interface MachineBatchInfo extends FlowDeleteLine {
  envname: string;
}

export interface DetailTableStatusInfo {
  fail?: string;
  running?: string;
  success?: string;
  init?: string;
}

export interface CiShellInfo {
  image?: string;
  projectid?: string | string[];
  tag?: string;
  siteaddr?: string;
}

export interface ConfirmBuildInfo extends FavoritesInfo {
  id?: string | string[];
  uuid?: string;
}

export interface KillBuildsInfo extends ConfirmBuildInfo {
  slave: string | string[]
}

export interface JobListInfo extends FavoritesInfo {
  uuid: string;
  jobType: string
}

export interface SubmitDataInfo {
  version: string;
  describe: string;
}
export interface ManuralSubmitInfo {
  treeId?: string | number | string[];
  id?: string | number | string[];
  data: SubmitDataInfo
}

export interface CreateTaskInfo extends FlowDeleteLine {
  data: {
    group?: string;
    jobname?: string;
    uuid?: null | string;
    variable: any
  }
}

export interface GetAppInfomation {
  ticketid: string;
  type: string;
  name: string;
  namespace: string;
  kind?: string;
}

export interface RelyRowInfo extends FlowDeleteLine {
  projectId: string | number | string[];
}
export interface AddRelyInfo {
  id: string | number | string[];
  data: {
    addr: string;
    path?: string;
    tags?: string;
    ticketid?: string;
  }
}

export interface AppNameInfo {
  kind: string;
  ticketId: string;
  namespace: string;
  name?: string;
}
export interface EditDeplymentInfo {
  ticketId : string;
  name: string;
  namespace: string;
}

export interface NodeCheckStatusInfo {
  type: string;
  treeId: string | string[] | number;
  node: string;
}
export interface K8SParamsInfo {
  ticketId?: string;
  detail?: string;
  postData?: any;
  ticketData?: {
    kubectlVersion: string | string[];
    kubeconfig: string;
    proxyAddr: string | null;
  }
}

export interface GroupInfo extends FavoritesInfo {
  groupId: string;
  data?: {
    group_type?: string;
    name?: string;
    node?: string;
    note?: string
  }
}

export interface TempOperateInfo {
  nodeType: 'node' | 'node_pod',
  data: {
    ticketid: string;
    namespace: string
  }
}

export interface DockerCOnfigJSONInfo {
  ticketid: string;
  namespace: string;
  name: string
  server: string;
  username: string;
  password: string;
  email: string;
}

export interface AutoSecretInfo {
  namespace: string;
  ticketid: string;
}