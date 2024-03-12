<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数

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
function  toEdit(){
  router.push('/element/edit'); // Redirect to login page
}
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
      <q-breadcrumbs-el label="世界列表" icon="navigation" to="/world/order" />
      <q-breadcrumbs-el label="我的世界" icon="navigation"  to="/world/detail"/>
      <q-breadcrumbs-el label="元素列表" icon="navigation"  to="/world/element"/>
      <q-breadcrumbs-el label="这是元素名称" icon="navigation"  to="/element/detail"/>

    </q-breadcrumbs>
    <div class="q-ma-md">
      <div class="text-h6 text-center">这是元素名称<q-chip size="xs" icon="bookmark" @click="toEdit()">
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
      <q-card dark bordered class="bg-grey-9">
        <q-card-section>
          <div class="text-h6">分类</div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <div class="q-pa-md q-gutter-sm">
            <span class="text-overline">分类：</span>
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
        <q-btn color="purple" label="上一章" icon="timeline" />
        <q-btn color="purple" label="元素列表" icon="visibility" @click="alert = true"/>
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
