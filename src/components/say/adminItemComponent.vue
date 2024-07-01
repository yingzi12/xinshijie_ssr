<script setup lang="ts">

import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { getImageUrl } from 'boot/tools';

const $q = useQuasar();
const router = useRouter()

interface Discuss {
  id: string;
  wid: string;
  wname: string;
  sid: string;
  sname: string;
  reply: string;
  status: number;
  eid: string;
  title: string;
  types: string;
  circleUrl: string;
  nickname: string;
  source: number;
  commentZip: number;
  countLike: number;
  countReply: number;
  countDisagree: number;
  createTime: string;

}

const props = defineProps<{ value: Discuss }>();

</script>

<template>
  <q-item>
    <q-item-section avatar top>
      <q-avatar>
        <q-img
          :src="getImageUrl(value.circleUrl)"
          @error.once="() => { $event.target.src = '/empty.jpg'; }"
        />
      </q-avatar>
    </q-item-section>

    <q-item-section  top side >
      <q-item-label class="q-mt-sm text-h6">{{value.title}}</q-item-label>
      <q-item-label class="q-mt-sm text-subtitle2">{{value.nickname}}</q-item-label>
      <q-item-label class="q-mt-sm text-subtitle2">创建时间：{{value.createTime}}</q-item-label>
      <q-item-label lines="2"> {{value.commentZip}}</q-item-label>
    </q-item-section>
    <q-item-section top side>
      <q-item-label lines="1">
        <span class="text-weight-medium">回复：</span>
        <span class="text-grey-8">{{value.countReply}}</span>
      </q-item-label>
      <q-item-label lines="1">
        <span class="text-weight-medium">点赞：</span>
        <span class="text-grey-8">{{value.countLike}}</span>
      </q-item-label>
<!--      <q-item-label lines="1">-->
<!--        <span class="text-weight-medium">反对：</span>-->
<!--        <span class="text-grey-8">{{value.countDisagree}}</span>-->
<!--      </q-item-label>-->
    </q-item-section>

    <q-item-section top side >
      <div class="text-grey-8 q-gutter-xs">
        <q-btn class="gt-xs" size="12px" flat dense round icon="lock" />
        <!--            <q-btn class="gt-xs" size="12px" flat dense round icon="done" />-->
        <!--            <q-btn size="12px" flat dense round icon="more_vert" />-->
      </div>
    </q-item-section>
  </q-item>

</template>

<style scoped>

</style>
