<script lang="ts" setup>
import { Dialog, useQuasar } from 'quasar';
import { api } from "boot/axios";
import { Cookies } from 'quasar'
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, toRefs } from 'vue';
import {compressIfNeeded} from "boot/tools";

const token = Cookies.get('token');
const $q = useQuasar();
const route = useRoute(); // 使用 Vue Router 的 useRouter 函数
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const imgUrl = ref(null);
const wid = ref(route.query.wid);
const wname = ref(route.query.wname);
const storyKind=reactive([{value:1,label:"主线"},{value:2,label:"支线"},{value:3,label:"杂谈"},{value:3,label:"异想"}])

const data = reactive({
  addForm: {
    wid:wid.value,
    wname:wname.value,
    types:"",
    isPrivate:1,
    isEdit:1,
    kind:1,
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
  const response = await api.post("/admin/story/add", JSON.stringify(addForm.value), {
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
        <div class="text-h6">创建故事</div>
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
              :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入故事名称，长度2-100']"
              filled
              hint="输入故事名称"
              label="故事名称 *"
              lazy-rules
            />
            <q-card style="width: 100%" >
              <q-card-section>
                <div class="text-h6">世界</div>
              </q-card-section>

              <q-separator />
              <q-card-actions >
                <div  style="width: 100%">
                  <div  >
                    <q-input
                      v-model="addForm.wname"
                      :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入世界名称，长度2-100']"
                      filled
                      hint="输入世界名称"
                      label="世界名称 *"
                      lazy-rules
                    />
                  </div>
                  <div>
                    <p class="text-body1 q-ma-md">这是世界简介，这是世界简介这是世界简介这是世界简介这是世界简介这是世界简介这是世界简介这是世界简介这是世界简介这是世界简介这是世界简介这是世界简介
                      这是世界简介这是世界简介这是世界简介这是世界简介</p>

                  </div>
                </div>
              </q-card-actions>
            </q-card>

            <div>
              <q-select v-model="addForm.types" :options="chargeList" emit-value hint="分类" label="分类"
                        map-options
                        outlined
              />
            </div>
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
<!--            <div class="q-pa-md q-gutter-sm">-->
            <div class="text-subtitle1">描述：</div>
              <q-editor
                v-model="addForm.descriptionZip"
                :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入描述，长度3-500']"
                :definitions="{
        bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
      }"
              />
<!--            </div>-->

            <div class="q-gutter-sm">
              <div class="text-subtitle1">是否公开编辑:</div>

              <q-radio v-model="addForm.isEdit" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="1" label="允许公开编辑" />
              <q-radio v-model="addForm.isEdit" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="2" label="禁止公开编辑" />
            </div>
            <div class="q-gutter-sm">
              <div class="text-subtitle1">是否公开阅读:</div>
              <q-radio v-model="addForm.isPrivate" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="2" label="允许公开阅读" />
              <q-radio v-model="addForm.isPrivate" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="1" label="禁止公开阅读" />
            </div>
            <div>
              <div>
                <p>主线：必须符合世界观规定，并且会影响到世界发展走势</p>
                <p>支线：必须符合世界观规定，不会影响到到世界发展走势，记录主线之外发生的事</p>
                <p>杂谈：在世界观的基础，进行戏说，可以不完全符合世界观，不会对世界产生影响</p>
                <p>异想：无需符合世界规定，跟世界线无关，不会对世界产生影响</p>
              </div>
              <div>
                <q-select v-model="addForm.kind" :options="storyKind" emit-value hint="类 型" label="类 型"
                          map-options
                          outlined
                />
              </div>
            </div>
            <div>
              <div class="text-subtitle1">世界来源：</div>
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
              <q-btn class="q-ml-sm" color="primary" flat label="返回" type="reset" @click="router.go(-1)"/>
            </div>
          </q-form>
        </div>
      </q-card-actions>
    </q-card>
  </q-page>

</template>

<style scoped>

</style>
