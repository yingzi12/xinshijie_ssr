<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 400px" class="shadow-2 rounded-borders">
      <router-view >
      </router-view>
      <wiki-footer/>

    </q-layout>
  </div>
</template>

<script lang="ts" setup>
import  WikiFooter from "../FooterLayout.vue"
// import  { useRouter } from "vue-router";
import  { useMeta }  from  'quasar'

// const router = useRouter()

const metaData = {
  // sets document title
  title: 'Index Page',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  // 可选; 将最终标题设置为“索引页 - 我的网站”，适用于多级元
  titleTemplate: (title: string) => `${title} - My Website`,
  // meta tags
  meta: {
    description: { name: 'description', content: 'Page 1' },
    keywords: { name: 'keywords', content: 'Quasar website' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    // 注意：对于 Open Graph 类型元数据，您需要使用 SSR，以确保页面由服务器呈现
    ogTitle:  {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      // 可选; 与 titleTemplate 类似，但允许使用其他元属性
      template (ogTitle: string) {
        return `${ogTitle} - My Website`
      }
    }
  },

  // CSS tags
  link: {
    material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
  },

  // JS tags
  // script: {
  //   ldJson: {
  //     type: 'application/ld+json',
  //     innerHTML: `{ "@context": "http://schema.org" }`
  //   }
  // },

  // <html> attributes
  htmlAttr: {
    'xmlns:cc': 'http://creativecommons.org/ns#', // generates <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined // generates <html empty>
  },

  // <body> attributes
  bodyAttr: {
    'action-scope': 'xyz', // generates <body action-scope="xyz">
    empty: undefined // generates <body empty>
  },

  // <noscript> tags
  noscript: {
    default: 'This is content for browsers with no JS (or disabled JS)'
  }
}
useMeta ( metaData )
</script>

<style scoped>

</style>
