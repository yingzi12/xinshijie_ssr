<script setup lang="ts">
import { defineProps } from 'vue';

// 定义Props类
interface World {
  id:string,
  imgUrl: string;
  name:string,
  intro:string,
  description:string,
  types: number;
  ranks: number;
  tags: string;
  crateTime: string;
  updateTime: string;

}

// 定义接收一个User对象的Props
const props = defineProps<{ world: World }>();

// 你也可以直接解构props以简化模板中的使用
const { world } = props;
</script>

<template>
  <q-item>
    <q-item-section avatar>
      <q-img :src="world.imgUrl" class="small-head-image"/>
    </q-item-section>

    <q-item-section>
      <q-item-label class="one-line-clamp">{{ world.name }}</q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">{{world.intro}}</q-item-label>
      <q-item-label class="three-line-clamp" caption>{{world.description}}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped>

</style>
