<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'; // 如果还需要STOMP协议，需要安装stompjs库

// 定义状态
const message = ref('');
const messages = ref([]);
let stompClient = null;
const socketUrl = 'https://your-sockjs-url'; // 替换为你的SockJS服务地址
const stompEndpoint = '/stomp'; // STOMP端点，如果需要的话

// 初始化WebSocket连接
const initWebSocket = async () => {
  const socket = new SockJS(socketUrl);
  stompClient = await new Promise((resolve, reject) => {
    Stomp.over(socket).connect({}, (frame) => {
      console.log('Connected: ' + frame);
      resolve(Stomp.over(socket));
    }, (error) => reject(error));
  });

  stompClient.subscribe('/topic/messages', (msg) => {
    const messageData = JSON.parse(msg.body);
    messages.value.push({ id: Date.now(), text: messageData.text });
  });
};

// 发送消息
const sendMessage = () => {
  if (message.value.trim()) {
    stompClient.send('/app/chat', {}, JSON.stringify({ text: message.value }));
    message.value = '';
  }
};

// 生命周期钩子
onMounted(() => {
  initWebSocket().catch(error => console.error('WebSocket initialization failed:', error));
});

onUnmounted(() => {
  if (stompClient) {
    stompClient.disconnect();
  }
});
const  current= ref(6);
const text=ref("");
const splitterModel= ref(200) ;// start at 150px
const tab = ref('mails');
const contacts = [ {
  id: 1,
  name: 'Ruddy Jedrzej',
  email: 'rjedrzej0@discuz.net',
  letter: 'R'
}, {
  id: 2,
  name: 'Mallorie Alessandrini',
  email: 'malessandrini1@marketwatch.com',
  letter: 'M'
}, {
  id: 3,
  name: 'Elisabetta Wicklen',
  email: 'ewicklen2@microsoft.com',
  letter: 'E'
}, {
  id: 4,
  name: 'Seka Fawdrey',
  email: 'sfawdrey3@wired.com',
  letter: 'S'
} ]

const offline = [ {
  id: 5,
  name: 'Brunhilde Panswick',
  email: 'bpanswick4@csmonitor.com',
  avatar: 'avatar2.jpg'
}, {
  id: 6,
  name: 'Winfield Stapforth',
  email: 'wstapforth5@pcworld.com',
  avatar: 'avatar6.jpg'
} ]
</script>

<template>
  <q-page>
    <div>
      <input v-model="message" @keyup.enter="sendMessage" placeholder="Type your message and press Enter to send"/>
      <ul>
        <li v-for="msg in messages" :key="msg.id">{{ msg.text }}</li>
      </ul>
    </div>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>信息</q-toolbar-title>
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </div>

    <div class="q-mb-md">
    <div>
      <q-splitter
        v-model="splitterModel"
        unit="px"
      >
        <template v-slot:before>
          <div >
<!--            <div class="text-h4 q-mb-md">Before</div>-->
            <q-tabs
              v-model="tab"
              class="bg-teal text-yellow shadow-2"
            >
              <q-tab name="mails" icon="mail" />
              <q-tab name="alarms" icon="mail" />
            </q-tabs>
          </div>
          <div  style="max-width: 200px">
<!--            <q-toolbar class="bg-primary text-white shadow-2">-->
<!--              <q-toolbar-title>Contacts</q-toolbar-title>-->
<!--            </q-toolbar>-->

            <q-list bordered>
              <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    {{ contact.letter }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1"><span>{{ contact.name }}      <q-badge color="red" floating>4</q-badge></span>
                  </q-item-label>
<!--                  <q-item-label caption lines="1">{{ contact.email }}</q-item-label>-->
                </q-item-section>

<!--                <q-item-section side>-->
<!--                  <q-icon name="chat_bubble" color="green" />-->
<!--                </q-item-section>-->
              </q-item>

              <q-separator />
<!--              <q-item-label header>Offline</q-item-label>-->

              <q-item v-for="contact in offline" :key="contact.id" class="q-mb-sm" clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ contact.name }}</q-item-label>
                  <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="chat_bubble" color="grey" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>

        </template>

        <template v-slot:after>
<!--          <div>-->
<!--            <div class="text-h4 q-mb-md">After</div>-->

<!--          </div>-->
          <div class="row no-wrap shadow-1">
            <q-card style="width: 100%">
              <q-card-section class="bg-primary text-white">
                <div class="text-h6">Our Changing Planet</div>
              </q-card-section>

              <q-separator />

              <q-card-actions class="scroll">
                <div class="q-pa-md row justify-center" style="width: 100%;height: 400px">
                  <div style="width: 100%;">
                    <q-chat-message
                      label="Sunday, 19th"
                    />

                    <q-chat-message
                      avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                      :text="['hey, how are you?']"
                      stamp="7 minutes ago"
                      bg-color="grey-2"
                    />
                    <q-chat-message
                      sent
                      avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                      :text="['doing fine, how r you?']"
                      stamp="4 minutes ago"
                      bg-color="green"
                    />
                    <q-chat-message
                      avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                      :text="['hey, how are you?']"
                      stamp="7 minutes ago"
                      bg-color="grey-2"
                    />
                    <q-chat-message
                      sent
                      avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                      :text="['doing fine, how r you?']"
                      stamp="4 minutes ago"
                      bg-color="green"
                    />
                    <q-chat-message
                      avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                      :text="['hey, how are you?']"
                      stamp="7 minutes ago"
                      bg-color="grey-2"
                    />
                    <q-chat-message
                      avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                      :text="['hey, how are you?']"
                      stamp="7 minutes ago"
                      bg-color="grey-2"
                    /><q-chat-message
                    avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                    :text="['hey, how are you?']"
                    stamp="7 minutes ago"
                    bg-color="grey-2"
                  />
                    <q-chat-message
                      sent
                      avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                      :text="['doing fine, how r you?']"
                      stamp="4 minutes ago"
                      bg-color="green"
                    />
                  </div>
                </div>

              </q-card-actions>
              <q-separator />
              <q-card-actions >
                <div class="q-pa-md" style="width: 100%">
                  <q-input
                    v-model="text"
                    filled
                    type="textarea"
                  />
                </div>
              </q-card-actions>
              <q-separator />

              <q-card-actions align="right">
                <q-btn flat round color="red" icon="send" />
              </q-card-actions>
            </q-card>
          </div>

        </template>

      </q-splitter>
    </div>
    </div>
  </q-page>
</template>

<style scoped>

</style>
