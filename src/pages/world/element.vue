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
      <q-breadcrumbs-el :label="wname" icon="navigation"  :to="{ path:'/world/detail', query: { wid: wid,wname: wname  }}"/>
      <q-breadcrumbs-el label="元素列表" icon="navigation"  :to="{ path:'/world/element', query: { wid: wid,wname: wname  }}"/>
    </q-breadcrumbs>
    <q-splitter
      v-model="splitterModel"
      unit="px"
    >

      <template v-slot:before>
        <div class="text-h6">排行榜</div>
        <div class="q-pa-md q-gutter-sm">
          <span class="text-overline">全部</span>
          <span class="text-overline">点击</span>
          <span class="text-overline">观看</span>
          <span class="text-overline">全部</span>
          <span class="text-overline">全部</span>
          <span class="text-overline">全部</span>
        </div>
        <q-separator spaced />
        <div class="text-h6">分类(<q-btn flat label="点击筛选更多" color="primary" @click="alert = true" size="xs" />)</div>
        <div class="q-pa-md q-gutter-sm">
          <q-chip clickable :color="cid==='0'?  'orange':'yellow' " label="全部"  @click="onType(`0`)" />
           <q-chip clickable v-for="(tag,index) in cidTagList" :key="index" :color="cid===tag.split(`$$`)[0] ?  'orange':'yellow' "  @click="onType(tag.split(`$$`)[0])">
             {{tag.split("$$")[1]}}
           </q-chip>
        </div>
<!--        <div>-->
<!--          已增加过滤：-->
<!--          <div class="q-pa-md q-gutter-sm">-->
<!--            <q-btn v-for="(t,index) in ticked" :key="index" color="brown" :label="t" size="xs"/>-->
<!--          </div>-->
<!--        </div>-->
        <q-separator spaced />
        <div class="text-h6">标签</div>
        <div class="q-pa-md q-gutter-sm">
          <span class="text-overline">全部</span>
          <span class="text-overline">点击</span>
          <span class="text-overline">观看</span>
          <span class="text-overline">全部</span>
          <span class="text-overline">全部</span>
          <span class="text-overline">全部</span>
        </div>
        <q-separator spaced />
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="row no-wrap shadow-1">
            <q-toolbar class="col-8 bg-grey-3">
              <q-btn flat round dense icon="menu" />
              <q-toolbar-title>{{ wname }} </q-toolbar-title>
              <q-toolbar-title>元素列表 </q-toolbar-title>
              <q-input rounded outlined v-model="queryParams.title" label="搜索..." @click="getList"/>
              <q-btn flat round dense icon="search" @click="getList" />
            </q-toolbar>
            <q-toolbar class="col-4 bg-primary text-white">
              <q-space />
              <q-btn flat round dense icon="add" class="q-mr-sm" :to="{ path:'/element/create', query: { wid: wid,wname:wname }}" />
              <q-btn flat round dense icon="more_vert" />
            </q-toolbar>
          </div>
        </div>
        <div class="q-pa-md q-gutter-md">
          <q-list bordered padding class="rounded-borders">
            <div  v-for="(value,index) in elementList" :key="index" >
            <element-item-component :value="value"></element-item-component>
            <q-separator spaced />
            </div>
          </q-list>
            <div class="q-pa-lg flex flex-center">
              <q-pagination
                v-model="current"
                color="purple"
                :max="maxPage"
                :max-pages="6"
                boundary-numbers
                @update:model-value="getList"
              />
            </div>
        </div>

      </template>

    </q-splitter>

  </q-page>
  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">选择分类</div>
      </q-card-section>
      <q-card-section>
        <choose-category-component :wid="wid" :cid-list="cidTagList" @cid-list="handleCidList" ></choose-category-component>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="确认" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>
<script lang="ts" setup>
import {  reactive, ref, toRefs} from 'vue'
import { useRoute, useRouter} from "vue-router";
import elementItemComponent from 'components/world/elementItemComponent.vue';
import chooseCategoryComponent from 'components/category/chooseCategoryComponent.vue';
import { api, tansParams } from 'boot/axios';

const splitterModel= ref(200); // start at 150px
const alert=ref(false);



// 接收url里的参数
const route = useRoute();
const router = useRouter()

const wid = ref(route.query.wid);
const wname = ref(route.query.wname);

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20,

    title: undefined,
    types: undefined,
    wid:wid.value
  }
});
const { queryParams } = toRefs(data);

const elementList = ref([]);

//搜索的元素名称
const title= ref();

//当前页
const  current= ref(1);
//总数
const  total= ref(0);
//有多少页
const  maxPage=ref(0);
async  function getList(){
  queryParams.value.wid=wid.value;
  queryParams.value.title=title.value;
  const response =await api.get("/wiki/element/list?"+ tansParams(queryParams.value));
   elementList.value = response.data.data;
  total.value = response.data.total;
  if(total.value % queryParams.value.pageSize == 0){
    maxPage.value=total.value/queryParams.value.pageSize;
  }else{
    maxPage.value=total.value/queryParams.value.pageSize+1;
  }
}
getList();
const cidTagList=ref([]);
// 定义处理函数来接收子组件传递的数据
const handleCidList = (selectedIds) => {
  console.log("从子组件接收到的选中ID列表:", selectedIds);
  // 在这里您可以根据需要处理这些ID，比如更新父组件的状态、发起新的API请求等
  cidTagList.value=selectedIds;
};
const cid=ref("0");
function onType(id:string){
  console.log(cid);
  cid.value=id;
}
</script>


<style scoped>

</style>
