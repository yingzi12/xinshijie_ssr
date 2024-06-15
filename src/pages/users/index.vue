<script lang="ts" setup>
import {ref} from "vue";
import {Cookies, useQuasar} from 'quasar'
import {useRouter} from "vue-router";
import {api} from "boot/axios";
import {compressIfNeeded} from "boot/tools";

const token = Cookies.get('token');
const id = Cookies.get('id');
const $q = useQuasar()
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数


const name = ref(null);
const nickname = ref(null);
const email = ref(null);
const imgUrl = ref("/favicon.png");
const isEmail = ref(null);
const intro = ref(null);
const countSee = ref(0);
const countLike = ref(0);
const countAttention = ref(0);
const vip = ref(0);
const previewImage = ref(null);
const vipExpirationTime = ref(null);
const fileInput = ref<HTMLInputElement | null>(null);
const selectedImage = ref<File | null>(null);
const userHeadImageStr=ref("点击替换头像");
async function getDetail() {
  const response = await api.get(`/admin/systemUser/getInfo`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const data = response.data;
  if (data.code == 200) {
    name.value = data.data.name;
    nickname.value = data.data.nickname;
    email.value = data.data.email;
    imgUrl.value = data.data.imgUrl  ;
    if(imgUrl.value !=null ) {
      previewImage.value = $q.config.sourceWeb + data.data.imgUrl;
    }
    intro.value = data.data.intro;
    isEmail.value = data.data.isEmail;
    countSee.value = data.data.countSee;
    countLike.value = data.data.countLike;
    countAttention.value = data.data.countAttention;
    vip.value = data.data.vip;
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
    const response = await api.post( '/admin/systemUser/upload',  formData);
    const data = await response.data; // 确保使用 await 等待 json 解析完成
    if (data.code === 200) {
      previewImage.value = $q.config.sourceWeb + data.data;
      imgUrl.value = data.data;
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
// getDetail();
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
            <img :src="previewImage">
          </q-avatar>
          <input type="file" ref="fileInput" @change="handleImageUpload" hidden>
          <p class="text-caption">{{ userHeadImageStr }}</p>
          {{ nickname != null ? nickname : '待登录' }}
          ({{ name != null ? name : '待登录' }})
        </q-item-section>
        <q-item-section side>
          <div class="q-ma-sm">
          <q-item-label>
             jjjkj
          </q-item-label>
          <q-item-label v-if="id" caption>
            ID:{{ id }}
          </q-item-label>
          <q-item-label v-if="email" caption>
            {{ email }}
            <q-icon v-if="isEmail ==2 " name="warning" style="color: red"/>
          </q-item-label>
          <q-item-label v-if="isEmail ==2 " caption>
            （点击发送邮箱验证码）
          </q-item-label>
          </div>
        </q-item-section>

      </q-item>

      <q-separator/>

      <q-card-section  horizontal>
        <div class="text-body2" style="padding: 10px">
          {{ intro }}
        </div>
      </q-card-section>

      <q-separator/>

      <q-card-actions>
        <q-btn color="red-8" flat icon="favorite" round>{{countAttention }}</q-btn>
        <q-btn color="red-8" flat icon="thumb_up" round>{{countLike }}</q-btn>
        <q-btn color="red-8" flat icon="visibility" round>{{countSee }}</q-btn>
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
