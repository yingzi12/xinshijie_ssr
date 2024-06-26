<script setup lang="ts">
import { ref } from 'vue';
import addReplyCommonComponent from 'components/discuss/addReplyCommentComponent.vue';
import { getImageUrl } from 'boot/tools';


interface Comment {
  did: string;
  id: string;
  wid: string;
  wname: string;
  title: string;
  pid: string;
  comment: string;
  circleUrl:string;
  upid: string;
  replyHide: string;
  replyComment:string;
  createId:string;
  createName:string;
  createTime:string;
  nickname:string;
  replyNickname:string;
  ranks: number;

  reply: string;
  countLike: number;
  countReply: number;
  countDisagree: number;
}
const props = defineProps<{ value: Comment }>();
const commentHide = ref(false);
</script>

<template>
  <q-item
    clickable
    v-ripple
  >
    <q-item-section avatar top>
      <q-avatar rounded size="48px">
        <q-img
          :src="getImageUrl(value.circleUrl)"
          @error.once="() => { $event.target.src = '/empty.jpg'; }"
        />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.value.nickname }} <span v-if="props.value.ranks !=1">回复 @{{ props.value.replyNickname }}</span></q-item-label>
      <q-item-label caption>
        {{ props.value.comment }}
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
        <add-reply-common-component :did="props.value.did" :upid="props.value.id"></add-reply-common-component>
      </div>
      </q-item-label>
    </q-item-section>
  </q-item>

</template>

<style scoped>

</style>
