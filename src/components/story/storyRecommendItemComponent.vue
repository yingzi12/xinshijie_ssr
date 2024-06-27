<template>
  <q-item  :to="{ path: '/story/detail', query: { sid: props.value.sid }}">
    <q-item-section avatar>
      <!--                <img src="/150.webp" class="small-head-image">-->
      <q-img
        @click="routerStory(props.value.sid)"
        class="small-head-image"
        :src="getImageUrl(props.value.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label class="one-line-clamp">{{props.value.name}}</q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">{{props.value.createName == null?"未知":props.value.createName }}</q-item-label>
      <q-item-label class="three-line-clamp" caption>{{props.value.intro}}</q-item-label>
    </q-item-section>
  </q-item>

</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { imageUrl } from 'src/utils/imageUtil';
import { getImageUrl } from 'boot/tools';

const router = useRouter()
const $q = useQuasar();

interface Story {
  imgUrl: string;
  sid: string;
  name: string;
  intro: string;
  tags: string;
  updateTime: string;
  userName: string;
  createName: string;
  numberPhotos: string;
  countDiscuss: string;
  countLike: string;
  countSee: string;
  ranks:number;
  scores:number;
}
const props = defineProps<{ value: Story }>();

function routerStory(sid){
  router.push("/story/detail?sid="+sid);
}
</script>

<style scoped>
/* 如果需要，可以在这里添加额外的样式 */
</style>
