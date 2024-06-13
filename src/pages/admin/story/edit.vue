<script lang="ts" setup>
import {useQuasar} from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { Cookies } from 'quasar'
import {ref} from "vue";
import {api} from "boot/axios";
import Head from 'components/world/headComponent.vue';

const token = Cookies.get('token');

const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const route = useRoute();
const wid = ref(route.query.wid);
const sid = ref(route.query.sid);

const $q = useQuasar();


const name = ref(null);
const nickname = ref(null);
const email = ref(null);
const imgUrl = ref(null);
const isEmail = ref(null);
const intro = ref(null);
const countSee = ref(0);
const countLike = ref(0);
const countAttention = ref(0);
const vip = ref(0);
const vipExpirationTime = ref(null);


const accept = ref(false);
const selectedFile = ref(null);

async function getDetail() {
  const response = await api.get(`/admin/systemUser/getInfo`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const data = response.data;
  //console.log(data.code)
  if (data.code == 200) {
    name.value = data.data.name;
    nickname.value = data.data.nickname;
    email.value = data.data.email;
    imgUrl.value = data.data.imgUrl;
    isEmail.value = data.data.isEmail;
    intro.value = data.data.intro;
    countSee.value = data.data.countSee;
    countLike.value = data.data.countLike;
    countAttention.value = data.data.countAttention;
    vip.value = data.data.vip;
    vipExpirationTime.value = data.data.vipExpirationTime;
  }
}

getDetail();
const onSubmit = async () => {
  const formData = new FormData();
  formData.append('nickname', nickname.value);
  formData.append('email', email.value);
  formData.append('intro', intro.value);

  try {
    const response = await api.post("/admin/systemUser/edit",
      JSON.stringify({
        nickname: nickname.value,
        email: email.value,
        intro: intro.value,
      }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    const data = response.data;
    if (data.code == 200) {
      isEmail.value = data.data.isEmail;
      nickname.value = data.data.nickname;
      intro.value = data.data.intro;
      email.value = data.data.email;

      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Update Success'
      });
      router.push('/users'); // Redirect to login page

    } else {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Update Error'
      });
    }

    // 检查响应...
  } catch (error) {
    // 处理错误...
  }
};

</script>

<template>
  <q-page>
    <Head></Head>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>编辑世界
        </q-toolbar-title>
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </div>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form class="q-gutter-md" @submit.prevent="onSubmit">
      <q-input v-model="nickname" :rules="[val => !!val || 'Please enter your nickname']" filled label="Your Name *"/>
      <q-input v-model="email" :rules="[val => !!val || 'Please enter your email']" filled label="E-mail *"
               type="email"/>
      <q-input v-model="intro" :rules="[val => !!val || 'Please enter a Intro']" filled label="Intro *"/>
      <q-toggle v-model="accept" label="I accept the license and terms"/>
      <div>
        <q-btn color="primary" label="Submit" type="submit"/>
        <q-btn class="q-ml-sm" color="primary" flat label="Reset" type="reset"/>
      </div>
    </q-form>
  </div>
  </q-page>
</template>
