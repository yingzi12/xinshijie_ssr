<script setup lang="ts">
import { ref } from 'vue';
import Head from 'pages/admin/story/head.vue';

const alert=ref(false);
const expanded= ref(true);
</script>

<template>
<q-page>
  <q-breadcrumbs class="text-brown q-ma-md">
    <template v-slot:separator>
      <q-icon
        size="1.5em"
        name="chevron_right"
        color="primary"
      />
    </template>

    <q-breadcrumbs-el label="首页" icon="home" to="/"/>
    <q-breadcrumbs-el label="世界首页" icon="widgets"  to="/world/index"/>
    <q-breadcrumbs-el label="小说首页" icon="widgets"  to="/story/index"/>
    <q-breadcrumbs-el label="世界列表" icon="navigation" to="/world/order" />
    <q-breadcrumbs-el label="小说列表" icon="navigation" to="/story/order" />
    <q-breadcrumbs-el label="这个是世界名称" icon="navigation"  to="/world/detail"/>
    <q-breadcrumbs-el label="世界小说" icon="navigation"  to="/world/story"/>
    <q-breadcrumbs-el label="这个是小说名称" icon="navigation"  to="/story/detail"/>
    <q-breadcrumbs-el label="这是章节名称" icon="navigation"  to="/chapter/detail"/>
  </q-breadcrumbs>

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
  <q-dialog >

  </q-dialog>
</template>

<style scoped>

</style>
