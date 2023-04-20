export interface TreeIdInfo {
  treeId?: string | number | string[]
}

export interface IFunctionVoid {
  (): void
}

export interface IResponseInfo {
  stat: boolean;
  data?: object | Array<any>;
  info: string
}