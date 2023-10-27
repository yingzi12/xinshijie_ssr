<template>
  <q-layout view="hhh LpR fff" style="height: 100vh;">

    <q-header class="bg-primary text-black" height-hint="98" >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          图集网
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="首页" />
        <q-route-tab to="/findImage" label="寻找图片" />
        <q-route-tab to="/page3" label="用户中心" />
      </q-tabs>
    </q-header>

    <q-page-container style="height: 100%;">
      <router-view />
    </q-page-container>

<!--    <q-footer class="bg-grey-8 text-white">-->
<!--      <q-toolbar>-->
<!--        <q-toolbar-title>-->
<!--          <q-avatar>-->
<!--            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">-->
<!--          </q-avatar>-->
<!--          <div>Title</div>-->
<!--        </q-toolbar-title>-->
<!--      </q-toolbar>-->
<!--    </q-footer>-->

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      tab: ref('images')
    }
  }
}
</script>
