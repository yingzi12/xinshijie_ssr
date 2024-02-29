<script setup lang="ts">

</script>

<template>
  <q-toolbar class="bg-purple text-white">
    <q-btn flat round dense icon="assignment_ind" />
    <q-toolbar-title>
      这是世界名称
    </q-toolbar-title>
    <q-btn flat round dense icon="apps" class="q-mr-xs" />
    <q-btn flat round dense icon="more_vert" />
  </q-toolbar>
  <q-separator dark inset />
  <div class="q-pa-md q-gutter-sm">
    <q-btn class="text-subtitle1" to="/admin/world/info">简介</q-btn>
    <q-btn class="text-subtitle1" to="/admin/world/manage">造物主</q-btn>
    <q-btn class="text-subtitle1" to="/admin/world/auditManage">创造者审核</q-btn>
    <q-btn class="text-subtitle1" to="/admin/world/element">元素</q-btn>
    <q-btn class="text-subtitle1" to="/admin/world/auditElement">元素审核</q-btn>
    <q-btn class="text-subtitle1" to="/admin/world/category">分类</q-btn>
    <q-btn class="text-subtitle1" to="/admin/world/story">故事</q-btn>
<!--    <q-btn class="text-subtitle1" to="/admin/world/auditStory">故事审核</q-btn>-->
    <q-btn class="text-subtitle1" to="/admin/world/redident">居民</q-btn>
    <q-btn class="text-subtitle1" to="/admin/world/discuss">评论</q-btn>
    <q-btn class="text-subtitle1" to="/admin/world/commit">讨论</q-btn>
  </div>
</template>

<style scoped>

</style>
