<template>
  <div  class="q-ma-md bg-grey-2">
    <div class="text-h6">评论</div>
    <div class="row">
      <div class="q-pa-md">
        <q-avatar>
          <q-img
            :src="getImageUrl(circleUrl)"
            @error.once="() => { $event.target.src = '/empty.jpg'; }"
          />
        </q-avatar>
      </div>
      <div style="width: 90%">
        <div class="q-pa-md" >
          <div >
            <q-input
              v-model="commentText"
              filled
              type="textarea"
              @focus="checkLoginStatus"

            />
          </div>
          <div class="float-right q-ma-xs">
            <q-btn color="red" icon="send"  label="发送评论" @click="onSubmit" />
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div class="text-subtitle1">全部评论</div>
      <q-separator   />
      <div v-if="valueList.length === 0" class="empty-comment">
        暂无评论
      </div>
      <q-list bordered v-if="valueList.length >0">
        <q-item clickable v-ripple v-for="(value,index) in valueList " :key="index">
          <q-item-section avatar>
            <q-avatar square>
              <q-img
                class="small-user-head-image"
                :src="getImageUrl(value.circleUrl)"
                @error.once="() => { $event.target.src = '/empty.jpg'; }"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-banner rounded class="bg-grey-8 text-white">
              <div class="h6">{{value.createName}}</div>
              <div>{{value.createTime}}</div>
              {{value.comment}}
              <template v-slot:action>
                <q-btn flat color="white" icon="thumb_up">点赞{{value.countLike}}</q-btn>
                <q-btn flat color="white" icon="thumb_down">反对{{value.countDisagree}}</q-btn>
              </template>
            </q-banner>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="current"
        color="purple"
        :max="maxPage"
        :max-pages="6"
        boundary-numbers
        @update:model-value="getAllWorldComment"
      />
    </div>
  </div>
   <div>
     <login-component :show-login="showLoginDialog" @update:showLogin="handleLoginDialogUpdate" ></login-component>
   </div>
  <div>
    <q-dialog v-model="errorDiaLog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="error" color="red" text-color="white" />
          <span class="q-ml-sm">{{errorText}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="确认" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

</template>

<script setup>
import { defineProps, reactive, ref, toRefs } from 'vue';
import { Cookies, Dialog, useQuasar } from 'quasar';
import { api, tansParams } from 'boot/axios';
import loginComponent from 'components/users/loginComponent.vue';
import { getImageUrl } from 'boot/tools'; // 确保路径正确对应你的文件结构

const $q = useQuasar();
const token = Cookies.get("token");
const circleUrl=Cookies.get("avatar");
const showLoginDialog = ref(false); // 控制登录对话框显示的标志
const commentText=ref("");
const errorDiaLog = ref(false); // 控制登录对话框显示的标志
const errorText = ref(""); // 控制登录对话框显示的标志

function diaLog(){
  showLoginDialog.value=true;
  console.log("-----diaLog--------------")
}
// 定义组件的Props
const props = defineProps({
  size: {
    type: Number,
    default: 4
  },
  wid: Number,
  sid:  {
    type: Number,
    default: -1
  },
  eid:  {
    type: Number,
    default: -1
  },
  source: Number,
});

//当前页
const  current= ref(1);
//总数
const  total= ref(0);
//有多少页
const  maxPage=ref(0);
const valueList = ref([]);
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    wid:props.wid,
    sid:props.sid,
    source:props.source
  }
});
const { queryParams } = toRefs(data);

async function getCommentList() {
  queryParams.value.wid = props.wid;
  if (props.source == 2 ){
    queryParams.value.sid = props.sid;
  }
  queryParams.value.source=props.source;
  queryParams.value.pageNum=current;

  const response = await api.get('/wiki/comment/list?'+ tansParams(queryParams.value));
  const data=response.data;
  if (data.code == 200) {
    valueList.value=data.data;
    total.value=data.total;
    if(data.total % 20 == 0){
       maxPage.value=data.total/20;
    }else{
        maxPage.value=data.total/20+1;
    }
  }
}
getCommentList();

async function onSubmit(){
  if(!commentText.value){
    errorText.value="评论不能为空";
    errorDiaLog.value=true;
    return;
  }
  if(commentText.value.length<20){
    errorText.value="评论不了少于20字";
    errorDiaLog.value=true;
    // ElMessage.error("评论不了少于20字")
    return;
  }
  const response = await api.post('/admin/comment/add', JSON.stringify({
    wid: props.wid,
    source: props.source,
    sid:props.sid,
    eid:props.eid,
    comment:commentText.value
  }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data=response.data;
  if (data.code == 200) {
    getCommentList();
    commentText.value="";
  }else {
    Dialog.create({
      title: '提示',
      message: data.msg,
      ok: {
        label: '确认',
        color: 'primary',
      },
    })
  }
}

// 检查登录状态的方法
const checkLoginStatus = () => {
  const token = Cookies.get('token');
  if (token) {
    console.log('用户已登录');
    // 这里可以添加更多登录后的行为，比如加载用户信息等
  } else {
    console.log('用户未登录');
    showLoginDialog.value=true;
    // 可能提示用户需要登录或重定向到登录页
  }
};

// 监听子组件发出的事件，并更新父组件的值
const handleLoginDialogUpdate = (newValue) => {
  showLoginDialog.value = newValue;
};


</script>

<style scoped>
/* 如果需要，可以在这里添加额外的样式 */
.small-user-head-image{
  max-width: 100px
}
.empty-comment {
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
