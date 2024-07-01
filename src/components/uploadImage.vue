<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue';
import { compressIfNeeded } from 'boot/tools';
import { api } from 'boot/axios';
import { Cookies, Dialog } from 'quasar';
const previewImage = ref<string>();
const fileInput = ref(null);
const emit = defineEmits(['imgUrl']); // 定义自定义事件

const token=Cookies.get("token");
const props = defineProps({
  imgUrl: String,
});
previewImage.value=props.imgUrl;
const selectedImage = ref<File | null>(null);
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
    const response = await api.put( '/admin/image/upload',  formData,{
      headers: {
        'Content-Type': 'multipart/form-data', // 实际上通常不需要手动设置，这里仅作示例
        'Authorization': `Bearer ${token}`
      },
    });


    const data = await response.data; // 确保使用 await 等待 json 解析完成
    if (data.code === 200) {
      previewImage.value =data.data;
      emit('imgUrl', previewImage.value);
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
      message: "上传失败",
      ok: {
        push: true
      },
    }).onOk(async () => {
      console.log("ok");
    });
  }
}
async function uploadIt() {
  fileInput.value.click(); // 触发文件选择框
}
// function onTickedChange() {
//   // 确保只有叶子节点的ID被收集
//   emit('imgUrl', imgUrl.value);
// }
watch(
  () => props.imgUrl,
  (newCidList) => {
    previewImage.value = newCidList;
    console.log("-------4----previewImage")

    console.log(previewImage)
    // 如果需要在此处执行额外的逻辑，比如过滤或排序数据，可以在这里添加
  },
  { immediate: true } // 添加immediate选项以立即触发watcher
);
</script>

<template>
      <input type="file" ref="fileInput" hidden @change="handleImageUpload" accept="image/*" >
      <q-btn
        dark-percentage
        unelevated
        color="orange"
        text-color="grey-9"
        icon="cloud_upload"
        style="width: 100px"
        @click="uploadIt"
      />
</template>

<style scoped>

</style>
