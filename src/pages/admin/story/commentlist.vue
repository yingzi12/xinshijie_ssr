<script setup lang="ts">
import headComponent from 'components/story/headComponent.vue';
import { reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const sid = ref(route.query.sid);
const id = ref(route.query.id);
const sname = ref(route.query.sname);
import adminItemComponent from 'components/comment/adminItemComponent.vue';
import { api, tansParams } from 'boot/axios';

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    sid:sid.value,
    status:-1,
    source:2,
    title: "",
  }
});

// 弹出框
const temType = ref(1)

const { queryParams } = toRefs(data);
const valueList = ref([]);

//搜索的元素名称
const title= ref();
//当前页
const  current= ref(1);
//总数
const  total= ref(0);
//有多少页
const  maxPage=ref(0);
async  function getList(){
  queryParams.value.title=title.value;
  const response =await api.get("/admin/comment/listAdmin?"+ tansParams(queryParams.value));
  valueList.value = response.data.data;
  total.value = response.data.total;
  if(total.value % queryParams.value.pageSize == 0){
    maxPage.value=total.value/queryParams.value.pageSize;
  }else{
    maxPage.value=total.value/queryParams.value.pageSize+1;
  }
}
getList();
function  onStatus(status:number){
  if(queryParams.value.status != status){
    queryParams.value.status=status;
    getList();
  }
}
</script>

<template>
  <q-page>
    <head-component :sid="sid" :sname="sname" :id="id"></head-component>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>统计（{{ total }}）</q-toolbar-title>
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </div>
    <div class="row" style="background-color: orange">

      <q-chip clickable  color="brown" label="全部" @click="onStatus(-1)" />
      <q-chip clickable color="brown" label="已发布" @click="onStatus(1)"/>
      <q-chip clickable color="brown" label="待发布"  @click="onStatus(2)"/>
    </div>

    <div class="q-pa-md q-gutter-md">
      <q-list bordered padding class="rounded-borders">
        <div v-for="(value,index) in valueList" :key="index">
          <admin-item-component :value="value"> </admin-item-component>
        </div>

        <q-separator spaced />

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
</template>

<style scoped>

</style>
