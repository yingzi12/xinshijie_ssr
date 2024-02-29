<script setup lang="ts">
import { ref } from 'vue';

const selected = ref(null);
function selectGoodService () {
  if (selected.value !== 'Good service') {
    selected.value = 'Good service'
  }
}

function unselectNode () {
  selected.value = null
}

const props= [
  {
    id: 1,
    label: 'Satisfied customers',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    isOp:false,
    children: [
      {
        id: 2,
        label: 'Good food',
        icon: 'restaurant_menu',
        isOp:false,
        children: [
          {
            id: 10,
            label: 'Quality ingredients',
            isOp:false,
          },

          {
            id: 11,
            isOp:false,
            label: 'Good recipe'
          }
        ]
      },
      {
        id: 3,
        label: 'Good service',
        icon: 'room_service',
        isOp:false,
        children: [
          {
            id: 8,
            isOp:false,
            label: 'Prompt attention' },
          {
            id: 9,
            isOp:false,
            label: 'Professional waiter'
          }
        ]
      },
      {
        id: 4,
        label: 'Pleasant surroundings',
        icon: 'photo',
        isOp:false,
        children: [
          {
            id: 5,
            isOp:false,
            label: 'Happy atmosphere'
          },
          {
            id: 6,
            isOp:false,
            label: 'Good table presentation'
          },
          {
            id: 7,
            isOp:false,

            label: 'Pleasing decor'
          }
        ]
      }
    ]
  },
  {
    id:21,
    label: 'Satisfied customers1',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    isOp:false,
  }
]
const fab1 = ref(false);

function onClick () {
  // console.log('Clicked on a fab action')
}
const  current= ref(6);
const seach=ref("");
</script>

<template>
<q-page>
  <q-toolbar class="bg-purple text-white">
    <q-btn flat round dense icon="assignment_ind" />
    <q-toolbar-title>
      Toolbar
    </q-toolbar-title>
    <q-btn flat round dense icon="apps" class="q-mr-xs" />
    <q-btn flat round dense icon="more_vert" />
  </q-toolbar>
  <q-separator dark inset />
  <div class="q-pa-md q-gutter-sm">
    <span class="text-overline">全部</span>
    <span class="text-overline">点击</span>
    <span class="text-overline">观看</span>
    <span class="text-overline">全部</span>
    <span class="text-overline">全部</span>
    <span class="text-overline">全部</span>
  </div>
  <div class="q-pa-md">
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>人气 </q-toolbar-title>
        <q-input rounded outlined v-model="seach" label="搜索..." />
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </div>
  </div>
  <div class="q-pa-md q-gutter-md">
    <q-list bordered padding class="rounded-borders">
      <q-item v-for="index in 10" :key="index" to="/admin/world/info">
        <q-item-section avatar>
          <img src="/150.webp" class="small-head-image">
        </q-item-section>

        <q-item-section>
          <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
          <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
          <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>
      <q-separator spaced />

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
</template>

<style scoped>

</style>
