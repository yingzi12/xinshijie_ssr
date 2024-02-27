<script setup lang="ts">
import { ref } from 'vue';

const fabPos = ref([ 18, 18 ]);
const draggingFab = ref(false);

function onClick () {
  // console.log('Clicked on a fab action')
};

function moveFab (ev) {
  draggingFab.value = ev.isFirst !== true && ev.isFinal !== true

  fabPos.value = [
    fabPos.value[ 0 ] - ev.delta.x,
    fabPos.value[ 1 ] - ev.delta.y
  ]
};
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <q-toolbar class="bg-primary text-white">
        <q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar>

        <q-toolbar-title>新世界</q-toolbar-title>

        <q-btn flat round dense icon="whatshot" />
      </q-toolbar>
    </div>
    <q-breadcrumbs class="text-brown q-ma-md">
      <template v-slot:separator>
        <q-icon
          size="1.5em"
          name="chevron_right"
          color="primary"
        />
      </template>

      <q-breadcrumbs-el label="Home" icon="home" />
      <q-breadcrumbs-el label="Components" icon="widgets" />
      <q-breadcrumbs-el label="Breadcrumbs" icon="navigation" />
      <q-breadcrumbs-el label="这是小说名称" icon="navigation" />
    </q-breadcrumbs>
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
    <div class="q-pa-md">
      <q-btn-group spread>
        <q-btn color="purple" label="上一章" icon="timeline" />
        <q-btn color="purple" label="目录" icon="visibility" />
        <q-btn color="purple" label="下一章" icon="visibility" />

      </q-btn-group>
    </div>
    <q-page-sticky position="bottom-right" :offset="fabPos">
      <q-fab
        icon="add"
        direction="up"
        color="accent"
        :disable="draggingFab"
        v-touch-pan.prevent.mouse="moveFab"
      >
        <q-fab-action @click="onClick" color="primary" icon="person_add" :disable="draggingFab" />
        <q-fab-action @click="onClick" color="primary" icon="mail" :disable="draggingFab" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<style scoped>

</style>
