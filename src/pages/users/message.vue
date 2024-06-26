<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { api, tansParams } from 'boot/axios';
import { getImageUrl } from 'boot/tools';

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    receiverUserId:""
  }
});

const { queryParams } = toRefs(data);
const friend = ref({});

const valueList = ref([]);
async  function getList(){
  const response =await api.get("/admin/userChatPartner/list");
  valueList.value = response.data.data;
  if(valueList.value.length>0){
    friend.value = valueList.value[0];
    getChatList(friend.value.receiverUserId);
  }
}
getList();
const chatList = ref([]);
//总数
const  total= ref(0);
//有多少页
const  maxPage=ref(0);
async  function getChatList(receiverUserId:number){
  queryParams.value.receiverUserId=receiverUserId;
  const response =await api.get("/admin/userChatContent/select?"+tansParams(queryParams.value));
  chatList.value = response.data.data.records;
  total.value = response.data.total;
  if(total.value % queryParams.value.pageSize == 0){
    maxPage.value=total.value/queryParams.value.pageSize;
  }else{
    maxPage.value=total.value/queryParams.value.pageSize+1;
  }
}
const current= ref(6);
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
            </q-tabs>
          </div>
          <div  style="max-width: 200px">
<!--            <q-toolbar class="bg-primary text-white shadow-2">-->
<!--              <q-toolbar-title>Contacts</q-toolbar-title>-->
<!--            </q-toolbar>-->

            <q-list bordered>

              <q-separator />
<!--              <q-item-label header>Offline</q-item-label>-->

              <q-item v-for="contact in valueList" :key="contact.id" class="q-mb-sm" clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                      <q-img  :src="getImageUrl(contact.avatar)"
                              @error.once="() => { $event.target.src = '/empty.jpg'; }"
                      />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ contact.nickname }}</q-item-label>
                  <q-item-label caption lines="1">{{ contact.lastTime }}</q-item-label>
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
