<script setup lang="ts">
import { ref } from 'vue';
import Head from 'components/story/headComponent.vue';
import { api } from 'boot/axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute(); // 使用 Vue Router 的 useRouter 函数
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const sid = ref(route.query.sid);
const sname = ref(route.query.sname);

const dcid = ref(route.query.dcid);
const value=ref({});
async function handValue() {
  const response = await api.get(`/admin/draftChapter/getInfo?dcid=${dcid.value}&sid=${sid.value}`);
  const data=response.data;
  if (data.code == 200) {
    value.value=data.data;
  }
}
handValue();
</script>

<template>
<q-page>
<!--  <Head></Head>-->
  <div class="row no-wrap shadow-1">
    <q-toolbar class="col-8 bg-grey-3">
      <q-btn flat round dense icon="keyboard_return" />
      <q-toolbar-title>章节草稿内容</q-toolbar-title>
      <q-btn flat round dense icon="search" />
    </q-toolbar>
    <q-toolbar class="col-4 bg-primary text-white">
      <q-space />
      <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
      <q-btn flat round dense icon="more_vert" />
    </q-toolbar>
  </div>

  <div class="q-ma-md">
    <div class="text-h6 text-center">{{ value.title }}<q-chip size="xs" icon="bookmark">
      {{value.pname}}
    </q-chip></div>
    <div class="text-subtitle2 text-center">{{ value.sname }}</div>

    <div class="text-subtitle1 text-center">
      <div class="q-pa-md q-gutter-sm">
<!--        <span class="text-overline">创建者:我是创建人</span>-->
<!--        <span class="text-overline">创建:2022-11-11 11:23:34</span>-->
        <span class="text-overline">创建者:{{ value.createName }}</span>
        <span class="text-overline">创建时间:{{ value.createTime }}</span>
      </div>
    </div>
    <div>
      <div v-html="value.contentZip"></div>
    </div>

  </div>
  <div class="q-pa-md">
    <q-btn-group spread>
      <q-btn color="purple" label="编辑" icon="edit" :to="{ path: '/admin/draft/chapter/edit', query: { sid: value.sid, dcid: value.id }}"/>
      <q-btn v-if="value.status == 7"  color="purple" label="发布" icon="send" />
      <q-btn color="purple" label="比对" icon="visibility" />
    </q-btn-group>
  </div>
</q-page>
</template>

<style scoped>

</style>
