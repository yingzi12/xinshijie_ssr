<script lang="ts" setup>
import { Dialog, Notify, useQuasar } from 'quasar';
import { api } from "boot/axios";
import { Cookies } from 'quasar'
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, toRefs } from 'vue';
import { compressIfNeeded, compressIfNeededBatch } from 'boot/tools';
import chooseCategoryComponent from 'components/category/chooseCategoryComponent.vue';
const token = Cookies.get('token');
const route = useRoute();
import editorTextComponent from 'components/common/editorTextComponent.vue';
import { moduleOptions } from 'boot/consts';

const wid = ref(route.query.wid);
const eid = ref(route.query.eid);
const wname = ref(route.query.wname);
const $q = useQuasar();
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const imgUrl = ref(null);
const previewImage = ref("/favicon.ico");
const selectedImage = ref<File | null>(null);
const data = reactive({
  addForm: {
    title: "",
    wid:wid.value,
    wname:wname.value,
    intro:"",
    tags:"",
    softtype:1,
    categoryList:[],
    contentList:[
      {
        contentZip:"",
        serial:0,
        title:""
      }
    ]
  }
});
const { addForm } = toRefs(data);

function notify(message: string, color: string) {
  $q.notify({
    color: color,
    textColor: 'white',
    icon: color === 'red-5' ? 'warning' : 'cloud_done',
    message: message
  });
}

async function onSubmit() {
  if(cidTagList.value.length==0){
    Dialog.create({
      title: '提示',
      message: '请选择分类',
      ok: {
        push: true
      },
    })
    return;
  }
  for(var i=0;cidTagList.value.length>i;i++){
    console.log(cidTagList.value[i])
    addForm.value.categoryList.push(cidTagList.value[i].split("$$")[0]);
  }
  const response = await api.post("/admin/element/add", JSON.stringify(addForm.value), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
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
      router.push(`/world/element?wid=${wid.value}`); // Redirect to login page
    }).onCancel(async () => {
      router.push(`/world/element?wid=${wid.value}`); // Redirect to login page
    });
  } else {
    Dialog.create({
      color: 'green-4',
      message: `创建失败${data.msg}`
    });
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
    const response = await api.put( '/admin/image/upload',  formData,{
      headers: {
        'Content-Type': 'multipart/form-data', // 实际上通常不需要手动设置，这里仅作示例
        'Authorization': `Bearer ${token}`
      },
    });


    const data = await response.data; // 确保使用 await 等待 json 解析完成
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

function delInfo(index:number){
  addForm.value.contentList.splice(index);
}
function addContent(){
  console.log("----newInfo-{id}--")
  // const timestamp = Date.now();
  addForm.value.contentList.push(
    {
      contentZip:"",
      serial:addForm.value.contentList.length+1,
      title:""
    }
  )
}
const cidDialog=ref(false);
const cidTagList=ref([]);
// 定义处理函数来接收子组件传递的数据
const handleCidList = (selectedIds) => {
  console.log("从子组件接收到的选中ID列表:", selectedIds);
  // 在这里您可以根据需要处理这些ID，比如更新父组件的状态、发起新的API请求等
  cidTagList.value=selectedIds;
};
const world=ref({})
async function handValue() {
  const response = await api.get(`/wiki/world/getInfoByName/${addForm.value.wname}`);
  const data=response.data;
  if (data.code == 200) {
    world.value=data.data;
    addForm.value.wid=world.value.id;
  }else{
    addForm.value.wname=wname.value;
    addForm.value.wid=wid.value;
    Dialog.create({
      title: '错误',
      message: data.msg,
      ok: {
        push: true
      },
    })
  }
}
handValue();

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
      <q-breadcrumbs-el label="这是世界名称" icon="navigation" to="/world/detail" />
      <q-breadcrumbs-el label="创建元素" icon="navigation" to="/story/create" />
    </q-breadcrumbs>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">创建元素</div>
        <q-input
          v-model="addForm.title"
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
                    v-model="addForm.wname"
                    autofocus
                    dense
                    @blur="handValue"
                    :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入世界名称，长度2-100']"
                    filled
                    hint="输入世界名称"
                    label="世界名称 *"
                    lazy-rules
                  />
                </div>
                <div>
                  <div v-html="world.intro"></div>


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
                    v-model="addForm.intro"
                    :rules="[ val => val && val.length >= 5 && val.length <= 300 || '请输入简介，长度5-300']"
                    filled
                    label="简介 *"
                    type="textarea"
                  />
                </div>
                <div>
                  <q-select v-model="addForm.softtype" :options="moduleOptions" emit-value hint="大类" label="大类"
                            map-options
                            outlined
                  />
                </div>
                <div>
                  <q-input
                    v-model="addForm.tags"
                    :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入标签，长度2-100']"
                    filled
                    hint="输入标签。多个使用英文;分割"
                    label="标签 *"
                    lazy-rules
                  />
                </div>
              </div>
            </q-card-actions>
          </q-card>
          <q-card >
            <q-card-section>
              <div class="text-h6">分类(<q-btn flat label="点选择更多" color="primary" @click="cidDialog = true" size="xs" />)</div>
            </q-card-section>

            <q-separator />
            <q-card-actions>
              <div>
                <!--              <div class="text-h6">分类(<q-btn flat label="点击筛选更多" color="primary" @click="dialogAert = true" size="xs" />)</div>-->
                <div class="q-pa-md q-gutter-sm">
                  已选择分类：
                  <q-chip clickable v-for="(tag,index) in cidTagList" :key="index" :color="'yellow' "  >
                    {{tag.split("$$")[1]}}
                  </q-chip>
                </div>
              </div>
            </q-card-actions>
          </q-card>
          <q-card >
            <q-card-section>
              <span class="text-h6 ">小节</span>
              <span class="text-h6 float-right" @click="addContent()">添加小节</span>
            </q-card-section>
            <q-separator />
            <q-card-actions>
              <q-card v-for="(content,index ) in addForm.contentList" :key="index" >
                <q-card-section>
                  <div class="q-pa-md">
                    <div class="row no-wrap shadow-1">
                      <q-toolbar class="col-8" :class="$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-grey-3'">
                        <q-btn flat round dense icon="menu" />
                        <q-input v-model="content.title"
                                 label="Standard"
                                 :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入小节名称，长度2-100']"
                                 lazy-rules

                        />
                        <q-btn flat round dense icon="save" />
                      </q-toolbar>
                      <q-toolbar class="col-4 bg-primary text-white">
                        <q-space />
                        <q-btn flat round dense icon="delete"  @click="delInfo(index)" />
                      </q-toolbar>
                    </div>
                  </div>
                </q-card-section>
                <q-card-actions>
                  <editor-text-component :key="content.id" :content="content.contentZip" @editor="args => content.contentZip=args"></editor-text-component>
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
  <q-dialog v-model="cidDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>
      <q-card-section>
        <choose-category-component :wid="wid" :cid-list="cidTagList" @cid-list="handleCidList" ></choose-category-component>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="确认" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<style scoped>

</style>
