export interface TreeIdInfo {
  treeId?: string | number | string[]
}

export interface ImplementInfo {
  stat: boolean;
  data?: object | Array<any>;
  info: string
}

export interface JobGroupFormInfo extends TreeIdInfo {
  uuid: string
}

export interface FlowDeleteLine {
  id?: string | number | string[]
}

export interface RunJobTaskInfo {
  jobuuid: string
  variable: any
}
export interface CreateTaskInfo extends FlowDeleteLine {
  data: {
    group?: string;
    jobname?: string;
    uuid?: null | string;
    variable: any
  }
}

export interface RunScriptTaskInfo {
  name: string
  user: string
  node_type: string
  node_cont: string
  scripts_type: string
  scripts_cont: string,
  scripts_argv: string,
  timeout: number,
  deployenv: string
  action: string,
  batches: string
}