<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { api, tansParams } from 'boot/axios';
import  cardItemComponent  from 'components/discuss/cardItemComponent.vue';
const route = useRoute();

const $q = useQuasar();
const router = useRouter()

const splitterModel= ref(200); // start at 150px
const  current= ref(1);
const total = ref(0);
const data = reactive({
  form: {
    comment:undefined,
    upid:undefined,
  },
  queryParams: {
    pageNum: 1,
    pageSize: 20,

    auditStatus:0,
    title:"",
    current:1,
    name: undefined,
    types: undefined,
    pid:null,
    ranks:0,
    // wid:wid.value,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);

const  maxPage=ref(0);
const valueList=ref([]);
async function getDiscussList() {
  try {
    queryParams.value.pageNum=current.value;
    const response = await api.get('/wiki/discuss/list?' + tansParams(queryParams.value));
    if (response.data.code == 200) {
      total.value = response.data.total;
      valueList.value=response.data.data;
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
getDiscussList();

const chargeList = [
  {
    label: '自由话题',
    value: 1
  },
  {
    label: '剧情讨论',
    value: 2
  },
  {
    label: '元素讨论',
    value: 3
  },
  {
    label: '小说讨论',
    value: 4
  },
  {
    label: '建议',
    value: 5
  },
  {
    label: '内容错误',
    value: 6
  },
  {
    label: '内容缺失',
    value: 7
  },
  {
    label: '过多重复',
    value: 8
  },
  {
    label: '内容不相关',
    value: 9
  },
  {
    label: '其他',
    value: 10
  },
]
function onChange(type) {
  if (queryParams.value.types != type) {

    queryParams.value.types = type;
    getDiscussList();
  }
}

</script>

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
      <q-breadcrumbs-el label="小说列表" icon="navigation" to="/story/order" />
      <q-breadcrumbs-el label="讨论列表" icon="navigation" to="/discuss/index" />
    </q-breadcrumbs>
    <div class="q-pa-md">
      <q-toolbar class="bg-purple text-white">
        <q-toolbar-title>
          讨论列表
        </q-toolbar-title>
<!--        <q-input rounded outlined v-model="queryParams.title" label="搜索..." />-->
        <q-btn flat round dense icon="add" label="新增讨论"  to="/discuss/create"/>
        <!--      <q-btn flat round dense icon="apps" class="q-mr-xs" />-->
        <!--      <q-btn flat round dense icon="more_vert" />-->
      </q-toolbar>
<!--      <div class="row no-wrap shadow-1">-->
<!--        <q-toolbar class="col-8 bg-grey-3">-->
<!--          <q-btn flat round dense icon="menu" />-->
<!--          <q-toolbar-title>人气 </q-toolbar-title>-->
<!--          <q-input rounded outlined v-model="queryParams.title" label="搜索..." />-->
<!--          <q-btn flat round dense icon="search" />-->
<!--        </q-toolbar>-->
<!--        <q-toolbar class="col-4 bg-primary text-white">-->
<!--          <q-space />-->
<!--          <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />-->
<!--          <q-btn flat round dense icon="more_vert" />-->
<!--        </q-toolbar>-->
<!--      </div>-->
      <div>
        <q-tabs
          v-model="queryParams.types"
          no-caps
          align="left"
          outside-arrows
          mobile-arrows
          class="bg-orange text-white shadow-2"
        >
          <q-tab  outline color="brown" name="0" label="全部" @click="onChange(-1)" />
          <q-tab  v-for="(item, index) in chargeList" :key="index" outline color="brown"  :label="item.label"  @click="onChange(item.value)" />
        </q-tabs>
        <q-toolbar class="bg-blue text-white">
          <q-toolbar-title>
            <q-input v-model="queryParams.title" label="搜索" @click="getDiscussList"></q-input>
          </q-toolbar-title>
        </q-toolbar>
      </div>
      <div class="row no-wrap shadow-1">
        <!--      <q-toolbar class="col-8 bg-grey-3">-->
        <!--        <q-btn flat round dense icon="menu" />-->
        <!--        <q-toolbar-title>{{ wname }} </q-toolbar-title>-->
        <!--        <q-input rounded outlined v-model="seach" label="搜索..." />-->
        <!--        <q-btn flat round dense icon="search" />-->
        <!--      </q-toolbar>-->
        <!--      <q-toolbar class="col-4 bg-primary text-white">-->
        <!--        <q-space />-->
        <!--&lt;!&ndash;        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />&ndash;&gt;-->
        <!--        <q-btn flat round dense icon="add" label="新增讨论"  :to="{ path: '/discuss/create', query: { wid: wid ,wname: wname,source: 1 }}"/>-->
        <!--      </q-toolbar>-->
      </div>
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-list bordered padding class="rounded-borders">
        <q-item v-for="(value,index) in valueList" :key="index">
          <card-item-component :value="value"></card-item-component>

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
        />
      </div>
    </div>
  </q-page>

</template>

<style scoped>

</style>
