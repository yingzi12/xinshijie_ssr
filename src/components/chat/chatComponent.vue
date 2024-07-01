<script setup lang="ts">
import { Cookies } from 'quasar';
import StompClient from 'boot/stomp';
import { defineProps, reactive, ref, toRefs } from 'vue';
import { api, tansParams } from 'boot/axios';
import { timeDifference } from 'boot/tools';
const props = defineProps({
  receiverUserId:  String,
});
const token = Cookies.get('token');
const userId = Cookies.get('userId');

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    receiverUserId:props.receiverUserId,
  }
});

const { queryParams } = toRefs(data);
const chatList = ref([]);
//总数
const  total= ref(0);
//有多少页
const  maxPage=ref(0);
async  function getChatList(){
  queryParams.value.receiverUserId=props.receiverUserId;
  const response =await api.get("/admin/userChatContent/select?"+tansParams(queryParams.value));
  const data=response.data;
  if(data.code===200) {
    const valueList =data.data;
    if(valueList!=null&& valueList!=undefined &&valueList.length>0) {
      queryParams.value.id=valueList[0].id;
      if (chatList.value != undefined && chatList.value.length > 0) {
        valueList.push(...chatList.value);
      }
      chatList.value = valueList;
    }
    total.value = response.data.total;
    if (total.value % queryParams.value.pageSize == 0) {
      maxPage.value = total.value / queryParams.value.pageSize;
    } else {
      maxPage.value = total.value / queryParams.value.pageSize + 1;
    }
  }
}
getChatList();
const brokerURL = 'ws://127.0.0.1:8099/ws';
const stompClient = new StompClient(brokerURL);
// 连接并等待成功后再发送消息
stompClient.connect().then(() => {
  // 订阅消息
  const receiver = props.receiverUserId;
  const destination = '/queue/chat/' + userId+"_"+receiver;
  stompClient.subscribe(destination, message => {
    console.log('Received message:', message);
    chatList.value.push(message);
  });
}).catch((error) => {
  console.error('Connection error:', error);
});
const content=ref("");

function sendMessage(){
  console.log(content.value);
  const ok=stompClient.sendMessage('/app/chat', {
    content: content.value,
    kind:1,
    recipientId: props.receiverUserId,
  }, { 'content-type': 'application/json'  ,'Authorization': `Bearer ${token}`});
  if(ok){
    chatList.value.push({content:content.value,kind:1,sendUserId:userId,receiverUserId:props.receiverUserId,createTime:new Date()});
  }else {
    chatList.value.push({content:content.value,kind:1,sendUserId:userId,receiverUserId:props.receiverUserId,createTime:new Date()});
  }
}
const items = ref([ {}, {}, {}, {}, {}, {}, {}, {}, {} ]);
function refresh (done) {
  setTimeout(() => {
    console.log(`=------------------refresh---------${queryParams.value.pageNum}----------`)
    queryParams.value.pageNum=queryParams.value.pageNum+1;
    getChatList();
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
        <q-pull-to-refresh @refresh="refresh" style="width:100%">
          <div style="width: 100%;">
<!--            <q-chat-message-->
<!--              label="Sunday, 19th"-->
<!--            />-->
<!--            <q-chat-message-->
<!--              name="me"-->
<!--              avatar="https://cdn.quasar.dev/img/avatar3.jpg"-->
<!--              stamp="7 minutes ago"-->
<!--              sent-->
<!--              text-color="white"-->
<!--              bg-color="primary"-->
<!--            >-->
<!--              <div>-->
<!--                Hey there!-->
<!--              </div>-->

<!--              <div>-->
<!--                Have you seen Quasar?-->
<!--                <img src="https://cdn.quasar.dev/img/discord-omq.png" class="my-emoticon">-->
<!--              </div>-->
<!--            </q-chat-message>-->

<!--            <q-chat-message-->
<!--              name="Jane"-->
<!--              avatar="https://cdn.quasar.dev/img/avatar5.jpg"-->
<!--              bg-color="amber"-->
<!--            >-->
<!--              <q-spinner-dots size="2rem" />-->
<!--            </q-chat-message>-->

            <div v-for="(chat, index) in chatList" :key="index">
              <div v-if="chat.sendUserId == userId">
                <q-chat-message
                  v-if="chat.kind == 1"
                  sent
                  avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                  :text="[`${chat.content}`]"
                  :stamp="`${timeDifference(chat.createTime)}`"
                  bg-color="grey-2"
                />
                            <q-chat-message
                              sent
                              name="me"
                              avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                              :stamp="`${timeDifference(chat.createTime)}`"
                              text-color="white"
                              bg-color="primary"
                            >
<!--                              <div>-->
<!--                                Hey there!-->
<!--                              </div>-->

                              <div>
                                <img src="https://cdn.quasar.dev/img/discord-omq.png" class="chat-image">
                              </div>
                            </q-chat-message>

              </div>
              <div v-if="chat.sendUserId == props.receiverUserId">
                <q-chat-message
                  v-if="chat.kind == 1"
                  avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                  :text="[`${chat.content}`]"
                  :stamp="`${timeDifference(chat.createTime)}`"
                  bg-color="amber-7"
                />
                            <q-chat-message
                              name="me"
                              avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                              :stamp="`${timeDifference(chat.createTime)}`"
                              text-color="white"
                              bg-color="amber-7"
                            >
<!--                              <div>-->
<!--                                Hey there!-->
<!--                              </div>-->

                              <div>
                                <img src="https://cdn.quasar.dev/img/discord-omq.png" class="chat-image">
                              </div>
                            </q-chat-message>

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
<style lang="sass">
.my-emoticon
  vertical-align: middle
  height: 2em
  width: 2em
.chat-image
  vertical-align: middle
  max-height: 120px
</style>
