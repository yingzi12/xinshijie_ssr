<script setup lang="ts">
interface Discuss {
  wid: string;
  id: string;
  sid: string;
  wname: string;
  sname: string;
  did: string;
  eid: string;
  countLike: string;
  countReply: string;
  reply: string;
  comment: string;
  title: string;
  circleUrl:string;
  createName:string;
  nickname:string;
  source:string;
  commentZip:string;

}

const props = defineProps<{ value: Discuss }>();
</script>

<template>
  <q-item-section >
    <q-card class="my-card bg-secondary text-white">
      <q-card-section>
        <div class="text-h6">
          <router-link to="/discuss/detail">Our Changing Planet</router-link>
        </div>
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

</template>

<style scoped>

</style>
