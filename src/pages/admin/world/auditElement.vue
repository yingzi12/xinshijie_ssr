<script setup lang="ts">
import headComponent from 'components/world/headComponent.vue';
import adminElementItemComponent from 'components/world/adminAuditElementItemComponent.vue';

import { reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { moduleOptions } from 'boot/consts';
import { api, tansParams } from 'boot/axios';
import ChooseCategoryComponent from 'components/category/chooseCategoryComponent.vue';

const route = useRoute();
const wid = ref(route.query.wid);
const wname = ref(route.query.wname);

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    title: "",
    types: undefined,
    status:-1,
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
  const response =await api.get("/admin/draftElement/listAudit?"+ tansParams(queryParams.value));
  elementList.value = response.data.data;
  total.value = response.data.total;
  if(total.value % queryParams.value.pageSize == 0){
    maxPage.value=total.value/queryParams.value.pageSize;
  }else{
    maxPage.value=total.value/queryParams.value.pageSize+1;
  }
}
getList();
const dialog=ref(false);
const dialogAudit=ref(false);

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
function  onStatus(status:number){
  if(queryParams.value.status != status){
    queryParams.value.status=status;
    getList();
  }
}
</script>

<template>
  <q-page>
    <head-component :wid="wid" :wname="wname" :types="5"></head-component>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
<!--        <q-btn flat round dense icon="menu" />-->
        <q-toolbar-title>统计（11)
<!--          <div class="text-h6">分类(<q-btn flat label="点击筛选更多" color="primary" @click="alert = true" size="xs" />)</div>-->
<!--          <q-btn flat label="点击筛选更多" color="primary" @click="alert = true" size="xs" />-->
        </q-toolbar-title>
<!--        <q-btn flat round dense icon="search" />-->
      </q-toolbar>
<!--      <q-toolbar class="col-4 bg-primary text-white">-->
<!--        <q-space />-->
<!--        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />-->
<!--        <q-btn flat round dense icon="more_vert" />-->
<!--      </q-toolbar>-->
    </div>
    <div class="row" style="background-color: orange">

      <q-chip clickable  color="brown" label="全部" @click="onStatus(-1)" />
      <q-chip clickable color="brown" label="待审核" @click="onStatus(1)"/>
      <q-chip clickable color="brown" label="审核成功"  @click="onStatus(2)"/>
      <q-chip clickable color="brown" label="审核失败"  @click="onStatus(2)"/>

    </div>
    <div class="row" style="background-color: orange">
      <div>
        <q-btn outline color="brown" label="全部大类" />
        <q-btn v-for="(o,index) in moduleOptions" :key="index" outline color="brown" :label="o.label"/>
      </div>
    </div>
    <div class="row" style="background-color: orange">
      <div class="text-h6">分类(<q-btn flat label="点击筛选更多" color="primary" @click="dialog = true" size="xs" />)</div>
      <div class="q-pa-md q-gutter-sm">
        <q-chip clickable :color="cid==='0'?  'orange':'yellow' " label="全部"  @click="onType(`0`)" />
        <q-chip clickable v-for="(tag,index) in cidTagList" :key="index" :color="cid===tag.split(`$$`)[0] ?  'orange':'yellow' "  @click="onType(tag.split(`$$`)[0])">
          {{tag.split("$$")[1]}}
        </q-chip>
      </div>
    </div>
    <div>
      <q-toolbar class="col-8 bg-grey-3">
        <q-input rounded outlined v-model="queryParams.title" placeholder="输入元素名称"  label="搜索..." @click="getList" />
        <q-btn flat round dense icon="search" @click="getList"/>
      </q-toolbar>
    </div>

    <div class="q-pa-md q-gutter-md">
      <q-list bordered padding class="rounded-borders">
        <div v-for="(value,index) in elementList" :key="index">
          <admin-element-item-component :value="value"></admin-element-item-component>
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
  </q-page>
  <q-dialog v-model="dialog">
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

<style scoped>

</style>
