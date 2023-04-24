export interface TaskLineListProps {
  addr: string;
  alias: string;
  audit_level: string | number;
  autobuild: string | number;
  autofindtags: string | number;
  buildimage: string | number;
  buildscripts: string;
  callback: string;
  calljob: string;
  calljobx: string;
  callonlineenv: string | number;
  calltestenv: string | number;
  ci_type: null | any;
  ci_type_container: null | any;
  ci_type_dockerfile: null | any;
  ci_type_kind: null | any;
  ci_type_name: null | any;
  ci_type_namespace: null | any;
  ci_type_repository: null | any;
  ci_type_ticketid: null | any;
  edit_time: string;
  edit_user: string;
  excuteflow: string;
  favorites: number;
  findtags_at_once: string | number;
  follow_up: string;
  follow_up_ticketid: string;
  groupid: string | number;
  id: string | number;
  last_findtags: string;
  last_findtags_success: string;
  lastbuild: object;
  name: string;
  notify: string;
  rely: string | number;
  slave: string;
  status: string | number;
  tag_regex: string;
  ticketid: string;
  webhook: string | number;
  webhook_password: string;
  webhook_release: string;
}
export interface DashboardPromiseInfo {
  stat: boolean;
  data?: object | Array<any>;
  info: string
}


export interface TaskDataParams {
  treeId?: string | number | string[];
}
export interface TaskDataTestParams extends TaskDataParams {
  id?: string | string[]
}
export interface TaskDataListProps {
  name: string;
  success?: number;
  permanent?: number;
  fail?: number;
  running?: number;
  available?: number;
  unavailable?: number;
}

export interface TaskDataListInfo extends TaskDataListProps {
  isStatus?: boolean;
  id?: string;
  total?: number;
}