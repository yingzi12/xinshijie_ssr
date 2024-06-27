<template>
  <q-page  >
    <div class="row" >
      <div  class="col div-center" style="min-width: 250px">
        <div class="q-pa-md q-gutter-md  div-center-child">
        <q-list bordered padding class="rounded-borders" style="max-width: 300px">
          <q-item-label header class="h6">精品</q-item-label>
          <q-item v-for="(world,index) in premiumWorldList" :key="index" clickable v-ripple :to="{ path: '/world/detail', query: { wid: world.wid }}">
            <q-item-section avatar top>
              <span class="text-green">【世界】</span>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{ world.wname }}</q-item-label>
              <q-item-label  lines="1" caption>{{ world.createName==null?"未知":world.createName }}</q-item-label>
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
            <q-carousel-slide v-for="(value,index) in homeWorldList" :key="index" :name="value.wid" :img-src="getImageUrl(value.imgUrl)"  />
          </q-carousel>
        </div>
      </div>
      <div class="col div-center" style="min-width: 250px">
        <div class="q-pa-md q-gutter-md  div-center-child">
        <q-list bordered padding class="rounded-borders" style="max-width: 300px">
          <q-item-label header class="h6">广告</q-item-label>
          <q-item v-for="index in 6" :key="index" clickable v-ripple to="/notice/detail">
            <q-item-section avatar top>
              <span class="text-orange">【公告】</span>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">关于世纪呃呃呃是的方式地方史蒂夫</q-item-label>
              <q-item-label caption>February 22nd, 2019</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      </div>
    </div>
    <q-toolbar >
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title>
        世界推荐
      </q-toolbar-title>
      <q-btn flat round dense icon="more_horiz" to="/world/order"/>
    </q-toolbar>
    <div class="q-pa-md">
      <div class="row">
        <div class="col div-center" style="min-width: 250px;">
          <q-list bordered  class="rounded-borders div-center-child" style="max-width: 300px;">
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title>优秀</q-toolbar-title>
            </q-toolbar>
          <q-item v-for="(world,index) in excellentWorldList" :key="index" :to="{ path: '/world/detail', query: { wid: world.wid }}">
            <q-item-section avatar>
              <img
                @click="routerWorld(world.wid)"
                class="small-head-image"
                :src="getImageUrl(world.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label class="one-line-clamp">{{world.wname}}</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">{{ world.createName ==null?"未知": world.createName}}</q-item-label>
              <q-item-label class="three-line-clamp" caption>{{world.intro}}</q-item-label>
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
                  v-for="(world,index) in hotWorldList"
                  :key="index"
                  class="example-item"
                >
                  <q-card class="story-card">
                    <q-card-section @click="routerWorld(world.wid)">
                      <img
                        @click="routerWorld(world.wid)"
                        class="small-head-image content-center"
                        :src="getImageUrl(world.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
                      />
<!--                      <img src="/600.webp" class="small-head-image content-center">-->
                      <div class="one-line-clamp">{{world.wname}}</div>
                      <div class="text-subtitle2">{{world.createName == null?"未知":world.createName }}</div>
                      <q-item-label class="three-line-clamp" caption>{{world.intro}}</q-item-label>
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
            <q-item v-for="(world,index) in randomWorldList" :key="index" :to="{ path: '/world/detail', query: { wid: world.id }}">
              <q-item-section avatar>
<!--                <img src="/150.webp" class="small-head-image">-->
                <img
                     @click="routerWorld(world.wid)"
                     class="small-head-image"
                     :src="getImageUrl(world.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="one-line-clamp">{{world.name}}</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">{{world.createName == null?"未知":world.createName }}</q-item-label>
                <q-item-label class="three-line-clamp" caption>{{world.intro}}</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </div>

      </div>
    </div>
    <q-toolbar >
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title>
        世界分类
      </q-toolbar-title>
      <q-btn flat round dense icon="more_horiz" to="/world/order" />
    </q-toolbar>
    <div class="row">
      <div  class="col ">
        <div class="q-gutter-md">
          <q-list bordered padding class="rounded-borders" style="max-width: 300px">
            <q-item-label header>编辑推荐</q-item-label>
            <q-separator spaced />
            <q-item v-for="(world,index) in editorWorldList" :key="index" :to="{ path: '/world/detail', query: { wid: world.wid }}">
              <q-item-section avatar>
                <img
                  @click="routerWorld(world.wid)"
                  class="small-head-image"
                  :src="getImageUrl(world.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="one-line-clamp">{{ world.wname }}</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">{{ world.createName ==null?"未知": world.createName}}</q-item-label>
                <q-item-label class="three-line-clamp" caption>{{world.intro}}</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </div>
      </div>
      <div  class="col-md-9">
        <div class="row">
          <world-type-item-list title="武侠" :valueList="typewxWorldList" />
          <world-type-item-list title="仙侠" :valueList="typexxWorldList" />
          <world-type-item-list title="魔幻" :valueList="typemmWorldList" />
          <world-type-item-list title="神话" :valueList="typessWorldList" />
          <world-type-item-list title="灵异" :valueList="typelyWorldList" />
          <world-type-item-list title="科技" :valueList="typekxWorldList" />
          <world-type-item-list title="超能力/异能" :valueList="typecnlWorldList" />
          <world-type-item-list title="其他" :valueList="typeqtWorldList" />
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
import worldTypeItemList from 'components/world/worldTypeItemListComponent.vue';
import { imageUrl } from 'src/utils/imageUtil';
import { getImageUrl } from 'boot/tools'; // 确保路径正确对应你的文件结构

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
const premiumWorldList = ref([]);

const homeWorldList = ref([]);

//随机故事
//随机世界
const randomWorldList = ref([]);

//优秀的
//优秀的世界
const excellentWorldList = ref([]);
//热门故事
//热门世界
const hotWorldList = ref([]);
//编辑推荐故事
//编辑推荐世界
const editorWorldList = ref([]);


// { label: "武侠", value: 20 },
const typewxWorldList = ref([]);

// { label: "仙侠", value: 21 },
const typexxWorldList = ref([]);

// { label: "魔幻", value: 22 },
const typemmWorldList = ref([]);

// { label: "神话", value: 23 },
const typessWorldList = ref([]);

// { label: "灵异", value: 24 },
const typelyWorldList = ref([]);

// { label: "科技", value: 25 },
const typekxWorldList = ref([]);

// { label: "超能力/异能", value: 26 },
const typecnlWorldList = ref([]);

// { label: "其他", value: 27 },
const typeqtWorldList = ref([]);


const total = ref(0);
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 4,
    recType:2,
  }
});
const { queryParams } = toRefs(data);

async function getWorldList(nowTecType: number) {
  if(nowTecType != -1){
    queryParams.value.recType = nowTecType;
  }else{
    queryParams.value.recType = null;
  }
  queryParams.value.pageSize=RecommendEnums[nowTecType].max;
  try {
    const response = await api.get('/wiki/recommendWorld/listAll?' + tansParams(queryParams.value));
    if (response.data.code == 200) {
      // total.value = response.data.total;
      // maxPage.value=  total.value/10+1;
      //轮播图
      if(nowTecType==1){
        homeWorldList.value = response.data.data;
        if(homeWorldList.value.length>0){
          slide.value=homeWorldList.value[0].wid;
        }
      }
      //编辑推荐
      if(nowTecType==2){
        editorWorldList.value = response.data.data;
      }
      //
      if(nowTecType==4){
        excellentWorldList.value = response.data.data;
      }
      //精品
      if(nowTecType==17){
        premiumWorldList.value = response.data.data;
      }
      //热门
      if(nowTecType==18){
        hotWorldList.value = response.data.data;
      }
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

async function getRondomWorldList() {
  try {
    queryParams.value.recType = null;
    queryParams.value.pageSize = 4;

    const response = await api.get('/wiki/world/random?' + tansParams(queryParams.value));
    if (response.data.code == 200) {
      // total.value = response.data.total;
      // maxPage.value=  total.value/10+1;
      randomWorldList.value = response.data.data;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

async function getTypeRecommendWorldList() {
  try {

    const response = await api.get('/wiki/recommendWorld/typeRecommend');
    if (response.data.code == 200) {
     const data = response.data.data;
       typewxWorldList.value =data.martialArts;
      typexxWorldList.value =data.fairy;
      typemmWorldList.value =data.magic;
      typessWorldList.value =data.myth;
      typelyWorldList.value =data.supernatural;
      typekxWorldList.value =data.science;
      typecnlWorldList.value =data.superpowers;
      typeqtWorldList.value =data.other;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
getWorldList(1);
getWorldList(2);
getWorldList(4);
getWorldList(17);
getWorldList(18);

getRondomWorldList();
getTypeRecommendWorldList();
function routerWorld(wid){
  router.push("/world/detail?wid="+wid);
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
