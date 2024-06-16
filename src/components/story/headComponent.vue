<script setup lang="ts">
import { defineProps, reactive } from 'vue';
import {  useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
  sid:  {
    type: String,
    required: true // 确保wid是必需的，避免数据为空的问题
  },
  sname:  {
    type: String,
    required: true // 确保wid是必需的，避免数据为空的问题
  },
  id: {
    type: Number,
    default: 1
  }
});
const  headList= reactive([
  {id:1, value:"简介",to:"/admin/story/info"},
  {id:2, value:"作者" ,to:"/admin/story/author"},
  {id:3, value:"作者审核" ,to:"/admin/story/auditAuthor"},
  {id:4, value:"分卷/目录" ,to:"/admin/story/reel"},
  {id:5, value:"章节审核" ,to:"/admin/story/auditChapter"},
  {id:6, value:"评论" ,to:"/admin/story/comment"},
  {id:7, value:"讨论" ,to:"/admin/story/discuss"}
]);

</script>

<template>
  <q-toolbar class="bg-purple text-white">
    <q-btn flat round dense icon="assignment_ind" />
    <q-toolbar-title>
      {{ sname }}
    </q-toolbar-title>
    <q-btn flat round dense icon="apps" class="q-mr-xs" />
    <q-btn flat round dense icon="more_vert" />
  </q-toolbar>
  <q-separator dark inset />
  <div class="q-pa-md q-gutter-sm">
    <q-btn clickable v-for="(item, index) in headList" :key="index" :color=" props.id == item.id ?'yellow':'orange'" class="text-subtitle1" @click="router.push(`${item.to}?sid=${props.sid}&sname=${props.sname}&id=${item.id}`)">{{item.value}}</q-btn>

  </div>
</template>

<style scoped>

</style>
