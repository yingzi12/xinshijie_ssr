<template>
  <q-page>
  <div class="q-pa-md">
    <div class="row">
      <div ><q-img class="head-iamge"
        src="https://usa.img111.top/uploads/1178/T/UGirls-APP/2642/2642_010_q9q_2766_4614.webp"
      /></div>
      <div style="padding-left: 10px;width: 70%">
        <div class="text-h5 q-mt-sm q-mb-xs">{{album.title}}</div>
        <div style="word-wrap: break-word; white-space: pre-line;">
          <p>{{album.intro}}</p>
        </div>
        <div>模特:{{album.gril}}</div>
        <div>照片:{{album.photoNumber}}</div>
        <div>浏览次数:{{album.countSee}}</div>
        <div>类型: {{album.tags}}</div>
        <div>创建时间：{{album.createTime}}</div>
      </div>
    </div>
<!--    内容页-->
    <q-infinite-scroll @load="onLoad" :disable="isDisable" :offset="250">
      <div v-for="(image, index) in imageList" :key="index" class="caption">
        <q-img :headers="{
        'custom-header': 'my-custom-value',
      }" src="https://usa.img111.top/uploads/1178/T/UGirls-APP/2642/2642_010_q9q_2766_4614.webp" class="responsive-image"/>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
  </q-page>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs} from 'vue'
import { api,tansParams } from 'boot/axios'
import {useRoute} from "vue-router";
// 接收url里的参数
const route = useRoute();
const aid = ref(route.query.aid);

// const items = ref([{}, {}, {}])
const imageList = ref([]);

const isRefreshing = ref(false)
const total = ref(0);
const isDisable = ref(false)


const onLoad = (index: number, done: () => void) => {
  isRefreshing.value = true
  setTimeout(() => {
    api.get("image/list"+'?aid=' +aid.value +"&pageNum"+index).then(response => {
      if(response.data.data != null && response.data.data.lang >0 ){
        response.data.data.forEach((iamge: any) => {
           imageList.value.push(iamge);
        });
      }else{
        isDisable.value=true;
      }
      total.value = response.data.total;

    }) .catch(() => {
      isDisable.value=true;
    });
    isRefreshing.value = false
    done()
  }, 2000)
}

const album = ref({});

const image=ref("")

function getInfo(id:number) {
  window.scrollTo(0, 0); // 滚动到顶部
  api.get("album/info"+'?id=' +id.toString() ).then(response => {
    album.value = response.data.data;
  }) .catch(() => {
    console.log("dddddddddd")
  });
}
getInfo(aid.value)
</script>
<style  lang="sass"  scoped>
.responsive-image
  max-width: 100%
  height: auto
  margin: 0 auto

.caption
  display: flex
  justify-content: center
  align-items: center

.head-iamge
  height: 400px
  width: 260px
.head-iamge img
  object-fit: cover
</style>
