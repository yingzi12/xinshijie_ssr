<template>
  <q-page>
    <q-breadcrumbs class="text-brown q-ma-md">
      <template v-slot:separator>
        <q-icon
          size="1.5em"
          name="chevron_right"
          color="primary"
        />
      </template>

      <q-breadcrumbs-el label="首页" icon="home" to="/"/>
      <q-breadcrumbs-el label="世界首页" icon="widgets"  to="/world/index"/>
      <q-breadcrumbs-el label="世界列表" icon="navigation" to="/world/order" />
      <q-breadcrumbs-el :label="wname" icon="navigation"  :to="{ path: '/world/detail', query: { wid: wid ,wname: wname,source: 1 }}" />
      <q-breadcrumbs-el label="故事列表" icon="navigation" :to="{ path: '/world/story', query: { wid: wid ,wname: wname,source: 1 }}" />
    </q-breadcrumbs>
    <q-splitter
      v-model="splitterModel"
      unit="px"
    >

      <template v-slot:before>
        <div class="text-h6">排序</div>
        <div class="q-pa-md q-gutter-sm">
          <q-chip clickable size="xs"  :color="order == -1 ? 'orange':'grey'" @click="onOrder(-1)">
            默认
          </q-chip>
          <q-chip clickable size="xs"  :color="order == 1 ? 'orange':'grey'" @click="onOrder(1)">
            等级
          </q-chip>
          <q-chip clickable size="xs"  :color="order == 2 ? 'orange':'grey'" @click="onOrder(2)">
            评分
          </q-chip>
          <q-chip clickable size="xs"  :color="order == 3 ? 'orange':'grey'" @click="onOrder(3)">
            点击
          </q-chip>
          <q-chip clickable size="xs"  :color="order == 4 ? 'orange':'grey'" @click="onOrder(4)">
            关注
          </q-chip>
          <q-chip clickable size="xs"  :color="order == 5 ? 'orange':'grey'" @click="onOrder(5)">
            喜欢
          </q-chip>
          <q-chip clickable size="xs"  :color="order == 6 ? 'orange':'grey'" @click="onOrder(6)">
            元素
          </q-chip>
          <q-chip clickable size="xs"  :color="order == 7 ? 'orange':'grey'" @click="onOrder(7)">
            故事
          </q-chip>
        </div>
        <q-separator spaced />
        <div class="text-h6">分类</div>
        <div class="q-pa-md q-gutter-sm">
          <q-chip clickable size="xs"  :color="types == -1 ? 'orange':'grey'" @click="onTypes(-1)">
            全部
          </q-chip>
          <q-chip clickable size="xs"  :color="types == 1 ? 'orange':'grey'" @click="onTypes(1)">
            武侠
          </q-chip>
          <q-chip clickable size="xs"  :color="types == 2 ? 'orange':'grey'" @click="onTypes(2)">
            仙侠
          </q-chip>
          <q-chip clickable size="xs"  :color="types == 3 ? 'orange':'grey'" @click="onTypes(3)">
            魔幻
          </q-chip>
          <q-chip clickable size="xs"  :color="types == 4 ? 'orange':'grey'" @click="onTypes(4)">
            神话
          </q-chip>
          <q-chip clickable size="xs"  :color="types == 5 ? 'orange':'grey'" @click="onTypes(5)">
            灵异
          </q-chip>
          <q-chip clickable size="xs"  :color="types == 6 ? 'orange':'grey'" @click="onTypes(6)">
            科技
          </q-chip>
          <q-chip clickable size="xs"  :color="types == 7 ? 'orange':'grey'" @click="onTypes(7)">
            超能力/异能
          </q-chip>
          <q-chip clickable size="xs"  :color="types == 8 ? 'orange':'grey'" @click="onTypes(8)">
            其他
          </q-chip>
        </div>
        <q-separator spaced />
        <div class="text-h6">标签</div>
        <div class="q-pa-md q-gutter-sm">
          <span class="text-overline">全部</span>
          <span class="text-overline">原创</span>
          <span class="text-overline">二次元</span>
          <span class="text-overline">其他</span>
        </div>
        <q-separator spaced />
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="row no-wrap shadow-1">
            <q-toolbar class="col-8 bg-grey-3">
              <!--              <q-btn flat round dense icon="menu" />-->
              <q-toolbar-title>统计（{{total}}） </q-toolbar-title>
              <q-input rounded outlined v-model="queryParams.name" label="搜索..." />
              <q-btn flat round dense icon="search" />
            </q-toolbar>
            <q-toolbar class="col-4 bg-primary text-white">
              <q-space />
              <q-btn flat round dense icon="add" class="q-mr-sm" label="创建故事" @click="routerAddStory"/>
              <!--              <q-btn flat round dense icon="more_vert" />-->
            </q-toolbar>
          </div>
        </div>
        <div class="q-pa-md q-gutter-md">
          <q-list bordered padding class="rounded-borders">
            <div v-for="(value,index) in worldList" :key="index">
              <story-list-detail-component :value="value"></story-list-detail-component>
            </div>
          </q-list>
          <div class="q-pa-lg flex flex-center">
            <q-pagination
              v-model="current"
              color="purple"
              :max="maxPage"
              :max-pages="6"
              boundary-numbers
              @update:model-value="getStoryList"
            />
          </div>
        </div>

      </template>

    </q-splitter>
  </q-page>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue';
import { api, tansParams } from 'boot/axios';
import { useRoute, useRouter } from 'vue-router';
import storyListDetailComponent from 'components/story/storyListDetailComponent.vue';
const route = useRoute();
const wid = ref(route.query.wid);
const wname = ref(route.query.wname);

const router = useRouter()

const splitterModel= ref(200); // start at 150px
const order=ref(-1);
const types=ref(-1);

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    name:"",
    wid: wid,
    types:-1,
    orderBy:-1,
  }
});
const { queryParams } = toRefs(data);

const worldList=ref([]);
//当前页
const  current= ref(1);
//总数
const  total= ref(0);
//有多少页
const  maxPage=ref(0);
async function getStoryList() {
  queryParams.value.pageNum=current.value
  queryParams.value.orderBy=order.value;
  queryParams.value.types=types.value;
  queryParams.value.wid = wid.value;

  try {
    const response = await api.get('/wiki/story/list?' + tansParams(queryParams.value));
    const data=response.data;
    if (data.code == 200) {
      worldList.value=data.data;
      total.value = response.data.total;
      if(total.value % queryParams.value.pageSize == 0){
        maxPage.value=total.value/queryParams.value.pageSize;
      }else{
        maxPage.value=total.value/queryParams.value.pageSize+1;
      }
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
function routerAddStory(){
  router.push(`/story/create?wid=${wid.value}&wname=${wname.value}`);
}
function onOrder(or:number){
  order.value=or;
  getStoryList();
}
function onTypes(or:number){
  types.value=or;
  getStoryList();
}
getStoryList();
</script>

<style scoped>

</style>
