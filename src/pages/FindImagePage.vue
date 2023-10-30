<template>
  <q-page>
    <div style="width: 600px" class="caption">
     <form>
       <q-form @submit="onSubmit">
         <q-input label="图集名称" v-model="form.title"
                  ref="inputRef"
                  filled
                  :rules="[ val => val.length <= 200 || '最多200个字符']"
         />
         <q-input label="模特" v-model="form.gril"
                  ref="inputRef"
                  filled
                  :rules="[ val => val.length <= 50 || '最多50个字符']"
         />
         <q-input label="拍摄时间" v-model="form.createTime"
                  ref="inputRef"
                  filled
                  :rules="[ val => val.length <= 10 || '最多10个字符']"
         />
         <q-btn type="submit" label="提交" />
       </q-form>
     </form>
    </div>
    <div>
      <div class="q-pa-md">
        <p class="text-h5">待寻找图集</p>
        <q-markup-table>
          <thead>
          <tr>
            <th class="text-left">图集</th>
            <th class="text-right">模特</th>
            <th class="text-right">拍摄时间</th>
            <th class="text-right">提交时间</th>
            <th class="text-right">寻找人数</th>
            <th class="text-right">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="findImage in findImageList" :key="findImage.id">
            <td class="text-left">{{ findImage.title }}</td>
            <td class="text-right">{{ findImage.gril }}</td>
            <td class="text-right">{{ findImage.createTime }}</td>
            <td class="text-right">{{ findImage.subTime }}</td>
            <td class="text-right">{{ findImage.countFind }}</td>
            <td class="text-right"><button @click="handleAdd(findImage.id)">我也在寻找</button></td>
          </tr>
          </tbody>
        </q-markup-table>
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
const $q = useQuasar()
const data = reactive({
  form: {
    title:"",
    gril:"",
    createTime:""
  },
});
const { form, } = toRefs(data);
function  onSubmit(){
  api.post("findImage/add",form.value).then(response => {
    $q.dialog({
      title: '信息',
      message: '提交成功,等待管理员处理中.'
    }).onOk(() => {
      // console.log('OK')
    }).onCancel(() => {
      // console.log('Cancel')
    }).onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
    getList()
  }) ;
}
const findImageList = ref([]);
const total = ref(0);
function getList() {
   // 滚动到顶部
  api.get("findImage/list").then(response => {
    findImageList.value = response.data.data;
    total.value = response.data.total;
  }) .catch(() => {
    // console.log('OK')
  });
}
function handleAdd(id:number){
  api.get("findImage/addFind?id="+id.toString()).then(response => {
    $q.dialog({
      title: '信息',
      message: '提交成功,等待管理员处理中.'
    }).onOk(() => {
      // console.log('OK')
    }).onCancel(() => {
      // console.log('Cancel')
    }).onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
    getList()
  }) ;
}


getList()
</script>
<style  lang="sass"  scoped>
.caption
  padding: 20px
  justify-content: center
  align-items: center
</style>
