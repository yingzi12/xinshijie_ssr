<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { Dialog, useQuasar } from 'quasar';
import { api } from 'boot/axios';
import editorTextComponent from 'components/common/editorTextComponent.vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const route = useRoute(); // 使用 Vue Router 的 useRouter 函数

const wid = ref(route.query.wid);
const wname = ref(route.query.wname);
const sid = ref(route.query.sid);
const sname = ref(route.query.sname);
const source = ref(route.query.source);
const fcid = ref(route.query.fcid);

const $q = useQuasar();
const data = reactive({
  addForm: {
    wid:wid.value,
    sid:sid.value,
    fcid:fcid.value,
    wname:wname.value,
    sname:sname.value,
    source:source.value,
    title:"",
    commitZip:"",
    types:1,
    tags:"",
  }
});
const { addForm } = toRefs(data);
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

async function onSubmit() {

  if(addForm.value.types ==null || addForm.value.types == undefined ){
    Dialog.create({
      title: '错误',
      message: '请选择分类.',
      ok: {
        push: true
      },
    })
    return;
  }
  if(addForm.value.wid == undefined && addForm.value.sid == undefined){
    addForm.value.source=3;
    addForm.value.fcid=1;
  }
  const response = await api.post("/admin/discuss/add", JSON.stringify(addForm.value));
  const data = response.data;
  if (data.code == 200) {
    Dialog.create({
      title: '通知',
      message: '添加成功.',
      ok: {
        push: true
      },
    }).onOk(async () => {
      router.go(-1);
      // router.go(-1)// Redirect to login page
    }).onCancel(async () => {
      router.go(-1)
    });
  } else {
    Dialog.create({
      title: '错误',
      message: data.msg,
      ok: {
        push: true
      },
    })
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
      <q-breadcrumbs-el label="小说首页" icon="widgets"  to="/story/index"/>
      <q-breadcrumbs-el label="世界列表" icon="navigation" to="/world/order" />
      <q-breadcrumbs-el label="小说列表" icon="navigation" to="/story/order" />
      <q-breadcrumbs-el label="创建讨论" icon="navigation"  />
    </q-breadcrumbs>

    <div class="bg-orange text-white">
      <q-toolbar>
        <!--      <q-btn flat round dense icon="menu" class="q-mr-sm" />-->
        <q-toolbar-title>创建讨论</q-toolbar-title>
        <!--      <q-space />-->
        <!--      <q-btn flat round dense icon="search" class="q-mr-xs" />-->
        <!--      <q-btn flat round dense icon="group_add" />-->
      </q-toolbar>
    </div>
    <div style="margin-bottom: 10px;margin-top: 10px">
      你可以在这里发起和回复与世界/元素有关的讨论。指出世界/元素的错误点、缺失，除自由讨论之外选择,都会被管理员处理，使问题快速解决；发布对词条主体的观点、见解，请选择“自由讨论”，以便收获更多互动。请理智、和谐讨论，遵守公园规范。请勿发表过激/不实/不友善言论，不符合规范的内容会被删除。
    </div>
    <div style="margin: 0px;padding: 0px">
      <span style="font-size:15px;">发布主题</span><span style="font-size:10px;">文明上网理性发言，请遵守评论服务协议</span>
    </div>
    <div style="height: 100%">
      <q-form
        class="q-gutter-md"
        @submit="onSubmit"
      >
      <q-card style="height: 100%">
        <q-card-section>
          <div>
            <q-select v-model="addForm.types" :options="chargeList" emit-value hint="分类" label="分类"
                      map-options
                      outlined
            />
          </div>
        </q-card-section>
        <q-card-section>
          <!--        <div class="text-h6">创建章节</div>-->
          <q-input
            v-model="addForm.title"
            :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入主题名称，长度2-100']"
            filled
            hint="输入主题名称"
            label="主题名称 *"
            lazy-rules
          />
        </q-card-section>
        <q-card-section>
          <!--        <div class="text-h6">创建章节</div>-->
          <q-input
            v-model="addForm.tags"
            :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入标签名称，长度2-100']"
            filled
            hint="输入标签，用;分割"
            label="标签 *"
            lazy-rules
          />
        </q-card-section>
        <q-separator />
        <q-card-actions  >
          <editor-text-component :content="addForm.commitZip" @editor="args => addForm.commitZip=args"></editor-text-component>
        </q-card-actions>
        <q-card-actions >
          <div>
            <q-btn color="primary" label="提交" type="submit"/>
            <q-btn class="q-ml-sm" color="primary" flat label="返回" type="reset"/>
          </div>
        </q-card-actions>
      </q-card>
      </q-form>
    </div>

  </q-page>
</template>

<style scoped>

</style>
