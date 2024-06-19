<script setup lang="ts">
import { ref } from 'vue';

const title=ref("");
const editor = ref('What you see is <b>what</b> you get.');
const charge=ref(1);

const chargeList = [
  {
    label: '分卷1',
    value: 1
  },
  {
    label: '分卷2',
    value: 2
  },
]

</script>

<template>
  <q-page>
    <q-breadcrumbs class="text-brown q-ma-md">
      <template v-slot:separator>
        <q-icon
          size="1.5em"
          name="chevron_right"
          color="primary"
        />
      </template>

      <q-breadcrumbs-el label="首页" icon="home" to="/"/>
      <q-breadcrumbs-el label="世界首页" icon="widgets"  to="/world/index"/>
      <q-breadcrumbs-el label="小说首页" icon="widgets"  to="/story/index"/>
      <q-breadcrumbs-el label="世界列表" icon="navigation" to="/world/order" />
      <q-breadcrumbs-el label="小说列表" icon="navigation" to="/story/order" />
      <q-breadcrumbs-el label="这个是世界名称" icon="navigation"  to="/world/detail"/>
      <q-breadcrumbs-el label="世界小说" icon="navigation"  to="/world/story"/>
      <q-breadcrumbs-el label="这个是小说名称" icon="navigation"  to="/story/detail"/>
      <q-breadcrumbs-el label="章节名称" icon="navigation"  to="/story/chapter"/>
    </q-breadcrumbs>

    <div class="bg-orange text-white">
      <q-toolbar>
        <!--      <q-btn flat round dense icon="menu" class="q-mr-sm" />-->
        <q-toolbar-title>创建章节</q-toolbar-title>
        <!--      <q-space />-->
        <!--      <q-btn flat round dense icon="search" class="q-mr-xs" />-->
        <!--      <q-btn flat round dense icon="group_add" />-->
      </q-toolbar>
    </div>
    <div style="height: 100%">
      <q-card style="height: 100%">
        <q-card-section>
          <div>
            <q-select v-model="charge" :options="chargeList" emit-value hint="分类" label="分类"
                      map-options
                      outlined
                      />
          </div>
        </q-card-section>
        <q-card-section>
          <!--        <div class="text-h6">创建章节</div>-->
          <q-input
            v-model="title"
            :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入章节名称，长度2-100']"
            filled
            hint="输入章节名称"
            label="章节名称 *"
            lazy-rules
          />
        </q-card-section>

        <q-separator />
        <q-card-actions  >
          <q-editor v-model="editor" style="width: 100%" />

        </q-card-actions>
        <q-card-actions >
          <div>
            <q-btn color="primary" label="提交" type="submit"/>
            <q-btn class="q-ml-sm" color="primary" flat label="返回" type="reset"/>
          </div>
        </q-card-actions>
      </q-card>
    </div>

  </q-page>
</template>

<style scoped>

</style>
