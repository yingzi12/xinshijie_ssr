<script setup lang="ts">
import headComponent from 'components/world/headComponent.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const wid = ref(route.query.wid);
const wname = ref(route.query.wname);
const  current= ref(6);
const seach=ref("");
const prompt = ref(false);
const address = ref('');
const shape= ref('line');

</script>

<template>
  <q-page>
    <head-component :wid="wid" :wname="wname" :types="7"></head-component>
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
        <q-btn outline color="brown" label="全部状态" />
        <q-btn outline color="brown" label="锁定中"/>
        <q-btn outline color="brown" label="发布成功"/>
        <q-btn outline color="brown" label="拒绝发布"/>
        <q-btn outline color="brown" label="待审核"/>
        <q-btn outline color="brown" label="待发布" />
      </q-btn-group>
    </div>
    <div class="row" style="background-color: orange">
      <q-btn-group outline>
        <q-btn outline color="brown" label="全部分类" />
        <q-btn outline color="brown" label="魔法"/>
        <q-btn outline color="brown" label="科学" />
        <q-btn outline color="brown" label="远古" />
        <q-btn outline color="brown" label="修真" />
        <q-btn outline color="brown" label="历史" />
      </q-btn-group>
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-list bordered padding class="rounded-borders">
        <div v-for="index in 10" :key="index">
        <q-item  to="/story/detail">
          <q-item-section avatar>
            <img src="/150.webp" class="small-head-image">
          </q-item-section>

          <q-item-section side>
            <q-item-label class="one-line-clamp  text-subtitle1">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题 <q-badge color="primary">v1.0.0+</q-badge></q-item-label>
            <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
            <q-item-label class="q-mb-xs text-subtitle2"><span style="color: #C10015">已发布</span> <span style="color: #C10015">草稿</span> <span style="color: #C10015">拒绝发布</span> <span style="color: #C10015">锁定中</span> · 连载 · 签约 · VIP · 轻小说 · 衍生同人 · 轻小说</q-item-label>
            <q-item-label class="two-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label class="one-line-clamp text-weight-thin text-overline">更新人：我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
            <q-item-label class="one-line-clamp text-weight-thin text-overline">更新时间：2022-11-11 11:11:23</q-item-label>
            <q-separator spaced />
            <span class="text-weight-medium">拒绝理由：</span>
            <span class="text-grey-8"> - GitHub repositoryGitHub repositoryGitHub repositoryGitHub repositoryGitHub repositoryGitHub repositoryGitHub repository</span>
            <div>
              <div class="text-grey-8">审核人：这是名称，这是名称，这是名称，这是名称</div>
              <div class="text-grey-8">审核时间：2025-11-11 11:34:54</div>
            </div>
          </q-item-section>
          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
<!--              <q-btn class="gt-xs" size="12px" flat dense round icon="edit" />-->
<!--              <q-btn class="gt-xs" size="12px" flat dense round icon="lock" label="锁定" />-->
<!--              <q-btn class="gt-xs" size="12px" flat dense round icon="lock" label="解锁" />-->
<!--              <q-btn class="gt-xs" size="12px" flat dense round icon="lock" label="允许发布"/>-->
<!--              <q-btn class="gt-xs" size="12px" flat dense round icon="lock" label="拒绝发布"/>-->
              <q-btn class="gt-xs" size="12px" flat dense round icon="delete" label="审核" @click="prompt=true"/>

            </div>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        </div>
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
    </div>
  </q-page>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6" >审核</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-gutter-sm">
          <q-radio v-model="shape" val="line" label="通过申请" />
          <q-radio v-model="shape" val="rectangle" label="拒绝审核" />
        </div>
        <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" label="理由说明" />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="取消" v-close-popup />
        <q-btn flat label="确认" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<style scoped>

</style>
