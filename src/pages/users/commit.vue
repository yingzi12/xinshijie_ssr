<script setup lang="ts">
import { ref } from 'vue';
const  current= ref(6);
const seach=ref("");
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
        <q-btn outline color="brown" label="世界"/>
        <q-btn outline color="brown" label="故事" />
      </q-btn-group>
    </div>
    <q-list bordered class="rounded-borders" >
      <q-item-label header>Google Inbox style</q-item-label>

      <q-item v-for="index in 10" :key="index">
        <q-item-section side>
          {{(current-1)*10+index}}
        </q-item-section >
        <q-item-section  top side >
          <q-item-label class="q-mt-sm text-h6">这是评论标题，这是评论标题，这是评论标题，这是评论标题，这是评论标题</q-item-label>
          <q-item-label class="q-mt-sm text-subtitle2"><span class="text-blue">[世界]</span>这是世界名称</q-item-label>
        </q-item-section>
        <q-item-section top side>
          <q-item-label lines="1">
            <span class="text-weight-medium">回复：</span>
            <span class="text-grey-8">10</span>
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
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="current"
        color="purple"
        :max="10"
        :max-pages="6"
        boundary-numbers
      />
    </div>
  </q-page>
</template>

<style scoped>

</style>
