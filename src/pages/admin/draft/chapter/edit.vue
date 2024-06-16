<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from 'boot/axios';
import { Dialog } from 'quasar';

const route = useRoute(); // 使用 Vue Router 的 useRouter 函数
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const imgUrl = ref(null);
const sid = ref(route.query.sid);
const sname = ref(route.query.sname);

const dcid = ref(route.query.dcid);
const id = ref(route.query.id);

const data = reactive({
  addForm: {
    sid:sid.value,
    id:dcid.value,
    level:1,
    isEdit:1,
    isPrivate:1,
    title:"",
    contentZip:"",
    isNew:1,
  }
});
const { addForm } = toRefs(data);
const previewImage = ref("/favicon.ico");
const selectedImage = ref<File | null>(null);

async function handValue() {
  const response = await api.get(`/admin/draftChapter/getInfo?dcid=${dcid.value}&sid=${sid.value}`);
  const data=response.data;
  if (data.code == 200) {
    addForm.value=data.data;
  }
}
handValue();
async function onSubmit() {
  const response = await api.post("/admin/draftChapter/edit", JSON.stringify(addForm.value), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = response.data;
  if (data.code == 200) {
    Dialog.create({
      title: '通知',
      message: '修改成功.',
      ok: {
        push: true
      },
    }).onOk(async () => {
      router.go(-1)// Redirect to login page
    }).onCancel(async () => {
      router.go(-1)// Redirect to login page
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
  <div class="row no-wrap shadow-1">
    <q-toolbar class="col-8 bg-grey-3">
      <q-btn flat round dense icon="keyboard_return" />
      <q-toolbar-title>返回草稿详细</q-toolbar-title>
      <q-btn flat round dense icon="search" />
    </q-toolbar>
    <q-toolbar class="col-4 bg-primary text-white">
      <q-space />
      <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
      <q-btn flat round dense icon="more_vert" />
    </q-toolbar>
  </div>

  <div class="bg-orange text-white">
    <q-toolbar>
<!--      <q-btn flat round dense icon="menu" class="q-mr-sm" />-->
      <q-toolbar-title>编辑章节</q-toolbar-title>
<!--      <q-space />-->
<!--      <q-btn flat round dense icon="search" class="q-mr-xs" />-->
<!--      <q-btn flat round dense icon="group_add" />-->
    </q-toolbar>
    <q-toolbar inset>

      <q-toolbar-title>
        <q-btn flat round label="这是分卷名称" to="/admin/story/chapter"/>
      </q-toolbar-title>
      <q-space />
<!--      <q-btn flat round dense icon="add" label="新增章节" to="/admin/chapter/create"/>-->

    </q-toolbar>
  </div>

  <div style="height: 100%">
    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
    >
      <q-card style="height: 100%">
        <q-card-section>
          <!--        <div class="text-h6">创建章节</div>-->
          <q-input
            v-model="addForm.title"
            :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入章节名称，长度2-100']"
            filled
            hint="输入章节名称"
            label="章节名称 *"
            lazy-rules
          />
        </q-card-section>

        <q-separator />
        <div class="q-gutter-sm">
          <q-radio v-model="addForm.isEdit" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="1" label="允许公开编辑" />
          <q-radio v-model="addForm.isEdit" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="2" label="禁止公开编辑" />
        </div>
        <div class="q-gutter-sm">
          <q-radio v-model="addForm.isPrivate" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="2" label="允许公开阅读" />
          <q-radio v-model="addForm.isPrivate" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="1" label="禁止公开阅读" />
        </div>
        <q-separator />

        <q-card-actions  >
          <q-editor v-model="addForm.contentZip" style="width: 100%" />

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
