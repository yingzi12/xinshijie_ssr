<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import addColumnComponenet from "components/forum/addColumnComponenet.vue";
import editColumnComponenet from "components/forum/editColumnComponenet.vue";
import { useRoute, useRouter } from 'vue-router';

import { Dialog } from 'quasar';
import { api } from 'boot/axios';
import { imageUrl } from 'src/utils/imageUtil';
const route = useRoute();
const wid = ref(route.query.wid);
const wname = ref(route.query.wname);
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数

const selected = ref(null);


const queryData = reactive({
  addForm: {
    pid: 0,
    kind:1,
    label:"",
    id:0,
    introduce: "",
  },
  editForm: {
    pid: 0,
    kind:1,
    id:1,
    label: "",
    imgUrl: "",
    introduce: "",
  },
  rules: {},
});
const {addForm,editForm, rules} = toRefs(queryData);

const dataStree=ref([]);
async function getCategoryTree() {
 const response =await api.get(`/wiki/forumColumn/getTree?wid=${wid.value}`);
 if(response.data.code ==200) {
   dataStree.value = response.data.data
 }
}
getCategoryTree();

const addDiaLog=ref(false);
const editDiaLog=ref(false);

async function onAddClick (id:number,kind:number) {
  addForm.value.pid=id;
  addForm.value.kind=kind+1;
  addDiaLog.value=true;
}

async function onEditClick (cetory) {
  console.log(cetory);
  editForm.value.pid=cetory.pid;
  editForm.value.id= cetory.id;
  editForm.value.label=cetory.label;
  editForm.value.imgUrl=cetory.imgUrl;
  editForm.value.introduce=cetory.introduce;
  editDiaLog.value=true;
}

function onDeleteClick (id:number) {
  Dialog.create({
    title: 'Delete',
    message: 'Are you sure you want to delete this item?',
    cancel: true,
    persistent: true,
    ok: {
      label: 'Delete',
      color: 'negative',
    },
  }).onOk(() => {
    delCategory(id);
    // 确认删除操作
    console.log('User confirmed deletion');
  }).onCancel(() => {
    // 取消删除操作
    console.log('User canceled deletion');
  });
  console.log(`onDeleteClick ${id}`)
  // state.props=updatedArrayAfterRemove;
}

async function delCategory(id:number) {
  const response = await api.get(`/admin/forumColumn/del?id=${id}`);
  const data = response.data;
  // 更新数据
  if (data.code === 200) {
    // total.value = data.data.total;
    // state.value = data.data;
    // const updatedArrayAfterRemove = removeNodeById(state.value, id);

  }else{
    Dialog.create({
      title: 'Error',
      message: `删除失败${data.msg}`,
      ok: {
        label: 'OK',
        color: 'primary',
      },
    })
  }
}


</script>

<template>
  <q-page>
    <q-toolbar class="bg-purple text-white">
<!--      <q-btn flat round dense icon="assignment_ind" />-->
      <q-toolbar-title>
        栏目管理
      </q-toolbar-title>
<!--      <q-btn flat round dense icon="apps" class="q-mr-xs" />-->
<!--      <q-btn flat round dense icon="more_vert" />-->
    </q-toolbar>
    <q-separator dark inset />
    <div class="q-pa-md q-gutter-sm">
      <div>
        <div class="q-gutter-sm">
          <q-btn size="sm" color="primary"  label="添加一级栏目" @click="onAddClick(0,0)"/>
        </div>
      </div>
      <q-tree
        :nodes="dataStree"
        default-expand-all
        v-model:selected="selected"
        node-key="id"
      >
        <template v-slot:default-header="prop">
          <div class="row items-center">
            <img :src="imageUrl(prop.node.imgUrl)" class="q-mr-sm" style="width:50px;height:50px">
               <div class="text-weight-bold text-primary">{{prop.node.label}}
            </div>
            <q-icon name="eco" color="orange" size="28px" class="q-mr-sm" />
            <q-fab
              v-model="prop.node.isOp"
              color="purple"
              icon="keyboard_arrow_right"
              direction="right"
              padding="xs"
            >
              <q-fab-action padding="5px" color="primary" @click="onAddClick(prop.node.id,prop.node.kind)" icon="add" label="添加子类" />
              <q-fab-action padding="5px" color="primary" @click="onEditClick(prop.node)" icon="add" label="修改" />
              <q-fab-action padding="5px"   color="orange" @click="onDeleteClick(prop.node.id)" icon="delete" label="删除" />
            </q-fab>
          </div>
        </template>
        <template v-slot:default-body="prop">
          <div v-if="prop.node.introduce">
            <span class="text-weight-thin">
           {{ prop.node.introduce }}
            </span>
          </div>
<!--          <span v-else class="text-weight-light text-black">This is some default content.</span>-->
        </template>
      </q-tree>
    </div>
    <q-dialog v-model="addDiaLog" persistent>
      <add-column-componenet :value="addForm"></add-column-componenet>
    </q-dialog>

    <q-dialog v-model="editDiaLog" persistent>
      <edit-column-componenet :value="editForm"></edit-column-componenet>
    </q-dialog>
  </q-page>
</template>

<style scoped>

</style>
