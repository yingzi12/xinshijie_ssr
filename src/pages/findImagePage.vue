<template>
  <q-page>
    <div style="width: 600px" class="caption">
     <form>
       <q-form @submit="onSubmit">
         <q-input label="心世界名称" v-model="form.title"
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
        <p class="text-h5">待寻找心世界</p>
        <q-markup-table>
          <thead>
          <tr>
            <th class="text-left">心世界</th>
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
    <div class="row">
      <div class="col-2"> </div>
      <div class="col-auto" style="margin: 0px">
        <div class="footter" style="margin: 0px;text-align: center;">
          <router-link to="">关于心世界</router-link>|
          <router-link to="">联系我们</router-link>|
          <router-link to="">帮助中心</router-link>|
          <router-link to="">提交建议</router-link>|
          <router-link to="">举报中心</router-link>|
          <router-link to="">漏洞提交</router-link>|
        </div>
        <div class="footerText text-weight-thin"> <p>Copyright © 2002-2022 www.aiavr.uk Rights Reserved 版权所有 心世界信息科技有限公司</p></div>
        <div class="footerText text-weight-thin"><p>图片,美女,写真,心世界</p></div>
        <div class="footerText text-weight-light"><p>本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任</p></div>
        <div class="footerText text-weight-thin"><a href="https://www.51k.uk">心世界小说网</a>|<a  href="https://www.30dizhi.uk">30导航</a>|<a  href="https://www.aravrw.com">心世界</a></div>
      </div>
      <div class="col-2"></div>
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
  if(form.value.title == undefined || form.value.title == null || form.value.title.trim() == '' || form.value.title.trim().length ==0 ){
    $q.dialog({
      title: '信息',
      message: '必须填写心世界名称.'
    }).onOk(() => {
      // console.log('OK')
    }).onCancel(() => {
      // console.log('Cancel')
    }).onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
    return;
  }
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
