<script setup lang="ts">
import { api } from 'boot/axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SayListComponent from 'components/say/sayListComponent.vue';
import addComponents  from 'components/say/addComponent.vue';
import { Cookies } from 'quasar';
const route = useRoute();
const router = useRouter();
const addDialog=ref(false);
const userId = Cookies.get('userId');

// const user=ref({});
// async function getDetail() {
//   const response = await api.get(`/wiki/user/getUserIntro?userId=${userId}`);
//   const data = response.data;
//   if (data.code == 200) {
//     user.value = data.data; // 修改了这里
//   }
// }
//
// getDetail();

</script>

<template>
  <q-toolbar class="bg-purple text-white">
    <q-toolbar-title>
      说说列表
    </q-toolbar-title>
    <q-btn flat round dense icon="add" label="新增说说"  @click="addDialog=true"/>
    <!--      <q-btn flat round dense icon="apps" class="q-mr-xs" />-->
    <!--      <q-btn flat round dense icon="more_vert" />-->
  </q-toolbar>
  <say-list-component :user-id="userId"></say-list-component>
  <q-dialog  v-model="addDialog" >
    <add-components></add-components>
  </q-dialog>
</template>

<style scoped>

</style>
