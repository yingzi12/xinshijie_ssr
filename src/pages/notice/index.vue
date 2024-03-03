<script setup lang="ts">
import { ref } from 'vue';
import Head from 'pages/admin/story/head.vue';

const alert=ref(false);
const expanded= ref(true);
const  current= ref(6);
const seach=ref("");
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
      <q-breadcrumbs-el label="公告列表" icon="widgets"  to="/notice/index"/>
      <q-breadcrumbs-el label="公告" icon="navigation" to="/notice/detail" />
    </q-breadcrumbs>
    <div class="q-pa-md q-gutter-md">
      <q-list bordered padding class="rounded-borders">
        <div v-for="index in 10" :key="index">
          <q-item  to="/admin/chapter/detail">
            <q-item-section side>
              {{(current-1)*10+index}}
            </q-item-section>
            <q-item-section>
              <q-item-label class="one-line-clamp">【公告类型】这是公告名称</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">2011-11-11 11:11:34</q-item-label>
            </q-item-section>
            <!--          <q-item-section side top>-->
            <!--            <q-item-label caption>5 min ago</q-item-label>-->
            <!--            <q-icon name="star" color="yellow" />-->
            <!--          </q-item-section>-->
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

  </q-page>
</template>

<style scoped>

</style>
