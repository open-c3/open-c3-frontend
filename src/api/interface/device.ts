export interface DevicePromiseInfo {
  stat: boolean;
  data?: object | Array<any>;
  info: string
}

export interface TreeIdInfo {
  treeId?: string | number | string[]
}

export interface CMDBDataMenuInfo extends TreeIdInfo {
  timemachine: string | string[]
}

export interface CMDBResourceDataInfo extends TreeIdInfo {
  subtype: string | string[];
  type: string;
  data: {
    grepdata: {
      _search_?: string;
    };
    timemachine: string;
  }
}

export interface CMDBResourceDataBlankInfo extends TreeIdInfo {
  subtype: string | string[];
  type: string | string[];
  uuid: string;
  timemachine?: string | string[];
  data?: { exturl?: string, data?: string };
  newtree?: string;
  name?:string;
}

export interface CMDBChpassword  {
  dbtype?: string;
  dbaddr?: string;
  passwd?: string;
}