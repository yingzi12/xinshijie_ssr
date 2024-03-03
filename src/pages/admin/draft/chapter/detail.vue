<script setup lang="ts">
import { ref } from 'vue';
import Head from 'pages/admin/story/head.vue';

const alert=ref(false);
const expanded= ref(true);
</script>

<template>
<q-page>
<!--  <Head></Head>-->
  <div class="row no-wrap shadow-1">
    <q-toolbar class="col-8 bg-grey-3">
      <q-btn flat round dense icon="keyboard_return" />
      <q-toolbar-title>章节草稿内容</q-toolbar-title>
      <q-btn flat round dense icon="search" />
    </q-toolbar>
    <q-toolbar class="col-4 bg-primary text-white">
      <q-space />
      <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
      <q-btn flat round dense icon="more_vert" />
    </q-toolbar>
  </div>

  <div class="q-ma-md">
    <div class="text-h6 text-center">这是章节名称<q-chip size="xs" icon="bookmark">
      编辑
    </q-chip></div>
    <div class="text-subtitle2 text-center">这是小说名称</div>

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
      <q-btn color="purple" label="编辑" icon="edit" to="/admin/draft/chapter/edit"/>
      <q-btn color="purple" label="发布" icon="send" @click="alert = true" />
      <q-btn color="purple" label="比对" icon="visibility" />
    </q-btn-group>
  </div>
</q-page>
</template>

<style scoped>

</style>
