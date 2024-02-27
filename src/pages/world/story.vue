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

      <q-breadcrumbs-el label="Home" icon="home" />
      <q-breadcrumbs-el label="Components" icon="widgets" />
      <q-breadcrumbs-el label="Breadcrumbs" icon="navigation" />
      <q-breadcrumbs-el label="我的故事" icon="navigation" />
      <q-breadcrumbs-el label="小说列表" icon="navigation" />
    </q-breadcrumbs>
    <q-splitter
      v-model="splitterModel"
      unit="px"
    >

      <template v-slot:before>
        <div class="text-h6">排行榜</div>
        <div class="q-pa-md q-gutter-sm">
          <span class="text-overline">全部</span>
          <span class="text-overline">点击</span>
          <span class="text-overline">观看</span>
          <span class="text-overline">全部</span>
          <span class="text-overline">全部</span>
          <span class="text-overline">全部</span>
        </div>
        <q-separator spaced />
        <div class="text-h6">分类</div>
        <div class="q-pa-md q-gutter-sm">
          <q-btn  color="brown" label="全部" size="xs"/>
          <q-btn  color="brown" label="魔法" size="xs"/>
          <q-btn  color="brown" label="科学" size="xs"/>
          <q-btn  color="brown" label="远古" size="xs"/>
          <q-btn  color="brown" label="修真" size="xs"/>
          <q-btn  color="brown" label="仙侠" size="xs"/>
        </div>
        <q-separator spaced />
        <div class="text-h6">标签</div>
        <div class="q-pa-md q-gutter-sm">
          <span class="text-overline">全部</span>
          <span class="text-overline">点击</span>
          <span class="text-overline">观看</span>
          <span class="text-overline">全部</span>
          <span class="text-overline">全部</span>
          <span class="text-overline">全部</span>
        </div>
        <q-separator spaced />
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="row no-wrap shadow-1">
            <q-toolbar class="col-8 bg-grey-3">
              <q-btn flat round dense icon="menu" />
              <q-toolbar-title>我的故事 </q-toolbar-title>
              <q-toolbar-title>小说列表 </q-toolbar-title>
              <q-input rounded outlined v-model="seach" label="搜索..." />
              <q-btn flat round dense icon="search" />
            </q-toolbar>
            <q-toolbar class="col-4 bg-primary text-white">
              <q-space />
              <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
              <q-btn flat round dense icon="more_vert" />
            </q-toolbar>
          </div>
        </div>
        <div class="q-pa-md q-gutter-md">
          <q-list bordered padding class="rounded-borders">
            <q-item v-for="index in 10" :key="index">
              <q-item-section avatar>
                <img src="/150.webp" class="small-head-image">
              </q-item-section>

              <q-item-section>
                <q-item-label class="one-line-clamp">我是超级长的元素标题，我是超级长的元素标题，我是超级长的元素标题</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">创造者：我是超级长的操作者我是超级长的操作者我是超级长的操作者</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">作  家:我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">更新时间：2024-02-11 11-11-12</q-item-label>
                <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-item-label caption>5 min ago</q-item-label>
                <q-icon name="star" color="yellow" />
              </q-item-section>
            </q-item>
            <q-separator spaced />

          </q-list>
          <div class="q-pa-lg flex flex-center">
            <q-pagination
              v-model="current"
              color="purple"
              :max="10"
              :max-pages="6"
              boundary-numbers
            />
          </div>
        </div>

      </template>

    </q-splitter>

  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const splitterModel= ref(200); // start at 150px
const  current= ref(6);
const seach=ref("");
</script>

<style scoped>

</style>
