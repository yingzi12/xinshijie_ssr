<script setup lang="ts">
import headComponent from 'components/world/headComponent.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const wid = ref(route.query.wid);
const wname = ref(route.query.wname);
const  current= ref(6);
const seach=ref("");
</script>

<template>
  <q-page>
    <head-component :wid="wid" :wname="wname" :types="9"></head-component>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>统计（11）</q-toolbar-title>
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </div>
    <div class="row" style="background-color: orange">
      <q-btn-group outline>
        <q-btn outline color="brown" label="全部状态" />
        <q-btn outline color="brown" label="已发布"/>
        <q-btn outline color="brown" label="待发布" />
      </q-btn-group>
    </div>
    <q-list bordered class="rounded-borders" >
      <q-item-label header>Google Inbox style</q-item-label>

      <q-item v-for="index in 10" :key="index">
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section  top side >
          <q-item-label class="q-mt-sm text-h6">这是评论标题，这是评论标题，这是评论标题，这是评论标题，这是评论标题</q-item-label>
          <q-item-label class="q-mt-sm text-subtitle2">作者：这是作者，这是作者</q-item-label>
          <q-item-label class="q-mt-sm text-subtitle2">创建时间：2024-11-23 11:12:43</q-item-label>
          <q-item-label lines="2">这是一个内容，这是一个内容，这是一个内容，这是一个内容，这是一个内容，这是一个内容，这是一个内容，这是一个内容，这是一个内容，这是一个内容，这是一个内容，这是一个内容</q-item-label>
        </q-item-section>
        <q-item-section top side>
          <q-item-label lines="1">
            <span class="text-weight-medium">回复：</span>
            <span class="text-grey-8">10</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">查看：</span>
            <span class="text-grey-8">1000</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">点赞：</span>
            <span class="text-grey-8">100</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">反对：</span>
            <span class="text-grey-8">1</span>
          </q-item-label>
        </q-item-section>

        <q-item-section top side >
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="lock" />
            <!--            <q-btn class="gt-xs" size="12px" flat dense round icon="done" />-->
            <!--            <q-btn size="12px" flat dense round icon="more_vert" />-->
          </div>
        </q-item-section>
      </q-item>
      <q-separator spaced />
    </q-list>
  </q-page>
</template>

<style scoped>

</style>
