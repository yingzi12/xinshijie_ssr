<template>
  <q-page>
  <div class="q-pa-md">
    <div class="row">
      <div ><q-img class="head-iamge"
        :src="album.sourceWeb+album.imgUrl"
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
      <div style="width: 10%">
        <button  class="text-h6" @click="handleImageError()"> 报告异常</button>
      </div>
    </div>
<!--    内容页-->
    <q-infinite-scroll @load="onLoad" :disable="isDisable" :offset="250">
      <div v-for="(image, index) in imageList" :key="index" class="caption">
        <q-img :src="image.sourceWeb+image.url" class="responsive-image"/>
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
import { ref,} from 'vue'
import { api } from 'boot/axios'
import {useRoute} from "vue-router";
import { useQuasar } from 'quasar'
const $q = useQuasar()

// 接收url里的参数
const route = useRoute();
const aid = ref(route.query.aid);

const imageList = ref([])
const isDisable = ref(false)

const loadData = (index: number) => {
  return api.get(`image/list?aid=${aid.value}&pageNum=${index}`)
}
const isRefreshing = ref(false)

const onLoad = (index: number, done: () => void) => {
  try {
    isRefreshing.value = true
    loadData(index)
      .then((response) => {
        const data = response.data.data
        if (data && data.length > 0) {
          imageList.value.push(...data)
          // total.value = response.data.total
          isRefreshing.value = false
          done()
        } else {
          isDisable.value = true
        }
      })
      .catch(() => {
        isDisable.value = true
      })
  } catch (error) {
    isDisable.value = true
  }
}

// const items = ref([{}, {}, {}])
// const imageList = ref([]);

// const isRefreshing = ref(false)
// const total = ref(0);
// const isDisable = ref(false)


// const onLoad = (index: number, done: () => void) => {
//   isRefreshing.value = true
//   setTimeout(() => {
//     api.get("image/list"+'?aid=' +aid.value +"&pageNum"+index).then(response => {
//       if(response.data.data != null && response.data.data.length >0 ){
//         console.log("data:"+response.data.data.length.toString())
//         response.data.data.forEach((image: any) => {
//            imageList.value.push(image);
//           console.log("imageList:"+imageList.value.length.toString())
//           isRefreshing.value = false
//           done()
//         });
//       }else{
//         isDisable.value=true;
//       }
//       // total.value = response.data.total;
//
//     }) .catch(() => {
//       isDisable.value=true;
//     });
//
//   }, 2000)
// }

const album = ref({});

function getInfo(id:number) {
  window.scrollTo(0, 0); // 滚动到顶部
  api.get("album/info"+'?id=' +id.toString() ).then(response => {
    album.value = response.data.data;
  }) .catch(() => {
    console.log("dddddddddd")
  });
}
function handleImageError(){
  api.get("album/error"+'?id=' +aid.value ).then(response => {
    $q.dialog({
      title: '信息',
      message: '提交成功,等待管理员处理中.'
    }).onOk(() => {
      // console.log('OK')
    }).onCancel(() => {
      // console.log('Cancel')
    }).onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
  }) .catch(() => {
    // console.log("dddddddddd")
  });
}
getInfo(aid.value)
</script>
<style  lang="sass"  scoped>
.responsive-image
  max-width: 980px
  height: auto
  margin: 0 auto

.caption
  display: flex
  justify-content: center
  align-items: center
  padding: 10px

.head-iamge
  height: 400px
  width: 260px
.head-iamge img
  object-fit: cover
</style>
