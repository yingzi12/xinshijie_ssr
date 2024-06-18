<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { imageUrl } from 'src/utils/imageUtil';

const $q = useQuasar();
const router = useRouter()

interface Element {
  imageUrls: string;
  id: string;
  wid: string;
  wname: string;
  softtype: string;
  countEdit: string;
  userName: string;
  createName: string;
  updateName: string;
  updateTime:string;
  numberPhotos: string;
  countDiscuss: string;
  countLike: string;
  countSee: string;
  intro:string;
  title:string;
  cnameList:string;
  pageHtml:string;
  status:string;

  tags:string;
  idLabels:string;

}

const props = defineProps<{ value: Element }>();


function handleSee(id:number,wid:number,softtype:number){
  router.push("/element/details?eid="+id+"&wid="+wid+"&temType="+softtype);
}
</script>

<template>
  <q-item :to="{ path: '/element/detail', query: { wid: props.value.wid, eid: props.value.id }}">
    <q-item-section avatar>
      <img :src="imageUrl(props.value.imageUrls)" class="small-head-image">
    </q-item-section>

    <q-item-section>
      <q-item-label class="one-line-clamp">{{props.value.title}}</q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">{{props.value.createName}}</q-item-label>
      <q-item-label class="one-line-clamp text-weight-thin text-overline">
        <q-chip
          v-for="(item,index) in props.value.idLabels.split(',')"
          :key="index"
          class="q-ma-xs"
          :label="item.split('$$')[1]"
          size="sm"
          color="red"
          text-color="black"
          square
        />
      </q-item-label>

      <q-item-label class="one-line-clamp text-weight-thin text-overline">更新人：{{props.value.updateName}}</q-item-label>
<!--      <q-item-label class="one-line-clamp text-weight-thin text-overline">更新时间：{{props.value.updateTime}}</q-item-label>-->
      <q-item-label class="three-line-clamp" caption>{{props.value.intro}}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-item-label caption>{{props.value.updateTime}}</q-item-label>
      <q-icon name="star" color="yellow" />
    </q-item-section>
  </q-item>
</template>

<style scoped>

</style>
