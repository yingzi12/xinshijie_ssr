<template>
  <q-page class="">
    <div class="q-pa-md">
      <q-carousel
        arrows
        animated
        thumbnails
        v-model="slide"
        height="400px"
      ></q-carousel>
    </div>
    <div class="q-pa-md">
      <div class="row justify-center q-gutter-sm">
        <q-infinite-scroll @refresh="onLoad">
          <q-intersection
            v-for="stroy in storyTypes"
            :key="stroy.id"
            once
            transition="scale"
            class="example-item"
          >
            <q-card flat bordered class="q-ma-sm">
              <img :src="stroy.imgUrl" />
              <q-card-section>
                <div class="text-h6">Card #{{ stroy.id }}</div>
                <div class="text-subtitle2">by John Doe</div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                {{ lorem }}
              </q-card-section>
            </q-card>
          </q-intersection>
        </q-infinite-scroll>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";

const slide = ref("first");

const storyTypes = ref([]);

const lorem = "说的是顶顶涩涩的色色的";

const onLoad = (index: number, done: () => void) => {
  console.log("下拉刷新");
  setTimeout(() => {
    storyTypes.value = storyTypes2.value.concat(storyTypes.value);
    done();
    // 将 intersection 组件放到 done() 回调函数中
    <q-intersection
    v-for="stroy in storyTypes"
      :key="stroy.id"
    once
    transition="scale"
    class="example-item"
      >
      <q-card flat bordered class="q-ma-sm">
      <img :src="stroy.imgUrl" />
    <q-card-section>
    <div class="text-h6">Card #{{ stroy.id }}</div>
  <div class="text-subtitle2">by John Doe</div>
  </q-card-section>
  <q-card-section class="q-pt-none">
    {{ lorem }}
  </q-card-section>
  </q-card>
  </q-intersection>
}, 2000);
};
</script>
<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)

.q-carousel__slide
  background-size: contain
.example-item
  height: 600px
  width: 260px
.q-card img
  object-fit: cover
</style>
