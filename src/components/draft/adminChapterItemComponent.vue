<script setup lang="ts">
import { getImageUrl } from 'boot/tools';
import { draftChapterStatusMap, draftElementStatusMap } from 'boot/consts';
import { api } from 'boot/axios';
import { Dialog } from 'quasar';
import { useRouter } from 'vue-router';
import { reactive, toRefs } from 'vue';

const router = useRouter()

interface Chapter {
  imageUrls: string;
  id: string;
  wid: string;
  wname: string;
  sid: string;
  sname: string;
  pid: string;
  pname: string;
  countEdit: string;
  userName: string;
  createName: string;
  updateName: string;
  updateTime:string;
  countDiscuss: string;
  countLike: string;
  countSee: string;
  createTime:string;
  title:string;
  pageHtml:string;
  status:string;
  tags:string;
  serialNumber:string;
}

const props = defineProps<{ value: Chapter }>();

async function handIssue() {
  const response = await api.get(`/admin/draftChapter/issue?sid=${props.value.sid}&dcid=${props.value.id}`);
  const data=response.data;
  if (data.code == 200) {
    //提示发布成功
    Dialog.create({
      title: '发布成功',
      message: '发布成功',
      ok: {
        label: '确定',
        color: 'primary'
      }
    })
  }else{
    Dialog.create({
      title: '发布失败',
      message: `${data.msg}`,
      ok: {
        label: '确定',
        color: 'primary'
      }
    })
  }
}

async function handDelist() {
  const response = await api.get(`/admin/draftChapter/delist??sid=${props.value.sid}&dcid=${props.value.id}`);
  const data=response.data;
  if (data.code == 200) {
    //提示发布成功
    Dialog.create({
      title: '下架成功',
      message: '世界下架成功',
      ok: {
        label: '确定',
        color: 'primary'
      }
    })
  }else{
    Dialog.create({
      title: '下架失败',
      message: `${data.msg}`,
      ok: {
        label: '确定',
        color: 'primary'
      }
    })
  }
}
const addData = reactive({
  editForm: {
    sid:0,
    pid:0,
    level:0,
    isEdit:1,
    isPrivate:1,
    title:"",
    contentZip:"",
    isNew:1,
    serialNumber:props.value.serialNumber,
  }
});
const { editForm} = toRefs(addData);

async function onSerialNumber(value) {
  editForm.value=value;
  const response = await api.post("/admin/chapter/updateSerialNumber", JSON.stringify(editForm.value), {
    headers: {
      'Content-Type': 'application/json',
    },
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
      router.go(0)// Redirect to login page
    }).onCancel(async () => {
      router.go(0)// Redirect to login page
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
  <q-item  >
    <q-item-section avatar>
      <q-img @click="router.push(`/admin/draft/chapter/detail?sid=${props.value.sid}&dcid=${props.value.id}`)"
        class="small-head-image"
        :src="getImageUrl(props.value.imageUrls)"
        @error.once="() => { $event.target.src = '/empty.jpg'; }"
      />
    </q-item-section>

    <q-item-section @click="router.push(`/admin/draft/chapter/detail?sid=${props.value.sid}&dcid=${props.value.id}`)">
      <q-item-label class="one-line-clamp">{{props.value.title}}</q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">{{props.value.sname}}</q-item-label>
      <q-item-label lines="1">

        <div class="text-weight-bold text-primary"><span class="text-weight-medium">序号：</span>
          <span class="text-grey-8">{{props.value.serialNumber}}</span>
          <q-popup-edit v-model="serialNumber" auto-save>
            <q-input v-model="serialNumber" dense autofocus counter @keyup.enter="onSerialNumber" />
          </q-popup-edit>
        </div>
      </q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">
        <q-chip size="sm" color="yellow">{{ draftChapterStatusMap.get(Number(props.value.status)) }}</q-chip>
        <q-chip size="sm" >{{props.value.wname }}</q-chip>
        <q-chip size="sm" >{{props.value.pname }}</q-chip>

      </q-item-label>
    </q-item-section>
    <q-item-section side top>
        <q-item-label caption>{{props.value.createTime}}</q-item-label>
        <q-item-label caption><q-btn icon="edit" label="修改" size="xs" :to="{ path: '/admin/draft/chapter/edit', query: { sid: props.value.sid, dcid: props.value.id }}"></q-btn></q-item-label>
      <q-item-label   v-if="value.status == 7"  caption><q-btn icon="delete" label="删除" size="xs"></q-btn></q-item-label>
      <q-item-label  v-if="value.status == 7"   caption><q-btn icon="publish" label="发布" size="xs" @click="handIssue"></q-btn></q-item-label>
          <q-item-label  v-if="value.status == 1"  caption><q-btn icon="unpublished" label="下架" size="xs" @click="handDelist"></q-btn></q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped>

</style>
