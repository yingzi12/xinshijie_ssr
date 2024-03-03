<script setup lang="ts">
import { ref } from 'vue';
import Head from 'pages/admin/story/head.vue';

const alert=ref(false);
const expanded= ref(true);
</script>

<template>
<q-page>
  <Head></Head>
  <div class="bg-orange text-white">
    <q-toolbar>
      <!--      <q-btn flat round dense icon="menu" class="q-mr-sm" />-->
      <q-toolbar-title>内容</q-toolbar-title>
      <!--      <q-space />-->
      <!--      <q-btn flat round dense icon="search" class="q-mr-xs" />-->
      <!--      <q-btn flat round dense icon="group_add" />-->
    </q-toolbar>
    <q-toolbar inset>

      <q-toolbar-title>
        <q-btn flat round label="这是分卷名称" to="/admin/story/chapter"/>
      </q-toolbar-title>
      <q-space />
      <!--      <q-btn flat round dense icon="add" label="新增章节" to="/admin/chapter/create"/>-->

    </q-toolbar>
  </div>
  <div class="q-ma-md">
    <div class="text-h6 text-center">这是章节名称<q-chip size="xs" icon="bookmark">
      编辑
    </q-chip></div>
    <div class="text-subtitle1 text-center">
      <div class="q-pa-md q-gutter-sm">
        <span class="text-overline">创建者:我是创建人</span>
        <span class="text-overline">创建:2022-11-11 11:23:34</span>
        <span class="text-overline">更新者:我是创建人</span>
        <span class="text-overline">更新时间:2022-11-11 11:23:34</span>
      </div>
    </div>
    <div>

            <pre>
        这里是小说内容
        QLayout允许您将视图配置为3x3矩阵，包含可选的左侧和/或右侧侧滑菜单。 如果尚未安装，请先阅读QLayout文档页面。

        QDrawer是QLayout的侧边栏部分。
        QLayout允许您将视图配置为3x3矩阵，包含可选的左侧和/或右侧侧滑菜单。 如果尚未安装，请先阅读QLayout文档页面。

        QDrawer是QLayout的侧边栏部分。
        QLayout允许您将视图配置为3x3矩阵，包含可选的左侧和/或右侧侧滑菜单。 如果尚未安装，请先阅读QLayout文档页面。

        QDrawer是QLayout的侧边栏部分。
        QLayout允许您将视图配置为3x3矩阵，包含可选的左侧和/或右侧侧滑菜单。 如果尚未安装，请先阅读QLayout文档页面。

        QDrawer是QLayout的侧边栏部分。
      </pre>
    </div>

  </div>
  <div class="q-pa-md">
    <q-btn-group spread>
      <q-btn color="purple" label="上一章" icon="timeline" />
      <q-btn color="purple" label="目录" icon="visibility" @click="alert = true" to="/admin/story/chapter"/>
      <q-btn color="purple" label="下一章" icon="visibility" />

    </q-btn-group>
  </div>
</q-page>
</template>

<style scoped>

</style>
