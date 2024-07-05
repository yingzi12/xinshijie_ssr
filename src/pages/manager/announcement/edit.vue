<script setup lang="ts">
import { api, tansParams } from 'boot/axios';
import { reactive, ref, toRefs } from 'vue';
import { Dialog } from 'quasar';
import editorTextComponent from 'components/common/editorTextComponent.vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const id = ref(route.query.id);

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
    id:0,
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
  const response = await api.post("/wiki/announcement/edit", JSON.stringify(addForm.value),{
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


async function onDetail() {
  const response = await api.get(`/wiki/announcement/getInfo/${id.value}`,{
    headers: {
      'Content-Type': 'application/json',},
  });
  const data = response.data;
  if (data.code == 200) {
    addForm.value=data.data;
    console.log(addForm.value.content)
  }
}
onDetail();
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
        <editor-text-component :key="addForm.id" :content="addForm.content" @editor="args => addForm.content=args"></editor-text-component>
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
</template>

<style scoped>

</style>
