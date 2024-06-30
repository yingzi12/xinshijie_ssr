<script setup lang="ts">
import ChatComponent from 'components/chat/chatComponent.vue';
import { Cookies } from 'quasar';
const recipientUserId = Cookies.get('recipientUserId');

</script>

<template>
  <chat-component :key="recipientUserId" :recipient-user-id="recipientUserId"></chat-component>
</template>

<style scoped>

</style>
