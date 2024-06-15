<script lang="ts" setup>
import { useQuasar } from 'quasar';
import pica from "pica";
import { api } from "boot/axios";
import { compressAccurately } from 'image-conversion';
import { Cookies } from 'quasar'
import {useRouter} from "vue-router";
import {ref} from "vue";
import {compressIfNeeded} from "boot/tools";
import { addObject, insertObjectAfterId, MyObject, myObjectArray, removeObjectById } from 'boot/ArrayUtils';
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
    wname: wname.value,
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
      router.go(-1)// Redirect to login page
    }).onCancel(async () => {
      router.go(-1)// Redirect to login page
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
// 初始的 MyObject 类型的对象数组
const myInfoArray = ref<MyObject[]>([
  { id: 1, title: 'Title 1', info: 'Info 1', bh: 1001 }
]);

const qeditor= ref(
  '<pre>Check out the two different types of dropdowns' +
  ' in each of the "Align" buttons.</pre> '
);
function uploadIt () {
  $q.notify({
    message: 'Server unavailable. Check connectivity.',
    color: 'red-5',
    textColor: 'white',
    icon: 'warning'
  })
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

const dialogAert=ref(false)
const selected= ref('Pleasant surroundings');
const ticked=ref([ 'Quality ingredients', 'Good table presentation' ]);
const expanded= ref(['Satisfied customers1', 'Satisfied customers', 'Good service (disabled node)', 'Pleasant surroundings' ]);

const simple=[
  {
    label: 'Satisfied customers1',
    children: [
      {
        label: 'Good food11',
        children: [
          { label: 'Quality ingredients111' },
          {
            label: 'Good recipe112',
            children: [
              { label: 'Quality ingredients1121' },
              { label: 'Good recipe1122' ,
                children: [
                  { label: 'Quality ingredients11221' ,
                    children: [
                      { label: 'Quality ingredients112211' },
                      { label: 'Good recipe112212' }
                    ]
                  },
                  { label: 'Good recipe11222' }
                ]
              }
            ]
          }
        ]
      },
      {
        label: 'Good service (disabled node)',
        disabled: true,
        children: [
          {
            label: 'Prompt attention' ,
            children: [
              { label: 'Quality ingredients' },
              { label: 'Good recipe' }
            ]
          },
          { label: 'Professional waiter'
          }
        ]
      },
      {
        label: 'Pleasant surroundings',
        children: [
          { label: 'Happy atmosphere' },
          { label: 'Good table presentation' },
          { label: 'Pleasing decor' }
        ]
      }
    ]
  }
]

function addInfo(id){
  console.log("----addInfo---")
  const timestamp = Date.now();
  const myObject: MyObject = {
    id: timestamp,
    title: 'Example Title',
    info: 'This is some info',
    bh: 12345
  };
  const updatedArrayAfterInsert =  insertObjectAfterId(myInfoArray.value,id,myObject);
  myInfoArray.value=updatedArrayAfterInsert;
  console.log("----addInfo--stop-")
}
function delInfo(id){
  console.log("----delInfo-{id}--")
  const updatedArrayAfterRemove = removeObjectById(myInfoArray.value, id);
  myInfoArray.value=updatedArrayAfterRemove;
  console.log("----delInfo--stop-")
}
function newInfo(){
  console.log("----newInfo-{id}--")
  const timestamp = Date.now();
  const myObject: MyObject = {
    id: timestamp,
    title: 'Example Title',
    info: 'This is some info',
    bh: 12345
  };
  const updatedArrayAfterRemove = addObject(myInfoArray.value,myObject);
  myInfoArray.value=updatedArrayAfterRemove;
  console.log("----newInfo--stop-")
}
</script>

<template>
  <q-page>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="keyboard_return" />
        <q-toolbar-title>元素草稿内容</q-toolbar-title>
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </div>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">编辑草稿</div>
        <q-input
          v-model="title"
          :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入元素名称，长度2-100']"
          filled
          hint="输入元素名称"
          label="元素名称 *"
          lazy-rules
        />
      </q-card-section>

      <q-separator />

      <q-card-actions >

        <q-form
          class="q-gutter-md"
          @reset="onReset"
          @submit="onSubmit"
        >
          <q-card style="width: 100%" >
            <q-card-section>
              <div class="text-h6">世界</div>
            </q-card-section>

            <q-separator />
            <q-card-actions >
              <div  style="width: 100%">
                <div  >
                  <q-input
                    v-model="title"
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

          <q-card style="width: 100%" >
            <q-card-section>
              <div class="text-h6">基础</div>
            </q-card-section>

            <q-separator />
            <q-card-actions>
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
            </q-card-actions>
            <q-card-actions >
              <div  style="width: 100%">
                <div>
                  <q-input
                    v-model="intro"
                    :rules="[ val => val && val.length >= 5 && val.length <= 300 || '请输入简介，长度5-300']"
                    filled
                    label="简介 *"
                    type="textarea"
                  />
                </div>
                <div>
                  <q-input
                    v-model="tags"
                    :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入标签，长度3-30']"
                    filled
                    label="标签 *"
                    lazy-rules
                    type="text"
                  />
                </div>
              </div>
            </q-card-actions>
          </q-card>
          <!--          <q-card >-->
          <!--            <q-card-section>-->
          <!--              <div class="text-h6">基础</div>-->
          <!--            </q-card-section>-->

          <!--            <q-separator />-->
          <!--            <q-card-actions>-->
          <!--              <div>-->
          <!--                <div class="q-pa-md q-gutter-sm">-->
          <!--                  <div>-->
          <!--                    <q-img-->
          <!--                      :src="previewImage"-->
          <!--                      spinner-color="white"-->
          <!--                      style="height: 140px; max-width: 150px"-->
          <!--                    />-->
          <!--                  </div>-->
          <!--                  <input accept="image/*" type="file" @change="handleImageUpload"/>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </q-card-actions>-->
          <!--                <q-card-actions>-->
          <!--                  <div style="width: 100%">-->

          <!--                <div>-->
          <!--                  <q-input-->
          <!--                    v-model="title"-->
          <!--                    :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入世界名称，长度2-100']"-->
          <!--                    filled-->
          <!--                    hint="输入世界名称"-->
          <!--                    label="世界名称 *"-->
          <!--                    lazy-rules-->
          <!--                  />-->
          <!--                </div>-->
          <!--                <div>-->
          <!--                  <q-input-->
          <!--                    v-model="intro"-->
          <!--                    :rules="[ val => val && val.length >= 5 && val.length <= 300 || '请输入简介，长度5-300']"-->
          <!--                    filled-->
          <!--                    label="简介 *"-->
          <!--                    type="textarea"-->
          <!--                  />-->
          <!--                </div>-->
          <!--                <div>-->
          <!--                  <q-input-->
          <!--                    v-model="tags"-->
          <!--                    :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入标签，长度3-30']"-->
          <!--                    filled-->
          <!--                    label="标签 *"-->
          <!--                    lazy-rules-->
          <!--                    type="text"-->
          <!--                  />-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </q-card-actions>-->
          <!--          </q-card>-->
          <q-card >
            <q-card-section>
              <div class="text-h6">分类(<q-btn flat label="点击选择分类" color="primary" @click="dialogAert = true" />)</div>
            </q-card-section>

            <q-separator />
            <q-card-actions>
              <div>
                <!--              <div class="text-h6">分类(<q-btn flat label="点击筛选更多" color="primary" @click="dialogAert = true" size="xs" />)</div>-->
                <div class="q-pa-md q-gutter-sm">
                  已选择分类：
                  <q-btn  color="brown" label="全部" size="xs"/>
                  <q-btn  color="brown" label="魔法" size="xs"/>
                  <q-btn  color="brown" label="科学" size="xs"/>
                  <q-btn  color="brown" label="远古" size="xs"/>
                  <q-btn  color="brown" label="修真" size="xs"/>
                  <q-btn  color="brown" label="仙侠" size="xs"/>
                </div>
              </div>
            </q-card-actions>
          </q-card>
          <q-card >
            <q-card-section>
              <span class="text-h6 ">小节</span>
              <span class="text-h6 float-right" @click="newInfo()">添加小节</span>
            </q-card-section>
            <q-separator />
            <q-card-actions>
              <q-card v-for="(info,index ) in myInfoArray" :key="index" >
                <q-card-section>
                  <div class="q-pa-md">
                    <div class="row no-wrap shadow-1">
                      <q-toolbar class="col-8" :class="$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-grey-3'">
                        <q-btn flat round dense icon="menu" />
                        <q-input v-model="info.title"
                                 label="Standard"
                                 :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入小节名称，长度2-100']"
                                 lazy-rules

                        />
                        <q-btn flat round dense icon="save" />
                      </q-toolbar>
                      <q-toolbar class="col-4 bg-primary text-white">
                        <q-space />
                        <q-btn flat round dense icon="add" class="q-mr-sm" @click="addInfo(info.id)" />
                        <q-btn flat round dense icon="delete"  @click="delInfo(info.id)" />
                      </q-toolbar>
                    </div>
                  </div>
                </q-card-section>
                <q-card-actions>
                  <div class="q-pa-md q-gutter-sm">
                    <q-editor
                      v-model="info.info"
                      :dense="$q.screen.lt.md"
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
                </q-card-actions>
              </q-card>
            </q-card-actions>
          </q-card>
          <div>
            <q-btn color="primary" label="提交" type="submit"/>
            <q-btn class="q-ml-sm" color="primary" flat label="返回" type="reset"/>
          </div>

        </q-form>
      </q-card-actions>
    </q-card>
  </q-page>
  <q-dialog v-model="dialogAert">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-pa-md row q-col-gutter-sm">
          <q-tree class="col-12 col-sm-6"
                  :nodes="simple"
                  node-key="label"
                  tick-strategy="leaf"
                  v-model:selected="selected"
                  v-model:ticked="ticked"
                  v-model:expanded="expanded"
          />
          <div class="col-12 col-sm-6 q-gutter-sm">
            <div class="text-h6">Selected</div>
            <div>{{ selected }}</div>

            <q-separator spaced />

            <div class="text-h6">Ticked</div>
            <div>
              <div v-for="tick in ticked" :key="`ticked-${tick}`">
                {{ tick }}
              </div>
            </div>

            <q-separator spaced />

            <div class="text-h6">Expanded</div>
            <div>
              <div v-for="expand in expanded" :key="`expanded-${expand}`">
                {{ expand }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>


</template>

<style scoped>

</style>
