<script setup lang="ts">
import headComponent from 'components/story/headComponent.vue';
import { reactive, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api, tansParams } from 'boot/axios';
const route = useRoute();
const router = useRouter();

const sid = ref(route.query.sid);
const sname = ref(route.query.sname);
const id = ref(route.query.id);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    title: "",
    sid:sid.value,
    level:0
  },
  rules: {
    title: [{ required: true, message: "分类/目录名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);

const  current= ref(1);

const valueList=ref([]);
//总数
const  total= ref(0);
//有多少页
const  maxPage=ref(0);
async function getValueList() {
  queryParams.value.pageNum=current.value

  try {
    const response = await api.get('/admin/chapter/list?' + tansParams(queryParams.value));
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
getValueList();
const dialogAdd=ref(false);
</script>

<template>
  <q-page>
    <head-component :sid="sid" :sname="sname" :id="id"></head-component>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>分卷（{{ total }}）</q-toolbar-title>
<!--        <q-btn flat round dense icon="search" />-->
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
<!--        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />-->
        <q-btn flat round dense icon="more_vert" label="新增分卷" @click="dialogAdd"/>
      </q-toolbar>
    </div>
    <q-list bordered class="rounded-borders" >
      <q-item-label header>Google Inbox style</q-item-label>
       <div v-for="(value,index) in valueList" :key="index">
         <q-item >
           <q-item-section side>
             {{((current-1)*queryParams.pageSize)+index+1}}
           </q-item-section>

           <q-item-section  side>
             <q-item-label class="q-mt-sm text-h6" lines="1">
               <q-btn flat color="blue"  :to="{ path: '/admin/story/chapter', query: { id: id,sid: sid,sname:sname,rid:value.id,rname:value.title}}" >{{ value.title }}</q-btn>
             </q-item-label>
             <q-item-label class="q-mt-sm text-subtitle2">作者：{{value.createName}}</q-item-label>
           </q-item-section>
           <q-item-section  side>
             <q-item-label class="q-mt-sm text-subtitle2">创建时间：{{value.createTime}}</q-item-label>
             <q-item-label class="q-mt-sm text-subtitle2">更新时间：{{value.updateTime}}</q-item-label>
           </q-item-section>
           <q-item-section >
             <q-item-label lines="1">

               <div class="text-weight-bold text-primary"><span class="text-weight-medium">序号：</span>
                 <span class="text-grey-8">{{value.serialNumber}}</span>
                 <q-popup-edit v-model="value.serialNumber" auto-save v-slot="scope">
                   <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                 </q-popup-edit>
               </div>
             </q-item-label>
             <q-item-label lines="1">
               <span class="text-weight-medium">章节数：</span>
               <span class="text-grey-8">{{ value.countChapter }}</span>
             </q-item-label>
           </q-item-section>

           <q-item-section top side >
             <div class="text-grey-8 q-gutter-xs">
               <q-btn class="gt-xs" size="12px" flat dense round icon="lock" />
               <q-btn class="gt-xs" size="12px" flat dense round icon="edit" />
               <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
             </div>
           </q-item-section>

         </q-item>
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
        @update:model-value="getValueList"
      />
    </div>

  </q-page>

</template>

<style scoped>

</style>
