<script lang="ts" setup>
import {ref} from "vue";
import {Cookies, useQuasar} from 'quasar'
import {useRouter} from "vue-router";
import {api} from "boot/axios";
import { compressIfNeeded, getImageUrl } from 'boot/tools';
const token = Cookies.get('token');
const id = Cookies.get('id');
const $q = useQuasar()
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数



const previewImage = ref(null);
const vipExpirationTime = ref(null);
const fileInput = ref<HTMLInputElement | null>(null);
const selectedImage = ref<File | null>(null);
const userHeadImageStr=ref("点击替换头像");

const user = ref({});

async function getDetail() {
  const response = await api.get(`/admin/user/getInfo`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const data = response.data;
  if (data.code == 200) {
    user.value = data.data;
    vipExpirationTime.value = data.data.vipExpirationTime;
  }
}
function triggerFileInput() {
  fileInput.value?.click();
}

async function handleImageUpload(event: Event) {
  try {
    userHeadImageStr.value="上传中....";
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      throw new Error("No file selected");
    }
    selectedImage.value = file;
    const compressedFile = await compressIfNeeded(file);
    const formData = new FormData();
    formData.append('file', compressedFile);
    const response = await api.put( '/admin/user/upload',  formData,{
      headers: {
        'Content-Type': 'multipart/form-data', // 实际上通常不需要手动设置，这里仅作示例
        'Authorization': `Bearer ${token}`
      },
    });
    const data = await response.data; // 确保使用 await 等待 json 解析完成
    if (data.code === 200) {
      previewImage.value = $q.config.sourceWeb + data.data;
      user.value.avatar = data.data;
      userHeadImageStr.value="点击替换头像";
    } else {
      userHeadImageStr.value="替换头像失败";
      $q.dialog({
        title: '错误',
        message: data.msg,
        ok: {
          push: true
        },
      }).onOk(async () => {
        console.log("ok");
      });
      // throw new Error('Image upload failed');
    }
  } catch (error) {
    notify('Error uploading image', 'red-5');
  }
}
function notify(message: string, color: string) {
  $q.notify({
    color: color,
    textColor: 'white',
    icon: color === 'red-5' ? 'warning' : 'cloud_done',
    message: message
  });
}
getDetail();
</script>

<template>
  <q-page>
  <div>
    <router-link to="/users/edit">
      <q-btn color="primary" label="编辑个人信息"/>
    </router-link>
  </div>

  <div class="q-pa-md row items-start q-gutter-md">
    <q-card bordered  flat style="width: 100%">
      <q-item>
        <q-item-section @click="triggerFileInput" side>
          <q-avatar font-size="52px" size="100px">
            <img :src="getImageUrl(user.avatar)">
          </q-avatar>
          <input type="file" ref="fileInput" @change="handleImageUpload" hidden>
          <p class="text-caption">{{ userHeadImageStr }}</p>
<!--          {{ user.nickName != null ? user.nickName : '待登录' }}-->
        </q-item-section>
        <q-item-section side>
          <div class="q-ma-sm">
          <q-item-label>
             {{user.nickName}}          ({{ user.userName != null ? user.userName : '待登录' }})

          </q-item-label>
          <q-item-label v-if="id" caption>
            ID:{{ user.userId }}
          </q-item-label>
          <q-item-label v-if="user.email" caption>
            {{user.email !=null && user.email != undefined  && user.email != ''  ? user.email : "无"}}
            <q-icon v-if="user.isEmail != 1 " name="warning" style="color: red"/>
          </q-item-label>
          <q-item-label v-if="user.isEmail != 1 " caption>
            （点击发送邮箱验证码）
          </q-item-label>
          </div>
        </q-item-section>

      </q-item>

      <q-separator/>

      <q-card-section  horizontal>
        <div class="text-body2" style="padding: 10px">
          {{ user.intro }}
        </div>
      </q-card-section>

      <q-separator/>

      <q-card-actions>
        <q-btn color="red-8" flat icon="favorite" round>{{user.countAttention }}</q-btn>
        <q-btn color="red-8" flat icon="thumb_up" round>{{user.countLike }}</q-btn>
        <q-btn color="red-8" flat icon="visibility" round>{{user.countSee }}</q-btn>
      </q-card-actions>
    </q-card>
  </div>
  </q-page>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
