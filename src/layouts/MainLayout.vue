<template>
  <q-layout view="hhh LpR fff" style="height: 100vh;">

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
        <q-tab name="Home" icon="home" label="谁也" />
        <q-tab name="alarms" icon="public" label="世界" />
        <q-tab name="movies" icon="menu_book" label="故事" />
        <q-tab name="order" icon="category" label="排行榜" />
        <q-tab name="yard" icon="yard" label="家园" />
        <q-tab name="service" icon="manage_accounts" label="客服端" />
        <q-tab name="help" icon="help" label="帮助中心" />
      </q-tabs>
    </q-header>

    <q-page-container style="height: 100%;">
      <router-view />
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
