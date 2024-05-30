<script setup lang="ts">
import { ref } from 'vue';

const splitterModel= ref(200); // start at 150px
const  current= ref(6);
const seach=ref("");
const commitHide=ref(false);

const alert=ref(false);
const alert2=ref(false);

const commit=ref("");

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
      <q-breadcrumbs-el label="我的世界" icon="navigation"  to="/world/detail"/>
      <q-breadcrumbs-el label="小说列表" icon="navigation"  to="/world/story"/>
      <q-breadcrumbs-el label="小说信息" icon="navigation"  to="/story/detail"/>
      <q-breadcrumbs-el label="讨论列表" icon="navigation"  to="/story/discuss"/>
      <q-breadcrumbs-el label="讨论详细" icon="navigation"  to="/story/discuss"/>

    </q-breadcrumbs>
  <div class="q-pa-md">
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>人气 </q-toolbar-title>
        <q-input rounded outlined v-model="seach" label="搜索..." />
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </div>
  </div>
  <div class="q-pa-md q-gutter-md">
    <q-list bordered padding class="rounded-borders">
      <q-item v-for="index in 10" :key="index" >
        <q-item-section >
          <q-card class="my-card bg-secondary text-white">
            <q-card-section>
              <div class="text-h6">Our Changing Planet</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>

            <q-card-section>
              <q-item-label class="five-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-card-section>

            <q-separator dark />

            <q-card-actions>
              <q-btn flat icon="assistant_navigation">赞同 111</q-btn>
              <q-btn flat icon="arrow_drop_down_circle">反对</q-btn>
              <q-btn flat icon="textsms" @click="alert = true">2条评论</q-btn>
              <q-btn flat icon="grade">收藏</q-btn>

            </q-card-actions>
          </q-card>
        </q-item-section>


      </q-item>
      <q-separator spaced />

    </q-list>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="current"
        color="purple"
        :max="10"
        :max-pages="6"
        boundary-numbers
      />
    </div>
  </div>
  </q-page>
  <q-dialog v-model="alert" >
    <q-card>
<!--      <q-card-section>-->
<!--        <div class="text-h6">Terms of Agreement</div>-->
<!--      </q-card-section>-->


      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">999条评论</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator inset />

      <q-card-section style="max-height: 50vh" class="scroll">
                <q-list bordered>

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
                        <q-btn  class="float-right q-ma-xs" color="red" size="xs" icon="mail" icon-right="send" label="Right" @click="commitHide =true"/>
                        </div>
                      </div>
                    </div>
                    <div v-if="commitHide == true">
                      <div>
                        <q-input filled v-model="commit"  />
                      </div>
                      <div class="float-right q-ma-xs">
                        <q-btn color="red" icon="send"  label="发送评论" />
                      </div>
                      <!--                <q-btn color="primary" label="发布" />-->
                    </div>
<!--                    回复-->
                    <div>
                      <q-list bordered>
                        <q-item clickable v-ripple v-for="index in 3" :key="index">
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
                            <div>

                            </div>
                            <div v-if="commitHide == true">
                              <div>
                                <q-input filled v-model="commit"  />
                              </div>
                              <div class="float-right q-ma-xs">
                                <q-btn color="red" icon="send"  label="发送评论" />
                              </div>
                              <!--                <q-btn color="primary" label="发布" />-->
                            </div>

                          </q-item-section>
                        </q-item>
                      </q-list>
                      <q-btn class="q-ma-md" color="grey" icon="send" @click="alert2 = true" label="查看更多 > " />
                    </div>

                  </q-item-section>
                </q-item>
                  <template v-slot:loading>
                    <div class="row justify-center q-my-md">
                      <q-spinner-dots color="primary" size="40px" />
                    </div>
                  </template>
                  </q-infinite-scroll>
                </q-list>
      </q-card-section>

      <q-separator />
<!--      <q-card-section class="q-pt-none">-->


<!--      </q-card-section>-->
    </q-card>
  </q-dialog>
<!--  评论回复-->
  <q-dialog v-model="alert2" >
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

      <q-card-section style="max-height: 50vh" class="scroll">
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
              <div v-if="commitHide == true">
                <div>
                  <q-input filled v-model="commit"  />
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
              <div v-if="commitHide == true">
                <div>
                  <q-input filled v-model="commit"  />
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
      </q-card-section>
    </q-card>
  </q-dialog>

</template>

<style scoped>

</style>
