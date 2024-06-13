<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { api, tansParams } from 'boot/axios';
import  cardItemComponent  from 'components/discuss/cardItemComponent.vue';
const route = useRoute();
const wid = ref(route.query.wid);
const wname = ref(route.query.wname);
const source = ref(route.query.source);

const $q = useQuasar();
const router = useRouter()

const splitterModel= ref(200); // start at 150px
const  current= ref(1);
const seach=ref("");



const disabled=ref(true)

const username=ref('')





//讨论信息
const discuss=ref({})
//
// /** 查询讨论详细 */
// function handleDiscuss() {
//   if(did.value == undefined){
//     ElMessage.error("缺少必要参数")
//     return;
//   }
//   getDiscuss(did.value).then(response => {
//     discuss.value = response.data
//   });
// }
// // 第一级回复评论
// //分页信息
// const dateRange = ref([]);
const total = ref(0);
const data = reactive({
  form: {
    comment:undefined,
    wid:wid.value,
    upid:undefined,
    source:source.value
  },
  replyForm: {
    comment:undefined,
    wid:wid.value,
    upid:undefined,
    source:source.value
  },
  queryParams: {
    pageNum: 1,
    pageSize: 20,

    auditStatus:0,
    current:1,
    name: undefined,
    types: undefined,
    pid:null,
    wid:wid.value,
    source:source.value,
    ranks:0,
    // wid:wid.value,
  },
  queryReplyParams: {
    pageNum: 1,
    pageSize: 3,
    pid:null,
    wid:wid.value,
    source:source.value,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams,queryReplyParams, form,replyForm, rules } = toRefs(data);
// function onAddSubmit(){
//   if(form.value.comment.length<10 || form.value.comment.length>500){
//     ElMessage.error("回复内容需大于10小于500")
//     return;
//   }
//   addDiscussComment(form.value).then(response => {
//     // dissComment.value=''
//     form.value.comment="";
//     getList(1)
//   })
// }
// function onReplySubmit(comment,replyComment){
//   if(replyComment.replyComment.length<10 || replyComment.replyComment.length>500){
//     ElMessage.error("回复内容需大于10小于500")
//     return;
//   }
//   replyForm.value.upid=replyComment.id;
//   replyForm.value.comment=replyComment.replyComment;
//   replyDiscussComment(replyForm.value).then(response => {
//     ElMessage.info("回复成功")
//     getReplyList(comment,1)
//   })
// }
/** 查询世界列表 */
// function getList(page: number) {
//   window.scrollTo(0, 0); // 滚动到顶部
//   queryParams.value.pageNum=page;
//
//   queryParams.value.ranks=0
//   listDiscussComment(queryParams.value).then(response => {
//     loading.value = false;
//     commentList.value = response.data;
//     total.value = response.total;
//   });
// }
// function getReplyList(comment,page: number) {
//   window.scrollTo(0, 0); // 滚动到顶部
//   queryReplyParams.value.pageNum=page;
//
//   queryReplyParams.value.pid=comment.id
//   listDiscussComment(queryReplyParams.value).then(response => {
//     loading.value = false;
//     comment.replyList = response.data;
//     total.value = response.total;
//   });
// }
//
// function handleHideReply(comment){
//   if(comment.replyHide) {
//     comment.replyHide = false;
//   }else {
//     comment.replyHide = true;
//   }
//   getReplyList(comment,1)
// }
// function handleHideCommentReply(comment){
//   if(comment.replyHide) {
//     comment.replyHide = false;
//   }else {
//     comment.replyHide = true;
//   }
// }
// //跳转回复详细
// function handleReplyDetail(comment){
//   const url="/discuss/reply?wid="+comment.wid+"&did="+comment.did+"&dcid="+comment.id+"&source="+comment.source;
//   if(comment.source==2){
//     router.push(url+"&sid="+comment.sid);
//   }else{
//     router.push(url);
//   }
// }

const  maxPage=ref(0);
const valueList=ref([]);
async function getDiscussList() {
  try {
    queryParams.value.pageNum=current.value;
    const response = await api.get('/wiki/discuss/list?' + tansParams(queryParams.value));
    if (response.data.code == 200) {
      total.value = response.data.total;
      valueList.value=response.data.data;
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
getDiscussList();
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
      <q-breadcrumbs-el label="我的世界" icon="navigation"  to="/world/detail"/>
      <q-breadcrumbs-el label="讨论列表" icon="navigation"  to="/world/detail"/>

    </q-breadcrumbs>
  <div class="q-pa-md">
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>{{ wname }} </q-toolbar-title>
        <q-input rounded outlined v-model="seach" label="搜索..." />
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
<!--        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />-->
        <q-btn flat round dense icon="add" label="新增讨论"  :to="{ path: '/discuss/create', query: { wid: wid ,wname: wname,source: 1 }}"/>
      </q-toolbar>
    </div>
  </div>
  <div class="q-pa-md q-gutter-md">
    <q-list bordered padding class="rounded-borders">
      <q-item v-for="(value,index) in valueList" :key="index">
         <card-item-component :value="value"></card-item-component>

      </q-item>
      <q-separator spaced />

    </q-list>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="current"
        color="purple"
        :max="10"
        :max-pages="maxPage"
        boundary-numbers
      />
    </div>
  </div>
  </q-page>

</template>

<style scoped>

</style>
