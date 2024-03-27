<script lang="ts" setup>
import {Cookies, useQuasar} from 'quasar'
import {ref} from "vue";
import { api } from "boot/axios";
const token = Cookies.get('token');

const $q = useQuasar()


const oldPassword = ref(null)
const newPassword = ref(null)
const newPassword2 = ref(null)

async function onSubmit() {
  if(newPassword.value != newPassword2.value){
    $q.dialog({
      title: '错误',
      message: '2次密码输入不一致.',
      ok: {
        push: true
      },
    });
    return;
  }
  const response = await api.post("/admin/systemUser/updatePassworld", JSON.stringify({
    oldPassword: oldPassword.value,
    newPassword: newPassword.value,
  }),{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const data = response.data;
  if (data.code == 200) {
    $q.dialog({
      title: '通知',
      message: '修改密码成功.',
      ok: {
        push: true
      },
    });
  } else {
    $q.dialog({
      title: '错误',
      message: '修改密码失败.',
      ok: {
        push: true
      },
    });
  }
}
</script>

<template>
<q-page>
  <div class="row no-wrap shadow-1">
    <q-toolbar class="col-8 bg-grey-3">
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title>重置密码</q-toolbar-title>
      <q-btn flat round dense icon="search" />
    </q-toolbar>
    <q-toolbar class="col-4 bg-primary text-white">
      <q-space />
      <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
      <q-btn flat round dense icon="more_vert" />
    </q-toolbar>
  </div>

  <div class="q-pa-md" style="max-width: 400px">
    <q-form
        class="q-gutter-md"
        @submit="onSubmit"
    >
      <q-input
          v-model="oldPassword"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          filled
          type="password"
          hint="旧密码"
          label="请输入旧密码 *"
      />
      <q-input
          v-model="newPassword"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          filled
          type="password"
          hint="新密码"
          label="请输入新密码 *"
      />
      <q-input
          v-model="newPassword2"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          filled
          type="password"
          hint="新密码"
          label="请重复新密码 *"
      />

      <div>
        <q-btn color="primary" label="重置密码" type="submit"/>
      </div>
    </q-form>

  </div>
</q-page>
</template>

<style scoped>

</style>
