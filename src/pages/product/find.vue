<template>
  <q-page>
    <div style="width: 600px" class="caption">
      <form>
        <q-form @submit="onSubmit">
          <q-input label="订单id" v-model="form.orderId"
                   ref="inputRef"
                   filled
                   :rules="[ val => val.length <= 200 || '最多200个字符']"
          />
          <q-input label="联系方式" v-model="form.contactInformation"
                   ref="inputRef"
                   filled
                   :rules="[ val => val.length <= 50 || '最多50个字符']"
          />
          <q-btn type="submit" label="提交" />
        </q-form>
      </form>
    </div>
    <div>
      <div class="q-pa-md">
        <p class="text-h5">订单列表</p>
        <q-markup-table>
          <thead>
          <tr>
            <th class="text-left">订单id</th>
            <th class="text-right">产品名称</th>
            <th class="text-right">产品说明</th>
            <th class="text-right">产品状态</th>
            <th class="text-right">产品信息</th>
            <th class="text-right">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="findImage in findImageList" :key="findImage.id">
            <td class="text-left">{{ findImage.id }}</td>
            <td class="text-right">{{ findImage.pname }}</td>
            <td class="text-right">{{ findImage.describe}}</td>
            <td class="text-right">{{ findImage.status }}</td>
            <td class="text-right">
                 {{ findImage.cardNumber }}
                {{ findImage.cardPassword }}
            </td>
            <td class="text-right"><button @click="handleAdd(findImage.id)">查看密码</button></td>
          </tr>
          </tbody>
        </q-markup-table>
        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="current"
            size="20"
            :max="maxPage"
            direction-links
            @update:modelValue="getList(current)"
          />
        </div>
        <div v-if="findImageList.length <=0" class="caption">
          <p class="text-h6">暂无数据</p>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import {reactive, ref, toRefs} from "vue";
import {api} from "boot/axios";
import { useQuasar } from 'quasar'
import {tansParams} from "boot/tools";
const $q = useQuasar()
console.log($q.cookies.get("token"))
const data = reactive({
  form: {
    title:"",
    girl:"",
    createTime:""
  },
});
const { form, } = toRefs(data);
function  onSubmit(){
  if(form.value.title == undefined || form.value.title == null || form.value.title.trim() == '' || form.value.title.trim().length ==0 ){
    $q.dialog({
      title: '信息',
      message: '必须填写心世界名称.'
    });
    return;
  }
  api.post("/findImage/add",form.value).then(response => {
    $q.dialog({
      title: '信息',
      message: '提交成功,等待管理员处理中.'
    });
    getList(1)
  }) ;
}
const findImageList = ref([]);
const total = ref(0);
const maxPage = ref(0);

const current=ref(1)

const queryData = reactive({
  queryParams: {
    pageNum: 1,
    pageSize:20,
    title: '',
  }
});
const {queryParams} = toRefs(queryData);
async function getList(page) {
  queryParams.value.pageNum = page;
  // 滚动到顶部
  const response = await  api.get("/findImage/list?"+tansParams(queryParams.value));
  const data = response.data;
  //console.log(data.code)
  if (data.code == 200) {
    findImageList.value = data.data;
    total.value = data.total
    maxPage.value=  total.value/ queryParams.value.pageSize+1;
  }
}

function handleAdd(id:number){
  api.get(`/findImage/addFind?id=${id}`).then(response => {
    $q.dialog({
      title: '信息',
      message: '提交成功,等待管理员处理中.'
    });
    getList(1)
  }).catch(() => {
    // console.log('OK')
  });
}


getList(1)
</script>
<style  lang="sass"  scoped>
.caption
  padding: 20px
  justify-content: center
  align-items: center
</style>
