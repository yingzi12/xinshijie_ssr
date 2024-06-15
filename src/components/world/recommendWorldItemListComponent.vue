<template>
      <q-list bordered padding class="rounded-borders" style="max-width: 300px">
        <q-item-label header>{{ title }}</q-item-label>
        <q-separator spaced />

        <q-item
          v-for="(value, index) in valueList" :key="index"
          clickable v-ripple
          :to="{ path: '/world/detail', query: { wid: value.wid }}"
        >
          <q-item-section avatar>
<!--            <img src="/150.webp" class="small-head-image">-->
            <q-img
              class="small-head-image"
              :src="imageUrl(value.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label class="one-line-clamp">{{value.wname}}</q-item-label>
            <q-item-label class="one-line-clamp text-weight-thin text-overline">{{value.createName == null?"未知":value.createName }}</q-item-label>
            <q-item-label class="three-line-clamp" caption>{{value.intro}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useQuasar } from 'quasar';
import { api, tansParams } from 'boot/axios';
const $q = useQuasar();
// 定义组件的Props
const props = defineProps({
  title: String,
  maxWidth: {
    type: Number,
    default: 300
  }
});
function imageUrl(imgUrl) {
  return `${$q.config.sourceWeb}${imgUrl}`;
}

const valueList = ref([]);

async function getRondomWorldList() {
  try {
    queryParams.value.recType = null;
    queryParams.value.pageSize = 4;

    const response = await api.get('/wiki/world/random?' + tansParams(queryParams.value));
    if (response.data.code == 200) {
      // total.value = response.data.total;
      // maxPage.value=  total.value/10+1;
      valueList.value = response.data.data;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
getRondomWorldList();
// 注意：在 <script setup> 语法中，你直接使用这些props，无需 this.props
</script>

<style scoped>
/* 如果需要，可以在这里添加额外的样式 */
</style>
