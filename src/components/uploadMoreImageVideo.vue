<script setup lang="ts">
import { ref } from 'vue';
import { Dialog, Notify } from 'quasar';
import { compressIfNeededBatch } from 'boot/tools';
import { api } from 'boot/axios';

const fileInput = ref(null);
const fileList=ref([]);

async function uploadIt() {
  fileInput.value.click(); // 触发文件选择框
}
async function uploadSelectedFiles(event: Event) {
  const currentInput = event.target;
  console.log(currentInput);
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files) {
    try {
      // 验证文件数量
      if (files.length > 9) {
        Notify.create({
          message: '请选择不超过9个文件',
          color: 'negative',
          textColor: 'white',
          icon: 'warning',
        });
        return;
      }
      if (files.length+fileList.value.length > 9) {
        Notify.create({
          message: '最多9个文件',
          color: 'negative',
          textColor: 'white',
          icon: 'warning',
        });
        return;
      }

      // 验证每个文件大小
      for (const file of files) {
        if (file.size > 50 * 1024 * 1024) {
          Notify.create({
            message: '每个文件大小不能超过50MB',
            color: 'negative',
            textColor: 'white',
            icon: 'warning',
          });
          return;
        }
      }
      // 分类文件为图片和视频
      const images = Array.from(files).filter(isImage);
      const videos = Array.from(files).filter(isVideo);
      //判断文件是否是否图片
      if(images.length>0){
        await simulateUploadImage(images);
      }
      if(videos.length>0){
        await simulateUploadVideo(videos);
      }
      Notify.create({
        message: '上传成功',
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_upload',
      });
    } catch (error) {
      Notify.create({
        message: '上传失败，请重试',
        color: 'negative',
        textColor: 'white',
        icon: 'warning',
      });
    }
  }
}
// 判断文件是否为图片
function isImage(file: File): boolean {
  return /^image\//.test(file.type);
}
function isVideo(file: File): boolean {
  return /^video\//.test(file.type);
}
async function simulateUploadImage(files: FileList) {
  const compressedFile = await compressIfNeededBatch(files);
  const formData = new FormData();
  for (let i = 0; i < compressedFile.length; i++) {
    formData.append('files', compressedFile[i]);
  }
  const response = await api.put( '/admin/image/uploadBatch',  formData,{
    headers: {
      'Content-Type': 'multipart/form-data' // 实际上通常不需要手动设置，这里仅作示例
    }
  });
  const data = await response.data; // 确保使用 await 等待 json 解析完成

  if (data.code === 200) {
    console.log(data)
    for(let i = 0; i < data.data.length; i++){
      console.log(data.data.length)
      if(fileList.value.length<9) {
        fileList.value.push({ imgUrl: data.data[i], status: true, type: 1 });
      }
      console.log(fileList)

    }
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
}

async function simulateUploadVideo(files: FileList) {
  // const compressedFile = await compressIfNeededBatch(files);
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }
  const response = await api.put( '/admin/file/uploadBatch',  formData,{
    headers: {
      'Content-Type': 'multipart/form-data' // 实际上通常不需要手动设置，这里仅作示例
    }
  });
  const data = await response.data; // 确保使用 await 等待 json 解析完成

  if (data.code === 200) {
    console.log(data)
    for(let i = 0; i < data.data.length; i++){
      if(fileList.value.length<9) {
        fileList.value.push({ imgUrl: data.data[i], status: true, type: 2 });
      }
    }
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
}

</script>

<template>
  <input type="file" ref="fileInput" hidden @change="uploadSelectedFiles" accept="image/*,video/*" multiple>
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
