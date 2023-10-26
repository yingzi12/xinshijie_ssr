<template>
windIndex
</template>

<script setup lang="ts">
// some .vue file
import { useMeta } from 'quasar'

const metaData = {
  // sets document title
  title: 'Index Page',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title:string) => `${title} - My Website`,

  // meta tags
  meta: {
    description: { name: 'description', content: '世界,世界观,背景,背景故事' },
    keywords: { name: 'keywords', content: 'Quasar website' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle:  {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template (ogTitle:string) {
        return `${ogTitle} - My Website`
      }
    }
  },

  // CSS tags
  //这是一个包含用于引入CSS的对象。在这个例子中，它引入了一个Google Fonts的CSS文件，以加载Material Icons。
  link: {
    material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
  },

  // JS tags
  //这是一个包含用于引入JavaScript的对象。在这个例子中，它定义了一个ldJson脚本，用于在页面中插入JSON-LD结构化数据
  script: {
    ldJson: {
      type: 'application/ld+json',
      innerHTML: `{ "@context": "http://schema.org" }`
    }
  },

  // <html> attributes
  //这些属性用于指定HTML和body标签的属性。在这个例子中，它们用于生成一些自定义的HTML和body标签属性。
  htmlAttr: {
    'xmlns:cc': 'http://creativecommons.org/ns#', // generates <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined // generates <html empty>
  },

  // <body> attributes
  //这些属性用于指定HTML和body标签的属性。在这个例子中，它们用于生成一些自定义的HTML和body标签属性。
  bodyAttr: {
    'action-scope': 'xyz', // generates <body action-scope="xyz">
    empty: undefined // generates <body empty>
  },
   //这是一个包含在不支持JavaScript或禁用JavaScript的浏览器中显示的内容的对象。
  // <noscript> tags
  noscript: {
    default: 'This is content for browsers with no JS (or disabled JS)'
  }
}

// needs to be called in setup()
useMeta(metaData)
</script>

<style scoped>

</style>
