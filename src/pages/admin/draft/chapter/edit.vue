<script setup lang="ts">
import { ref } from 'vue';
import Head from 'components/story/headComponent.vue';

const title=ref("");
const editor = ref('What you see is <b>what</b> you get.');

</script>

<template>
<q-page>
  <div class="row no-wrap shadow-1">
    <q-toolbar class="col-8 bg-grey-3">
      <q-btn flat round dense icon="keyboard_return" />
      <q-toolbar-title>返回草稿详细</q-toolbar-title>
      <q-btn flat round dense icon="search" />
    </q-toolbar>
    <q-toolbar class="col-4 bg-primary text-white">
      <q-space />
      <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
      <q-btn flat round dense icon="more_vert" />
    </q-toolbar>
  </div>

  <div class="bg-orange text-white">
    <q-toolbar>
<!--      <q-btn flat round dense icon="menu" class="q-mr-sm" />-->
      <q-toolbar-title>编辑章节</q-toolbar-title>
<!--      <q-space />-->
<!--      <q-btn flat round dense icon="search" class="q-mr-xs" />-->
<!--      <q-btn flat round dense icon="group_add" />-->
    </q-toolbar>
    <q-toolbar inset>

      <q-toolbar-title>
        <q-btn flat round label="这是分卷名称" to="/admin/story/chapter"/>
      </q-toolbar-title>
      <q-space />
<!--      <q-btn flat round dense icon="add" label="新增章节" to="/admin/chapter/create"/>-->

    </q-toolbar>
  </div>
  <div style="height: 100%">
    <q-card style="height: 100%">
      <q-card-section>
<!--        <div class="text-h6">创建章节</div>-->
        <q-input
          v-model="title"
          :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入章节名称，长度2-100']"
          filled
          hint="输入章节名称"
          label="章节名称 *"
          lazy-rules
        />
      </q-card-section>

      <q-separator />
      <q-card-actions  >
        <q-editor v-model="editor" style="width: 100%" />

      </q-card-actions>
      <q-card-actions >
        <div>
          <q-btn color="primary" label="提交" type="submit"  to="/admin/draft/chapter/detail" />
          <q-btn class="q-ml-sm" color="primary" flat label="返回" type="reset"  to="/admin/draft/chapter/detail" />
        </div>
      </q-card-actions>
    </q-card>
  </div>

</q-page>
</template>

<style scoped>

</style>
