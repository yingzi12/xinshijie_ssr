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

      <q-breadcrumbs-el label="Home" icon="home" />
      <q-breadcrumbs-el label="Components" icon="widgets" />
      <q-breadcrumbs-el label="Breadcrumbs" icon="navigation" />
    </q-breadcrumbs>
    <div>
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
      <div  class="q-ma-md bg-grey-2">
        <div class="text-h6">评论</div>
        <div class="row">
          <div class="q-pa-md">
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>          </div>
          <div style="width: 90%">
            <div class="q-pa-md" >
              <div >
                <q-input
                  v-model="text"
                  filled
                  type="textarea"
                />
              </div>
              <div class="float-right q-ma-xs">
                <q-btn color="red" icon="send"  label="发送评论" />
              </div>
            </div>
          </div>
        </div>
<!--        <div class="">-->
<!--          <div class="text-subtitle1">全部评论</div>-->
<!--          <q-separator   />-->
<!--        </div>-->
<!--        <div class="q-pa-lg flex flex-center">-->
<!--          <q-pagination-->
<!--            v-model="current"-->
<!--            color="purple"-->
<!--            :max="10"-->
<!--            :max-pages="6"-->
<!--            boundary-numbers-->
<!--          />-->
<!--        </div>-->
      </div>

      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">999条评论</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator inset />

        <q-card-section  class="scroll">
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

    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const alert=ref("");

const splitterModel= ref(200); // start at 150px
const  current= ref(6);
const seach=ref("");
const commitHide=ref(false);
const commit=ref("");
const text = ref("");
const items = ref([ {}, {}, {}, {}, {}, {}, {} ])
function onLoad (index, done) {
  setTimeout(() => {
    items.value.push({}, {}, {}, {}, {}, {}, {})
    done()
  }, 2000)
}
</script>

<style scoped>

</style>
