<script setup lang="ts">
import { ref } from 'vue';

const model= ref(10)
const discountAmount=ref(10)

</script>

<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary text-white">
      <img src="https://cdn.quasar.dev/img/mountains.jpg">
      <div class="text-h6" >月会会员</div>
      <q-btn  class="left-3" flat>价格：10</q-btn>
    </q-card-section>
    <q-card-section>
      这是商品介绍事实上是事实上是事实上是事实上
      是否是对冯绍峰史蒂夫说对方
    </q-card-section>
    <q-separator />
    <q-separator dark />

    <q-card-actions >
      <q-input
        v-model.number="model"
        type="number"
        filled
        style="max-width: 200px"
      />
      <q-btn  class="left-3" flat>付款金额：{{discountAmount}}</q-btn>

    </q-card-actions>
    <q-separator />

    <q-card-actions justify-center>
      <div >
        <div id="paypal-button-container" class="paypal-button-container"></div>
      </div>
    </q-card-actions>
  </q-card>
</template>

<style scoped>

</style>
