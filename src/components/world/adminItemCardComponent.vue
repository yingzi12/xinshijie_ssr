<script setup lang="ts">
//order的部分
import { Dialog, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import { getImageUrl } from 'boot/tools';
import { api } from 'boot/axios';
import { worldStatusMap } from 'boot/consts';

const router = useRouter()
const $q = useQuasar();

interface World {
  imgUrl: string;
  id: string;
  name: string;
  intro: string;
  tags: string;
  updateTime: string;
  userName: string;
  createName: string;
  numberPhotos: string;
  countDiscuss: string;
  countLike: string;
  countSee: string;
  ranks:number;
  status:number;
  scores:number;
}
const props = defineProps<{ value: World }>();
const tagList=ref([]);
if(props.value.tags != null){
  tagList.value=props.value.tags.split(";");
}
async function handIssue() {
  const response = await api.get(`/admin/world/issue?wid=${props.value.id}`);
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
  const response = await api.get(`/admin/world/delist?wid=${props.value.id}`);
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


</script>

<template>
  <q-item >
    <q-item-section avatar>
      <q-img @click=" router.push(`/admin/world/info?wid=${value.id}&wname=${ value.name }`)"
        class="small-head-image"
        :src="getImageUrl(value.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
      />
    </q-item-section>

    <q-item-section @click=" router.push(`/admin/world/info?wid=${value.id}&wname=${ value.name }`)">
      <q-item-label class="one-line-clamp">{{value.name}} <q-badge outline align="middle" color="teal">
        v.{{value.ranks}}
      </q-badge>
      </q-item-label>
      <q-item-label>
        <q-chip size="sm" color="yellow">{{ worldStatusMap.get(Number(props.value.status)) }}</q-chip>
      </q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">{{value.createName ==null ? "未知" :value.createName }}</q-item-label>
      <q-item-label class="three-line-clamp" caption>{{value.intro}}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-item-label caption><q-btn icon="edit" label="修改" size="xs" :to="{ path:'/admin/world/edit', query: { wid: value.id,wname: value.name  }}"></q-btn></q-item-label>
      <q-item-label   v-if="value.status == 1"  caption><q-btn icon="delete" label="删除" size="xs"></q-btn></q-item-label>
      <q-item-label  v-if="value.status == 1"   caption><q-btn icon="publish" label="发布" size="xs" @click="handIssue"></q-btn></q-item-label>
      <q-item-label  v-if="value.status == 5"  caption><q-btn icon="unpublished" label="下架" size="xs" @click="handDelist"></q-btn></q-item-label>
    </q-item-section>
  </q-item>

</template>

<style scoped>

</style>
