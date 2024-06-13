<script setup lang="ts">
// 文件选择处理
import { Dialog, Notify, useQuasar } from 'quasar';
import { defineEmits, defineProps, PropType, ref, watch } from 'vue';
import { api } from 'boot/axios';
import { compressIfNeededBatch } from 'boot/tools';

const emit = defineEmits(['editor']); // 定义自定义事件
const $q = useQuasar();

// const selected = ref("");
const editor = ref<string>();
const props = defineProps({
  content: {
    type: String,
    required: true
  }
});

editor.value=props.content;

const fileInput = ref(null);

// 模拟上传图片的方法，现在接受一个FileList作为参数
async function simulateUpload(files: FileList) {
  const compressedFile = await compressIfNeededBatch(files);
  const formData = new FormData();
  for (let i = 0; i < compressedFile.length; i++) {
    formData.append('files', compressedFile[i]);
  }
  const response = await api.put( '/admin/file/uploadBatch',  formData,{
    headers: {
      'Content-Type': 'multipart/form-data' // 实际上通常不需要手动设置，这里仅作示例
    }
  });
  const data = await response.data; // 确保使用 await 等待 json 解析完成

  if (data.code === 200) {
    for(let i = 0; i < data.data.length; i++){
      editor.value=editor.value+ "<img src=\""+ $q.config.sourceWeb + data.data[i]+"\" style=\"max-width:100vw\"/>"
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

// 选择图片的处理函数
async function uploadIt() {
  fileInput.value.click(); // 触发文件选择框
}

// 文件选择后的处理函数，现在处理多个文件
async function uploadSelectedFiles(event: Event) {
  const currentInput = event.target;
  console.log(currentInput);
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files) {
    try {
      await simulateUpload(files);
      Notify.create({
        message: '图片上传成功',
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_upload',
      });
    } catch (error) {
      Notify.create({
        message: '图片上传失败，请重试',
        color: 'negative',
        textColor: 'white',
        icon: 'warning',
      });
    }
  }
}

function onTickedChange() {
  console.log("-------onTickedChange---------")
  // console.log(tickedList.value);
  // 确保只有叶子节点的ID被收集
  emit('editor', editor.value);
}

</script>

<template>
  <input type="file" ref="fileInput" hidden @change="uploadSelectedFiles" accept="image/*" multiple>
  <div class="q-pa-md q-gutter-sm">
    <q-editor
      v-model="editor"
      :dense="$q.screen.lt.md"
      @update:model-value="onTickedChange()"
      :definitions="{
        upload: {
          tip: 'Upload to cloud',
          icon: 'cloud_upload',
          label: 'Upload',
          handler: uploadIt
        }
      }"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen','upload', ],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
    />
  </div>

</template>

<style scoped>

</style>
