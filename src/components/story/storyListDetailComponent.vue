<script setup lang="ts">
//order的部分
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { getImageUrl } from 'boot/tools';

const router = useRouter()
const $q = useQuasar();

interface Story {
  imgUrl: string;
  id: string;
  wid: string;
  wname: string;
  name: string;
  intro: string;
  tags: string;
  updateTime: string;
  userName: string;
  createName: string;
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
</script>

<template>
  <q-item  :to="{ path: '/story/detail', query: { wid: value.wid,sid: value.id }}">
    <q-item-section avatar>
      <q-img
        class="small-head-image"
        :src="getImageUrl(value.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label class="one-line-clamp">{{value.name}} <q-badge outline align="middle" color="teal">
        v.{{value.ranks}}
      </q-badge>
      </q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">{{value.createName ==null ? "未知" :value.createName }}</q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline"><q-chip color="yellow" size="xs">{{value.wname}}</q-chip></q-item-label>

      <q-item-label class="three-line-clamp" caption>{{value.intro}}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-item-label caption>{{value.updateTime}}</q-item-label>
      <q-chip class="glossy" color="yellow" text-color="white" icon-right="star">
        {{value.scores}}
      </q-chip>
    </q-item-section>
  </q-item>

</template>

<style scoped>

</style>
