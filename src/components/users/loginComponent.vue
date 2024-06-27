<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import {useQuasar} from 'quasar';
import {useRouter} from "vue-router";
import {api} from "boot/axios";
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const $q = useQuasar();
// 定义一个接收外部传入的prop
const props = defineProps({
  showLogin: {
    type: Boolean,
    default: false,
  },
});

// 将v-model绑定改为使用传入的prop
const showLoginDialog = ref(props.showLogin);
console.log("------------------------------");
console.log(showLoginDialog);

const username = ref('');
const password = ref('');
const uuid = ref('');
const code = ref('');
const captcha = ref('');
const accept = ref(false);
const captchaImage = ref('');
async function refreshCaptcha() {
  try {
    const response = await api.get("/captchaImage");
    const data = response.data;
    if (data && data.code == 200) {
      captchaImage.value = "data:image/png;base64," + data.img;
      uuid.value = data.uuid;
    } else {
      throw new Error("Invalid response");
    }
  } catch (error) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: 'Failed to load captcha'
    });
  }
}
const isLogon=ref(false);
async function onSubmit() {
  if (!accept.value) {
    return;
  }

  try {
    const response = await api.post("/login", JSON.stringify({
      username: username.value,
      password: password.value,
      uuid: uuid.value,
      code: captcha.value,
      captcha: captcha.value,
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = response.data;
    if (data.code == 200) {
      isLogon.value=true;
      $q.cookies.set('token',data.token,{path:"/"});
      $q.cookies.set('id',data.id,{path:"/"});
      $q.cookies.set('avatar',data.user.avatar,{path:"/"});
      $q.cookies.set('userInfo',data.user,{path:"/"});
      router.push('/users/'); // 或者其他页面
    } else {
      $q.dialog({
        color: 'red-5',
        message: data.msg
      });
    }
  } catch (error) {
    await refreshCaptcha();
    console.log(error)
  }
}

async function onSubmitAndClose() {
  await onSubmit(); // 先执行登录逻辑
  if (isLogon.value) {
    showLoginDialog.value = false; // 登录成功后关闭对话框
    location.reload(); // 刷新当前页面
  }
}

function isLogin() {
  // const tokenCookie = useCookie('token');
  // const token = Cookies.get("token");
  // if (token) {
  //   // 如果用户已登录，则重定向到users
  //   router.push('/users'); // 假设登录页面的路由为 '/users'
  // }
}

//传给父组件
const emit = defineEmits(['update:showLogin']);
// 假设有一个关闭对话框的逻辑，比如点击取消或登录成功后
function closeDialog() {
  emit('update:showLogin', false); // 触发事件，传递新值给父组件
}

onMounted(() => {
  isLogin();
  // 当组件挂载时，刷新验证码
  refreshCaptcha();
});
onMounted(() => {
  console.log("--------onMounted----------")
  watch(
    () => props.showLogin,
    (newValue) => {
      console.log("--------newValue----------")
      console.log(newValue)
      showLoginDialog.value = newValue;
    }
  );
});
</script>


<template>
  <div>
    <!-- 登录对话框 -->
    <q-dialog v-model="showLoginDialog" persistent>
     <div class="center-container">
    <div class="q-pa-md" style="max-width: 600px">
      <q-card class="my-card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{$t(`login.login`)}}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup  @click="closeDialog"/>
        </q-card-section>
        <q-card-section>
<!--          <div class="text-h6">{{$t(`login.login`)}}</div>-->
          <div class="text-subtitle2">{{ $t('login.welcome') }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md" @submit.prevent="onSubmitAndClose">
            <!-- 账号输入框 -->
            <q-input
              v-model="username"
              :rules="[val => val && val.length > 0 || 'Please enter your account']"
              filled
              :label="$t('login.name')+' *'"
              lazy-rules
            />

            <!-- 密码输入框 -->
            <q-input
              v-model="password"
              :rules="[val => val && val.length > 0 || 'Please enter your password']"
              filled
              :label="$t('login.password')+' *'"
              type="password"
            />

            <!-- 验证码输入框 -->
            <q-input
              v-model="captcha"
              :rules="[val => val && val.length > 0 || '请输入验证码']"
              filled
              :label="$t('login.code')+' *'"
            />
            <div class="q-mb-md">
              <q-img :src="captchaImage" @click="refreshCaptcha"/>
              <div>{{ $t(`login.refreshCode`) }}</div>
            </div>

            <!-- 接受条款切换 -->
            <q-toggle v-model="accept" :label="$t(`introTerms`)"></q-toggle>
            <a href="/privacyPolicy">{{ $t(`useTerms`) }}</a><a href="/use">{{ $t(`privateTerms`) }}</a>
            <div>
              <q-btn color="primary" :label="$t(`login.login`) " style="width: 100%;" type="submit"/>
            </div>

            <!-- 注册与忘记密码链接 -->
            <div class="extra-links">
              <router-link to="/register">{{ $t(`login.regis`) }}</router-link>
              <router-link to="/forgotPassword">忘记密码?</router-link>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
<!--      <q-btn color="primary" @click="onSubmitAndClose">{{$t('login.login')}}</q-btn>-->
    </q-dialog>
  </div>
</template>
<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* 使容器至少与视口一样高 */
}

.extra-links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
