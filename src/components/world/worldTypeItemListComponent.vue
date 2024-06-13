<script setup lang="ts">

import { defineProps, ref } from 'vue';
const props = defineProps({
  valueList: {
    type: Array as () => Array<{ wname: string, wid: string, countSee: number }>,
    required: true
  },
  title: {
    type: String,
    default: '世界类型'
  }
});
</script>

<template>
  <div class=" q-gutter-md">
  <q-list bordered padding class="rounded-borders" style="width: 230px">
    <q-item-label header color="black">{{ title }}</q-item-label>
    <q-separator spaced />

    <q-item
      v-for="(value,index) in props.valueList" :key="index"
      clickable v-ripple :to="{ path: '/world/detail', query: { wid: value.wid }}">
      <q-item-section>
        <q-item-label lines="1">
          <q-badge rounded  v-if="index==0" color="red" :label="index+1" />
          <q-badge rounded v-if="index==1" color="blue" :label="index+1" />
          <q-badge rounded v-if="index==2" color="green" :label="index+1" />
          <q-badge rounded v-if="index>2" color="grey" :label="index+1" />
          {{ value.wname }}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        {{ value.countSee }}
      </q-item-section>
    </q-item>
  </q-list>
  </div>
</template>

<style scoped>

</style>
