<script setup lang="ts">
import headComponent from 'components/world/headComponent.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const  current= ref(6);
const seach=ref("");
const route = useRoute();
const wid = ref(route.query.wid);
const wname = ref(route.query.wname);
</script>

<template>
  <q-page>
    <head-component :wid="wid" :wname="wname" :types="8"></head-component>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
<!--        <q-btn flat round dense icon="menu" />-->
        <q-toolbar-title>统计（11）</q-toolbar-title>
<!--        <q-btn flat round dense icon="search" />-->
      </q-toolbar>
<!--      <q-toolbar class="col-4 bg-primary text-white">-->
<!--        <q-space />-->
<!--        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />-->
<!--        <q-btn flat round dense icon="more_vert" />-->
<!--      </q-toolbar>-->
    </div>

<!--    <div class="row" style="background-color: orange">-->
<!--      <q-btn-group outline>-->
<!--        <q-btn outline color="brown" label="全部状态" />-->
<!--        <q-btn outline color="brown" label="已发布"/>-->
<!--        <q-btn outline color="brown" label="待发布" />-->
<!--      </q-btn-group>-->
<!--    </div>-->
<!--    <div class="row" style="background-color: orange">-->
<!--      <q-btn-group outline>-->
<!--        <q-btn outline color="brown" label="全部分类" />-->
<!--        <q-btn outline color="brown" label="魔法"/>-->
<!--        <q-btn outline color="brown" label="科学" />-->
<!--        <q-btn outline color="brown" label="远古" />-->
<!--        <q-btn outline color="brown" label="修真" />-->
<!--        <q-btn outline color="brown" label="历史" />-->
<!--      </q-btn-group>-->
<!--    </div>-->
    <q-list bordered class="rounded-borders" >
      <q-item-label header>Google Inbox style</q-item-label>

      <q-item v-for="index in 10" :key="index">
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section  top side >
          <q-item-label class="q-mt-sm">这是用户名<q-badge color="primary">v1.0.0+</q-badge></q-item-label>
          <q-item-label lines="1">这是一个签名，这是一个签名，这是一个签名，这是一个签名，这是一个签名</q-item-label>
        </q-item-section>

        <q-item-section top class="col-1 gt-sm">
          <q-item-label lines="1">
            <span class="text-weight-medium">经验：</span>
            <span class="text-grey-8">1000</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">元素：</span>
            <span class="text-grey-8">100</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">故事：</span>
            <span class="text-grey-8">1</span>
          </q-item-label>
        </q-item-section>
        <q-item-section top class="col-1 gt-sm">
          <q-item-label lines="1">
            <span class="text-weight-medium">编辑数：</span>
            <span class="text-grey-8">1000</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">审核数：</span>
            <span class="text-grey-8">100</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">评论数：</span>
            <span class="text-grey-8">1</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">讨论数：</span>
            <span class="text-grey-8">1</span>
          </q-item-label>
        </q-item-section>

<!--        <q-item-section top side >-->
<!--          <div class="text-grey-8 q-gutter-xs">-->
<!--            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />-->
<!--          </div>-->
<!--        </q-item-section>-->
      </q-item>
      <q-separator spaced />
    </q-list>
  </q-page>
</template>

<style scoped>

</style>
