<script setup lang="ts">
import { Cookies } from 'quasar';
import { getImageUrl } from 'boot/tools';

const avatar=Cookies.get("avatar");
const userId = Cookies.get('userId');
const nickName = Cookies.get('nickName');
const userInfo = Cookies.get('userInfo');

</script>

<template>
    <q-avatar  class="q-mb-sm" size="56px">
      <q-img
        :src="getImageUrl(avatar)"
        @error.once="() => { $event.target.src = '/empty.jpg'; }"
      />
    </q-avatar>
  <div class="text-weight-bold">{{userInfo.nickName !=null && userInfo.nickName!=undefined ? userInfo.nickName :'未登录'}} </div>
    <div>
      {{userInfo.email !=null && userInfo.email != undefined  && userInfo.email != ''  ? userInfo.email : "无"}}
      <q-icon  v-if="userInfo.isEmail != 1" name="warning" style="color: red"/>
    </div>
    <div v-if="userInfo.isEmail != 1">
      (发送验证邮件)
    </div>

</template>

<style scoped>

</style>
