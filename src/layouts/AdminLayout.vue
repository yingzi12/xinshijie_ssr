<template>
  <q-layout view="hHh lpR fff">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-avatar avatar @click="router.push('/')">
          <img src="/logo.ico" alt="首页" />
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

    </q-header>
    <q-drawer
      v-model="leftDrawerOpen" side="left"
      :width="250"
      show-if-above
      bordered
    >
      <q-scroll-area style="height: calc(100% - 150px);  border-right: 1px solid #ddd">
        <div class="bg-grey-2 text-center q-ma-md">
            <q-avatar  class="q-mb-sm" size="56px">
              <q-img
                :src="getImageUrl(circleUrl)"
                @error.once="() => { $event.target.src = '/empty.jpg'; }"
              />
            </q-avatar>
            <div class="text-weight-bold">'待登录' </div>
            <div>
              xun3357234@24.com
              <q-icon  name="warning" style="color: red"/>
            </div>
            <div >
              (发送验证邮件)
            </div>
            <div>
              <q-btn to="/users/index">个人信息</q-btn>
            </div>
        </div>
        <q-list padding>
          <q-item v-ripple
                  :active="link === 'detail'"
                  active-class="my-menu-link"
                  clickable
                  to="/admin/world/index"
                  @click="link = 'detail'"
          >
            <q-item-section avatar>
              <q-icon name="account_circle"/>
            </q-item-section>

            <q-item-section>
              世界管理
            </q-item-section>
          </q-item>

          <q-item v-ripple
                  :active="link === 'attention'"
                  active-class="my-menu-link"
                  clickable
                  to="/admin/draft/element"
                  @click="link = 'attention'"
          >
            <q-item-section avatar>
              <q-icon name="favorite_border"/>
            </q-item-section>

            <q-item-section>
              元素草稿
            </q-item-section>
          </q-item>
          <q-item v-ripple
                  :active="link === 'collection'"
                  active-class="my-menu-link"
                  clickable
                  to="/admin/story/index"
                  @click="link = 'collection'"
          >
            <q-item-section avatar>
              <q-icon name="star_rate"/>
            </q-item-section>

            <q-item-section>
              故事管理
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item v-ripple
                  :active="link === 'buy'"
                  active-class="my-menu-link"
                  clickable
                  to="/admin/draft/chapter"
                  @click="link = 'buy'"
          >
            <q-item-section avatar>
              <q-icon name="shopping_bag"/>
            </q-item-section>
            <q-item-section>
             章节管理
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
            :active="link === 'drafts'"
            active-class="my-menu-link"
            clickable
            @click="logout"
          >
            <q-item-section avatar>
              <q-icon name="exit_to_app"/>
            </q-item-section>

            <q-item-section>
              {{ $t(`user.logOut`) }}
            </q-item-section>
          </q-item>

          <q-separator/>

        </q-list>
      </q-scroll-area>
      <q-scroll-area>
        这是一个测试
      </q-scroll-area>
<!--      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">-->
<!--        <div class="absolute-bottom bg-transparent">-->
<!--          <q-avatar  class="q-mb-sm" size="56px">-->
<!--            <img :src="getImageUrl('23234')">-->
<!--          </q-avatar>-->
<!--          <div class="text-weight-bold">'待登录' </div>-->
<!--          <div>-->
<!--            xun3357234@24.com-->
<!--            <q-icon  name="warning" style="color: red"/>-->
<!--          </div>-->
<!--          <div >-->
<!--            (发送验证邮件)-->
<!--          </div>-->
<!--          <div>-->
<!--            <q-btn to="/users/index">个人信息</q-btn>-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-img>-->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
<!--        <q-toolbar-title>-->
<!--          <q-avatar>-->
<!--            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">-->
<!--          </q-avatar>-->
<!--          <div>Title</div>-->
          <div class="row">
            <div class="col-2"></div>
            <div class="col-auto" style="margin: 0px">
              <div class="footter" style="margin: 0px;text-align: center;">
                <router-link to="">关于心世界</router-link>
                |
                <router-link to="">联系我们</router-link>
                |
                <router-link to="">帮助中心</router-link>
                |
                <router-link to="">提交建议</router-link>
                |
                <router-link to="">举报中心</router-link>
                |
                <router-link to="/privacyPolicy">隐私政策</router-link>
                |
                <router-link to="/use">使用条款</router-link>
                |
                <router-link to="">漏洞提交</router-link>
                |
              </div>
              <div class="footerText text-weight-thin"><p>Copyright © 2002-2022 www.aiavr.uk Rights Reserved 版权所有
                心世界未来科技有限公司</p></div>
              <div class="footerText text-weight-thin"><p>图片,美女,写真,心世界</p></div>
              <div class="footerText text-weight-light"><p>
                本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任</p>
              </div>
              <div class="footerText text-weight-thin"><a href="https://www.51k.uk">心世界小说网</a>|<a
                href="https://www.30dizhi.uk">30导航</a>|<a href="https://www.aravrw.com">心世界</a></div>
            </div>
            <div class="col-2"></div>
          </div>

<!--        </q-toolbar-title>-->
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import { Cookies, useMeta, useQuasar } from 'quasar';
import {api} from "boot/axios";
import { onMounted, ref } from 'vue';
import {useRouter} from "vue-router";
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const $q = useQuasar();
const circleUrl=Cookies.get("avatar");

import { useI18n } from 'vue-i18n';
import { getImageUrl } from 'boot/tools';
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
// 创建一个响应式引用作为默认语言
const defaultLanguage = ref('en');
// 设置默认语言的方法
// const setDefaultLanguage = () => {
//   const userLang = navigator.language || navigator.userLanguage;
//   const availableLanguages = ['en', 'zh-CN']; // 示例语言列表
//
//   if (availableLanguages.includes(userLang)) {
//     locale.value = userLang;
//   } else {
//     locale.value = defaultLanguage.value;
//   }
// };


const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
  console.log("------------------------")
  console.log(leftDrawerOpen.value)
}
const link = ref('detail')

// // 在组件挂载后调用设置默认语言的方法
// onMounted(() => {
//   setDefaultLanguage();
// });
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
const logout = async () => {
  try {
    const response = await api.get(`/admin/systemUser/logout`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    Cookies.remove("token");
    Cookies.remove("id");
    Cookies.remove("userInfo");
    router.push('/login'); // 假设登录页面的路由为 '/login'
  }catch (error){
    Cookies.remove("token");
    Cookies.remove("id");
    Cookies.remove("userInfo");
    router.push('/login'); // 假设登录页面的路由为 '/login'
  }
};

// 在组件挂载后调用设置默认语言的方法
onMounted(() => {
  const language = Cookies.get("language");
  console.log(language);
  if( language == null ){
    setDefaultLanguage();
  }else{
    locale.value = language;
  }
});
</script>
