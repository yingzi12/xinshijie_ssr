<script setup lang="ts">
import Head from 'pages/admin/story/head.vue';
import { ref } from 'vue';
const current= ref(6);
const seach=ref("");
const prompt = ref(false);
const address = ref('');
</script>

<template>
  <q-page>
    <Head></Head>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>统计（11）</q-toolbar-title>
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
<!--        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />-->
        <q-btn flat round dense icon="add" label="新增管理员" @click="prompt = true"/>
      </q-toolbar>
    </div>
<!--    <div class="row" style="background-color: orange">-->
<!--      <q-btn-group outline>-->
<!--        <q-btn outline color="brown" label="全部状态" />-->
<!--        <q-btn outline color="brown" label="已发布"/>-->
<!--        <q-btn outline color="brown" label="待发布" />-->
<!--      </q-btn-group>-->
<!--    </div>-->
<!--    <div class="row" style="background-color: orange">-->
<!--      <q-btn-group outline>-->
<!--        <q-btn outline color="brown" label="全部分类" />-->
<!--        <q-btn outline color="brown" label="魔法"/>-->
<!--        <q-btn outline color="brown" label="科学" />-->
<!--        <q-btn outline color="brown" label="远古" />-->
<!--        <q-btn outline color="brown" label="修真" />-->
<!--        <q-btn outline color="brown" label="历史" />-->
<!--      </q-btn-group>-->
<!--    </div>-->
    <q-list bordered class="rounded-borders" >
      <q-item-label header>Google Inbox style</q-item-label>

      <q-item v-for="index in 10" :key="index">
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section  top side >
          <q-item-label class="q-mt-sm">这是用户名<q-badge color="primary">v1.0.0+</q-badge></q-item-label>
          <q-item-label class="q-mt-sm text-blue">创造者</q-item-label>
          <q-item-label lines="1">这是一个签名，这是一个签名，这是一个签名，这是一个签名，这是一个签名</q-item-label>
        </q-item-section>

        <q-item-section top class="col-1 gt-sm">
          <q-item-label lines="1">
            <span class="text-weight-medium">经验：</span>
            <span class="text-grey-8">1000</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">元素：</span>
            <span class="text-grey-8">100</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">故事：</span>
            <span class="text-grey-8">1</span>
          </q-item-label>
        </q-item-section>
        <q-item-section top class="col-1 gt-sm">
          <q-item-label lines="1">
            <span class="text-weight-medium">编辑数：</span>
            <span class="text-grey-8">1000</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">审核数：</span>
            <span class="text-grey-8">100</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">评论数：</span>
            <span class="text-grey-8">1</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">讨论数：</span>
            <span class="text-grey-8">1</span>
          </q-item-label>
        </q-item-section>

        <q-item-section top side >
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
<!--            <q-btn class="gt-xs" size="12px" flat dense round icon="done" />-->
<!--            <q-btn size="12px" flat dense round icon="more_vert" />-->
          </div>
        </q-item-section>
      </q-item>
      <q-separator spaced />
    </q-list>
  </q-page>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">新增管理员</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" label="输入用户账号" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div>
          <span class="text-weight-medium">用户名：</span>
          <span class="text-grey-8 three-line-clamp">这是一个用户</span>
        </div>
        <div>
          <span class="text-weight-medium">签名：</span>
          <span class="text-grey-8 three-line-clamp">这是一个签名</span>
        </div>
        <div>
          <span class="text-weight-medium">等级：</span>
          <span class="text-grey-8">11</span>
        </div>
        <div>
          <span class="text-weight-medium">创建元素数：</span>
          <span class="text-grey-8">1000</span>
        </div>
        <div>
          <span class="text-weight-medium">编辑元素数：</span>
          <span class="text-grey-8">1000</span>
        </div>
        <div>
          <span class="text-weight-medium">创建故事数：</span>
          <span class="text-grey-8">1000</span>
        </div>
        <div>
          <span class="text-weight-medium">编辑数：</span>
          <span class="text-grey-8">1000</span>
        </div>
        <div>
          <span class="text-weight-medium">评论数：</span>
          <span class="text-grey-8">1000</span>
        </div>
        <div>
          <span class="text-weight-medium">讨论数：</span>
          <span class="text-grey-8">1000</span>
        </div>
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
