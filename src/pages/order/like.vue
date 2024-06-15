<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import worldListDetailComponent from 'components/world/worldListDetailComponent.vue';
import storyListDetailComponent from 'components/story/storyListDetailComponent.vue';
import { api, tansParams } from 'boot/axios';

const  types= ref('world');
const  dateType= ref('week');
const  orderBy= ref('week');

const  worldType= ref('0');
const  storyType= ref('0');

const storyCurrent = ref(0);

const storyTotal = ref(0);
const storyMaxPage = ref(0);

const storyData = reactive({
  storyQueryParams: {
    pageNum: 1,
    pageSize: 10,
    types:"0",
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
    types:"0",
    orderBy:-1,
  }
});
const { worldQueryParams } = toRefs(worldData);
const storyList = ref([]);

async function getStoryList() {
  if(storyType.value != "0"){
    storyQueryParams.value.types = storyType.value;
  }else{
    storyQueryParams.value.types = null;
  }
  try {
    const response = await api.get('/wiki/story/list?' + tansParams(storyQueryParams.value));
    if (response.data.code == 200) {
      storyTotal.value = response.data.total;
      storyList.value = response.data.data;
      if( storyTotal.value%storyQueryParams.value.pageSize ==0){
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
  if(storyType.value != "0"){
    worldQueryParams.value.types = storyType.value;
  }else{
    worldQueryParams.value.types = null;
  }
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
  if (types.value == "world") {
    getWorldList();
  }else {
    getStoryList();
  }
}
function onDateOrder(or:number) {
  if (types.value == "world") {
    getWorldList();
  }else {
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
</script>

<template>
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
      v-model="types"
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
      v-if="types == 'world'"
      v-model="storyType"
      no-caps
      align="left"
      outside-arrows
      mobile-arrows
      class="bg-orange text-white shadow-2"
    >
      <q-tab outline color="brown" name="0" label="全部分类" />
      <q-tab outline color="brown" name="1" label="魔法"/>
      <q-tab outline color="brown" name="2" label="科学" />
      <q-tab outline color="brown" name="3" label="远古" />
      <q-tab outline color="brown" name="4" label="修真" />
      <q-tab outline color="brown" name="5" label="仙侠" />
      <q-tab outline color="brown" name="6" label="其他" />
    </q-tabs>
    <q-tabs
      v-if="types == 'story'"
      v-model="worldType"
      no-caps
      align="left"
      outside-arrows
      mobile-arrows
      class="bg-orange text-white shadow-2"
    >
      <q-tab outline color="brown" name="0" label="全部分类" />
      <q-tab outline color="brown" name="1" label="魔法"/>
      <q-tab outline color="brown" name="2" label="科学" />
      <q-tab outline color="brown" name="3" label="远古" />
      <q-tab outline color="brown" name="4" label="修真" />
      <q-tab outline color="brown" name="5" label="仙侠" />
      <q-tab outline color="brown" name="6" label="其他" />
    </q-tabs>
    <q-toolbar class="bg-blue text-white">
      <q-toolbar-title>
      <q-input v-if="types == 'story'" v-model="storyQueryParams.name" label="搜索" @click="getStoryList"></q-input>
      <q-input v-if="types == 'world'" v-model="worldQueryParams.name"  label="搜索" @click="worldQueryParams"></q-input>
      </q-toolbar-title>
    </q-toolbar>
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-tab-panels v-model="types" animated>
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
</template>

<style scoped>

</style>
