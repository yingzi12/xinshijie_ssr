<template>
  <q-page >
    <div class="q-pa-md">
      <q-carousel
        arrows
        animated
        thumbnails
        v-model="slide"
        height="400px"
      >
        <q-carousel-slide name="first" img-src="https://file2.aazz263.info/images/2021/07/29272649.jpg">
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">First stop</div>
            <div class="text-subtitle1">Mountains</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="second" img-src="https://usa.img111.top/uploads/1178/T/UGirls-APP/2687/2687_010_c6k_2766_4614.webp">
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Second stop</div>
            <div class="text-subtitle1">Famous City</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="third" img-src="https://usa.img111.top/uploads/1178/T/UGirls-APP/2642/2642_010_q9q_2766_4614.webp">
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Third stop</div>
            <div class="text-subtitle1">Famous Bridge</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
      <div class="row justify-center q-gutter-sm">
        <q-intersection
          v-for="(album ,index) in albumList"
          :key="index"
          once
          transition="scale"
          class="example-item"
        >
          <q-card flat bordered class="q-ma-sm">
            <img :src="image">
            <q-card-section>
              <div class="text-h6"><a :href='"/#/detail?aid="+album.id'>{{album.title}}</a></div>
              <div class="text-subtitle2">{{album.createTime}}</div>
            </q-card-section>
<!--            <q-card-section class="q-pt-none">-->
<!--              {{ lorem }}-->
<!--            </q-card-section>-->
          </q-card>

        </q-intersection>
      </div>
      <q-pagination class="caption"
        v-model="current"
        max="5"
        direction-links
        flat
        color="grey"
        active-color="primary"
      />
    </div>
    <div>

    </div>
  </q-page>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs} from 'vue'
// import { listAlbum } from "../api/album";
import { api,tansParams } from 'boot/axios'

const current = ref(3)
const slide = ref('first')

const albumList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    title:undefined,
  },
  rules: {
  }
});
const image=ref("")
const { queryParams, form, rules } = toRefs(data);
function getList(page: number) {
  window.scrollTo(0, 0); // 滚动到顶部
  queryParams.value.pageNum=page;
  api.get("album/list"+'?' + tansParams(queryParams.value)).then(response => {
    albumList.value = response.data.data;
    total.value = response.data.total;
    image.value="https://usa.img111.top/uploads/1178/T/UGirls-APP/2642/2642_010_q9q_2766_4614.webp"
  }) .catch(() => {
    console.log("dddddddddd")
  });
}
getList(1)


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
.q-pagination
  text-align: center
.caption
  display: flex
  justify-content: center
  align-items: center
</style>
