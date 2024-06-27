<script setup lang="ts">

import { imageUrl } from 'src/utils/imageUtil';
import { reactive, ref, toRefs } from 'vue';
import { Cookies, Dialog, Notify } from 'quasar';
import { compressIfNeededBatch, getImageUrl } from 'boot/tools';
import { api } from 'boot/axios';

const circleUrl=Cookies.get("avatar");

const data = reactive({
  addForm: {
    types:2,
    content:"",
    urls:"",

  }
});
const { addForm } = toRefs(data);
const fileList=ref([]);

function  log (desert) {
  // console.log(`${desert} has been removed`)
}
const fileInput = ref(null);

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

// 判断文件是否为视频
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

async function onSubmit() {
  if (!addForm.value.content) {
    Dialog.create({
      title: '提示',
      message: '评论不能为空',
      ok: { label: '确定' },
      cancel: { label: '取消' },
    });
    return;
  }
  if (addForm.value.content.length < 5 || addForm.value.content.length > 300) {
    Dialog.create({
      title: '提示',
      message: '评论不能少于5字大于300字',
      ok: { label: '确定' },
      cancel: { label: '取消' },
    });
    return;
  }
  addForm.value.urls=JSON.stringify(fileList.value);
  const response = await api.post('/user/say/add', JSON.stringify(addForm.value), {
    headers: { 'Content-Type': 'application/json' },
  });
  const data = response.data;
  if (data.code === 200) {
    Dialog.create({
      title: '提示',
      message: '评论成功',
      ok: { label: '确定' }
    });
  }
}

function onRemove(index){
  fileList.value.splice(index,1);
}

</script>

<template>
<q-card style="min-width: 450px">
  <q-card-section>
    <q-toolbar>
      <q-toolbar-title>
        发表评论
      </q-toolbar-title>
<!--      <q-btn-->
<!--        flat-->
<!--        dense-->
<!--        round-->
<!--        @click="close"-->
<!--        icon="send"-->
<!--      />-->
    </q-toolbar>
    <q-item>
      <q-item-section avatar top>
        <q-avatar>
          <q-img
            :src="getImageUrl(circleUrl)"
            @error.once="() => { $event.target.src = '/empty.jpg'; }"
          />

        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-input
          v-model="addForm.content"
          filled
          autogrow
        />
      </q-item-section>
    </q-item>
  </q-card-section>
  <q-card-section>
    <div class="float-right">
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
      <q-btn
        dark-percentage
        unelevated
        color="blue"
        text-color="grey-9"
        label="提交"
        style="width: 100px"
        @click="onSubmit"
      />
    </div>

  </q-card-section>
  <q-card-section>
    <div class="q-col-gutter-md row items-start">
      <div class="col-4"
        v-for="(value,index) in fileList"
        :key="index"
           style="min-width: 130px;min-height: 150px;"
      >
        <q-card style="width: 100%">
          <q-img  :src="getImageUrl(value.imgUrl)" style="min-width: 130px;min-height: 150px;"
                  @error.once="() => { $event.target.src = '/empty.jpg'; }"
          />
          <q-btn  round   class="absolute" color="primary" icon="close"  size="xs"  style="top: 0; right: 0px; transform: translateY(-0%);" @click="onRemove(index)"/>

        </q-card>
        <q-video v-if="value.type== 2 " v-model="value.stauts" @remove="log('Icecream')"
                 :src="getImageUrl(value.imgUrl)"
                 @error.once="() => { $event.target.src = '/empty.jpg'; }"
        />
      </div>
    </div>
  </q-card-section>
</q-card>
</template>

<style scoped>

</style>
