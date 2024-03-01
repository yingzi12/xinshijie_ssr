<script setup lang="ts">

import Head from 'pages/admin/chapter/head.vue';
</script>

<template>
  <q-page>
    <Head></Head>
  <q-toolbar class="bg-purple text-white">
    <q-btn flat round dense icon="assignment_ind" />
    <q-toolbar-title>
      这是小说名称
    </q-toolbar-title>
    <q-btn flat round dense icon="apps" class="q-mr-xs" />
    <q-btn flat round dense icon="more_vert" />
  </q-toolbar>
  <q-separator dark inset />
  <div class="q-pa-md q-gutter-sm">
    <q-btn class="text-subtitle1" to="/admin/story/info">简介</q-btn>
    <q-btn class="text-subtitle1" to="/admin/story/author">作者</q-btn>
    <q-btn class="text-subtitle1" to="/admin/story/auditAuthor">作者审核</q-btn>
    <q-btn class="text-subtitle1" to="/admin/story/reel">分卷/目录</q-btn>
    <q-btn class="text-subtitle1" to="/admin/story/auditChapter">章节审核</q-btn>
    <q-btn class="text-subtitle1" to="/admin/story/discuss">评论</q-btn>
    <q-btn class="text-subtitle1" to="/admin/story/commit">讨论</q-btn>
  </div>
  </q-page>

</template>

<style scoped>

</style>
