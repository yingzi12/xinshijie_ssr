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
        <q-img :src="getValueWithDefault(image.sourceWeb) +image.url" class="responsive-image"/>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
    <div class="row">
      <div class="col-2"> </div>
      <div class="col-auto" style="margin: 0px">
        <div class="footter" style="margin: 0px;text-align: center;">
          <router-link to="">关于图集</router-link>|
          <router-link to="">联系我们</router-link>|
          <router-link to="">帮助中心</router-link>|
          <router-link to="">提交建议</router-link>|
          <router-link to="">举报中心</router-link>|
          <router-link to="">漏洞提交</router-link>|
        </div>
        <div class="footerText text-weight-thin"> <p>Copyright © 2002-2022 www.aiavr.uk Rights Reserved 版权所有 心世界信息科技有限公司</p></div>
        <div class="footerText text-weight-thin"><p>图片,美女,写真,图集</p></div>
        <div class="footerText text-weight-light"><p>本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任</p></div>
        <div class="footerText text-weight-thin"><a href="https://www.51k.uk">心世界小说网</a>|<a  href="https://www.30dizhi.uk">30导航</a>|<a  href="https://www.aravrw.com">心世界</a></div>
      </div>
      <div class="col-2"></div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref,} from 'vue'
import { api } from 'boot/axios'
import {useRoute} from "vue-router";
import {useMeta, useQuasar} from 'quasar'


const $q = useQuasar()

// 接收url里的参数
const route = useRoute();
const aid = ref(route.query.aid);
// const sourceUrl = "https://imageshotgirl.yappgcu.uk/"
// key :old hostName value:new HostName
const hostnameValues = new Map([
  ['video.', 'video'],
  ['hotfirl', 'hotfirl'],
  ['https://images.hotgirl.asia', 'https://imageshotgirl.yappgcu.uk'],
  ['https://mogura.my.id', 'https://mogura.yappgcu.uk'],
  ['jkforum', 'jkforum.com'],
  ['x60', 'x60.com']
]);

function getValueWithDefault(key:string) {
  if (hostnameValues.has(key)) {
    return hostnameValues.get(key); // 如果键存在，返回其对应的值
  } else {
    return key;
  }
}

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
const album = ref({});

function getInfo(id:number) {
   // 滚动到顶部
  api.get("album/info"+'?id=' +id.toString() ).then(response => {
    album.value = response.data.data;

  }) .catch(() => {
    console.log("dddddddddd")
  });
}
useMeta(() => {
  return {
    // whenever "title" from above changes, your meta will automatically update
    title: album.value.title,
    meta: {
      key1: { name: 'description', content: album.value.title },
      key2: { name: 'intro', content: album.value.intro }
    }
  }
})


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
