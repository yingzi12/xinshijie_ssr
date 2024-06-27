<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Cookies, useMeta } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数

const metaData = {
  // sets document title
  title: '心世界网',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - 最热门 Photo Gallery, Beauty, Photo, Photography, Showman.com`,

  // meta tags
  meta: {
    verification:{name:"baidu-site-verification", content:"codeva-y79QY7Z0Nm"},
    description: { name: 'description', content: '心世界网  最热门 世界观 游戏 故事 小说 背景 电影 电视剧 Photo Gallery, Beauty, Photo, Photography, Showman.com' },
    keywords: { name: 'keywords', content: '心世界网 最热门 世界观 游戏 故事 小说 背景 电影 电视剧 Photo Gallery, Beauty, Photo, Photography, Showman.com' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle:  {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template (ogTitle) {
        return `${ogTitle} - 最热门 心世界网 世界观 游戏 故事 小说 背景 电影 电视剧  Photo Gallery, Beauty, Photo, Photography, Showman.com`
      }
    }
  },
}
useMeta(metaData)
// const       tab= ref('images');
// 创建一个响应式引用作为默认语言
const defaultLanguage = ref('en');

const { locale } = useI18n()
const options= [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: '中文',
    value: 'zh-CN'
  }
]


// 设置默认语言的方法
const setDefaultLanguage = () => {
  const userLang = navigator.language || navigator.userLanguage;
  const availableLanguages = ['en', 'zh-CN']; // 示例语言列表

  if (availableLanguages.includes(userLang)) {
    locale.value = userLang;
  } else {
    locale.value = defaultLanguage.value;
  }
  Cookies.set("language",locale.value);
};
function updateLanguage(language){
  console.log(`----updateLanguage-----${language}---------`);
  Cookies.set("language",language);

}
// 在组件挂载后调用设置默认语言的方法
onMounted(() => {
  const language = Cookies.get("language");
  console.log(language);
  if( language == null ){
    console.log("----1--------------");
    setDefaultLanguage();
  }else{
    console.log("----2--------------");
    locale.value = language;
  }
});
</script>

<template>
<!--  <q-header elevated class="bg-purple">-->
    <q-toolbar>
      <q-avatar avatar @click="router.push('/')">
        <q-img src="/logo.ico" alt="首页" />
      </q-avatar>


      <q-toolbar-title>心世界</q-toolbar-title>
      <q-btn flat round dense icon="whatshot" to="/users/index" />
      <q-btn flat round dense icon="manage_accounts" to="/admin/index"/>
      <q-select
        filled
        v-model="locale"
        :options="options"
        label="Standard"
        emit-value
        map-options
        @update:model-value="updateLanguage"
      />

    </q-toolbar>
<!--    <q-tabs-->
<!--      v-model="tab"-->
<!--      inline-label-->
<!--      class="shadow-2"-->
<!--    >-->
<!--      <q-route-tab name="Home" icon="home" to="/" label="首页" />-->
<!--      <q-route-tab name="alarms" icon="public" to="/world/index" label="世界" />-->
<!--      <q-route-tab name="movies" icon="menu_book" to="/story/index" label="故事" />-->
<!--      <q-route-tab name="order" icon="category" to="/order" label="排行榜" />-->
<!--      <q-route-tab name="yard" icon="yard" to="/yard" label="家园" />-->
<!--      <q-route-tab name="service" icon="manage_accounts" label="客服端" />-->
<!--      <q-route-tab name="help" icon="help" label="帮助中心" />-->
<!--    </q-tabs>-->
<!--  </q-header>-->
</template>

<style scoped>

</style>
