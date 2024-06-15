<script setup lang="ts">
import headComponent from 'components/story/headComponent.vue';
import { reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { api, tansParams } from 'boot/axios';
const route = useRoute();
const sid = ref(route.query.sid);
const sname = ref(route.query.sname);
const id = ref(route.query.id);

</script>

<template>
  <q-page>
    <head-component :sid="sid" :sname="sname" :id="id"></head-component>
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
        <q-btn outline color="brown" label="待审核"/>
        <q-btn outline color="brown" label="审核成功" />
        <q-btn outline color="brown" label="审核失败" />

      </q-btn-group>
    </div>
    <q-list bordered class="rounded-borders" >
      <q-item-label header>Google Inbox style</q-item-label>

      <div v-for="index in 10" :key="index">
        <q-item  >
          <q-item-section avatar>
            <img src="/150.webp" class="small-head-image">
          </q-item-section>

          <q-item-section side>
            <q-item-label class="one-line-clamp  text-subtitle1">我是超级长的章节标题，我是超级长的章节标题，我是超级长的章节标题</q-item-label>
            <q-item-label class="q-mb-xs"><span style="color: #C10015">待审核 · </span><span style="color: #C10015">新增</span></q-item-label>
            <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
            <q-item-label class="one-line-clamp text-weight-thin text-overline">2022-11-11 11:11:23</q-item-label>
          </q-item-section>
          <!--          <q-item-section side top>-->
          <!--            <q-item-label class="one-line-clamp text-weight-thin text-overline">创建人：我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>-->
          <!--            <q-item-label class="one-line-clamp text-weight-thin text-overline">创建时间：2022-11-11 11:11:23</q-item-label>-->
          <!--          </q-item-section>-->
          <q-item-section side top>
            <q-item-label >
              <span class="text-weight-medium">编辑理由：</span>
              <span class="text-grey-8"> - GitHub repositoryGitHub repositoryGitHub repositoryGitHub repositoryGitHub repositoryGitHub repositoryGitHub repository</span>
              <q-separator spaced />
              <span class="text-weight-medium">拒绝理由：</span>
              <span class="text-grey-8"> - GitHub repositoryGitHub repositoryGitHub repositoryGitHub repositoryGitHub repositoryGitHub repositoryGitHub repository</span>
              <div>
                <div class="text-grey-8">审核人：这是名称，这是名称，这是名称，这是名称</div>
                <div class="text-grey-8">审核时间：2025-11-11 11:34:54</div>
              </div>
            </q-item-label>

          </q-item-section>
          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn class="gt-xs" size="12px" flat dense round icon="delete" label="审核" @click="prompt=true"/>
            </div>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </div>
    </q-list>
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
