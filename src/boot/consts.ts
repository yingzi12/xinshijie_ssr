import { reactive, ref } from 'vue';

const chargeList = [
  {
    label: '魔法',
    value: 1
  },
  {
    label: '科学',
    value: 2
  },

  {
    label: '克苏鲁',
    value: 3
  },
  {
    label: '诡异',
    value: 4
  },
  {
    label: '修真',
    value: 5
  }
  ,
  {
    label: '其他',
    value: 5
  }
]

export  const worldStatusMap = new Map([
  [1, "待发布"],
  [2, "锁定"],
  [3, "隐藏"],
  [4, "删除"],
  [5, "正常"]
]);
export  const worldStatus= reactive([
  {id:1, name:"待发布"},
  {id:2, name:"锁定"},
  {id:3, name:"隐藏"},
  {id:4, name:"删除"},
  {id:5, name:"正常"}
]);
export  const applyStatusMap=new Map([
  [1, "待审核"],
  [2, "审核通过"],
  [3, "拒绝"],
  [4, "取消申请"],
])
export  const applyStatus=reactive([
  {id:1,name: "待审核"},
  {id:2, name:"审核通过"},
  {id:3,name: "拒绝"},
  {id:4,name: "取消申请"},
])
export const storyTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [6,"诡异"],
  [5,"其他"],

])

export const storyTypes=reactive([{id:6,name:"科学"},{id:1,name:"武侠"},{id:2,name:"仙侠"},{id:3,name:"魔幻"},{id:4,name:"奇幻"},{id:5,name:"其他"}])
export const storyKind=reactive([{id:1,name:"主线"},{id:2,name:"支线"},{id:3,name:"杂谈"},{id:3,name:"异想"}])
export const worldTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [6,"诡异"],
  [5,"其他"],
])
export const worldTypes=reactive([{id:6,name:"科学"},{id:1,name:"武侠"},{id:2,name:"仙侠"},{id:3,name:"魔幻"},{id:4,name:"奇幻"},{id:5,name:"其他"}])
export const worldSource=reactive([{id:1,name:"原创"},{id:2,name:"电影"},{id:3,name:"小说"},{id:4,name:"游戏"},{id:5,name:"动漫"},{id:5,name:"电视剧"},{id:6,name:"其他"}])
export const storyStatusMap = new Map([
  [0, "全部"],
  [1, "草稿"],
  [2, "待审核"],
  [3, "正常"],
  [5, "审核不通过"],
  [4, "删除"],
  [6, "隐藏"],
  [7, "锁定"],
]);
export const storyStatusSelection = [
  {id:0,value: "全部"},
  {id:1, value:"草稿"},
  {id:2, value:"待审核"},
  {id:3, value:"正常"},
  {id:5, value:"审核不通过"},
  {id:4,value: "删除"},
  {id:6,value: "隐藏"},
  {id:7, value:"锁定"}
];
export const storyStatus=reactive([
  {id:3,name:"正常"},
  {id:4,name:"删除"},
  {id:5,name:"审核不通过"},
  {id:6,name:"隐藏"},
  {id:7,name:"锁定"}

])
export const discussTypesMap = new Map([
  [1, "自由讨论"],
  [2, "建议"],
  [3, "内容错误"],
  [4, "内容缺失"],
  [5, "过多重复"],
  [6, "内容不相关"],
  [7, "其他"],

]);
export const discussTypes = ref([
  {id:1,name:"自由讨论"},
  {id:2,name:"建议"},
  {id:3,name:"内容错误"},
  {id:4,name:"内容缺失"},
  {id:5,name:"过多重复"},
  {id:6,name:"内容不相关"},
  {id:7,name:"其他"},
]);
export const discussStatusMap = new Map([
  [1, "待处理"],
  [2, "已处理"],
  [3, "关闭"],
])

export const discussStatus =ref([
  {id:1, name:"待处理"},
  {id:2, name:"已处理"},
  {id:3, name:"关闭"},
])
export const draftElementStatusMap = new Map([
  [7, "草稿"],
  [1, "待审核"],
  [3, "不通过"],
  [2, "通过"],
  [4, "删除"],
  [5, "超时发布自动拒绝"],
  [6, "超时审核自动通过"],
]);

export const draftElementStatus =reactive([
  {id:7,name: "草稿"},
  {id:1, name:"待审核"},
  {id:3,name: "不通过"},
  {id:2,name: "通过"},
  {id:4, name:"删除"},
  {id:5, name:"超时发布自动拒绝"},
  {id:6,name: "超时审核自动通过"},
]);
export const elementStatusMap = new Map([
  [1, "正常"],
  [3, "待审核"],
  [2, "锁定"],
  [4, "删除"],
]);
export const elementStatus =reactive([
  {id:1, name:"正常"},
  {id:3,name: "待审核"},
  {id:2,name: "锁定"},
  {id:4, name:"删除"},
]);

export const RecommendEnums = {
  1: { describe: "HEAD头的轮播图", max: 6 },
  2: { describe: "编辑推荐", max: 4 },
  3: { describe: "最有潜力得", max: 9 },
  4: { describe: "最优秀得", max: 12 },
  5: { describe: "最新的", max: 12 },
  6: { describe: "非原创推荐", max: 12 },
  7: { describe: "原创推荐", max: 12 },
  8: { describe: "随机推荐", max: 4 },
  9: { describe: "今日最活跃", max: 4 },
  10: { describe: "本周最活跃", max: 4 },
  11: { describe: "本月最活跃", max: 12 },
  12: { describe: "今日推荐", max: 12 },
  13: { describe: "本周推荐", max: 12 },
  14: { describe: "本月推荐", max: 4 },
  15: { describe: "等级最高的", max: 4 },
  16: { describe: "居民最多的", max: 4 },
  17: { describe: "精品", max: 9 },

  101: { describe: "HEAD头的轮播图", max: 6 },
  102: { describe: "编辑推荐", max: 5 },
  103: { describe: "潜力榜", max: 5 },
  104: { describe: "最优秀得", max: 8 },
  105: { describe: "最新的", max: 8 },
  106: { describe: "非原创推荐", max: 8 },
  107: { describe: "原创推荐", max: 8 },
  108: { describe: "随机推荐", max: 4 },
  109: { describe: "今日最活跃", max: 4 },
  110: { describe: "本周最活跃", max: 4 },
  111: { describe: "本月最活跃", max: 8 },
  112: { describe: "今日推荐", max: 8 },
  113: { describe: "本周推荐", max: 8 },
  114: { describe: "本月推荐", max: 4 },
  115: { describe: "等级最高的", max: 4 },
  116: { describe: "居民最多的", max: 4 },
  117: { describe: "精品推荐", max: 8 },
  118: { describe: "热门", max: 8 },
};

// 如果需要根据code获取describe的函数
export function getByCode(code) {
  return RecommendEnums[code] ? RecommendEnums[code].describe : null;
};

export const chargeListAllRemo = [
  { label: "HEAD头的轮播图", value: 1 },
  { label: "编辑推荐", value: 2 },
  { label: "最有潜力得", value: 3 },
  { label: "最优秀得", value: 4 },
  { label: "最新的", value: 5 },
  { label: "非原创推荐", value: 6 },
  { label: "原创推荐", value: 7 },
  { label: "随机推荐", value: 8 },
  { label: "今日最活跃", value: 9 },
  { label: "本周最活跃", value: 10 },
  { label: "本月最活跃", value: 11 },
  { label: "今日推荐", value: 12 },
  { label: "本周推荐", value: 13 },
  { label: "本月推荐", value: 14 },
  { label: "等级最高的", value: 15 },
  { label: "居民最多的", value: 16 },
  { label: "精品", value: 17 },

  // Including the second set for completeness, as per your original enums
  { label: "HEAD头的轮播图", value: 101 },
  { label: "编辑推荐", value: 102 },
  { label: "潜力榜", value: 103 },
  { label: "最优秀得", value: 104 },
  { label: "最新的", value: 105 },
  { label: "非原创推荐", value: 106 },
  { label: "原创推荐", value: 107 },
  { label: "随机推荐", value: 108 },
  { label: "今日最活跃", value: 109 },
  { label: "本周最活跃", value: 110 },
  { label: "本月最活跃", value: 111 },
  { label: "今日推荐", value: 112 },
  { label: "本周推荐", value: 113 },
  { label: "本月推荐", value: 114 },
  { label: "等级最高的", value: 115 },
  { label: "居民最多的", value: 116 },
  { label: "精品推荐", value: 117 },
  { label: "热门", value: 118 },
];

export const chargeListStoryRemo = [

  // Including the second set for completeness, as per your original enums
  { label: "HEAD头的轮播图", value: 101 },
  { label: "编辑推荐", value: 102 },
  { label: "潜力榜", value: 103 },
  { label: "最优秀得", value: 104 },
  { label: "最新的", value: 105 },
  { label: "非原创推荐", value: 106 },
  { label: "原创推荐", value: 107 },
  { label: "随机推荐", value: 108 },
  { label: "今日最活跃", value: 109 },
  { label: "本周最活跃", value: 110 },
  { label: "本月最活跃", value: 111 },
  { label: "今日推荐", value: 112 },
  { label: "本周推荐", value: 113 },
  { label: "本月推荐", value: 114 },
  { label: "等级最高的", value: 115 },
  { label: "居民最多的", value: 116 },
  { label: "精品推荐", value: 117 },
  { label: "热门", value: 118 },
];

export const chargeListWorldRemo = [
  { label: "HEAD头的轮播图", value: 1 },
  { label: "编辑推荐", value: 2 },
  { label: "最有潜力得", value: 3 },
  { label: "最优秀得", value: 4 },
  { label: "最新的", value: 5 },
  { label: "非原创推荐", value: 6 },
  { label: "原创推荐", value: 7 },
  { label: "随机推荐", value: 8 },
  { label: "今日最活跃", value: 9 },
  { label: "本周最活跃", value: 10 },
  { label: "本月最活跃", value: 11 },
  { label: "今日推荐", value: 12 },
  { label: "本周推荐", value: 13 },
  { label: "本月推荐", value: 14 },
  { label: "等级最高的", value: 15 },
  { label: "居民最多的", value: 16 },
  { label: "精品", value: 17 },

];

export const chargeListWorldFilterRemo = [
  { label: "全部", value: -1 },
  { label: "HEAD头的轮播图", value: 1 },
  { label: "编辑推荐", value: 2 },
  { label: "最有潜力得", value: 3 },
  { label: "最优秀得", value: 4 },
  { label: "最新的", value: 5 },
  { label: "非原创推荐", value: 6 },
  { label: "原创推荐", value: 7 },
  { label: "随机推荐", value: 8 },
  { label: "今日最活跃", value: 9 },
  { label: "本周最活跃", value: 10 },
  { label: "本月最活跃", value: 11 },
  { label: "今日推荐", value: 12 },
  { label: "本周推荐", value: 13 },
  { label: "本月推荐", value: 14 },
  { label: "等级最高的", value: 15 },
  { label: "居民最多的", value: 16 },
  { label: "精品", value: 17 },

];
