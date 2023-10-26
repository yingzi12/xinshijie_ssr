<template>
  <q-page>
  <div class="q-pa-md">
<!--    标题页-->
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Overline</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
          <div class="text-caption text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat>
          7:30PM
        </q-btn>
        <q-btn flat color="primary">
          Reserve
        </q-btn>
      </q-card-actions>
    </q-card>
<!--    内容页-->
    <q-infinite-scroll @load="onLoad" :offset="250">
      <div v-for="(item, index) in items" :key="index" class="caption">
        <q-img :headers="{
        'custom-header': 'my-custom-value',
      }" src="https://usa.img111.top/uploads/1178/T/UGirls-APP/2642/2642_010_q9q_2766_4614.webp" class="responsive-image"/>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref([{}, {}, {}])
const isRefreshing = ref(false)

const onLoad = (index: number, done: () => void) => {
  isRefreshing.value = true
  setTimeout(() => {
    console.log("index:"+index.toString())
    items.value.push({}, {}, {})
    isRefreshing.value = false
    done()
  }, 2000)
}


</script>
<style  lang="sass"  scoped>
.responsive-image
  max-width: 100%
  height: auto
  margin: 0 auto

.caption
  display: flex
  justify-content: center
  align-items: center


</style>
