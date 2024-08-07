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
      <q-breadcrumbs-el label="故事首页" icon="widgets"  to="/story/index"/>
      <q-breadcrumbs-el label="故事列表" icon="navigation" to="/story/order" />
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
            观看
          </q-chip>
          <q-chip clickable size="xs"  :color="order == 7 ? 'orange':'grey'" @click="onOrder(7)">
            点赞
          </q-chip>
        </div>
        <q-separator spaced />
        <div class="text-h6">分类</div>
        <div class="q-pa-md q-gutter-sm">
          <q-chip clickable size="xs"  :color="types == -1 ? 'orange':'grey'" @click="onTypes(-1)">
            全部
          </q-chip>
          <q-chip clickable size="xs" v-for="(storyType, index) in storyTypes" :key="index" :color="storyType.id == 1 ? 'orange':'grey'" @click="onTypes(storyType.id)">
            {{storyType.name}}
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
<!--              <q-input rounded outlined v-model="title" label="搜索..." />-->
              <q-input filled bottom-slots v-model="title" label="查询" counter @keyup.enter="getStoryList" >
                <template v-slot:append>
                  <q-icon v-if="title !== ''" name="close" @click="title = ''" class="cursor-pointer" />
                  <q-icon name="search"         @click="getStoryList" />
                </template>
              </q-input>
              <q-btn flat round dense icon="search"  @click="getStoryList"/>
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
            <div v-for="(value,index) in storyList" :key="index">
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
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import storyListDetailComponent from 'components/story/storyListDetailComponent.vue';
import { storyTypes, worldTypes } from 'boot/consts';
const route = useRoute()
const router = useRouter()

const title = ref(route.query.title);

const $q = useQuasar();

const splitterModel= ref(200); // start at 150px
const order=ref(-1);
const types=ref(-1);

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    types:-1,
    name:"",
    orderBy:-1,
  }
});
const { queryParams } = toRefs(data);

const storyList=ref([]);
//当前页
const  current= ref(1);
//总数
const  total= ref(0);
//有多少页
const  maxPage=ref(0);
async function getStoryList() {
  queryParams.value.name = title.value;
  queryParams.value.pageNum=current.value
  queryParams.value.orderBy=order.value;
  queryParams.value.types=types.value;

  try {
    const response = await api.get('/wiki/story/list?' + tansParams(queryParams.value));
    const data=response.data;
    if (data.code == 200) {
      storyList.value=data.data;
      total.value=data.total;
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
  router.push(`/story/create`);
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
