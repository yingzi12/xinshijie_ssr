<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { getImageUrl } from 'boot/tools';
const $q = useQuasar();
const router = useRouter()

interface Say {
  id: string;
  content: string;
  countLike: number;
  createTime: string;
  updateTime: string;
  urls: string;
  userId:string;
  userName:string;
  userNickname:string;
  countReply:number;
}

const props = defineProps<{ value: Say }>();

const dialogComm=ref(false);
const dialogReplay=ref(false);
//评论列
const commentHide=ref(false);

const loading = ref(true);
const comment=ref("");

const items = ref([ {}, {}, {}, {}, {}, {}, {} ])
function onLoad (index, done) {
  setTimeout(() => {
    items.value.push({}, {}, {}, {}, {}, {}, {})
    done()
  }, 2000)
}

function routerDetail() {
    router.push(`/say/detail?usid=${props.value.id}`);
}
</script>

<template>
  <q-item-section >
    <q-card class="my-card bg-secondary text-white">
      <q-card-section @click="routerDetail()">
        <q-item-label class="five-line-clamp" lines="5" caption><div v-html="props.value.content"></div></q-item-label>
        <q-item-label class="five-line-clamp text-h6" >        {{props.value.createTime}}</q-item-label>
      </q-card-section>
      <q-separator dark />

      <q-card-actions>
        <q-chip flat icon="assistant_navigation">点赞 {{props.value.countLike}}</q-chip>
        <q-chip flat icon="textsms" @click="dialogComm = true">{{props.value.countReply}}条评论</q-chip>
        <q-chip flat icon="grade">收藏</q-chip>
      </q-card-actions>
    </q-card>
  </q-item-section>

  <q-dialog v-model="dialogComm" >
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{props.value.countReply}}条评论</div>
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
                      <q-btn  class="float-right q-ma-xs" color="red" size="xs" icon="mail" icon-right="send" label="Right" @click="commentHide =true"/>
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
                  </q-list>
                  <q-btn class="q-ma-md" color="grey" icon="send" @click="dialogReplay = true" label="查看更多 > " />
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
  <q-dialog v-model="dialogReplay" >
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
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
