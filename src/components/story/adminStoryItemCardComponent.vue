<script setup lang="ts">
//order的部分
import { Dialog, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import { getImageUrl } from 'boot/tools';
import { api } from 'boot/axios';
import { draftElementStatusMap, storyStatusMap } from 'boot/consts';

const router = useRouter()
const $q = useQuasar();

interface Story {
  imgUrl: string;
  id: string;
  name: string;
  intro: string;
  tags: string;
  updateTime: string;
  userName: string;
  createName: string;
  countDiscuss: string;
  countLike: string;
  countSee: string;
  ranks:number;
  status:number;
  scores:number;
}
const props = defineProps<{ value: Story }>();
const tagList=ref([]);
if(props.value.tags != null){
  tagList.value=props.value.tags.split(";");
}

async function handIssue() {
  const response = await api.get(`/admin/story/issue?sid=${props.value.id}`);
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
  const response = await api.get(`/admin/story/delist?sid=${props.value.id}`);
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
</script>

<template>
  <q-item  >
    <q-item-section avatar>
      <q-img @click=" router.push(`/admin/story/info?sid=${value.id}&sname=${ value.name }`)"
        class="small-head-image"
        :src="getImageUrl(value.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
      />
    </q-item-section>

    <q-item-section @click=" router.push(`/admin/story/info?sid=${value.id}&sname=${ value.name }`)">
      <q-item-label class="one-line-clamp">{{value.name}} <q-badge outline align="middle" color="teal">
        v.{{value.ranks}}
      </q-badge>
      </q-item-label>
      <q-item-label>
        <q-chip size="sm" color="yellow">{{ storyStatusMap.get(Number(props.value.status)) }}</q-chip>
      </q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">{{value.createName ==null ? "未知" :value.createName }}</q-item-label>
      <q-item-label class="three-line-clamp" caption>{{value.intro}}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-item-label  caption><q-btn icon="list" label="目录" size="xs"  @click="router.push(`/admin/story/reel?sid=${value.id}&sname=${value.name}&id=4`)"></q-btn></q-item-label>
      <q-item-label caption><q-btn icon="edit" label="修改" size="xs" :to="{ path:'/admin/story/edit', query: { sid: value.id,sname: value.name  }}"></q-btn></q-item-label>
      <q-item-label   v-if="value.status == 1"  caption><q-btn icon="delete" label="删除" size="xs" @click="handDel"></q-btn></q-item-label>
      <q-item-label  v-if="value.status == 1"   caption><q-btn icon="publish" label="发布" size="xs" @click="handIssue"></q-btn></q-item-label>
      <q-item-label  v-if="value.status == 5"  caption><q-btn icon="unpublished" label="下架" size="xs" @click="handDelist"></q-btn></q-item-label>
    </q-item-section>
  </q-item>

</template>

<style scoped>

</style>
