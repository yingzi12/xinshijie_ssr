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
          v-for="index in 10"
          :key="index"
          once
          transition="scale"
          class="example-item"
        >
          <q-card flat bordered class="q-ma-sm">
            <img src="https://usa.img111.top/uploads/1178/T/UGirls-APP/2642/2642_010_q9q_2766_4614.webp">

            <q-card-section>
              <div class="text-h6">Card #{{ index }}</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              {{ lorem }}
            </q-card-section>
          </q-card>
        </q-intersection>
      </div>
      <q-pagination
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
import { ref } from 'vue'
const current = ref(3)
const slide = ref('first')
const storyTypes=ref([
     {
       id:1,
       title:"",
       intro:"",
       imgUrl:"https://usa.img111.top/uploads/1178/T/UGirls-APP/2642/2642_010_q9q_2766_4614.webp",
     },
     {
       id:1,
       title:"",
       intro:"",
       imgUrl:"https://img.xiazai.de/usr/uploads/%E6%80%A7%E6%84%…%BE%8E%E8%89%B3%E5%9B%9B%E5%B0%84/njsasvgbvio.jpg",
     },
     {
       id:1,
       title:"",
       intro:"",
       imgUrl:"https://img.xiazai.de/usr/uploads/%E6%80%A7%E6%84%…%BE%8E%E8%89%B3%E5%9B%9B%E5%B0%84/njsasvgbvio.jpg",
     }
 ]
 )

const items = ref([ {}, {}, {}, {}, {}, {}, {} ])
const lorem="说的是顶顶涩涩的色色的"

const onLoad = (index: number, done: () => void) => {
  setTimeout(() => {
    items.value.push({}, {}, {}, {}, {}, {}, {})
    done()
  }, 2000)
}


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
</style>
