<script setup lang="ts">
import Head from 'pages/admin/world/head.vue';
import { ref } from 'vue';

const url = ref('https://picsum.photos/500/300')

function  refresh () {
    url.value = 'https://picsum.photos/500/300?t=' + Math.random()
}
const lorem= 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

</script>

<template>
  <q-page>
    <Head></Head>
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="float-right q-ma-xs">
          <q-btn color="orange" icon="send"  label="发布" />
          <q-btn color="red" icon="edit"  label="编辑"  to="/admin/world/edit"/>
        </div>
        <div class="text-h4">
          我是世界名称
          <q-badge transparent align="middle" color="orange">
            v17
          </q-badge>
        </div>
        <div class="text-subtitle2">魔法</div>

      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <div class="q-pa-md q-gutter-sm">

          <q-img
            :src="url"
            spinner-color="white"
            style="height: 140px; max-width: 150px"
          />
          <q-btn push color="teal" label="Change image" @click="refresh" />

        </div>
      </q-card-section>
      <q-card-section>
        <q-card class="my-card" flat bordered>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>Title</q-item-label>
              <q-item-label caption>
                Subhead
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-card-section horizontal>
            <q-card-section>
              {{ lorem }}
            </q-card-section>

            <q-separator vertical />

            <q-card-section class="col-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="text-h6">简介</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        {{ lorem }}
      </q-card-section>
    </q-card>
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="text-h6">统计</div>
      </q-card-section>

      <q-separator  inset />
      <q-card-section horizontal>
        <q-card-section style="width: 50%">
          <div>点击：11</div>
          <div>观看：11</div>
          <div>经验: 11</div>

        </q-card-section>

        <q-separator vertical />

        <q-card-section>
          <div>居民数：11</div>
          <div>故事数：11</div>
          <div>元素数：1111</div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>

</style>
