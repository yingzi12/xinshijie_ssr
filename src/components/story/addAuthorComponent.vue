<script setup lang="ts">
import { defineProps, reactive, ref, toRefs } from 'vue';
import { api } from 'boot/axios';
import { Dialog } from 'quasar';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
  sid:  {
    type: String,
    required: true // 确保wid是必需的，避免数据为空的问题
  },
  sname:  {
    type: String,
    required: true // 确保wid是必需的，避免数据为空的问题
  }
});

const data = reactive({
  addForm: {
    userId: null,
    userName: "",
    types:4,
    sid:props.sid,
    sname:props.sname,

  }
});
const { addForm } = toRefs(data);

const value=ref({});
/** 查询世界详细 */
async function handValue() {
  const response = await api.get(`/wiki/user/getIntroInfo?username=${addForm.value.userName}`);
  const data=response.data;
  if (data.code == 200) {
    value.value=data.data;
  }
}
handValue();
function imageUrl(url) {
  return `https://image.51x.uk/blackwhite${url}`;
}
async function onSubmit(){
  addForm.value.userId=value.value.userId;
  const response = await api.post("/admin/author/add", JSON.stringify(addForm.value), {
    headers: {
      'Content-Type': 'application/json'
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
      //刷新当前页面
      await router.go(0);
    }).onCancel(async () => {
      //刷新当前页面
      await router.go(0);
    });
  } else {
    Dialog.create({
      color: 'green-4',
      message: `创建失败${data.msg}`
    });
  }
}
</script>

<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">新增作家</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
<!--      改成离开输入框触发-->
      <q-input dense v-model="addForm.userName" autofocus  label="输入用户账号" @blur="handValue" />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div>
        <q-item-section avatar top>
          <q-avatar>
            <img
              :src="imageUrl(value.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
            >
          </q-avatar>
        </q-item-section>
      </div>
      <div>
        <span class="text-weight-medium">用户名：</span><span class="text-grey-8 three-line-clamp">{{value.userName}}</span>
      </div>
      <div>
        <span class="text-weight-medium">昵称：</span>
        <span class="text-grey-8 three-line-clamp">{{value.nickname}}</span>
      </div>
      <div>
        <span class="text-weight-medium">签名：</span>
        <span class="text-grey-8 three-line-clamp">{{ value.sign }}</span>
      </div>
      <div>
        <span class="text-weight-medium">等级：</span>
        <span class="text-grey-8">{{value.ranks}}</span>
      </div>
      <div>
        <span class="text-weight-medium">创建元素数：</span>
        <span class="text-grey-8">{{value.countElement}}</span>
      </div>
      <div>
        <span class="text-weight-medium">编辑元素数：</span>
        <span class="text-grey-8">{{value.countEdit}}</span>
      </div>
      <div>
        <span class="text-weight-medium">创建故事数：</span>
        <span class="text-grey-8">{{value.countStory}}</span>
      </div>
      <div>
        <span class="text-weight-medium">评论数：</span>
        <span class="text-grey-8">{{value.countComment}}</span>
      </div>
      <div>
        <span class="text-weight-medium">讨论数：</span>
        <span class="text-grey-8">{{value.countDiscuss}}</span>
      </div>
    </q-card-section>
    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="取消" v-close-popup />
      <q-btn flat label="确认" v-close-popup  @click="onSubmit()"/>
    </q-card-actions>
  </q-card>

</template>

<style scoped>

</style>
