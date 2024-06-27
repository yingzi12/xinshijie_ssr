<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { api, tansParams } from 'boot/axios';
import AdminChapterItemComponent from 'components/draft/adminChapterItemComponent.vue';
import { draftChapterStatus, draftElementStatus } from 'boot/consts';

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    status:-1,
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
  const response =await api.get("/admin/draftChapter/list?"+ tansParams(queryParams.value));
  if(response.data.code==200) {
    valueList.value = response.data.data;
    total.value = response.data.total;
    if (total.value % queryParams.value.pageSize == 0) {
      maxPage.value = total.value / queryParams.value.pageSize;
    } else {
      maxPage.value = total.value / queryParams.value.pageSize + 1;
    }
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
    <q-toolbar class="bg-purple text-white">
<!--      <q-btn flat round dense icon="assignment_ind" />-->
      <q-toolbar-title>
        章节草稿
      </q-toolbar-title>
<!--      <q-btn flat round dense icon="apps" class="q-mr-xs" />-->
<!--      <q-btn flat round dense icon="more_vert" />-->
    </q-toolbar>
    <q-separator dark inset />
    <div class="row" style="background-color: orange">

      <q-chip clickable  color="brown" label="全部" @click="onStatus(-1)" />
      <q-chip clickable v-for="(status,index) in draftChapterStatus" :key="index"  color="brown" :label="status.name" @click="onStatus(status.id)"/>
    </div>

<!--    <div class="q-pa-md">-->
      <div class="row no-wrap shadow-1">
        <q-toolbar class="col-8 bg-grey-3">
          <q-btn flat round dense icon="menu" />
          <q-toolbar-title>人气 </q-toolbar-title>
          <q-input rounded outlined v-model="queryParams.title" label="搜索..." @click="getList"/>
          <q-btn flat round dense icon="search" @click="getList"/>
        </q-toolbar>
        <q-toolbar class="col-4 bg-primary text-white">
          <q-space />
<!--          <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />-->
<!--          <q-btn flat round dense icon="more_vert" />-->
        </q-toolbar>
      </div>
<!--    </div>-->


    <div class="q-pa-md q-gutter-md">
      <q-list bordered padding class="rounded-borders">
        <div v-for="(value,index) in valueList" :key="index">
          <admin-chapter-item-component :value="value"></admin-chapter-item-component>
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
