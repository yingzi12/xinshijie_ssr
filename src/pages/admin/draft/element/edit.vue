<script lang="ts" setup>
import { Dialog,  useQuasar } from 'quasar';
import { api } from "boot/axios";
import { Cookies } from 'quasar'
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, toRefs } from 'vue';
import { compressIfNeeded } from 'boot/tools';
import chooseCategoryComponent from 'components/category/chooseCategoryComponent.vue';
const token = Cookies.get('token');
const route = useRoute();
import editorTextComponent from 'components/common/editorTextComponent.vue';
import { moduleOptions } from 'boot/consts';

const wid = ref(route.query.wid);
const deid = ref(route.query.deid);
const wname = ref(route.query.wname);
const $q = useQuasar();
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const imgUrl = ref(null);
const previewImage = ref("/favicon.ico");
const selectedImage = ref<File | null>(null);
const data = reactive({
  addForm: {
    title: "",
    id:deid.value,
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
const cidTagList=ref([]);
const { addForm } = toRefs(data);
const isContentLoaded = ref(false); // 用于控制子组件的渲染
async function handValue() {
  const response = await api.get(`/admin/draftElement/getInfo?deid=${deid.value}&wid=${wid.value}`);
  const data=response.data;
  if (data.code == 200) {
    addForm.value=data.data;
    isContentLoaded.value=true;
    for(var i=0;i<addForm.value.categoryList.length;i++){
      cidTagList.value.push(addForm.value.categoryList[i].value);
    }
  }
}
handValue();
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
  addForm.value.categoryList=[];
  for(var i=0;cidTagList.value.length>i;i++){
    console.log(cidTagList.value[i])
    addForm.value.categoryList.push(cidTagList.value[i].split("$$")[0]);
  }
  const response = await api.post("/admin/draftElement/edit", JSON.stringify(addForm.value), {
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
      message: '修改成功.',
      ok: {
        push: true
      },
    }).onOk(async () => {
      router.push(`/admin/draft/element`); // Redirect to login page
    }).onCancel(async () => {
      router.push(`/admin/draft/element`); // Redirect to login page
    });
  } else {
    Dialog.create({
      color: 'green-4',
      message: `修改失败${data.msg}`
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
// 定义处理函数来接收子组件传递的数据
const handleCidList = (selectedIds) => {
  console.log("从子组件接收到的选中ID列表:", selectedIds);
  // 在这里您可以根据需要处理这些ID，比如更新父组件的状态、发起新的API请求等
  cidTagList.value=selectedIds;
};


</script>

<template>
  <q-page>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="keyboard_return" />
        <q-toolbar-title>返回草稿详细</q-toolbar-title>
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </div>

    <div class="bg-orange text-white">
      <q-toolbar>
        <!--      <q-btn flat round dense icon="menu" class="q-mr-sm" />-->
        <q-toolbar-title>编辑元素</q-toolbar-title>
        <!--      <q-space />-->
        <!--      <q-btn flat round dense icon="search" class="q-mr-xs" />-->
        <!--      <q-btn flat round dense icon="group_add" />-->
      </q-toolbar>
<!--      <q-toolbar inset>-->

<!--        <q-toolbar-title>-->
<!--          <q-btn flat round label="这是分卷名称" to="/admin/story/chapter"/>-->
<!--        </q-toolbar-title>-->
<!--        <q-space />-->
<!--        &lt;!&ndash;      <q-btn flat round dense icon="add" label="新增章节" to="/admin/chapter/create"/>&ndash;&gt;-->

<!--      </q-toolbar>-->
    </div>

    <q-card class="my-card">
      <q-card-section>
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
                  <div class="q-pa-md" style="width: 100%">
                    <div class="row no-wrap bg-primary  shadow-1">
                      <q-toolbar class="col" :class="$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-grey-3'">
                        <q-btn flat round dense icon="menu" />
                        <q-input v-model="content.title"
                                 label="Standard"
                                 :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入小节名称，长度2-100']"
                                 lazy-rules

                        />
                        <q-btn flat round dense icon="save" />
                      </q-toolbar>
                      <q-toolbar class="col  text-white">
                        <q-space />
                        <q-btn flat round dense icon="delete"  @click="delInfo(index)" />
                      </q-toolbar>
                    </div>
                  </div>
                </q-card-section>
                <q-card-actions>
                  <editor-text-component      v-if="isContentLoaded"  :key="content.id" :content="content.contentZip" @editor="args => content.contentZip=args"></editor-text-component>
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
