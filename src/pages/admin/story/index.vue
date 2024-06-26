<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import adminItemCardComponent from 'components/story/adminStoryItemCardComponent.vue';
import { api, tansParams } from 'boot/axios';
import { storyStatusSelection, storyStatus } from 'boot/consts';

const selected = ref(null);

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

const valueList=ref([]);
//总数
const  total= ref(0);
//有多少页
const  maxPage=ref(0);
async function getStoryList() {
  queryParams.value.pageNum=current.value

  try {
    const response = await api.get('/admin/story/list?' + tansParams(queryParams.value));
    const data=response.data;
    if (data.code == 200) {
      valueList.value=data.data;
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
getStoryList();
</script>

<template>
  <q-page>
    <q-toolbar class="bg-purple text-white">
      <q-btn flat round dense icon="assignment_ind" />
      <q-toolbar-title>
        故事管理
      </q-toolbar-title>
      <q-btn flat round dense icon="add" class="q-mr-xs" to="/admin/story/create" />
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
          @update:modelValue="getStoryList"
        >
          <q-tab outline color="brown" name="-1" label="全部" co/>
          <q-tab  v-for="(status,index) in storyStatusSelection" :key="index" outline color="brown" :name="status.id" :label="status.value" />

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
          @update:modelValue="getStoryList"
        >
          <q-tab outline color="brown" name="-1" label="全部"/>
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
          <q-input rounded outlined v-model="queryParams.name" placeholder="输入故事名称"  label="搜索..." @click="getStoryList" />
          <q-btn flat round dense icon="search" @click="getStoryList"/>
        </q-toolbar>
      </div>
    </div>

    <div class="q-pa-md q-gutter-md">
      <q-list bordered padding class="rounded-borders">
        <div v-for="(value,index) in valueList" :key="index">
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
          @update:model-value="getStoryList"
        />
      </div>
    </div>

  </q-page>
</template>

<style scoped>

</style>
