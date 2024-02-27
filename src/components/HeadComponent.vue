<script setup lang="ts">
import { ref } from 'vue'
import {useMeta} from "quasar";
const metaData = {
  // sets document title
  title: '图集网',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - 最热门 Photo Gallery, Beauty, Photo, Photography, Showman.com`,

  // meta tags
  meta: {
    verification:{name:"baidu-site-verification", content:"codeva-y79QY7Z0Nm"},
    description: { name: 'description', content: '图集网  最热门 美女 写真 摄影 秀人网 Photo Gallery, Beauty, Photo, Photography, Showman.com' },
    keywords: { name: 'keywords', content: '图集网 最热门 美女 写真 摄影 秀人网 Photo Gallery, Beauty, Photo, Photography, Showman.com' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle:  {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template (ogTitle) {
        return `${ogTitle} - 最热门 图集网 美女 写真 摄影 秀人网  Photo Gallery, Beauty, Photo, Photography, Showman.com`
      }
    }
  },
}
useMeta(metaData)
const       tab= ref('images');
</script>

<template>
  <q-header elevated class="bg-purple">
    <q-toolbar>
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>

      <q-toolbar-title>Quasar Framework</q-toolbar-title>

      <q-btn flat round dense icon="whatshot" />
    </q-toolbar>
    <q-tabs
      v-model="tab"
      inline-label
      class="shadow-2"
    >
      <q-route-tab name="Home" icon="home" to="/" label="首页" />
      <q-route-tab name="alarms" icon="public" to="/world/index" label="世界" />
      <q-route-tab name="movies" icon="menu_book" to="/story/index" label="故事" />
      <q-route-tab name="order" icon="category" to="/order" label="排行榜" />
      <q-route-tab name="yard" icon="yard" to="/yard" label="家园" />
      <q-route-tab name="service" icon="manage_accounts" label="客服端" />
      <q-route-tab name="help" icon="help" label="帮助中心" />
    </q-tabs>
  </q-header>
</template>

<style scoped>

</style>
