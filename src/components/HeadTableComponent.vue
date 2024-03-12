<script setup lang="ts">
import {  ref } from 'vue';

const       tab= ref('images');

</script>

<template>
    <q-tabs
      v-model="tab"
      inline-label
      class="shadow-2"
    >
      <q-route-tab name="Home" icon="home" to="/" label="首页" />
      <q-route-tab name="alarms" icon="public" to="/world/index" label="世界" />
      <q-route-tab name="movies" icon="menu_book" to="/story/index" label="故事" />
      <q-route-tab name="order" icon="category" to="/order" label="排行榜" />
      <q-route-tab name="yard" icon="yard" to="/discuss" label="家园" />
      <q-route-tab name="service" icon="manage_accounts" label="客服端" />
      <q-route-tab name="help" icon="help" label="帮助中心" />
    </q-tabs>
</template>

<style scoped>

</style>
