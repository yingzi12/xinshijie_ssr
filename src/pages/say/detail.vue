<template>
  <q-page>
    <div>
       <detail-component :usid="usid"></detail-component>
        <add-common-component :usid="usid"></add-common-component>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ total }}条评论</div>
          <q-space />
        </q-card-section>
        <q-separator inset />
        <q-separator />
      </q-card>
    </div>
    <div class="q-pa-md">
      <q-infinite-scroll @load="onLoad" :offset="250">
        <q-list bordered >
        <q-card class="bg-grey-2 q-pa-sm" v-for="(value,index) in commentList" :key="index">
          <common-item-component :value="value"></common-item-component>
        </q-card>
        </q-list>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>
  </q-page>

</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import detailComponent from 'components/say/detailComponent.vue';
import commonItemComponent from 'components/say/commentItemComponent.vue';
import addCommonComponent from 'components/say/addCommentComponent.vue';

import { api, tansParams } from 'boot/axios';

const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const usid = ref(route.query.usid);
const total =ref(0);
const data = reactive({
  queryParams: {
    pageNum: 0, // 初始化 pageNum 为 1
    pageSize: 6,
    usid: usid.value,
    pid: 0
  }
});
const {  queryParams } = toRefs(data);

const commentList=ref([]);
const hasMoreData=ref(true);

async function getList() {
  try {
    const response = await api.get('/user/sayComment/list?' + tansParams(queryParams.value));
    const data = response.data;
    if (data.code === 200) {
      const valueList = data.data;
      total.value=data.total;
      commentList.value.push(...valueList);

      // 如果加载的数据少于每页的大小，说明没有更多数据需要加载
      if (valueList.length < queryParams.value.pageSize) {
        hasMoreData.value = false;
      }
    } else {
      hasMoreData.value = true;
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
    hasMoreData.value = false;  // 遇到错误时禁用无限滚动
  }finally {
  }
}

function onLoad (index, done) {
  if(hasMoreData.value) {
    setTimeout(async () => {
      queryParams.value.pageNum = queryParams.value.pageNum + 1;
      await getList();
      done();
    }, 3000);
  }else {
    done();
  }
}

</script>

<style scoped>
</style>

