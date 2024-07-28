<script setup lang="ts">
import { ref } from 'vue'
import { api } from 'boot/axios';
import worldTypeItemList from 'components/world/worldTypeItemListComponent.vue'; // 确保路径正确对应你的文件结构
import storyTypeItemList from 'components/story/storyTypeItemListComponent.vue';
import HeadTableComponent from 'components/HeadTableComponent.vue';
import HeadComponent from 'components/HeadComponent.vue'; // 确保路径正确对应你的文件结构
const menuList = [
  {
    icon: 'adjust',
    label: '点击',
    separator: true
  },
  {
    icon: 'favorite',
    label: '喜欢',
    separator: false
  },
  {
    icon: 'delete',
    label: '关注',
    separator: false
  },
  {
    icon: 'remove_red_eye',
    label: '观看',
    separator: false
  },
  {
    icon: 'brightness_4',
    label: '等级',
    separator: true
  },
  {
    icon: 'thumb_up',
    label: '点赞',
    separator: true
  }
]
const drawer= ref(false);
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
  <q-layout view="hhh LpR fff" style="height: 100vh;">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <HeadComponent></HeadComponent>
      <HeadTableComponent></HeadTableComponent>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple to="/order/like">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
          </template>

        </q-list>
      </q-scroll-area>
    </q-drawer>


    <q-page-container style="height: 100%;">
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

      <q-separator color="orange" inset />
      <div class="row">
        <div class="col-2"> </div>
        <div class="col-auto" style="margin: 0px">
          <div class="footter" style="margin: 0px;text-align: center;">
            <router-link to="">关于心世界</router-link>|
            <router-link to="">联系我们</router-link>|
            <router-link to="">帮助中心</router-link>|
            <router-link to="">提交建议</router-link>|
            <router-link to="">举报中心</router-link>|
            <router-link to="">漏洞提交</router-link>|
          </div>
          <div class="footerText "> <p>Copyright © 2002-2022 www.aiavr.com All Rights Reserved 版权所有 心世界信息科技有限公司</p></div>
          <div class="footerText "><p>新世界、背景故事、世界观设定、小说、故事、世界</p></div>
          <div class="footerText "><p>本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任</p></div>
          <div class="footerText "><a href="https://www.51k.uk">心世界小说网</a>|<a  href="https://www.30dizhi.uk">30导航</a>|<a  href="https://www.aravrw.com">心世界</a></div>
        </div>
        <div class="col-2"></div>
      </div>
    </q-page-container>

  </q-layout>

</template>

<style scoped>

</style>
