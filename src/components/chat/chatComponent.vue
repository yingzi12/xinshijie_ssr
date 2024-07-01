<script setup lang="ts">
import { Cookies } from 'quasar';
import StompClient from 'boot/stomp';
import { defineProps, nextTick, onMounted, reactive, ref, toRefs } from 'vue';
import { api, tansParams } from 'boot/axios';
import { formattedNowDateTime, getImageUrl, timeDifference } from 'boot/tools';
import UploadImage from 'components/uploadImage.vue';
const props = defineProps({
  receiverUserId:  String,
});
console.log(props.receiverUserId);
const token = Cookies.get('token');
const userId = Cookies.get('userId');
const avatar = Cookies.get('avatar');
const nickName = Cookies.get('nickName');

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    receiverUserId:props.receiverUserId,
  },
  addForm: {
    content:"",
    kind:1,
    recipientId: props.receiverUserId,
  }
});
const { queryParams,addForm } = toRefs(data);
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
const receiverUser=ref({});
async function handUser() {
  const response = await api.get(`/wiki/user/getUserIntro?userId=${props.receiverUserId}`);
  const data=response.data;
  if (data.code == 200) {
    receiverUser.value=data.data;
  }
}
handUser();
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

function sendMessage(mess:string,kind:number){
  addForm.value.content=mess;
  addForm.value.kind=kind;
  const ok=stompClient.sendMessage('/app/chat', addForm.value, { 'content-type': 'application/json'  ,'Authorization': `Bearer ${token}`});
  if(ok){
    chatList.value.push({content:mess,kind:kind,sendUserId:userId,receiverUserId:props.receiverUserId,createTime:formattedNowDateTime()});
  }else {
    chatList.value.push({content:mess,kind:kind,sendUserId:userId,receiverUserId:props.receiverUserId,createTime:formattedNowDateTime()});
  }
  //将聊天框最底部
  // scrollChatToBottom();
}
function refresh (done) {
  setTimeout(() => {
    console.log(`=------------------refresh---------${queryParams.value.pageNum}----------`)
    queryParams.value.pageNum=queryParams.value.pageNum+1;
    getChatList();
    done()
  }, 1000)
}
//发送图片
function onHandImageUrl(imgUrl:string){
  sendMessage(imgUrl,2);
}
//发送聊天详细
function onHandMessage(){
  sendMessage(content.value,1);
  content.value="";
}
// 定义滚动到底部的方法
// const scrollChatToBottom = () => {
//   nextTick(() => {
//     const chatContainer = document.querySelector('.q-pull-to-refresh__content');
//     if (chatContainer) {
//       chatContainer.scrollTop = chatContainer.scrollHeight;
//     }
//   });
// };
//
// // 在组件挂载后立即滚动到底部
// onMounted(() => {
//   scrollChatToBottom();
// });
</script>

<template>

  <q-card style="width: 100%">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{ receiverUser.nickName }}</div>
    </q-card-section>

    <q-separator />

    <q-card-actions class="scroll">
      <div class="q-pa-md row justify-center" style="width: 100%;height: 400px">
        <q-pull-to-refresh @refresh="refresh" style="width:100%" class="pull-to-refresh">
          <div style="width: 100%;">
            <div v-for="(chat, index) in chatList" :key="index">
              <div v-if="chat.sendUserId == userId">
                <q-chat-message
                  v-if="chat.kind == 1"
                  name="me"
                  sent
                  :avatar="getImageUrl(avatar)"
                  :text="[`${chat.content}`]"
                  :stamp="`${timeDifference(chat.createTime)}`"
                  bg-color="grey-2"
                />
                            <q-chat-message
                              sent
                              v-if="chat.kind == 2"
                              name="me"
                              :avatar="getImageUrl(avatar)"
                              :stamp="`${timeDifference(chat.createTime)}`"
                              text-color="white"
                              bg-color="primary"
                            >
<!--                              <div>-->
<!--                                Hey there!-->
<!--                              </div>-->

                              <div>
                                <img :src="getImageUrl(chat.content)" class="chat-image">
                              </div>
                            </q-chat-message>

              </div>
              <div v-if="chat.sendUserId == props.receiverUserId">
                <q-chat-message
                  v-if="chat.kind == 1"
                  :name="receiverUser.nickname"
                  :avatar="getImageUrl(receiverUser.avatar)"
                  :text="[`${chat.content}`]"
                  :stamp="`${timeDifference(chat.createTime)}`"
                  bg-color="amber-7"
                />
                            <q-chat-message
                              v-if="chat.kind == 2"
                              :name="receiverUser.nickname"
                              :avatar="getImageUrl(receiverUser.avatar)"
                              :stamp="`${timeDifference(chat.createTime)}`"
                              text-color="white"
                              bg-color="amber-7"
                            >
<!--                              <div>-->
<!--                                Hey there!-->
<!--                              </div>-->
                              <div>
                                <img :src="getImageUrl(chat.content)" class="chat-image">
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
      <upload-image @img-url="onHandImageUrl"></upload-image>
      <q-btn
        dark-percentage
        unelevated
        color="orange"
        text-color="grey-9"
        icon="send"
        style="width: 100px"
        @click="onHandMessage"
      />
<!--      <q-btn flat round color="red" icon="send" @click="sendMessage"/>-->
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
