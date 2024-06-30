<script setup lang="ts">
import { ref } from 'vue';
const  current= ref(6);
</script>

<template>
  <q-page>
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
        <q-btn outline color="brown" label="全部" />
        <q-btn outline color="brown" label="系统"/>
        <q-btn outline color="brown" label="@我的" />
      </q-btn-group>
    </div>
    <q-list bordered class="rounded-borders" >
      <q-item-label header>Google Inbox style</q-item-label>

      <q-item v-for="index in 10" :key="index">
        <q-item-section side>
          {{(current-1)*10+index}}
        </q-item-section >
        <q-item-section  top side >
          <q-item-label class="q-mt-sm text-subtitle1">
            <span class="text-blue">[系统]</span><q-btn flat color="black">
            这是通知标题
            <q-badge color="red" rounded floating />
          </q-btn>
          </q-item-label>
          <q-item-label class="q-mt-sm text-weight-thin">这通知论内容，这通知论内容，这通知论内容，这通知论内容，这通知论内容</q-item-label>
          <q-item-label class="q-mt-sm text-weight-thin">2011-11-11 11:12:32</q-item-label>

        </q-item-section>
      </q-item>
      <q-separator spaced />
    </q-list>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="current"
        color="purple"
        :max="maxPage"
        :max-pages="6"
        boundary-numbers
      />
    </div>
  </q-page>
</template>

<style scoped>

</style>
