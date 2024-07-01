<script setup lang="ts">
import {  ref } from 'vue';
import { api } from 'boot/axios';
import { getImageUrl } from 'boot/tools';
import ChatComponent from 'components/chat/chatComponent.vue';

const friend = ref({receiverUserId:0,receiverUserName:"",receiverAvatar:""});
const valueList = ref([]);
async  function getList(){
  const response =await api.get("/admin/userChatPartner/list");
  valueList.value = response.data.data;
  if(valueList.value.length>0){
    friend.value = valueList.value[0];
  }
}
getList();
function onChat(value){
  friend.value = value;
}

const splitterModel= ref(200) ;// start at 150px
const tab = ref('mails');

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

              <q-item v-for="value in valueList" :key="value.id" class="q-mb-sm" clickable v-ripple @click="onChat(value)">
                <q-item-section avatar>
                  <q-avatar>
                      <q-img  :src="getImageUrl(value.avatar)"
                              @error.once="() => { $event.target.src = '/empty.jpg'; }"
                      />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ value.receiverUserName }}</q-item-label>
                  <q-item-label caption lines="1">{{ value.lastTime }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="chat_bubble" color="grey" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>

        </template>

        <template v-slot:after>
          <div class="row no-wrap shadow-1">
            <chat-component :key="friend.receiverUserId" :receiver-user-id="friend.receiverUserId"></chat-component>
          </div>

        </template>

      </q-splitter>
    </div>
    </div>
  </q-page>
</template>

<style scoped>

</style>
