import { t } from "@/utils/language";
import { TaskDataListInfo } from "@/api/interface/dashboard";

// 仪表盘任务数卡片
export const taskDataList: TaskDataListInfo[] = [
  {
    name: t("nodeHosts"),
    isStatus: false,
    id: "nodeHosts",
    total: 0,
  },
  {
    name: t("commonJob"),
    isStatus: false,
    id: "commonJob",
    total: 0,
  },
  {
    name: t("monthTasks"),
    total: 0,
    id: "monthTasks",
    isStatus: false,
    success: 0,
    fail: 0,
    running: 0,
  },
  {
    name: t("scheduledTasks"),
    total: 0,
    id: "scheduledTasks",
    isStatus: false,
    available: 0,
    unavailable: 0,
  },
];

export const DEFAULT_TREE_ID: number = 4000000000;

export const TASK_TABLE_THEAD: Array<any> = [
  { type: "slot", prop: "user", label: t("executor"), align: "center" },
  { type: "slot", prop: "starttime", label: t("startAt"), align: "center" },
  { type: "slot", prop: "finishtime", label: t("finishAt"), align: "center" },
  {
    type: "slot",
    prop: "finishtimes",
    label: t("useTime"),
    align: "center",
  },
  { type: "slot", prop: "status", label: t("presetStatus"), align: "center" },
  { type: "slot", prop: "name", label: t("JobName"), align: "center" },
];
export const TASK_TABLE_STATUS_MAP = {
  "": {
    name: t('waitExecution'),
    color: 'var(--el-color-primary)'
  },
  success: {
    name: t('executedSuccess'),
    color:  'var(--color_text_success)'
  },
  decision: {
    name: t('waitOperation'),
    color:  'var(--el-color-primary)'
  },
  running: {
    name: t('executing'),
    color:  'var(--color-chart-14)'
  },
  ignore: {
    name: t('ignore'),
    color:  'var(--el-text-color-primary)'
  },
  waiting: {
    name: t('waiting'),
    color:  'var(--el-color-warning)'
  },
  fail: {
    name: t('executedFail'),
    color: 'var(--color_text_danger)'
  },
  refuse: {
    name: t('refuse'),
    color: 'var(--color_text_danger)'
  },
};

// echarts 图表颜色
export  const CHART_COLORS = ['#757FFF', '#E96464', '#FFDD75', '#38C6C0', ' #8879F0', ' #F39C96', ' #939BFF', '#FFF3C7', '#88D6C8', '#A18DFB', '#E96579','#F8B96C', '#FAC7AA', '#92DCA1']