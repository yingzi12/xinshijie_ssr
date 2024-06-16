<script setup lang="ts">

import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { getImageUrl } from 'boot/tools';
import { draftElementStatusMap, moduleOptionsMap } from 'boot/consts';

const $q = useQuasar();
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
}

const props = defineProps<{ value: Chapter }>();
function handleSee(id:number,wid:number,softtype:number){
  router.push("/element/details?eid="+id+"&wid="+wid+"&temType="+softtype);
}
</script>

<template>
  <q-item  :to="{ path: '/admin/draft/chapter/detail', query: { sid: props.value.sid, dcid: props.value.id }}">
    <q-item-section avatar>
      <q-img
        class="small-head-image"
        :src="getImageUrl(props.value.imageUrls)"
        @error.once="() => { $event.target.src = '/empty.jpg'; }"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label class="one-line-clamp">{{props.value.title}}</q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">{{props.value.sname}}</q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">
        <q-chip size="sm" >{{ draftElementStatusMap.get(Number(props.value.status)) }}</q-chip>
        <q-chip size="sm" >{{props.value.wname }}</q-chip>
        <q-chip size="sm" >{{props.value.pname }}</q-chip>

      </q-item-label>
    </q-item-section>
    <q-item-section side top>
        <q-item-label caption>{{props.value.createTime}}</q-item-label>
        <q-item-label caption><q-btn icon="edit" label="修改" size="xs" :to="{ path: '/admin/draft/chapter/edit', query: { sid: props.value.sid, dcid: props.value.id }}"></q-btn></q-item-label>
        <q-item-label caption><q-btn icon="delete" label="删除" size="xs"></q-btn></q-item-label>
        <q-item-label caption><q-btn icon="publish" label="发布" size="xs"></q-btn></q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped>

</style>
