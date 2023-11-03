<template>
  <q-layout view="hhh LpR fff" style="height: 100vh;">

    <q-header class="bg-primary text-black" height-hint="98" >
<!--      <q-toolbar>-->
<!--        <q-toolbar-title>-->
<!--          <q-avatar>-->
<!--            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">-->
<!--          </q-avatar>-->
<!--          图集网-->
<!--        </q-toolbar-title>-->
<!--      </q-toolbar>-->
      <q-toolbar class="bg-purple text-white shadow-2 rounded-borders">
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          图集网
        </q-toolbar-title>

        <q-space />

        <!--
          notice shrink property since we are placing it
          as child of QToolbar
        -->

      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab to="/" label="首页" />
        <q-route-tab to="/see" label="最热" />
        <q-route-tab to="/findImage" label="寻找图片" />
        <q-route-tab to="/page3" label="用户中心" />
      </q-tabs>
    </q-header>

    <q-page-container style="height: 100%;">
      <router-view />
    </q-page-container>

  </q-layout>

</template>

<script>
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
export default {
  setup () {
    useMeta(metaData)
    return {
      tab: ref('images')
    }
  }
}
</script>
