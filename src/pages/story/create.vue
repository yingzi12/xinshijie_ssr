<script lang="ts" setup>
import { useQuasar } from 'quasar';
import pica from "pica";
import { api } from "boot/axios";
import { compressAccurately } from 'image-conversion';
import { Cookies } from 'quasar'
import {useRouter} from "vue-router";
import {ref} from "vue";
import {compressIfNeeded} from "boot/tools";
const token = Cookies.get('token');
const $q = useQuasar();
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const title = ref(null);
const wname = ref("");
const wid = ref(0);
const intro = ref(null);
const payIntro = ref(null);
const tags = ref(null);
const imgUrl = ref(null);
const vipPrice = ref(0.0);
const price = ref(0.0);
const accept = ref(false);
const charge = ref(1);
const previewImage = ref("/favicon.ico");
const selectedImage = ref<File | null>(null);

function notify(message: string, color: string) {
  $q.notify({
    color: color,
    textColor: 'white',
    icon: color === 'red-5' ? 'warning' : 'cloud_done',
    message: message
  });
}

function onReset() {
  title.value = null;
  wname.value = "";
  intro.value = null;
  tags.value = null;
  imgUrl.value = null;
  charge.value = 1;
  accept.value = false;
  payIntro.value = null;

}

async function onSubmit() {
  const response = await api.post("/admin/userAlbum/add", JSON.stringify({
    title: title.value,
    intro: intro.value,
    payIntro: payIntro.value,
    girl: girl.value,
    imgUrl: imgUrl.value,
    tags: tags.value,
    charge: charge.value,
    price: price.value,
    vipPrice: vipPrice.value,
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const data = response.data;
  //console.log(data)
  if (data.code == 200) {
    $q.dialog({
      title: '通知',
      message: '添加成功.',
      ok: {
        push: true
      },
    }).onOk(async () => {
      router.push('/users/album'); // Redirect to login page
    }).onCancel(async () => {
      router.push('/users/album'); // Redirect to login page
    });
  } else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: '创建成功'
    });
  }
}

async function handleImageUpload(event: Event) {
  try {
    console.log("----------handleImageUpload---------------")
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      throw new Error("No file selected");
    }
    console.log("----------handleImageUpload----2-----------")
    selectedImage.value = file;
    const compressedFile = await compressIfNeeded(file);
    const formData = new FormData();
    formData.append('file', compressedFile);
    console.log("----------handleImageUpload----3-----------")
    const response = await api.post( '/admin/userAlbum/upload',  formData);
    const data = await response.data; // 确保使用 await 等待 json 解析完成
    console.log("----------handleImageUpload----4-----------")
    if (data.code === 200) {
      previewImage.value = $q.config.sourceWeb + data.data;
      imgUrl.value = data.data;
    } else {
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


const chargeList = [
  {
    label: '魔法',
    value: 1
  },
  {
    label: '科学',
    value: 2
  },

  {
    label: '克苏鲁',
    value: 3
  },
  {
    label: '诡异',
    value: 4
  },
  {
    label: '修真',
    value: 5
  }
  ,
  {
    label: '其他',
    value: 5
  }
]
function updateCharge(charge: number) {
  price.value = 1.0;
  vipPrice.value = 1.0;
}



</script>

<template>
  <q-page>
    <q-breadcrumbs class="text-brown q-ma-md">
      <template v-slot:separator>
        <q-icon
          size="1.5em"
          name="chevron_right"
          color="primary"
        />
      </template>

      <q-breadcrumbs-el label="首页" icon="home" to="/"/>
      <q-breadcrumbs-el label="世界首页" icon="widgets"  to="/world/index"/>
      <q-breadcrumbs-el label="世界列表" icon="navigation" to="/world/order" />
      <q-breadcrumbs-el label="小说列表" icon="navigation" to="/story/order" />
      <q-breadcrumbs-el label="创建小说" icon="navigation" to="/story/create" />
    </q-breadcrumbs>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">创建小说</div>
      </q-card-section>

      <q-separator />

      <q-card-actions >
        <div class="q-pa-md" style="max-width: 400px">

          <q-form
            class="q-gutter-md"
            @reset="onReset"
            @submit="onSubmit"
          >
            <div class="q-pa-md q-gutter-sm">
              <div>
                <q-img
                  :src="previewImage"
                  spinner-color="white"
                  style="height: 140px; max-width: 150px"
                />
              </div>
              <input accept="image/*" type="file" @change="handleImageUpload"/>
            </div>
            <q-input
              v-model="title"
              :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入小说名称，长度2-100']"
              filled
              hint="输入小说名称"
              label="小说名称 *"
              lazy-rules
            />
            <q-input
              v-model="wname"
              :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入世界名称，长度2-100']"
              filled
              hint="输入世界名称"
              label="世界名称 *"
              lazy-rules
            />

            <q-input
              v-model="intro"
              :rules="[ val => val && val.length >= 5 && val.length <= 300 || '请输入简介，长度5-300']"
              filled
              label="简介 *"
              type="textarea"
            />
            <!--      </div>-->
            <q-input
              v-model="tags"
              :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入标签，长度3-30']"
              filled
              label="标签 *"
              lazy-rules
              type="text"
            />
            <div>
              <q-select v-model="charge" :options="chargeList" emit-value hint="分类" label="分类"
                        map-options
                        outlined
                        @update:modelValue="updateCharge"/>
            </div>
            <div>
              <q-btn color="primary" label="提交" type="submit"/>
              <q-btn class="q-ml-sm" color="primary" flat label="返回" type="reset"/>
            </div>
          </q-form>
        </div>
      </q-card-actions>
    </q-card>
  </q-page>

</template>

<style scoped>

</style>
