<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import adminItemCardComponent from 'components/world/adminItemCardComponent.vue';
import { api, tansParams } from 'boot/axios';

const selected = ref(null);
const seach=ref("");

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    orderBy:"",
    name:"",
    types:-1,
    status:-1,
    title:"",
    tags:"",
  }
});
const { queryParams } = toRefs(data);
const  current= ref(1);

const worldList=ref([]);
//总数
const  total= ref(0);
//有多少页
const  maxPage=ref(0);
async function getWorldList() {
  if(seach.value != null && seach.value != '' ){
    queryParams.value.name = seach.value;
  }
  queryParams.value.pageNum=current.value

  try {
    const response = await api.get('/wiki/world/list?' + tansParams(queryParams.value));
    const data=response.data;
    if (data.code == 200) {
      worldList.value=data.data;
      total.value=data.total;
      if(data.total % 20 == 0){
        maxPage.value=data.total/20;
      }else{
        maxPage.value=data.total/20+1;
      }
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
getWorldList();
</script>

<template>
<q-page>
  <q-toolbar class="bg-purple text-white">
    <q-btn flat round dense icon="assignment_ind" />
    <q-toolbar-title>
      世界管理
    </q-toolbar-title>
    <q-btn flat round dense icon="add" class="q-mr-xs" to="/admin/world/create" />
    <q-btn flat round dense icon="more_vert" />
  </q-toolbar>
  <q-separator dark inset />
  <div>
    <div class="row" style="background-color: orange">
      <q-tabs
        v-model="queryParams.status"
        no-caps
        align="left"
        outside-arrows
        mobile-arrows
        class="bg-orange text-white shadow-2"
        @update:modelValue="getWorldList"
      >
        <q-tab outline color="brown" name="0" label="全部" co/>
        <q-tab outline color="brown" name="1" label="已发布"/>
        <q-tab outline color="brown" name="2" label="待发布" />
      </q-tabs>
    </div>
    <div class="row" style="background-color: orange">
      <q-tabs
        v-model="queryParams.types"
        no-caps
        align="left"
        outside-arrows
        mobile-arrows
        class="bg-orange text-white shadow-2"
        @update:modelValue="getWorldList"
      >
        <q-tab outline color="brown" name="0" label="全部"/>
        <q-tab outline color="brown" name="1" label="武侠"/>
        <q-tab outline color="brown" name="2" label="仙侠" />
        <q-tab outline color="brown" name="3" label="魔幻" />
        <q-tab outline color="brown" name="4" label="神话" />
        <q-tab outline color="brown" name="4" label="灵异" />
        <q-tab outline color="brown" name="4" label="科技" />
        <q-tab outline color="brown" name="4" label="超能力/异能" />
        <q-tab outline color="brown" name="4" label="其他" />
      </q-tabs>
    </div>
    <div>
      <q-toolbar class="col-8 bg-grey-3">
        <q-input rounded outlined v-model="queryParams.name" placeholder="输入世界名称"  label="搜索..." @click="getWorldList" />
        <q-btn flat round dense icon="search" @click="getWorldList"/>
      </q-toolbar>
    </div>
  </div>

  <div class="q-pa-md q-gutter-md">
    <q-list bordered padding class="rounded-borders">
      <div v-for="(value,index) in worldList" :key="index">
      <admin-item-card-component :value="value"> </admin-item-card-component>
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
        @update:model-value="getWorldList"
      />
    </div>
  </div>

</q-page>
</template>

<style scoped>

</style>
