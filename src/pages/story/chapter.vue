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
const alert=ref(false);
const expanded= ref(true);
function edit(){
  console.log("编辑")
}
</script>

<template>
  <q-page>
<!--    <div class="q-pa-md">-->
<!--      <q-toolbar class="bg-primary text-white">-->
<!--        <q-btn flat round dense icon="menu" class="q-mr-sm" />-->
<!--        <q-avatar>-->
<!--          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">-->
<!--        </q-avatar>-->

<!--        <q-toolbar-title>新世界</q-toolbar-title>-->

<!--        <q-btn flat round dense icon="whatshot" />-->
<!--      </q-toolbar>-->
<!--    </div>-->
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
      <q-breadcrumbs-el label="章节名称" icon="navigation"  to="/story/chapter"/>
    </q-breadcrumbs>

    <div class="q-ma-md">
      <div class="text-h6 text-center">这是章节名称
        <q-badge transparent align="middle" color="orange" @click="edit">
          编辑
<!--          <q-btn flat color="white" label="编辑" size="xs"/>-->
        </q-badge>
      </div>
      <div class="text-subtitle1 text-center">
        <div class="q-pa-md q-gutter-sm">
          <span class="text-overline">创建:2022-11-11 11:23:34</span>
          <span class="text-overline">创建者:我是创建人</span>
          <span class="text-overline">更新者:我是创建人</span>
          <span class="text-overline">更新时间:2022-11-11 11:23:34</span>
        </div>
      </div>
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
        <q-btn color="purple" label="目录" icon="visibility" @click="alert = true"/>
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
  <q-dialog v-model="alert">
    <q-card flat bordered style="width: 900px" >
      <!--      <q-card-section>-->
      <!--        <div class="text-h6">Terms of Agreement</div>-->
      <!--      </q-card-section>-->


      <q-card-section class="row items-center q-pb-none ">
        <div class="text-h6">目录</div>
        <div class="text-subtitle1">共119章</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator inset />

      <q-card-section style="max-height: 50vh" class="scroll">
        <div>
          <q-expansion-item
            v-model="expanded"
            icon="list"
            label="分卷1"
            caption="共11章"
          >
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col-6" v-for="index in 22" :key="index">
                    <div class="q-ma-xs one-line-clamp">
                      <a href="https://we" class="background text-overline">QLayout允许您将视图配置为3x3矩阵，包含可选的左侧和/或右侧侧滑菜单。 如果尚未安装，请先阅读QLayout文档页面 </a>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item
            v-model="expanded"
            icon="list"
            label="分卷2"
            caption="共13章"
          >
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col-6" v-for="index in 22" :key="index">
                    <div class="q-ma-xs one-line-clamp">
                      <a href="https://we" class="background text-overline">QLayout允许您将视图配置为3x3矩阵，包含可选的左侧和/或右侧侧滑菜单。 如果尚未安装，请先阅读QLayout文档页面 </a>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </q-card-section>

      <q-separator />

    </q-card>
  </q-dialog>

</template>

<style scoped>

</style>
