<script setup lang="ts">
import { ref } from 'vue'
import { api } from 'boot/axios';
import worldTypeItemList from 'components/world/worldTypeItemListComponent.vue'; // 确保路径正确对应你的文件结构
import storyTypeItemList from 'components/story/storyTypeItemListComponent.vue'; // 确保路径正确对应你的文件结构

// { label: "武侠", value: 20 },
const typewxWorldList = ref([]);

// { label: "仙侠", value: 21 },
const typexxWorldList = ref([]);

// { label: "魔幻", value: 22 },
const typemmWorldList = ref([]);

// { label: "神话", value: 23 },
const typessWorldList = ref([]);

// { label: "灵异", value: 24 },
const typelyWorldList = ref([]);

// { label: "科技", value: 25 },
const typekxWorldList = ref([]);

// { label: "超能力/异能", value: 26 },
const typecnlWorldList = ref([]);

// { label: "其他", value: 27 },
const typeqtWorldList = ref([]);


// { label: "武侠", value: 20 },
const typewxStoryList = ref([]);

// { label: "仙侠", value: 21 },
const typexxStoryList = ref([]);

// { label: "魔幻", value: 22 },
const typemmStoryList = ref([]);

// { label: "神话", value: 23 },
const typessStoryList = ref([]);

// { label: "灵异", value: 24 },
const typelyStoryList = ref([]);

// { label: "科技", value: 25 },
const typekxStoryList = ref([]);

// { label: "超能力/异能", value: 26 },
const typecnlStoryList = ref([]);

// { label: "其他", value: 27 },
const typeqtStoryList = ref([]);
async function getTypeRecommendWorldList() {
  try {

    const response = await api.get('/wiki/recommendWorld/typeRecommend');
    if (response.data.code == 200) {
      const data = response.data.data;
      typewxWorldList.value =data.martialArts;
      typexxWorldList.value =data.fairy;
      typemmWorldList.value =data.magic;
      typessWorldList.value =data.myth;
      typelyWorldList.value =data.supernatural;
      typekxWorldList.value =data.science;
      typecnlWorldList.value =data.superpowers;
      typeqtWorldList.value =data.other;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

async function getTypeRecommendStoryList() {
  try {

    const response = await api.get('/wiki/recommendStory/typeRecommend');
    if (response.data.code == 200) {
      const data = response.data.data;
      typewxStoryList.value =data.martialArts;
      typexxStoryList.value =data.fairy;
      typemmStoryList.value =data.magic;
      typessStoryList.value =data.myth;
      typelyStoryList.value =data.supernatural;
      typekxStoryList.value =data.science;
      typecnlStoryList.value =data.superpowers;
      typeqtStoryList.value =data.other;

    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
getTypeRecommendWorldList();
getTypeRecommendStoryList();
</script>

<template>
  <q-page>
  <q-toolbar >
    <q-btn flat round dense icon="menu" />
    <q-toolbar-title>
      世界排行榜
    </q-toolbar-title>
    <q-btn flat round dense icon="more_horiz" />
  </q-toolbar>
  <div>
    <div class="row">
      <world-type-item-list title="武侠" :valueList="typewxWorldList" />
      <world-type-item-list title="仙侠" :valueList="typexxWorldList" />
      <world-type-item-list title="魔幻" :valueList="typemmWorldList" />
      <world-type-item-list title="神话" :valueList="typessWorldList" />
      <world-type-item-list title="灵异" :valueList="typelyWorldList" />
      <world-type-item-list title="科技" :valueList="typekxWorldList" />
      <world-type-item-list title="超能力/异能" :valueList="typecnlWorldList" />
      <world-type-item-list title="其他" :valueList="typeqtWorldList" />
    </div>
  </div>

  <q-toolbar >
    <q-btn flat round dense icon="menu" />
    <q-toolbar-title>
      故事排行榜
    </q-toolbar-title>
    <q-btn flat round dense icon="more_horiz" />
  </q-toolbar>
    <div class="row">
      <story-type-item-list title="武侠" :valueList="typewxStoryList" />
      <story-type-item-list title="仙侠" :valueList="typexxStoryList" />
      <story-type-item-list title="魔幻" :valueList="typemmStoryList" />
      <story-type-item-list title="神话" :valueList="typessStoryList" />
      <story-type-item-list title="灵异" :valueList="typelyStoryList" />
      <story-type-item-list title="科技" :valueList="typekxStoryList" />
      <story-type-item-list title="超能力/异能" :valueList="typecnlStoryList" />
      <story-type-item-list title="其他" :valueList="typeqtStoryList" />
    </div>


  </q-page>
</template>

<style scoped>

</style>
