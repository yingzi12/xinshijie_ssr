<script setup lang="ts">
import { ref } from 'vue';

const  tab= ref('mails');
const  tabClasses= ref('world');

const  current= ref(6);
</script>

<template>
<q-page>
  <q-toolbar class="bg-purple text-white">
    <q-toolbar-title>
      点击排行榜
    </q-toolbar-title>
    <q-btn flat round dense icon="apps" class="q-mr-xs" />
    <q-btn flat round dense icon="more_vert" />
  </q-toolbar>
  <div>
    <q-tabs
      v-model="tabClasses"
      no-caps
      align="left"
      outside-arrows
      mobile-arrows
      class="bg-orange text-white shadow-2"
    >
      <q-tab name="world" label="世界" />
      <q-tab name="story" label="故事" />
    </q-tabs>
    <q-tabs
      v-model="tab"
      no-caps
      align="left"
      outside-arrows
      mobile-arrows
      class="bg-orange text-white shadow-2"
    >
      <q-tab name="mails" label="周" />
      <q-tab name="alarms" label="月" />
      <q-tab name="movies" label="总" />
    </q-tabs>
    <div class="row" style="background-color: orange">

      <q-btn-group  v-if="tabClasses == 'world'" outline>
        <q-btn outline color="brown" label="全部分类" />
        <q-btn outline color="brown" label="魔法"/>
        <q-btn outline color="brown" label="科学" />
        <q-btn outline color="brown" label="远古" />
        <q-btn outline color="brown" label="修真" />
        <q-btn outline color="brown" label="仙侠" />
        <q-btn outline color="brown" label="其他" />
      </q-btn-group>
      <q-btn-group  v-if="tabClasses == 'story'" outline>
        <q-btn outline color="brown" label="全部分类" />
        <q-btn outline color="brown" label="魔法"/>
        <q-btn outline color="brown" label="科学" />
        <q-btn outline color="brown" label="远古" />
        <q-btn outline color="brown" label="修真" />
        <q-btn outline color="brown" label="历史" />
      </q-btn-group>
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-list bordered padding class="rounded-borders">
        <div v-for="index in 10" :key="index">
        <q-item :to=" tabClasses =='world' ?`/world/detail`:`/story/detail`">
          <q-item-section avatar>
            <img src="/150.webp" class="small-head-image">
          </q-item-section>

          <q-item-section>
            <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
            <q-item-label class="q-mb-xs text-red">这是世界名称</q-item-label>
            <q-item-label class="q-mb-xs text-blue">连载 · 签约 · VIP · 轻小说 · 衍生同人 · 轻小说</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
            <q-item-label class="two-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow" />
          </q-item-section>
        </q-item>
        <q-separator spaced />
        </div>
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

  </div>

</q-page>
</template>

<style scoped>

</style>
