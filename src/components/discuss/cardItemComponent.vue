<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { getImageUrl } from 'boot/tools';
const $q = useQuasar();
const router = useRouter()

interface Discuss {
  wid: string;
  id: string;
  sid: string;
  wname: string;
  sname: string;
  did: string;
  eid: string;
  countLike: number;
  countReply: number;
  reply: string;
  comment: string;
  title: string;
  circleUrl:string;
  createName:string;
  createTime:string;
  nickname:string;
  source:number;
  commentZip:string;
  countDisagree:number;
}

const props = defineProps<{ value: Discuss }>();

const dialogComm=ref(false);
const dialogReplay=ref(false);
//评论列表
const commentActive = ref('allComm')
const commentList = ref<Comment[]>([])
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

function imageUrl(imgUrl) {
  return `${$q.config.sourceWeb}${imgUrl}`;
}
function routerDetail() {
  if (props.value.source == 1) {
  router.push(`/discuss/detail?did=${props.value.id}&wid=${props.value.wid}&wname=${props.value.wname}&source=${props.value.source}`)
}else{
    router.push(`/discuss/detail?did=${props.value.id}&wid=${props.value.wid}&sid=${props.value.sid}&wname=${props.value.wname}&sid=${props.value.sname}&source=${props.value.source}`)
  }
}
</script>

<template>
  <q-item-section >
    <q-card class="my-card bg-secondary text-white">
        <q-item-section >
          <q-item clickable v-ripple>
            <q-item-section side>
              <q-avatar rounded size="48px">
                <q-img
                  :src="getImageUrl(value.circleUrl)"
                  @error.once="() => { $event.target.src = '/empty.jpg'; }"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ props.value.nickname }}</q-item-label>
<!--              <q-item-label caption>2 new messages</q-item-label>-->
            </q-item-section>
            <q-item-section side>
              {{props.value.createTime}}
            </q-item-section>
          </q-item>
        </q-item-section>
      <q-card-section @click="routerDetail()">
        <q-item-label class="five-line-clamp text-h6" >{{props.value.title}}</q-item-label>
        <q-item-label class="five-line-clamp" lines="5" caption><div v-html="props.value.commentZip"></div></q-item-label>
      </q-card-section>
<!--      <q-card-section>-->
<!--        <div>-->
<!--          -->
<!--        </div>-->
<!--      </q-card-section>-->

      <q-separator dark />

      <q-card-actions>
        <q-chip flat icon="assistant_navigation">赞同 {{props.value.countLike}}</q-chip>
        <q-chip flat icon="arrow_drop_down_circle">反对 {{props.value.countDisagree}}</q-chip>
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
