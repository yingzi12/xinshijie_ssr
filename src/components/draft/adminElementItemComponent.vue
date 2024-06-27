<script setup lang="ts">

import { getImageUrl } from 'boot/tools';
import { draftElementStatusMap, moduleOptionsMap } from 'boot/consts';
import { api } from 'boot/axios';
import { Dialog } from 'quasar';
import { useRouter } from 'vue-router';
const router = useRouter()

interface Element {
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

const props = defineProps<{ value: Element }>();
async function handIssue() {
  const response = await api.get(`/admin/draftElement/issue?wid=${props.value.wid}&deid=${props.value.id}`);
  const data=response.data;
  if (data.code == 200) {
    //提示发布成功
    Dialog.create({
      title: '发布成功',
      message: '世界发布成功',
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
  const response = await api.get(`/admin/draftElement/delist?wid=${props.value.wid}&deid=${props.value.id}`);
  const data=response.data;
  if (data.code == 200) {
    //提示发布成功
    Dialog.create({
      title: '下架成功',
      message: '下架成功',
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

async function handDel() {
  //增加删除前的弹出确定，只有确定之后才删除
  Dialog.create({
    title: '删除',
    message: '确定删除该世界吗？',
    ok: {
      label: '确定',
      color: 'primary'
    },
    cancel: {
      label: '取消',
      color: 'primary'
    }
  }).onOk(() => {
    handDelOption();
  });

}
async function  handDelOption() {
  const response = await api.get(`/admin/draftElement/delById?wid=${props.value.wid}&deid=${props.value.id}`);
  const data=response.data;
  if (data.code == 200) {
    router.go(0);
    //提示发布成功
    Dialog.create({
      title: '信息',
      message: '删除成功',
      ok: {
        label: '确定',
        color: 'primary'
      }
    })
  }else{
    Dialog.create({
      title: '删除失败',
      message: `${data.msg}`,
      ok: {
        label: '确定',
        color: 'primary'
      }
    })
  }
}

</script>

<template>
  <q-item >
    <q-item-section avatar>
      <q-img @click="router.push(`/admin/draft/element/detail?wid=${props.value.wid}&deid=${props.value.id}`)"
        class="small-head-image"
        :src="getImageUrl(props.value.imageUrls)"
        @error.once="() => { $event.target.src = '/empty.jpg'; }"
      />
    </q-item-section>

    <q-item-section @click="router.push(`/admin/draft/element/detail?wid=${props.value.wid}&deid=${props.value.id}`)">
      <q-item-label class="one-line-clamp">{{props.value.title}}</q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">{{props.value.wname}}</q-item-label>
<!--      <q-item-label class="one-line-clamp text-weight-thin text-overline">{{props.value.createName}}</q-item-label>-->
      <q-item-label class="one-line-clamp text-weight-thin text-overline">
        <q-chip size="sm" color="yellow">{{ draftElementStatusMap.get(Number(props.value.status)) }}</q-chip>

        <q-chip size="sm">{{ moduleOptionsMap.get(Number(props.value.softtype)) }}</q-chip>
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

<!--      <q-item-label class="one-line-clamp text-weight-thin text-overline">更新人：{{props.value.updateName}}</q-item-label>-->
      <q-item-label class="three-line-clamp" caption>{{props.value.intro}}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-item-label caption>{{props.value.updateTime}}</q-item-label>
      <q-item-label caption><q-btn icon="edit" label="修改" size="xs" :to="{ path: '/admin/draft/element/edit', query: { wid: props.value.wid, deid: props.value.id }}"></q-btn></q-item-label>
      <q-item-label   v-if="value.status == 7"  caption><q-btn icon="delete" label="删除" size="xs" @click="handDel"></q-btn></q-item-label>
      <q-item-label  v-if="value.status == 7"   caption><q-btn icon="publish" label="发布" size="xs" @click="handIssue"></q-btn></q-item-label>
      <q-item-label  v-if="value.status == 1"  caption><q-btn icon="unpublished" label="下架" size="xs" @click="handDelist"></q-btn></q-item-label>

    </q-item-section>
  </q-item>
</template>

<style scoped>

</style>
