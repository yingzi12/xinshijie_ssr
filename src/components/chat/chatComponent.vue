<script setup lang="ts">
import { Cookies } from 'quasar';
import StompClient from 'boot/stomp';
import { defineProps, reactive, ref, toRefs } from 'vue';
import { api, tansParams } from 'boot/axios';
const props = defineProps({
  recipientUserId:  String,
});
const token = Cookies.get('token');
const userId = Cookies.get('userId');

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    receiverUserId:"",
  }
});

const { queryParams } = toRefs(data);
const chatList = ref([]);
const current= ref(1);
//总数
const  total= ref(0);
//有多少页
const  maxPage=ref(0);
async  function getChatList(){
  queryParams.value.receiverUserId=props.recipientUserId;
  const response =await api.get("/admin/userChatContent/select?"+tansParams(queryParams.value));
  chatList.value = response.data.data.records;
  total.value = response.data.total;
  if(total.value % queryParams.value.pageSize == 0){
    maxPage.value=total.value/queryParams.value.pageSize;
  }else{
    maxPage.value=total.value/queryParams.value.pageSize+1;
  }
}
getChatList();
const brokerURL = 'ws://127.0.0.1:8099/ws';
const stompClient = new StompClient(brokerURL);
// 连接并等待成功后再发送消息
stompClient.connect().then(() => {
  // 订阅消息
  const receiver = props.recipientUserId;
  const send = userId;
  const destination = '/queue/chat/' + receiver+"_"+send;
  stompClient.subscribe(destination, message => {
    console.log('Received message:', message);
    chatList.value.push({message:message.value,sendUserId:send,recipientUserId:props.recipientUserId,sendTime:new Date()});
  });
}).catch((error) => {
  console.error('Connection error:', error);
});
const content=ref("");

function sendMessage(){
  console.log(content.value);
  stompClient.sendMessage('/app/chat', {
    content: content.value,
    kind:1,
    recipientId: props.recipientUserId,
  }, { 'content-type': 'application/json'  ,'Authorization': `Bearer ${token}`});
}
const items = ref([ {}, {}, {}, {}, {}, {}, {}, {}, {} ]);
function refresh (done) {
  setTimeout(() => {
    items.value.push({}, {}, {}, {}, {}, {}, {})
    done()
  }, 1000)
}
</script>

<template>

  <q-card style="width: 100%">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Our Changing Planet</div>
    </q-card-section>

    <q-separator />

    <q-card-actions class="scroll">
      <div class="q-pa-md row justify-center" style="width: 100%;height: 400px">
        <q-pull-to-refresh @refresh="refresh">
          <div v-for="(item, index) in items" :key="index" class="q-mb-sm">
            <q-badge color="secondary">
              {{ items.length - index }}
            </q-badge>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </div>
          <div style="width: 100%;">
            <q-chat-message
              label="Sunday, 19th"
            />
            <q-chat-message
              name="me"
              avatar="https://cdn.quasar.dev/img/avatar3.jpg"
              stamp="7 minutes ago"
              sent
              text-color="white"
              bg-color="primary"
            >
              <div>
                Hey there!
              </div>

              <div>
                Have you seen Quasar?
                <img src="https://cdn.quasar.dev/img/discord-omq.png" class="my-emoticon">
              </div>
            </q-chat-message>

            <q-chat-message
              name="Jane"
              avatar="https://cdn.quasar.dev/img/avatar5.jpg"
              bg-color="amber"
            >
              <q-spinner-dots size="2rem" />
            </q-chat-message>
            <div v-for="(chat, index) in chatList" :key="index">
              <div v-if="chat.isSend == 1">
                <q-chat-message
                  avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                  :text="[`${chat.content}`]"
                  stamp="7 minutes ago"
                  bg-color="grey-2"
                />
              </div>
              <div v-if="chat.isSend == 2">
                <q-chat-message
                  sent
                  avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                  :text="[`${chat.content}`]"
                  stamp="7 minutes ago"
                  bg-color="grey-2"
                />
              </div>
            </div>
          </div>

        </q-pull-to-refresh>
      </div>


    </q-card-actions>
    <q-separator />
    <q-card-actions >
      <div class="q-pa-md" style="width: 100%">
        <q-input
          v-model="content"
          filled
          type="textarea"
        />
      </div>
    </q-card-actions>
    <q-separator />

    <q-card-actions align="right">
      <q-btn flat round color="red" icon="send" @click="sendMessage"/>
    </q-card-actions>
  </q-card>

</template>

<style scoped>

</style>
