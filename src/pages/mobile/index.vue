<template>
  <div>
    <q-tabs v-model="seach" shrink stretch>
      <q-input name="title" label="搜索" v-model="title" style="width: 600px"  @keyup.enter="getList(1)"/>          <q-icon name="search" @click="getList(1)"/>
    </q-tabs>

  </div>
  <div>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
    >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    </q-carousel>
  </div>
  <div>
    <div class="row q-pa-md q-gutter-sm justify-between">
     <div>
       <q-icon name="warning" color="warning" size="md" />
       <div>分类</div>
     </div>
      <div>
        <q-icon name="warning" color="warning" size="md" />
        <div>排行榜</div>
      </div>
      <div>
        <q-icon name="warning" color="warning" size="md" />
        <div>热门</div>
      </div>
      <div>
        <q-icon name="warning" color="warning" size="md" />
        <div>dd</div>
      </div>
    </div>
  </div>
  <div>
    <div class="q-pa-md">
        <div>
          <q-list bordered  class="rounded-borders" >
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title>随机推荐</q-toolbar-title>
            </q-toolbar>

            <q-item v-for="index in 4" :key="index" to="/story/detail">
              <q-item-section avatar>
                <img src="/150.webp" class="small-head-image">
              </q-item-section>

              <q-item-section>
                <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
                <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </div>
      <div>
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>随机推荐</q-toolbar-title>
        </q-toolbar>

          <div style="display: flex; flex-direction: row; overflow-x: scroll; white-space: nowrap;">
            <div v-for="item in 10" :key="item.id" class="item">
              <q-card  class="m-story-card"  @click="routerStory">
              <q-card-section>
                <img src="/600.webp" class="small-head-image content-center">
                <span class="one-line-clamp">Our Changing Planet</span>
                <span class="text-subtitle2">by John Doe</span>
                <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
              </q-card-section>

            </q-card>
            </div>
          </div>
      </div>
        <div >
          <q-list bordered  class="rounded-borders" >
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title>随机推荐</q-toolbar-title>
            </q-toolbar>
            <q-item>
              <div class="row justify-center q-gutter-sm">
                  <q-card  v-for="index in 4"  :key="index"  class="m-story-card"  @click="routerStory">
                    <q-card-section>
                      <img src="/600.webp" class="small-head-image content-center">
                      <span class="one-line-clamp">Our Changing Planet</span>
                      <span class="text-subtitle2">by John Doe</span>
                      <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                    </q-card-section>

                  </q-card>
<!--                </q-intersection>-->
              </div>
            </q-item>
          </q-list>
        </div>
      <div>
        <q-list bordered  class="rounded-borders" >
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>随机推荐</q-toolbar-title>
          </q-toolbar>
          <q-item>
            <div class="row">
              <q-item   v-for="index in 4"
                        :key="index" style="max-width: 150px;padding: 5px">
                <q-item-section avatar>
                  <img src="/150.webp" class="small-head-image" style="width: 49px;height: 65px">
                </q-item-section>
                <q-item-section>
                  <q-item-label class="two-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
                  <q-item-label class="two-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-item>
        </q-list>
      </div>

      <div>
          <q-list bordered  class="rounded-borders">
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title>随机推荐</q-toolbar-title>
            </q-toolbar>
            <q-item   v-for="index in 4"
                      :key="index">
              <q-item-section avatar>
                <img src="/150.webp" class="small-head-image">
              </q-item-section>

              <q-item-section>
                <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
                <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </div>
    </div>

  </div>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const seach=ref("")

const current = ref(1)
const slide = ref(1)

function routerWorld(){
  router.push("/world/detail");
}
function routerStory(){
  router.push("/story/detail");
}
</script>
<style>
.buttons-container > * {
  flex: 1 1 auto; /* 这将使得每个按钮占据相同的空间 */
}
</style>
