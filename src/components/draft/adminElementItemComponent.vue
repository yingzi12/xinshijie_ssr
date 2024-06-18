<script setup lang="ts">

import { getImageUrl } from 'boot/tools';
import { draftElementStatusMap, moduleOptionsMap } from 'boot/consts';


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

</script>

<template>
  <q-item :to="{ path: '/admin/draft/element/detail', query: { wid: props.value.wid, deid: props.value.id }}">
    <q-item-section avatar>
      <q-img
        class="small-head-image"
        :src="getImageUrl(props.value.imageUrls)"
        @error.once="() => { $event.target.src = '/empty.jpg'; }"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label class="one-line-clamp">{{props.value.title}}</q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">{{props.value.wname}}</q-item-label>
<!--      <q-item-label class="one-line-clamp text-weight-thin text-overline">{{props.value.createName}}</q-item-label>-->
      <q-item-label class="one-line-clamp text-weight-thin text-overline">
        <q-chip size="sm">{{ draftElementStatusMap.get(Number(props.value.status)) }}</q-chip>

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
      <q-item-label caption><q-btn icon="delete" label="删除" size="xs"></q-btn></q-item-label>
      <q-item-label caption><q-btn icon="publish" label="发布" size="xs"></q-btn></q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped>

</style>
