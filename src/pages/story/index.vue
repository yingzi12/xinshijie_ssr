<template>
  <q-page  >
    <q-tabs shrink stretch>
      <q-input v-model="title" :label="$t('search') " name="title" style="width: 600px" @keyup.enter="search()"/>
      <q-icon name="search" @click="search()"/>
    </q-tabs>
    <div class="row" >
      <div  class="col div-center" style="min-width: 250px">
        <div class="q-pa-md q-gutter-md  div-center-child">
        <q-list bordered padding class="rounded-borders" style="max-width: 300px">
          <q-item-label header class="h6">精品</q-item-label>
          <q-item v-for="(story,index) in premiumStoryList" :key="index" clickable v-ripple :to="{ path: '/story/detail', query: { sid: story.sid }}">
            <q-item-section avatar top>
              <span class="text-green">【世界】</span>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{ story.wname }}</q-item-label>
              <q-item-label  lines="1" caption>{{ story.createName==null?"未知":story.createName }}</q-item-label>
            </q-item-section>

          </q-item>
        </q-list>
      </div>
      </div>
      <div  class="col-md-6 div-center" style="min-width: 300px">
        <div class="q-pa-md  div-center-child">
          <q-carousel
            swipeable
            animated
            v-model="slide"
            thumbnails
            infinite
          >
            <q-carousel-slide v-for="(value,index) in homeStoryList" :key="index" :name="value.sid" :img-src="getImageUrl(value.imgUrl)"  />

          </q-carousel>
        </div>
      </div>
      <div class="col div-center" style="min-width: 250px">
        <div class="q-pa-md q-gutter-md  div-center-child">
          <announcement-component></announcement-component>

        </div>
      </div>
    </div>
    <q-toolbar >
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title>
        故事推荐
      </q-toolbar-title>
      <q-btn flat round dense icon="more_horiz"  to="/story/order" />
    </q-toolbar>
    <div class="q-pa-md">
      <div class="row">
        <div class="col div-center" style="min-width: 250px;">
          <q-list bordered  class="rounded-borders div-center-child" style="max-width: 300px;">
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title>优秀</q-toolbar-title>
            </q-toolbar>
            <q-item v-for="(story,index) in excellentStoryList" :key="index" :to="{ path: '/story/detail', query: { sid: story.sid }}">
              <q-item-section avatar>
                <img
                  @click="routerStory(story.wid)"
                  class="small-head-image"
                  :src="getImageUrl(story.imgUrl)" @error.once="e => { e.target.src = `/empty.jpg` }"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="one-line-clamp">{{story.sname}}</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">{{ story.createName ==null ?"未知":story.createName }}</q-item-label>
                <q-item-label class="three-line-clamp" caption>{{story.intro}}</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </div>
        <div class="col-md-6 div-center" style="min-width: 300px">
          <q-list bordered  class="rounded-borders  div-center-child"  >
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title>热门</q-toolbar-title>
            </q-toolbar>
            <q-item>
              <div class="row justify-center q-gutter-sm">
                <q-intersection
                  v-for="(story,index) in hotStoryList"
                  :key="index"
                  class="example-item"
                >
                  <q-card class="story-card">
                    <q-card-section @click="routerStory(story.wid)">
                      <img
                        @click="routerStory(story.wid)"
                        class="small-head-image content-center"
                        :src="getImageUrl(story.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
                      />
                      <!--                      <img src="/600.webp" class="small-head-image content-center">-->
                      <div class="one-line-clamp">{{story.sname}}</div>
                      <div class="text-subtitle2">{{story.createName == null?"未知":story.createName }}</div>
                      <q-item-label class="three-line-clamp" caption>{{story.intro}}</q-item-label>
                    </q-card-section>
                  </q-card>
                </q-intersection>
              </div>
            </q-item>
          </q-list>
        </div>
        <div class="col div-center" style="min-width: 250px">
          <q-list bordered  class="rounded-borders  div-center-child" style="max-width: 300px">
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title>随机推荐</q-toolbar-title>
            </q-toolbar>
            <q-item v-for="(story,index) in randomStoryList" :key="index" :to="{ path: '/story/detail', query: { sid: story.id }}">
              <q-item-section avatar>
                <!--                <img src="/150.webp" class="small-head-image">-->
                <img
                  @click="routerStory(story.sid)"
                  class="small-head-image"
                  :src="getImageUrl(story.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="one-line-clamp">{{story.name}}</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">{{story.createName == null?"未知":story.createName }}</q-item-label>
                <q-item-label class="three-line-clamp" caption>{{story.intro}}</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </div>

      </div>
    </div>

    <q-toolbar >
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title>
        故事分类
      </q-toolbar-title>
      <q-btn flat round dense icon="more_horiz" to="/story/order"/>
    </q-toolbar>
    <div class="row">
      <div  class="col ">
        <div class="q-gutter-md">
          <q-list bordered padding class="rounded-borders" style="max-width: 300px">
            <q-item-label header>编辑推荐</q-item-label>
            <q-separator spaced />
            <q-item v-for="(story,index) in editorStoryList" :key="index" :to="{ path: '/story/detail', query: { sid: story.sid }}">
              <q-item-section avatar>
                <img
                  @click="routerStory(story.sid)"
                  class="small-head-image"
                  :src="getImageUrl(story.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="one-line-clamp">{{ story.sname }}</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">{{ story.createName ==null?"未知": story.createName}}</q-item-label>
                <q-item-label class="three-line-clamp" caption>{{story.intro}}</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </div>
      </div>
      <div  class="col-md-9">
        <div class="row">
          <story-type-item-list title="武侠" :valueList="typewxStoryList" />
          <story-type-item-list title="仙侠" :valueList="typexxStoryList" />
          <story-type-item-list title="魔幻" :valueList="typemmStoryList" />
          <story-type-item-list title="神话" :valueList="typessStoryList" />
          <story-type-item-list title="灵异" :valueList="typelyStoryList" />
          <story-type-item-list title="科技" :valueList="typekxStoryList" />
          <story-type-item-list title="超能力/异能" :valueList="typecnlStoryList" />
          <story-type-item-list title="其他" :valueList="typeqtStoryList" />
        </div>
      </div>

    </div>

  </q-page>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs} from 'vue'
import { api,tansParams } from 'boot/axios'
import { useMeta, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { RecommendEnums } from 'boot/consts';
import worldTypeItemList from 'components/world/worldTypeItemListComponent.vue'; // 确保路径正确对应你的文件结构
import storyTypeItemList from 'components/story/storyTypeItemListComponent.vue';
import { getImageUrl } from 'boot/tools';
import AnnouncementComponent from 'components/announcementComponent.vue'; // 确保路径正确对应你的文件结构

const $q = useQuasar();
const router = useRouter()

const metaData = {
  // sets document title
  title: '心世界网',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title: any) => `${title} - 首页 Photo Gallery, Beauty, Photo, Photography, Showman.com`,

  // meta tags
  meta: {
    description: { name: 'description', content: '心世界网 世界观  故事 小说 背景 电影 电视剧 Photo Gallery, Beauty, Photo, Photography, Showman.com' },
    keywords: { name: 'keywords', content: '心世界网 世界观 游戏 故事 小说 背景 电影 电视剧 Photo Gallery, Beauty, Photo, Photography, Showman.com' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle:  {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template (ogTitle: any) {
        return `${ogTitle} - 首页 心世界网 世界观 游戏 故事 小说 背景 电影 电视剧  Photo Gallery, Beauty, Photo, Photography, Showman.com`
      }
    }
  },
}
useMeta(metaData)


const seach=ref("")

const current = ref(1)
const slide = ref(1)
const title = ref('')
//精品推荐
const premiumStoryList = ref([]);


//随机故事
const randomStoryList = ref([]);

//优秀的
const excellentStoryList = ref([]);

//热门故事
const hotStoryList = ref([]);

//编辑推荐故事
const editorStoryList = ref([]);
const homeStroyList = ref([]);


// { label: "武侠", value: 20 },
const typewxStoryList = ref([]);

// { label: "仙侠", value: 21 },
const typexxStoryList = ref([]);

// { label: "魔幻", value: 22 },
const typemmStoryList = ref([]);

// { label: "神话", value: 23 },
const typessStoryList = ref([]);

// { label: "灵异", value: 24 },
const typelyStoryList = ref([]);

// { label: "科技", value: 25 },
const typekxStoryList = ref([]);

// { label: "超能力/异能", value: 26 },
const typecnlStoryList = ref([]);

// { label: "其他", value: 27 },
const typeqtStoryList = ref([]);

const total = ref(0);
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 4,
    recType:2,
  }
});
const { queryParams } = toRefs(data);
const image=ref("")

async function getTypeRecommendStoryList() {
  try {

    const response = await api.get('/wiki/recommendStory/typeRecommend');
    if (response.data.code == 200) {
      const data = response.data.data;
      typewxStoryList.value =data.martialArts;
      typexxStoryList.value =data.fairy;
      typemmStoryList.value =data.magic;
      typessStoryList.value =data.myth;
      typelyStoryList.value =data.supernatural;
      typekxStoryList.value =data.science;
      typecnlStoryList.value =data.superpowers;
      typeqtStoryList.value =data.other;

    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

async function getStoryList(nowTecType: number) {
  if(nowTecType != -1){
    queryParams.value.recType = nowTecType;
  }else{
    queryParams.value.recType = null;
  }
  queryParams.value.pageSize=RecommendEnums[nowTecType].max;
  try {
    const response = await api.get('/wiki/recommendStory/listAll?' + tansParams(queryParams.value));
    if (response.data.code == 200) {
      // total.value = response.data.total;
      // maxPage.value=  total.value/10+1;
      //轮播图
      if(nowTecType==1){
        homeStroyList.value = response.data.data;
        if(homeStroyList.value.length>0){
          slide.value=homeStroyList.value[0].sid;
        }
      }
      //编辑推荐
      if(nowTecType==2){
        editorStoryList.value = response.data.data;
      }
      //精品
      if(nowTecType==4){
        excellentStoryList.value = response.data.data;
      }
      if(nowTecType==17){
        premiumStoryList.value = response.data.data;
      }
      //热门
      if(nowTecType==18){
        hotStoryList.value = response.data.data;
      }
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

async function getRondomStoryList() {
  try {
    queryParams.value.recType = null;
    queryParams.value.pageSize = 4;

    const response = await api.get('/wiki/story/random?' + tansParams(queryParams.value));
    if (response.data.code == 200) {
      // total.value = response.data.total;
      // maxPage.value=  total.value/10+1;
      randomStoryList.value = response.data.data;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

getStoryList(2);
getStoryList(4);
getStoryList(17);

getStoryList(18);

getRondomStoryList();
getTypeRecommendStoryList();

function routerStory(sid){
  router.push("/story/detail?sid="+sid);
}
function search(){
  router.push(`/story/order?title=${title.value}`)
}
</script>
<style lang="sass" scoped>
.custom-caption

  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)

.q-carousel__slide
  background-size: contain
.example-item
  width: 140px
.q-card img
  object-fit: cover
.q-pagination
  text-align: center
.caption
  display: flex
  justify-content: center
  align-items: center

</style>
