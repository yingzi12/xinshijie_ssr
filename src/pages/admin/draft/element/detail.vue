<script setup lang="ts">
import { ref } from 'vue';
import Head from 'components/world/headComponent.vue';

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
const alert=ref(false);
const expanded= ref(true);

</script>

<template>
  <q-page>
<!--    <Head></Head>-->
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="keyboard_return" />
        <q-toolbar-title>元素草稿内容</q-toolbar-title>
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </div>
    <div class="q-ma-md">
      <div class="text-h6 text-center">这是元素名称</div>
      <div class="text-subtitle2 text-center">这是世界名称</div>
      <div class="text-subtitle1 text-center">
        <div class="q-pa-md q-gutter-sm">
          <span class="text-overline">创建者:我是创建人</span>
          <span class="text-overline">创建:2022-11-11 11:23:34</span>
          <span class="text-overline">更新者:我是创建人</span>
          <span class="text-overline">更新时间:2022-11-11 11:23:34</span>
        </div>
      </div>
      <q-card  bordered class="bg-grey-9">
        <q-card-section>
          <div class="text-h6">分类</div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <div class="q-gutter-sm">
            <span class="text-overline">其他</span>
            <span class="text-overline">科技</span>
            <span class="text-overline">魔法</span>
          </div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <div class="text-h6">简介</div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <div class="q-pa-md">
            这里是小说内容
            QLayout允许您将视图配置为3x3矩阵，包含可选的左侧和/或右侧侧滑菜单。 如果尚未安装，请先阅读QLayout文档页面。
          </div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <div class="text-h6">内容</div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <div>
            <q-expansion-item
              v-model="expanded"
              icon="list"
              label="分卷1"
              caption="共11章"
            >
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
            </q-expansion-item>
            <q-expansion-item
              v-model="expanded"
              icon="list"
              label="分卷2"
              caption="共13章"
            >
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
            </q-expansion-item>
          </div>

        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md">
      <q-btn-group spread>
        <q-btn color="purple" label="编辑" icon="edit"  to="/admin/draft/element/edit"/>
        <q-btn color="purple" label="发布" icon="send" @click="alert = true" />
        <q-btn color="purple" label="比对" icon="visibility" />
      </q-btn-group>
    </div>
  </q-page>
</template>

<style scoped>

</style>
