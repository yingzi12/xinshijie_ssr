<script setup lang="ts">
import { api, tansParams } from 'boot/axios';
import { reactive, ref, toRefs } from 'vue';
import { Dialog } from 'quasar';
import editorTextComponent from 'components/common/editorTextComponent.vue';

const charge=ref(1);
const chargeList = [
  { label: "HEAD头的轮播图", value: 1 },
  { label: "编辑推荐", value: 2 },
  { label: "最有潜力得", value: 3 },
  { label: "最优秀得", value: 4 },
  { label: "最新的", value: 5 },
  { label: "非原创推荐", value: 6 }
]
const data = reactive({
  addForm: {
    title:"",
    tags:"",
    intro:"",
    content:"",
    kind:1,
  },
  queryParams: {
    pageNum: 1,
    pageSize: 4,
  }
});

const total = ref(0);
const { addForm,queryParams } = toRefs(data);
async function onAddValue() {
  const response = await api.post("/wiki/announcement/add", JSON.stringify(addForm.value),{
    headers: {
      'Content-Type': 'application/json',},
  });
  const data = response.data;
  if (data.code == 200) {
    Dialog.create({
      title: '通知',
      message: '添加成功.',
      ok: {
        push: true
      },
    }).onOk(async () => {
      // router.go(-1)// Redirect to login page
    }).onCancel(async () => {
      // router.go(-1)// Redirect to login page
    });
  }
}
function updateCharge(charge: number) {
  // recType.value=charge;
}
const valueList=ref([]);
async function getValueList() {
  try {
    const response = await api.get('/wiki/announcement/list?' + tansParams(queryParams.value));
    if (response.data.code == 200) {
      // total.value = response.data.total;
      // maxPage.value=  total.value/10+1;
      valueList.value = response.data.data;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
getValueList();
</script>

<template>
  <q-breadcrumbs class="text-brown q-ma-md">
    <template v-slot:separator>
      <q-icon
        size="1.5em"
        name="chevron_right"
        color="primary"
      />
    </template>

    <q-breadcrumbs-el label="首页" icon="home" to="/"/>
    <q-breadcrumbs-el label="世界首页" icon="sidgets"  to="/story/index"/>
    <q-breadcrumbs-el label="小说首页" icon="sidgets"  to="/story/index"/>
    <q-breadcrumbs-el label="世界列表" icon="navigation" to="/story/order" />
    <q-breadcrumbs-el label="小说列表" icon="navigation" to="/story/order" />
    <q-breadcrumbs-el label="这个是世界名称" icon="navigation"  to="/story/detail"/>
    <q-breadcrumbs-el label="世界小说" icon="navigation"  to="/story/story"/>
    <q-breadcrumbs-el label="这个是小说名称" icon="navigation"  to="/story/detail"/>
    <q-breadcrumbs-el label="章节名称" icon="navigation"  to="/story/chapter"/>
  </q-breadcrumbs>

  <div class="bg-orange text-white">
    <q-toolbar>
      <!--      <q-btn flat round dense icon="menu" class="q-mr-sm" />-->
      <q-toolbar-title>创建推荐</q-toolbar-title>
      <!--      <q-space />-->
      <!--      <q-btn flat round dense icon="search" class="q-mr-xs" />-->
      <!--      <q-btn flat round dense icon="group_add" />-->
    </q-toolbar>
  </div>
  <div style="height: 100%">
    <q-card style="height: 100%">
      <q-card-section>
        <div>
          <q-select v-model="addForm.kind" :options="chargeList" emit-value hint="分类" label="分类"
                    map-options
                    outlined
                   />
        </div>
      </q-card-section>
      <q-card-section>
        <!--        <div class="text-h6">创建章节</div>-->
        <q-input
          v-model="addForm.title"
          :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入标题，长度2-100']"
          filled
          hint="标题"
          label="标题 *"
          lazy-rules
        />
        <q-input
          v-model="addForm.tags"
          :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入标签，长度2-100']"
          filled
          hint="标签"
          label="标签 *"
          lazy-rules
        />
        <q-input
          v-model="addForm.intro"
          :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入简介，长度2-300']"
          filled
          hint="简介"
          label="简介 *"
          lazy-rules
        />
        <editor-text-component :content="addForm.content" @editor="args => addForm.content=args"></editor-text-component>
      </q-card-section>

      <q-separator />
      <q-card-actions >
        <div>
          <q-btn color="primary" label="提交" type="submit" @click="onAddValue"/>
          <q-btn class="q-ml-sm" color="primary" flat label="返回" type="reset"/>
        </div>
      </q-card-actions>
    </q-card>
  </div>
  <div class="q-pa-md">
    <div class="q-pa-md">
      <div class="row no-wrap shadow-1">
        <q-toolbar class="col-8 bg-grey-3">
          <q-btn flat round dense icon="menu" />
          <q-toolbar-title>人气 </q-toolbar-title>
          <q-select v-model="charge" :options="chargeList" emit-value hint="分类" label="分类"
                    map-options
                    outlined
                    @update:modelValue="updateCharge"/>
<!--          <q-input rounded outlined v-model="seach" label="搜索..." />-->
          <q-btn flat round dense icon="search" />
        </q-toolbar>
        <q-toolbar class="col-4 bg-primary text-white">
          <q-space />
          <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
          <q-btn flat round dense icon="more_vert" />
        </q-toolbar>
      </div>
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-list bordered padding class="rounded-borders">
        <q-item v-for="(value,index) in valueList" :key="index" to="/admin/story/info">
          <q-item-section>
            <q-item-label class="one-line-clamp">{{value.title}}({{value.id}})</q-item-label>
            <q-item-label class="three-line-clamp">{{value.intro}}</q-item-label>
            <q-item-label class="one-line-clamp text-weight-thin text-overline">{{value.createTime}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />

      </q-list>
    </div>
  </div>
</template>

<style scoped>

</style>
