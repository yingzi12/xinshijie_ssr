<script setup lang="ts">
import headComponent from 'components/story/headComponent.vue';
import { reactive, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api, tansParams } from 'boot/axios';
import { Dialog } from 'quasar';
const route = useRoute();
const router = useRouter();

const sid = ref(route.query.sid);
const sname = ref(route.query.sname);
const id = ref(route.query.id);
const rid = ref(route.query.rid);
const rname = ref(route.query.rname);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    title: "",
    sid:sid.value,
    pid:rid.value,
    level:1
  },
  rules: {
    title: [{ required: true, message: "分类/目录名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);

const  current= ref(1);

const valueList=ref([]);
//总数
const  total= ref(0);
//有多少页
const  maxPage=ref(0);
async function getValueList() {
  queryParams.value.pageNum=current.value

  try {
    const response = await api.get('/admin/chapter/list?' + tansParams(queryParams.value));
    const data=response.data;
    if (data.code == 200) {
      valueList.value=data.data;
      total.value=data.total;
      total.value = response.data.total;
      if(total.value % queryParams.value.pageSize == 0){
        maxPage.value=total.value/queryParams.value.pageSize;
      }else{
        maxPage.value=total.value/queryParams.value.pageSize+1;
      }
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
getValueList();

const addData = reactive({
  editForm: {
    sid:sid.value,
    pid:0,
    level:0,
    isEdit:1,
    isPrivate:1,
    title:"",
    contentZip:"",
    isNew:1,
  }
});
const { editForm} = toRefs(addData);

async function onSerialNumber(value) {
  editForm.value=value;
  const response = await api.post("/admin/chapter/updateSerialNumber", JSON.stringify(editForm.value), {
    headers: {
      'Content-Type': 'application/json',
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
      router.go(0)// Redirect to login page
    }).onCancel(async () => {
      router.go(0)// Redirect to login page
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

</script>

<template>
  <q-page>
    <head-component :sid="sid" :sname="sname" :id="id"></head-component>
    <div class="bg-orange text-white">
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-toolbar-title>{{ rname }}</q-toolbar-title>
        <q-space />
<!--        <q-btn flat round dense icon="search" class="q-mr-xs" />-->
<!--        <q-btn flat round dense icon="group_add" />-->
      </q-toolbar>
      <q-toolbar inset>

        <q-toolbar-title>
          <q-btn flat round label="" to="/admin/story/reel">合计{{total}}</q-btn>
        </q-toolbar-title>
        <q-space />
        <q-btn flat round dense icon="add" label="新增章节" :to="{ path: '/admin/chapter/add', query: { sid: sid,rid:rid,sname:sname,rname:rname,id:4}}"/>

      </q-toolbar>
    </div>
    <q-list bordered class="rounded-borders" >
<!--      <q-item-label header>Google Inbox style</q-item-label>-->
      <div v-for="(value,index) in valueList" :key="index">
        <q-item >
          <q-item-section side>
            {{((current-1)*queryParams.pageSize)+index+1}}
          </q-item-section>

          <q-item-section  side>
            <q-item-label class="q-mt-sm text-h6" lines="1">
              <q-btn flat color="blue"  :to="{ path: '/admin/story/chapter', query: { sid: sid,sname:sname,rid:value.id,rname:value.title}}" >{{ value.title }}</q-btn>
            </q-item-label>
            <q-item-label class="q-mt-sm text-subtitle2">作者：{{value.createName}}</q-item-label>
          </q-item-section>
          <q-item-section  side>
            <q-item-label class="q-mt-sm text-subtitle2">创建时间：{{value.createTime}}</q-item-label>
            <q-item-label class="q-mt-sm text-subtitle2">更新时间：{{value.updateTime}}</q-item-label>
          </q-item-section>
          <q-item-section >
            <q-item-label lines="1">

              <div class="text-weight-bold text-primary"><span class="text-weight-medium">序号：</span>
                <span class="text-grey-8">{{value.serialNumber}}</span>
                <q-popup-edit v-model="value.serialNumber" auto-save>
                  <q-input v-model="value.serialNumber" dense autofocus counter @keyup.enter="onSerialNumber(value)" />
                </q-popup-edit>
              </div>
            </q-item-label>
            <q-item-label lines="1">
              <span class="text-weight-medium">章节数：</span>
              <span class="text-grey-8">{{ value.countChapter }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section top side >
            <div class="text-grey-8 q-gutter-xs">
              <q-btn class="gt-xs" size="12px" flat dense round icon="lock" />
              <q-btn class="gt-xs" size="12px" flat dense round icon="edit" />
              <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
            </div>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </div>

    </q-list>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="current"
        color="purple"
        :max="maxPage"
        :max-pages="6"
        boundary-numbers
        @update:model-value="getValueList"
      />
    </div>

  </q-page>
</template>

<style scoped>

</style>
