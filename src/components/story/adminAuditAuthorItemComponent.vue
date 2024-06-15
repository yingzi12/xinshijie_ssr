<script setup lang="ts">

import { Dialog, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { reactive, ref, toRefs } from 'vue';
import { api } from 'boot/axios';

const $q = useQuasar();
const router = useRouter()

interface Author {
  imageUrls: string;
  id: string;
  wid: string;
  wname: string;
  softtype: string;
  countEdit: string;
  userName: string;
  createName: string;
  updateName: string;
  updateTime:string;
  numberPhotos: string;
  countDiscuss: string;
  countLike: string;
  countSee: string;
  intro:string;
  title:string;
  cnameList:string;
  pageHtml:string;
  status:string;
  tags:string;
  idLabels:string;
}

const props = defineProps<{ value: Author }>();

function imageUrl(imgUrl) {
  return `${$q.config.sourceWeb}${imgUrl}`;
}
const dialog=ref(false);
const data = reactive({
  addForm: {
    auditStatus: "",
    auditContent: "",
    wid:props.value.wid,
    eid:props.value.id,
    wname:props.value.wname,
    title:props.value.title,

  }
});
const { addForm } = toRefs(data);

async function onSubmit() {

  const response = await api.post("/admin/author/audit", JSON.stringify(addForm.value), {
    headers: {
      'Content-Type': 'application/json', },
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
      //刷新页面
      router.go(0);
    }).onCancel(async () => {
      router.go(0);
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
  <q-item :to="{ path: '/element/detail', query: { wid: props.value.wid, eid: props.value.id }}">
    <q-item-section avatar>
      <img :src="imageUrl(props.value.imageUrls)" class="small-head-image">
    </q-item-section>

    <q-item-section side>
      <q-item-label class="one-line-clamp">{{props.value.title}}</q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">{{props.value.createName}}</q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">
        <q-chip
          v-for="(item,index) in props.value.idLabels.split(',')"
          :key="index"
          class="q-ma-xs"
          :label="item.split('$$')[1]"
          size="sm"
          color="red"
          text-color="black"
          square
        />
      </q-item-label>

      <q-item-label class="one-line-clamp text-weight-thin text-overline">更新人：{{props.value.updateName}}</q-item-label>
      <!--      <q-item-label class="one-line-clamp text-weight-thin text-overline">更新时间：{{props.value.updateTime}}</q-item-label>-->
      <q-item-label class="three-line-clamp" caption>{{props.value.intro}}</q-item-label>

    </q-item-section>
    <!--          <q-item-section side top>-->
    <!--            <q-item-label class="one-line-clamp text-weight-thin text-overline">创建人：我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>-->
    <!--            <q-item-label class="one-line-clamp text-weight-thin text-overline">创建时间：2022-11-11 11:11:23</q-item-label>-->
    <!--          </q-item-section>-->
    <q-item-section side top>
      <q-item-label >
        <span class="text-weight-medium">申请理由：</span>
        <span class="text-grey-8"> - {{value.application}}</span>
        <q-separator spaced />
        <span class="text-weight-medium" v-if="value.status==4" >拒绝理由：</span>
        <span class="text-grey-8"  v-if="value.status==4">{{value.auditContent}}</span>
        <div>
          <div class="text-grey-8" v-if="value.status==3 || value.status==4">审核人：{{value.auditName}}</div>
          <div class="text-grey-8" v-if="value.status==3 || value.status==4">审核时间：{{ value.auditTime }}</div>
        </div>
      </q-item-label>

    </q-item-section>
    <q-item-section top side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn class="gt-xs" size="12px" flat dense round icon="delete" label="审核" @click="dialog=true"/>
      </div>
    </q-item-section>
  </q-item>
  <q-dialog v-model="dialog" persistent>
    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
    >
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6" >审核</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-gutter-sm">
          <q-radio v-model="addForm.auditStatus" val="line" label="通过申请" />
          <q-radio v-model="addForm.auditStatus" val="rectangle" label="拒绝审核" />
        </div>
        <q-input dense v-model="addForm.auditContent" autofocus  label="理由说明" />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="取消" v-close-popup />
        <q-btn flat label="确认" v-close-popup />
      </q-card-actions>
    </q-card>
    </q-form>
  </q-dialog>


</template>

<style scoped>

</style>
