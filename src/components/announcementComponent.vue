<script setup lang="ts">
import { api, tansParams } from 'boot/axios';
import { ref } from 'vue';

const valueList=ref([]);

async function getValueList() {
  try {
    const response = await api.get('/wiki/announcement/list?pageSize=6');
    if (response.data.code == 200) {
      // total.value = response.data.total;
      // maxPage.value=  total.value/10+1;
      valueList.value = response.data.data;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
getValueList();
</script>

<template>
  <q-list bordered padding class="rounded-borders" style="max-width: 300px">
    <q-item-label header class="h6">公告</q-item-label>
    <q-item v-for="(value,index) in valueList" :key="index" clickable v-ripple to="/notice/detail">
      <q-item-section avatar top>
        <span class="text-orange">【公告】</span>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">{{value.title}}</q-item-label>
        <q-item-label caption>{{value.createTime}}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>

</template>

<style scoped>

</style>
