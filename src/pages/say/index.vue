<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api, tansParams } from 'boot/axios';
import  addComponents  from 'components/say/addComponent.vue';
import SayListComponent from 'components/say/sayListComponent.vue';

const route = useRoute();

const router = useRouter()

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
async function getValueList() {
  try {
    queryParams.value.pageNum=current.value;
    const response = await api.get('/user/say/list?' + tansParams(queryParams.value));
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
getValueList();

function onChange(type) {
  if (queryParams.value.types != type) {

    queryParams.value.types = type;
    getValueList();
  }
}
const addDialog=ref(false);

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
      <q-breadcrumbs-el label="世界列表" icon="navigation" to="/world/order" />
      <q-breadcrumbs-el label="小说列表" icon="navigation" to="/story/order" />
      <q-breadcrumbs-el label="说说列表" icon="navigation" to="/say/index" />
    </q-breadcrumbs>
    <div class="q-pa-md">
      <q-toolbar class="bg-purple text-white">
        <q-toolbar-title>
          说说列表
        </q-toolbar-title>
        <q-btn flat round dense icon="add" label="新增说说"  @click="addDialog=true"/>
        <!--      <q-btn flat round dense icon="apps" class="q-mr-xs" />-->
        <!--      <q-btn flat round dense icon="more_vert" />-->
      </q-toolbar>
      <div>
<!--        <q-tabs-->
<!--          v-model="queryParams.types"-->
<!--          no-caps-->
<!--          align="left"-->
<!--          outside-arrows-->
<!--          mobile-arrows-->
<!--          class="bg-orange text-white shadow-2"-->
<!--        >-->
<!--          <q-tab  outline color="brown" name="0" label="全部" @click="onChange(-1)" />-->
<!--        </q-tabs>-->
        <q-toolbar class="bg-blue text-white">
          <q-toolbar-title>
            <q-input v-model="queryParams.title" label="搜索" @click="getValueList"></q-input>
          </q-toolbar-title>
        </q-toolbar>
      </div>

    </div>
    <say-list-component></say-list-component>
<!--    <div class="q-pa-md q-gutter-md">-->
<!--      <q-list bordered padding class="rounded-borders">-->
<!--        <q-item v-for="(value,index) in valueList" :key="index">-->
<!--          <card-item-component :value="value"></card-item-component>-->

<!--        </q-item>-->
<!--        <q-separator spaced />-->

<!--      </q-list>-->
<!--      <div class="q-pa-lg flex flex-center">-->
<!--        <q-pagination-->
<!--          v-model="current"-->
<!--          color="purple"-->
<!--          :max="maxPage"-->
<!--          :max-pages="6"-->
<!--          boundary-numbers-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->
  </q-page>
  <q-dialog  v-model="addDialog" >
    <add-components></add-components>
  </q-dialog>

</template>

<style scoped>

</style>
