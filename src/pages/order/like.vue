<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import worldListDetailComponent from 'components/world/worldListDetailComponent.vue';
import storyListDetailComponent from 'components/story/storyListDetailComponent.vue';
import { api, tansParams } from 'boot/axios';
import HeadTableComponent from 'components/HeadTableComponent.vue';
import HeadComponent from 'components/HeadComponent.vue';
import { storyOrdermenuList, storyTypes, worldOrdermenuList, worldTypes } from 'boot/consts';
const drawer= ref(false);
const order=ref(-1);
const  types= ref(-1);

const  classical= ref('world');

const  dateType= ref('week');
const  orderBy= ref(-1);

const  worldType= ref(-1);
const  storyType= ref(-1);

const storyCurrent = ref(0);

const storyTotal = ref(0);
const storyMaxPage = ref(0);

const storyData = reactive({
  storyQueryParams: {
    pageNum: 1,
    pageSize: 10,
    types:-1,
    name:"",
    orderBy:-1,
  }
});
const { storyQueryParams } = toRefs(storyData);

const worldCurrent = ref(0);
const worldTotal = ref(0);
const worldMaxPage = ref(0);

const worldData = reactive({
  worldQueryParams: {
    pageNum: 1,
    pageSize: 10,
    name:"",
    types:-1,
    orderBy:-1,
  }
});
const { worldQueryParams } = toRefs(worldData);
const storyList = ref([]);

async function getStoryList() {
  try {
    const response = await api.get('/wiki/story/list?' + tansParams(storyQueryParams.value));
    if (response.data.code == 200) {
      storyTotal.value = response.data.total;
      storyList.value = response.data.data;
      if(storyTotal.value%storyQueryParams.value.pageSize ==0){
        storyMaxPage.value=  storyTotal.value/storyQueryParams.value.pageSize;
      }else{
        storyMaxPage.value=  storyTotal.value/storyQueryParams.value.pageSize+1;
      }
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
getStoryList();
const worldList = ref([]);

async function getWorldList() {
  try {
    const response = await api.get('/wiki/world/list?' + tansParams(worldQueryParams.value));
    if (response.data.code == 200) {
      worldTotal.value = response.data.total;
      worldList.value = response.data.data;
      if( worldTotal.value%worldQueryParams.value.pageSize ==0){
        worldMaxPage.value=  worldTotal.value/worldQueryParams.value.pageSize;
      }else{
        worldMaxPage.value=  worldTotal.value/worldQueryParams.value.pageSize+1;
      }
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
getWorldList();
function onOrder(or:number) {
  orderBy.value=or;
  if (classical.value == "world") {
    worldQueryParams.value.orderBy=or;
    getWorldList();
  }else {
    storyQueryParams.value.orderBy=or;
    getStoryList();
  }
}
function onWorldTypes(or:number){
  worldType.value=or;
  getWorldList();
}
function onStoryTypes(or:number){
  storyType.value=or;
  getStoryList();
}
function onWorldOrder(or:number){
  worldType.value=or;
  getWorldList();
}
function onStoryOrder(or:number){
  storyType.value=or;
  getStoryList();
}
</script>

<template>
  <q-layout view="hhh LpR fff" style="height: 100vh;">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <HeadComponent></HeadComponent>
      <HeadTableComponent></HeadTableComponent>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-separator spaced />
        <div class="text-h6">标签</div>
        <div class="q-pa-md q-gutter-sm">
          <span class="text-overline">全部</span>
          <span class="text-overline">原创</span>
          <span class="text-overline">二次元</span>
          <span class="text-overline">其他</span>
        </div>
        <q-separator spaced />
      </q-scroll-area>
    </q-drawer>


    <q-page-container style="height: 100%;">
      <q-page>
        <q-toolbar class="bg-purple text-white">
          <q-toolbar-title>
            点击排行榜
          </q-toolbar-title>
          <q-btn flat round dense icon="apps" class="q-mr-xs" />
          <q-btn flat round dense icon="more_vert" />
        </q-toolbar>
        <div>
          <q-tabs
            v-model="classical"
            no-caps
            align="left"
            outside-arrows
            mobile-arrows
            class="bg-orange text-white shadow-2"
          >
            <q-tab name="world" label="世界" />
            <q-tab name="story" label="故事" />
          </q-tabs>
          <q-tabs
            v-model="dateType"
            no-caps
            align="left"
            outside-arrows
            mobile-arrows
            class="bg-orange text-white shadow-2"
          >
            <q-tab name="week" label="周" />
            <q-tab name="month" label="月" />
            <q-tab name="total" label="总" />
          </q-tabs>
          <q-tabs
            v-if="classical == 'world'"
            v-model="worldQueryParams.types"
            no-caps
            align="left"
            outside-arrows
            mobile-arrows
            class="bg-orange text-white shadow-2"
          >
            <q-tab outline color="brown" name="-1" label="分类" />
            <q-tab outline color="brown" v-for="(worldType, index) in worldTypes" :key="index" :name="worldType.id" :label="worldType.name" @click="onWorldTypes(worldType.id)"/>

          </q-tabs>
          <q-tabs
            v-if="classical == 'story'"
            v-model="storyQueryParams.types"
            no-caps
            align="left"
            outside-arrows
            mobile-arrows
            class="bg-orange text-white shadow-2"
          >
            <q-tab outline color="brown" name="-1" label="分类" />
            <q-tab outline color="brown" v-for="(storyType, index) in storyTypes" :key="index" :name="storyType.id" :label="storyType.name" @click="onStoryTypes(storyType.id)"/>

          </q-tabs>
          <q-tabs
            v-if="classical == 'world'"
            v-model="worldQueryParams.orderBy"
            no-caps
            align="left"
            outside-arrows
            mobile-arrows
            class="bg-orange text-white shadow-2"
          >
            <q-tab outline color="brown" name="-1" label="排序"  @click="onWorldOrder(-1)"/>
            <q-tab outline color="brown" v-for="(menuItem, index) in worldOrdermenuList" :key="index" :name="menuItem.label" :label="menuItem.label" @click="onWorldOrder(menuItem.order)"/>

          </q-tabs>
          <q-tabs
            v-if="classical == 'story'"
            v-model="storyQueryParams.orderBy"
            no-caps
            align="left"
            outside-arrows
            mobile-arrows
            class="bg-orange text-white shadow-2"
          >
            <q-tab outline color="brown" name="-1" label="排序"  @click="onStoryOrder(-1)"/>
            <q-tab outline color="brown" v-for="(menuItem, index) in storyOrdermenuList" :key="index" :name="menuItem.label" :label="menuItem.label" @click="onStoryOrder(menuItem.order)"/>
          </q-tabs>
          <q-toolbar class="bg-blue text-white">
            <q-toolbar-title>
              <q-input v-if="classical == 'story'"  filled bottom-slots v-model="storyQueryParams.name" label="查询" counter @keyup.enter="getStoryList" >
                <template v-slot:append>
                  <q-icon v-if="storyQueryParams.name !== ''" name="close" @click="storyQueryParams.name = ''" class="cursor-pointer" />
                  <q-icon name="search"         @click="getStoryList" />
                </template>
              </q-input>
              <q-input v-if="classical == 'world'" filled bottom-slots v-model="worldQueryParams.name" label="查询" counter @keyup.enter="getWorldList" >
                <template v-slot:append>
                  <q-icon v-if="worldQueryParams.name !== ''" name="close" @click="worldQueryParams.name = ''" class="cursor-pointer" />
                  <q-icon name="search"         @click="getWorldList" />
                </template>
              </q-input>
            </q-toolbar-title>
          </q-toolbar>
        </div>
        <div class="q-pa-md q-gutter-md">
          <q-tab-panels v-model="classical" animated>
            <q-tab-panel name="world">
              <q-list bordered padding class="rounded-borders">
                <div v-for="(value,index) in worldList" :key="index"  >
                  <world-list-detail-component :value="value"></world-list-detail-component>
                  <q-separator spaced />
                </div>
              </q-list>
              <div class="q-pa-lg flex flex-center">
                <q-pagination
                  v-model="worldCurrent"
                  color="purple"
                  :max="worldMaxPage"
                  max-pages="6"
                  boundary-numbers
                />
              </div>
            </q-tab-panel>

            <q-tab-panel name="story">

              <q-list bordered padding class="rounded-borders">
                <div v-for="(value,index) in storyList" :key="index"  >
                  <story-list-detail-component :value="value"></story-list-detail-component>
                </div>
              </q-list>
              <div class="q-pa-lg flex flex-center">
                <q-pagination
                  v-model="storyCurrent"
                  color="purple"
                  :max="storyMaxPage"
                  max-pages="6"
                  boundary-numbers
                />
              </div>
            </q-tab-panel>
          </q-tab-panels>

        </div>
      </q-page>

      <q-separator color="orange" inset />
      <div class="row">
        <div class="col-2"> </div>
        <div class="col-auto" style="margin: 0px">
          <div class="footter" style="margin: 0px;text-align: center;">
            <router-link to="">关于心世界</router-link>|
            <router-link to="">联系我们</router-link>|
            <router-link to="">帮助中心</router-link>|
            <router-link to="">提交建议</router-link>|
            <router-link to="">举报中心</router-link>|
            <router-link to="">漏洞提交</router-link>|
          </div>
          <div class="footerText "> <p>Copyright © 2002-2022 www.aiavr.com All Rights Reserved 版权所有 心世界信息科技有限公司</p></div>
          <div class="footerText "><p>新世界、背景故事、世界观设定、小说、故事、世界</p></div>
          <div class="footerText "><p>本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任</p></div>
          <div class="footerText "><a href="https://www.51k.uk">心世界小说网</a>|<a  href="https://www.30dizhi.uk">30导航</a>|<a  href="https://www.aravrw.com">心世界</a></div>
        </div>
        <div class="col-2"></div>
      </div>
    </q-page-container>

  </q-layout>

</template>

<style scoped>

</style>
