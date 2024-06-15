<script setup lang="ts">
//order的部分
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()
const $q = useQuasar();

interface Story {
  imgUrl: string;
  id: string;
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
const tagList=ref([]);
if(props.value.tags != null){
  tagList.value=props.value.tags.split(";");
}
function imageUrl(imgUrl) {
  return `${$q.config.sourceWeb}${imgUrl}`;
}
</script>

<template>
  <q-item  :to="{ path: '/admin/story/info', query: { sid: value.id,sname: value.name }}">
    <q-item-section avatar>
      <img
        class="small-head-image"
        :src="imageUrl(value.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label class="one-line-clamp">{{value.name}} <q-badge outline align="middle" color="teal">
        v.{{value.ranks}}
      </q-badge>
      </q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">{{value.createName ==null ? "未知" :value.createName }}</q-item-label>
      <q-item-label class="three-line-clamp" caption>{{value.intro}}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-item-label caption><q-btn icon="edit" label="修改" size="xs"></q-btn></q-item-label>
      <q-item-label caption><q-btn icon="delete" label="删除" size="xs"></q-btn></q-item-label>
      <q-item-label caption><q-btn icon="publish" label="发布" size="xs"></q-btn></q-item-label>
      <q-item-label caption><q-btn icon="unpublished" label="下架" size="xs"></q-btn></q-item-label>
    </q-item-section>
  </q-item>

</template>

<style scoped>

</style>
