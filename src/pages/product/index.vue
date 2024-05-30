<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
function routerWorld(){
  router.push("/product/buy");
}
</script>

<template>
  <q-toolbar >
    <q-btn flat round dense icon="menu" />
    <q-toolbar-title>
      世界推荐
    </q-toolbar-title>
    <q-btn flat round dense icon="more_horiz" to="/world/order"/>
  </q-toolbar>
  <div>
    <q-list bordered  class="rounded-borders" >
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>随机推荐</q-toolbar-title>
      </q-toolbar>
      <q-item>
        <div class="row justify-center q-gutter-sm">
          <q-intersection
            v-for="index in 12"
            :key="index"
            class="example-item"
          >
            <q-card class="story-card">
              <q-card-section @click="routerWorld">
                <img src="/600.webp" class="small-head-image content-center">
                <div class="one-line-clamp">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
                <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
              </q-card-section>
            </q-card>
          </q-intersection>
        </div>
      </q-item>
    </q-list>
  </div>

</template>

<style scoped>

</style>
