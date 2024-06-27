<script setup lang="ts">
import { compressIfNeeded, getImageUrl } from 'boot/tools';
import {api} from "boot/axios";
import {Dialog, useQuasar} from "quasar";
import { ref, defineProps, reactive, toRefs } from 'vue';

import {useRouter} from "vue-router";
const $q = useQuasar();

const previewImage = ref("/favicon.png");
const selectedImage = ref<File | null>(null);
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数

interface Category {
  wid: string;
  pid: string;
  id: string;
  tier: number;
  label: string;
  imgUrl: string;

}

const props = defineProps<{ value: Category }>();

const data = reactive({
  editForm: {
    id:props.value.id,
    wid: props.value.wid,
    imgUrl:props.value.imgUrl,
    label:props.value.label
  }
});
const { editForm } = toRefs(data);

async function handleImageUpload(event: Event) {
  try {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      throw new Error("No file selected");
    }
    selectedImage.value = file;
    const compressedFile = await compressIfNeeded(file);

    const formData = new FormData();
    formData.append('file', compressedFile);

    const response = await api.put( '/admin/image/upload',  formData);
    const data = await response.data; // 确保使用 await 等待 json 解析完成
    if (data.code === 200) {
      previewImage.value = $q.config.sourceWeb + data.data;
      editForm.value.imgUrl=data.data;
    } else {
      Dialog.create({
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
    Dialog.create({
      title: '错误',
      message: "出现异常",
      ok: {
        push: true
      },
    }).onOk(async () => {
      console.log("ok");
    });
  }
}

async function onAddSumbit(){
  //图片不能为空
  if(editForm.value.imgUrl=="" || editForm.value.imgUrl==null || editForm.value.imgUrl==undefined){
    Dialog.create({
      title: '错误',
      message: "图片不能为空",
      ok: {
        push: true
      },
    }).onOk(async () => {
      console.log("ok");
    });
    return;
  }
  const response = await api.post("/admin/category/edit", JSON.stringify(editForm.value));
  const data = response.data;
  //console.log(data)
  if (data.code == 200) {
    Dialog.create({
      title: '通知',
      message: '修改成功.',
      ok: {
        push: true
      },
    }).onOk(async () => {
      router.go(0);

      // router.push('/admin/shop/category/index'); // Redirect to login page
    }).onCancel(async () => {
      //刷新页面
      router.go(0);
      // router.push('/admin/shop/category/index'); // Redirect to login page
    });
  } else {
    Dialog.create({
      title: '通知',
      color: 'red-4',
      message: '修改失败'
    });
  }
}

</script>

<template>

  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">添加分类</div>
    </q-card-section>
    <div class="q-pa-md q-gutter-sm">
      <div>
        <q-img  style="height: 140px; max-width: 150px"
                spinner-color="white"
                :src="getImageUrl(props.value.imgUrl)"
               @error.once="() => { $event.target.src = '/empty.jpg'; }"
        />
      </div>
      <input accept="image/*" type="file" @change="handleImageUpload"/>
    </div>
    <q-card-section class="q-pt-none">
      <q-form
          class="q-gutter-md"
          @submit="onAddSumbit"
      >
        <q-input
            v-model="editForm.label"
            :rules="[
    (val) => {
      const isLengthValid = val && val.length >= 2 && val.length <= 100;
      // 允许字母、数字、中文、空格、下划线和连字符
      const isCharValid = /^[a-zA-Z0-9\u4e00-\u9fa5\s_-]+$/.test(val);

      if (!isLengthValid) {
        return '请输入分类名称，长度2-100';
      }
      if (!isCharValid) {
        return '分类名称不能包含特殊符号';
      }
      return true;
    }
  ]"
            filled
            hint="输入分类名称"
            label="分类名称 *"
            lazy-rules
        />

        <q-btn flat label="取消" v-close-popup />
        <q-btn color="primary" label="Submit" type="submit"/>
      </q-form>

    </q-card-section>

  </q-card>
</template>

<style scoped>

</style>
