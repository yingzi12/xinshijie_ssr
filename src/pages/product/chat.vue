<template>
  <div id="main-content" class="container">
    <div class="row">
      <div class="col-md-6">
        <form class="form-inline" @submit.prevent>
          <div class="form-group">
            <label for="connect">WebSocket connection:</label>
            <button id="connect" class="btn btn-default" @click="connect" :disabled="connected">Connect</button>
            <button id="disconnect" class="btn btn-default" @click="disconnect" :disabled="!connected">Disconnect</button>
          </div>
        </form>
      </div>
      <div class="col-md-6">
        <form class="form-inline" @submit.prevent>
          <div class="form-group">
            <label for="name">What is your name?</label>
            <input type="text" v-model="name" class="form-control" placeholder="Your name here...">
          </div>
          <button id="send" class="btn btn-default" @click="sendName">Send</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <table id="conversation" class="table table-striped">
          <thead>
          <tr>
            <th>Greetings</th>
          </tr>
          </thead>
          <tbody id="greetings">
          <tr v-for="(greeting, index) in greetings" :key="index">
            <td>{{ greeting }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Client } from '@stomp/stompjs';

const brokerURL = 'ws://127.0.0.1:8080/gs-guide-websocket';
const stompClient = new Client({ brokerURL });
const connected = ref(false);
const name = ref('');
const greetings = ref([]);

stompClient.onConnect = (frame) => {
  console.log('Connected111111111: ' + frame);
  connected.value = true;
  console.log('Connected22222222: ' + frame);
  stompClient.subscribe('/topic/greetings', (greeting) => {
    showGreeting(JSON.parse(greeting.body).content);
  });
};

stompClient.onWebSocketError = (error) => {
  console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
  console.error('Broker reported error: ' + frame.headers['message']);
  console.error('Additional details: ' + frame.body);
};

function setConnected(isConnected) {
  connected.value = isConnected;
}

function connect() {
  stompClient.activate();
}

function disconnect() {
  stompClient.deactivate();
  setConnected(false);
}

function sendName() {
  stompClient.publish({
    destination: "/app/hello",
    body: JSON.stringify({ 'name': name.value })
  });
}

function showGreeting(message) {
  greetings.value.push(message);
}
</script>

<style scoped>
/* Your CSS styles go here */
</style>
