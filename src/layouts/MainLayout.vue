<template>
  <q-layout view="hhh LpR fff" style="height: 100vh;">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <HeadComponent></HeadComponent>
      <HeadTableComponent></HeadTableComponent>
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
import { defineComponent } from 'vue';
import HeadComponent from 'components/HeadComponent.vue';
import HeadTableComponent from 'components/HeadTableComponent.vue';

export default defineComponent({
  components: { HeadTableComponent, HeadComponent }
});
</script>
