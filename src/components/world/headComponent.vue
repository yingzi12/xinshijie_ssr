<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  wid:  {
    type: String,
    required: true // 确保wid是必需的，避免数据为空的问题
  },
  wname:  {
    type: String,
    required: true // 确保wid是必需的，避免数据为空的问题
  },
  types: {
    type: Number,
    default: 1
  }
});

</script>

<template>
  <q-toolbar class="bg-purple text-white">
    <q-btn flat round dense icon="assignment_ind" />
    <q-toolbar-title>
      {{ props.wname }}
    </q-toolbar-title>
    <q-btn flat round dense icon="apps" class="q-mr-xs" />
    <q-btn flat round dense icon="more_vert" />
  </q-toolbar>
  <q-separator dark inset />
  <div class="q-pa-md q-gutter-sm ">
    <q-btn class="text-black" :color="props.types==1?'orange':'yellow'"    :to="{ path: '/admin/world/info', query: { wid: props.wid,wname:props.wname }}">简介</q-btn>
    <q-btn class="text-black"  :color="props.types==2?'orange':'yellow'"   :to="{ path: '/admin/world/manage', query: { wid:props.wid,wname:props.wname }}">造物主</q-btn>
    <q-btn  class="text-black" :color="props.types==3?'orange':'yellow'"   :to="{ path: '/admin/world/auditManage', query: { wid:props.wid,wname:props.wname }}">创造者审核</q-btn>
    <q-btn class="text-black"  :color="props.types==4?'orange':'yellow'"   :to="{ path: '/admin/world/element', query: { wid:props.wid,wname:props.wname }}">元素</q-btn>
    <q-btn class="text-black"  :color="props.types==5?'orange':'yellow'"   :to="{ path: '/admin/world/auditElement', query: { wid:props.wid,wname:props.wname }}">元素审核</q-btn>
    <q-btn  class="text-black" :color="props.types==6?'orange':'yellow'"   :to="{ path: '/admin/world/category', query: { wid:props.wid,wname:props.wname }}">分类</q-btn>
    <q-btn class="text-black"  :color="props.types==7?'orange':'yellow'"   :to="{ path: '/admin/world/story', query: { wid:props.wid,wname:props.wname }}">故事</q-btn>
<!--    <q-btn class="text-black"  :color="props.types==8?'orange':'yellow'"   :to="{ path: '/admin/world/redident', query: { wid:props.wid,wname:props.wname }}">居民</q-btn>-->
    <q-btn class="text-black"  :color="props.types==9?'orange':'yellow'"   :to="{ path: '/admin/world/comment', query: { wid:props.wid,wname:props.wname }}">评论</q-btn>
    <q-btn class="text-black"  :color="props.types==10?'orange':'yellow'"  :to="{ path: '/admin/world/discuss', query: { wid:props.wid,wname:props.wname }}">讨论</q-btn>
  </div>
</template>

<style scoped>

</style>
