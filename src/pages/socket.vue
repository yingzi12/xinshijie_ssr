<template>
  <div>
    <h2>WebSocket Chat</h2>
    <q-input v-model="message" @keyup.enter="sendMessage" placeholder="Type your message and press Enter to send" />
<!--    <ul>-->
<!--      <li v-for="msg in messages" :key="msg.id">{{ msg.text }}</li>-->
<!--    </ul>-->
<!--    <button @click="connect">Connect</button>-->
<!--    <button @click="disconnect" :disabled="!isConnected">Disconnect</button>-->
  </div>
</template>

<script setup>
import StompClient from 'boot/stomp';
import { ref } from 'vue';
import { Cookies } from 'quasar';
const token = Cookies.get('token');


const brokerURL = 'ws://127.0.0.1:8099/ws';


const stompClient = new StompClient(brokerURL);

const message=ref("");
// 连接并等待成功后再发送消息
stompClient.connect().then(() => {
  // 发送消息
  const chatMessage = {
    content: "Hello World!",
    receiver: "receive_admin",
    userId: "send_admin",
    recipientId: "receiverUserId",
    message: "Message content"
  };
  stompClient.sendMessage('/app/chat', chatMessage, { 'content-type': 'application/json' ,'token': `Bearer ${token}` });

  // 订阅消息
  const receiver = "receive_admin";
  const destination = '/queue/chat/' + receiver;
  stompClient.subscribe(destination, message => {
    console.log('Received message:', message);
  });
}).catch((error) => {
  console.error('Connection error:', error);
});

function sendMessage(){
  stompClient.sendMessage('/app/chat', {
    content: message.value,
    receiver: "receive_admin",
    userId: "1111",
    recipientId: "222222",
    message: "Message content"
  }, { 'content-type': 'application/json'  ,'Authorization': `Bearer ${token}`});
}
</script>
