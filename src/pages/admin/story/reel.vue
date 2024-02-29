<script setup lang="ts">
import Head from 'pages/admin/story/head.vue';
import { ref } from 'vue';
const xh=ref("");
</script>

<template>
  <q-page>
    <Head></Head>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>分卷（11）</q-toolbar-title>
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
        <q-btn flat round dense icon="more_vert" label="新增分卷"/>
      </q-toolbar>
    </div>
    <q-list bordered class="rounded-borders" >
      <q-item-label header>Google Inbox style</q-item-label>
       <div v-for="index in 10" :key="index">
         <q-item >
           <q-item-section side>
             {{index}}
           </q-item-section>

           <q-item-section  side>
             <q-item-label class="q-mt-sm text-h6">
               <router-link  to="/admin/story/chapter">这是分卷名称</router-link>
             </q-item-label>
             <q-item-label class="q-mt-sm text-subtitle2">作者：这是作者，这是作者</q-item-label>
             <q-item-label class="q-mt-sm text-subtitle2">创建时间：2024-11-23 11:12:43</q-item-label>
             <q-item-label class="q-mt-sm text-subtitle2">更新时间：2024-11-23 11:12:43</q-item-label>
           </q-item-section>
           <q-item-section  side>
             <q-item-label class="q-mt-sm text-subtitle2">创建时间：2024-11-23 11:12:43</q-item-label>
             <q-item-label class="q-mt-sm text-subtitle2">更新时间：2024-11-23 11:12:43</q-item-label>
           </q-item-section>
           <q-item-section >
             <q-item-label lines="1">

               <div class="text-weight-bold text-primary"><span class="text-weight-medium">序号：</span>
                 <span class="text-grey-8">1</span>
                 <q-popup-edit v-model="xh" auto-save v-slot="scope">
                   <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                 </q-popup-edit>
               </div>
             </q-item-label>
             <q-item-label lines="1">
               <span class="text-weight-medium">章节数：</span>
               <span class="text-grey-8">1000</span>
             </q-item-label>
           </q-item-section>

           <q-item-section top side >
             <div class="text-grey-8 q-gutter-xs">
               <q-btn class="gt-xs" size="12px" flat dense round icon="lock" />
             </div>
           </q-item-section>
         </q-item>
         <q-separator spaced />
       </div>

    </q-list>

  </q-page>

</template>

<style scoped>

</style>
