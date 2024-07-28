<script setup lang="ts">
import { ref } from 'vue';

const comment=ref("");
const commentHide=ref(false);

const items = ref([ {}, {}, {}, {}, {}, {}, {} ])
function onLoad (index, done) {
  setTimeout(() => {
    items.value.push({}, {}, {}, {}, {}, {}, {})
    done()
  }, 2000)
}
</script>

<template>
<q-page>
  <q-breadcrumbs class="text-brown q-ma-md">
    <template v-slot:separator>
      <q-icon
        size="1.5em"
        name="chevron_right"
        color="primary"
      />
    </template>

    <q-breadcrumbs-el label="首页" icon="home" to="/"/>
    <q-breadcrumbs-el label="世界首页" icon="widgets"  to="/world/index"/>
    <q-breadcrumbs-el label="世界列表" icon="navigation" to="/world/order" />
    <q-breadcrumbs-el :label="wname" icon="navigation" :to="{ path: '/world/detail', query: { wid: wid ,wname: wname,source: 1 }}" />
    <q-breadcrumbs-el label="评论列表" icon="navigation" :to="{ path: '/world/comment', query: { wid: wid ,wname: wname,sid: sid ,sname: sname,source: 2 }}" />
  </q-breadcrumbs>
  <q-card>
    <!--      <q-card-section>-->
    <!--        <div class="text-h6">Terms of Agreement</div>-->
    <!--      </q-card-section>-->


    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">评论回复</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-separator inset />
  </q-card>
  <q-list bordered>
    <q-item clickable v-ripple >
      <q-item-section avatar top>
        <q-avatar color="teal" text-color="white" icon="bluetooth" />
      </q-item-section>

      <q-item-section>
        <q-item-label>我是第一人</q-item-label>
        <q-item-label  caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        <div>
          <div class="q-gutter-sm">
            <div  >
              <q-item-label class="float-left q-ma-xs" caption>2022-11-11 11:23:23</q-item-label>
              <!--                          <q-btn color="primary" icon="mail" size="xs" label="On Left" />-->
              <q-btn class="float-right q-ma-xs" icon-right="mail" size="xs"  label="On Right" />
              <q-btn  class="float-right q-ma-xs" color="red" size="xs" icon="mail" icon-right="send" label="Right" />
            </div>
          </div>
        </div>
        <div v-if="commentHide == true">
          <div>
            <q-input filled v-model="comment"  />
          </div>
          <div class="float-right q-ma-xs">
            <q-btn color="red" icon="send"  label="发送评论" />
          </div>
          <!--                <q-btn color="primary" label="发布" />-->
        </div>

      </q-item-section>
    </q-item>

    <q-separator class="q-ma-md" inset />
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>8条回复</q-toolbar-title>
    </q-toolbar>
    <q-item-label header>8条回复</q-item-label>
    <div class="bg-grey-2">
      <q-infinite-scroll @load="onLoad" :offset="250">

        <q-item clickable v-ripple v-for="(item, index) in items" :key="index">
          <q-item-section avatar top>
            <q-avatar color="teal" text-color="white" icon="bluetooth" />
          </q-item-section>

          <q-item-section>
            <q-item-label>我是作者</q-item-label>
            <q-item-label  caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            <div>
              <div class="q-gutter-sm">
                <div  >
                  <q-item-label class="float-left q-ma-xs" caption>2022-11-11 11:23:23</q-item-label>
                  <!--                          <q-btn color="primary" icon="mail" size="xs" label="On Left" />-->
                  <q-btn class="float-right q-ma-xs" icon-right="mail" size="xs"  label="On Right" />
                  <q-btn  class="float-right q-ma-xs" color="red" size="xs" icon="mail" icon-right="send" label="Right" />
                </div>
              </div>
            </div>
            <div v-if="commentHide == true">
              <div>
                <q-input filled v-model="comment"  />
              </div>
              <div class="float-right q-ma-xs">
                <q-btn color="red" icon="send"  label="发送评论" />
              </div>
              <!--                <q-btn color="primary" label="发布" />-->
            </div>

          </q-item-section>
        </q-item>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>

    </div>
  </q-list>

</q-page>
</template>

<style scoped>

</style>
