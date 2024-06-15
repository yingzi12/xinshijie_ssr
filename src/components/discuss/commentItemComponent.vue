<script setup lang="ts">
import { useQuasar } from 'quasar';
import { defineEmits, ref } from 'vue';
import addReplyCommonComponent from 'components/discuss/addReplyCommentComponent.vue';
import replyCommonItemComponent from 'components/discuss/replyCommentItemComponent.vue';
import moreCommentComponent from 'components/discuss/moreCommentComponent.vue';
import { getImageUrl } from 'boot/tools';

const $q = useQuasar();

interface Comment {
  did: string;
  id: string;
  wid: string;
  wname: string;
  title: string;
  pid: string;
  comment: string;
  circleUrl:string;
  ranks: string;
  upid: string;
  replyHide: string;
  replyComment:string;
  replyNickname: string;
  createId:string;
  createName:string;
  createTime:string;
  nickname:string;
  reply: string;
  countLike: number;
  countReply: number;
  countDisagree: number;
  replyList:Array<RepayComment>;
}
interface RepayComment {
  did: string;
  id: string;
  wid: string;
  wname: string;
  title: string;
  circleUrl:string;
  pid: string;
  comment: string;
  ranks: string;
  upid: string;
  replyHide: string;
  replyNickname: string;
  replyComment:string;
  createId:string;
  createName:string;
  createTime:string;
  nickname:string;
  reply: string;
  countLike: number;
  countReply: number;
  countDisagree: number;
}
const props = defineProps<{ value: Comment }>();

const commentHide = ref(false);
const dialogMore = ref(false);

function onMore(){
  dialogMore.value=true;
}

</script>

<template>
  <q-item
    v-ripple
  >
    <q-item-section avatar top>
      <q-avatar rounded size="48px">
        <q-img
          :src="getImageUrl(props.value.circleUrl)"
          @error.once="() => { $event.target.src = '/empty.jpg'; }"
        />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.value.nickname }} <span v-if="props.value.ranks !=1 && props.value.ranks !=0">回复 @{{ props.value.replyNickname }}</span></q-item-label>
      <q-item-label caption>
        <div v-html="props.value.comment"></div>
      </q-item-label>
      <q-item-label>
      <div>
        <div class="q-gutter-sm">
          <div  >
            <q-item-label class="float-left q-ma-xs" caption>{{props.value.createTime}}
              <q-chip clickable class="q-ma-xs" color="blue" size="xs" icon="chat" label="回复" @click="commentHide? commentHide =false :commentHide=true"/>
            </q-item-label>
            <q-chip class="float-right" flat icon="assistant_navigation" size="xs">赞同 {{props.value.countLike}}</q-chip>
            <q-chip class="float-right"  flat icon="arrow_drop_down_circle" size="xs">反对 {{props.value.countDisagree}}</q-chip>
          </div>
        </div>
      </div>
      </q-item-label>
      <q-item-label>
      <div v-if="commentHide == true">
        <add-reply-common-component :did="props.value.did" :upid="props.value.id" ></add-reply-common-component>
      </div>
      </q-item-label>
      <q-item-label>
      <!--                    回复-->
      <div>
        <q-list bordered>
          <div  v-for="(reply,index) in props.value.replyList" :key="index">
            <reply-common-item-component :value="reply"/>
          </div>
        </q-list>
        <q-btn v-if="props.value.replyList != null && props.value.replyList.length==3" class="q-ma-md" color="grey" icon="send" @click="onMore" label="查看更多 > "  />
      </div>
      </q-item-label>
    </q-item-section>
  </q-item>
  <q-dialog v-model="dialogMore" style="max-width: 500px;max-width: 300px;min-height: 400px">
    <q-card>
      <q-card-section>
        <div class="text-h6">更多评论</div>
      </q-card-section>
      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <more-comment-component :did="props.value.did"></more-comment-component>
      </q-card-section>
      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="关闭" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<style scoped>

</style>
