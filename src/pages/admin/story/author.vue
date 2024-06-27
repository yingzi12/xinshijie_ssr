<script setup lang="ts">
import headComponent from 'components/story/headComponent.vue';
import addAuthorComponent from 'components/story/addAuthorComponent.vue';

import { reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { api, tansParams } from 'boot/axios';
import { getImageUrl } from 'boot/tools';
const route = useRoute();
const sid = ref(route.query.sid);
const sname = ref(route.query.sname);
const id = ref(route.query.id);

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    sid:sid.value,
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
async function getList() {
  queryParams.value.pageNum=current.value
  try {
    const response = await api.get('/admin/author/list?' + tansParams(queryParams.value));
    const data=response.data;
    if (data.code == 200) {
      valueList.value=data.data;
      total.value=data.total;
      if(data.total % queryParams.value.pageSize == 0){
        maxPage.value=data.total/queryParams.value.pageSize;
      }else{
        maxPage.value=data.total/queryParams.value.pageSize+1;
      }
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
getList();
const dialog=ref(false);
</script>

<template>
  <q-page>
    <head-component :sid="sid" :sname="sname" :id="id"></head-component>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-toolbar-title>统计（{{ total }}）</q-toolbar-title>
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
        <q-btn flat round dense icon="add" label="新增作家" @click="dialog = true"/>
      </q-toolbar>
    </div>
    <q-list bordered class="rounded-borders" >
      <q-item v-for="(value,index) in valueList" :key="index">
        <q-item-section avatar top>
          <q-avatar>
            <q-img
              :src="getImageUrl(value.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section  top side >
          <q-item-label class="q-mt-sm">{{ value.userName }}<q-badge color="primary">v{{value.ranks}}</q-badge></q-item-label>
          <q-item-label class="q-mt-sm text-blue">{{value.types==1?"作家":value.types==2?"创作者":"未知"}}</q-item-label>
          <q-item-label lines="1">{{value.sign==null?'该用户还没有签名':value.sign}}</q-item-label>
        </q-item-section>

        <q-item-section top class="col-1 gt-sm">
          <q-item-label lines="1">
            <span class="text-weight-medium">经验：</span>
            <span class="text-grey-8">{{value.credit ==null ? 0:value.credit}}</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">章节：</span>
            <span class="text-grey-8">{{value.countChapter==null ? 0:value.countChapter}}</span>
          </q-item-label>
        </q-item-section>
        <q-item-section top class="col-1 gt-sm">
          <q-item-label lines="1">
            <span class="text-weight-medium">编辑数：</span>
            <span class="text-grey-8">{{value.countEdit==null?0:value.countEdit}}</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">审核数：</span>
            <span class="text-grey-8">{{value.countAudit == null ? 0:value.countAudit}}</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">评论数：</span>
            <span class="text-grey-8">{{value.countComment == null ? 0:value.countComment}}</span>
          </q-item-label>
          <!--          <q-item-label lines="1">-->
          <!--            <span class="text-weight-medium">讨论数：</span>-->
          <!--            <span class="text-grey-8">{{value.countDis}}</span>-->
          <!--          </q-item-label>-->
        </q-item-section>

        <q-item-section top side >
          <div class="text-grey-8 q-gutter-xs">
            <q-btn v-if="value.types != 1" class="gt-xs" size="12px" flat dense round icon="delete" />
            <!--            <q-btn class="gt-xs" size="12px" flat dense round icon="done" />-->
            <!--            <q-btn size="12px" flat dense round icon="more_vert" />-->
          </div>
        </q-item-section>
      </q-item>
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
  </q-page>
  <q-dialog v-model="dialog" persistent>
    <add-author-component :sid="sid" :wname="sname" ></add-author-component>
  </q-dialog>
</template>

<style scoped>

</style>
