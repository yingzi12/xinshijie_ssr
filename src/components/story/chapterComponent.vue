<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineProps, reactive, ref, toRefs } from 'vue';
import { api, tansParams } from 'boot/axios';

const router = useRouter();

const props = defineProps({
  sid:  {
    type: String,
    required: true // 确保wid是必需的，避免数据为空的问题
  },
  sname:  {
    type: String,
    required: true // 确保wid是必需的，避免数据为空的问题
  },
  wid:  {
    type: String,
    required: true // 确保wid是必需的，避免数据为空的问题
  },
  wname:  {
    type: String,
    required: true // 确保wid是必需的，避免数据为空的问题
  }
});

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 100,
    title: "",
    types: -1,
    pid:0,
    sid:props.sid
  }
});
interface Reel {
  id: number;
  title: string;
  pid: number;
  intro: string;
  chapterList:Array<Chapter>;
}
interface Chapter {
  id: number;
  title: string;
  pid: number;
  intro: string;
}
const reelList = ref([]);

const { queryParams } = toRefs(data);

const total = ref(0);
/** 查询元素 */
async function getList(page: number) {
  queryParams.value.pageNum = page;
  queryParams.value.sid = props.sid;
  const response = await api.get('/wiki/chapter/list?' + tansParams(queryParams.value));
  reelList.value = response.data.data;
  getChapterList(reelList.value);
}

async function getChapterList(reelList) {
  for (let reel = 0; reel < reelList.length; reel++) {

    queryParams.value.pid = reelList[reel].id;
    total.value = 0;

    const response = await api.get('/wiki/chapter/list?' + tansParams(queryParams.value));
    reelList[reel].chapterList = response.data.data;
    total.value = response.data.total;
    let pageNum = Math.ceil(total.value / queryParams.value.pageSize); // 使用 Math.ceil 向上取整

    for (let i = 2; i <= pageNum; i++) { // 从第二页开始
      queryParams.value.pageNum = i;
      const chapterResponse = await api.get('/wiki/chapter/list?' + tansParams(queryParams.value));
      reelList[reel].chapterList = reelList[reel].chapterList.concat(chapterResponse.data.data);
    }
  }
}
getList(queryParams.value.pageNum);
</script>

<template>
  <div  class="bg-grey-2">
    <div v-for="(reel,index) in reelList" :key="index" >
      <div class="text-subtitle1">{{ reel.title }}</div>

      <div class="row q-ma-md">
        <div class="col-4" v-for="(chapter,cindex) in reel.chapterList" :key="cindex">
          <div class="q-ma-xs one-line-clamp">
            <a :href="`/story/chapter?sid=${props.sid}&sname=${props.sname}&wid=${props.wid}&wname=${props.wname}&cid=${chapter.id}`" class="background text-overline">{{ chapter.title }}</a>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<style scoped>

</style>
