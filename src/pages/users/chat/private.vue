<script setup lang="ts">
import ChatComponent from 'components/chat/chatComponent.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const receiverUserId = ref(route.query.receiverUserId);

</script>

<template>
  <chat-component :key="receiverUserId" :receiver-user-id="receiverUserId"></chat-component>
</template>

<style scoped>

</style>
