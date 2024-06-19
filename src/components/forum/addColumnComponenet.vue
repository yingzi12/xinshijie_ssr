<script setup lang="ts">
import {compressIfNeeded} from "boot/tools";
import {api} from "boot/axios";
import {Dialog, useQuasar} from "quasar";
import { defineProps, reactive, ref, toRefs } from 'vue';
import {useRouter} from "vue-router";
const $q = useQuasar();

const imgUrl = ref("");
const previewImage = ref("/favicon.png");
const selectedImage = ref<File | null>(null);
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数

interface Category {
  pid: string;
  id: string;
  kind: number;
  label: string;
  imgUrl: string;
  introduce: string;

}

const props = defineProps<{ value: Category }>();

const data = reactive({
  addForm: {
    pid:"0",
    imgUrl:"",
    label:"",
    introduce:""
  }
});
const { addForm } = toRefs(data);
// props.value.status=1;
// props.value
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

    const response = await api.put( '/admin/file/upload',  formData);
    const data = await response.data; // 确保使用 await 等待 json 解析完成
    if (data.code === 200) {
      previewImage.value = $q.config.sourceWeb + data.data;
      imgUrl.value = data.data;
      addForm.value.imgUrl=imgUrl.value;
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
  if(imgUrl.value=="" || imgUrl.value==null || imgUrl.value==undefined){
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
  addForm.value.pid=props.value.pid;
  const response = await api.post("/admin/forumColumn/add", JSON.stringify(addForm.value));
  const data = response.data;
  //console.log(data)
  if (data.code == 200) {
    Dialog.create({
      title: '通知',
      message: '添加成功.',
      ok: {
        push: true
      },
    }).onOk(async () => {
      //重新加载刷新页面
      router.go(0);
    }).onCancel(async () => {
      router.go(0);
    });
  } else {
    Dialog.create({
      title: '通知',
      color: 'red-4',
      message: '创建失败'
    });
  }
}
</script>

<template>

  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">添加栏目</div>
    </q-card-section>
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
    <q-card-section class="q-pt-none">
      <q-form
          class="q-gutter-md"
          @submit="onAddSumbit"
      >
        <q-input
            v-model="addForm.label"
            :rules="[
    (val) => {
      const isLengthValid = val && val.length >= 2 && val.length <= 100;
      // 允许字母、数字、中文、空格、下划线和连字符
      const isCharValid = /^[a-zA-Z0-9\u4e00-\u9fa5\s_-]+$/.test(val);

      if (!isLengthValid) {
        return '请输入栏目名称，长度2-100';
      }
      if (!isCharValid) {
        return '栏目名称不能包含特殊符号';
      }
      return true;
    }
  ]"
            filled
            hint="输入分类名称"
            label="分类名称 *"
            lazy-rules
        />

        <q-input
          v-model="addForm.introduce"
          :rules="[
    (val) => {
      const isLengthValid = val && val.length >= 2 && val.length <= 300;
      // 允许字母、数字、中文、空格、下划线和连字符
      // const isCharValid = /^[a-zA-Z0-9\u4e00-\u9fa5\s_-]+$/.test(val);

      if (!isLengthValid) {
        return '请输入简介，长度2-300';
      }
      // if (!isCharValid) {
      //   return '简介不能包含特殊符号';
      // }
      return true;
    }
  ]"
          filled
          hint="输入简介"
          label="简介 *"
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
