<script lang="ts" setup>
import { Dialog, useQuasar } from 'quasar';
import pica from "pica";
import { api } from "boot/axios";
import { compressAccurately } from 'image-conversion';
import { Cookies } from 'quasar'
import {useRouter} from "vue-router";
import { reactive, ref, toRefs } from 'vue';
import {compressIfNeeded} from "boot/tools";
const token = Cookies.get('token');
const $q = useQuasar();
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const imgUrl = ref(null);
const data = reactive({
  addForm: {
    types:"",
    intro:"",
    descriptionZip:"",
    tags:"",
    name: "",
    status: 0,
    source: "",
    imgUrl:"",
    checkList:[],
  }
});
const { addForm } = toRefs(data);
const previewImage = ref("/favicon.ico");
const selectedImage = ref<File | null>(null);


async function onSubmit() {
  if(addForm.value.imgUrl ==null || addForm.value.imgUrl == undefined || addForm.value.imgUrl ==""){
     Dialog.create({
       title: '错误',
       message: '请上传封面图.',
       ok: {
         push: true
       },
     })
    return;
  }
  if(addForm.value.types ==null || addForm.value.types == undefined || addForm.value.types ==""){
    Dialog.create({
      title: '错误',
      message: '请选择分类.',
      ok: {
        push: true
      },
    })
    return;
  }
  if(addForm.value.checkList.length==0){
    Dialog.create({
      title: '错误',
      message: '请选择世界来源.',
      ok: {
        push: true
      },
    })
    return;
  }
  addForm.value.source=addForm.value.checkList.toString();
  const response = await api.post("/admin/world/add", JSON.stringify(addForm.value), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const data = response.data;
  if (data.code == 200) {
    Dialog.create({
      title: '通知',
      message: '添加成功.',
      ok: {
        push: true
      },
    }).onOk(async () => {
      router.go(-1)// Redirect to login page
    }).onCancel(async () => {
      router.go(-1)// Redirect to login page
    });
  } else {
    Dialog.create({
      title: '错误',
      message: data.msg,
      ok: {
        push: true
      },
    })
  }
}

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
    const response = await api.put( '/admin/file/upload',  formData,{
      headers: {
        'Content-Type': 'multipart/form-data', // 实际上通常不需要手动设置，这里仅作示例
        'Authorization': `Bearer ${token}`
      },
    });
    const data = await response.data; // 确保使用 await 等待 json 解析完成
    if (data.code === 200) {
      previewImage.value = $q.config.sourceWeb + data.data;
      imgUrl.value = data.data;
      addForm.value.imgUrl=data.data;
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
const ischeck=ref(0)
function handleSurce(){
  if(addForm.value.checkList.length==0){
    ischeck.value=0;
  }else {
    if (addForm.value.checkList.indexOf("原创") != -1) {
      ischeck.value = 1;
    } else {
      ischeck.value = 2;
    }
  }
}

</script>

<template>
<q-page>

  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">创建世界</div>
    </q-card-section>

    <q-separator />

    <q-card-actions >
      <div class="q-pa-md" >

        <q-form
          class="q-gutter-md"
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
            v-model="addForm.name"
            :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入世界名称，长度2-100']"
            filled
            hint="输入世界名称"
            label="世界名称 *"
            lazy-rules
          />
          <q-input
            v-model="addForm.tags"
            :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入标签，长度2-100']"
            filled
            hint="输入标签。多个使用英文;分割"
            label="标签 *"
            lazy-rules
          />
          <q-input
            v-model="addForm.intro"
            :rules="[ val => val && val.length >= 5 && val.length <= 300 || '请输入简介，长度5-300']"
            filled
            label="简介 *"
            type="textarea"
          />
          <!--      </div>-->
          <q-input
            v-model="addForm.descriptionZip"
            :rules="[ val => val && val.length >= 3 && val.length <= 500 || '请输入标签，长度3-500']"
            filled
            label="描述 *"
            lazy-rules
            type="textarea"
          />
          <div>
            <q-select v-model="addForm.types" :options="chargeList" emit-value hint="分类" label="分类"
                      map-options
                      outlined
            />
          </div>
          <div>
            <q class="text-subtitle1">世界来源：</q>
            <div class="q-gutter-sm">
              <q-checkbox v-model="addForm.checkList" val="原创" label="原创" v-if="ischeck==0 || ischeck==1" @click="handleSurce" />
              <q-checkbox v-model="addForm.checkList" val="游戏" label="游戏"  v-if="ischeck==0 || ischeck==2" @click="handleSurce"/>
              <q-checkbox v-model="addForm.checkList" val="小说" label="小说" v-if="ischeck==0 || ischeck==2" @click="handleSurce"/>
              <q-checkbox v-model="addForm.checkList" val="电影" label="电影"  v-if="ischeck==0 || ischeck==2" @click="handleSurce" />
              <q-checkbox v-model="addForm.checkList" val="动漫" label="动漫"  v-if="ischeck==0 || ischeck==2"  @click="handleSurce"/>
              <q-checkbox v-model="addForm.checkList" val="电视剧" label="电视剧"  v-if="ischeck==0 || ischeck==2" @click="handleSurce" />
              <q-checkbox v-model="addForm.checkList" val="其他" label="其他"  v-if="ischeck==0 || ischeck==2"  @click="handleSurce"/>

            </div>
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
