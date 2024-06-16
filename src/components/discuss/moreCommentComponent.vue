<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { defineProps, reactive, ref, toRefs } from 'vue';
import { api, tansParams } from 'boot/axios';
import commonItemComponent from 'components/discuss/commentItemComponent.vue';

const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const props = defineProps({
  did: {
    type: String,
    default: ''
  },
  pid: {
    type: String,
    default: ''
  }
});
const total =ref(0);

const data = reactive({
  queryParams: {
    pageNum: 0, // 初始化 pageNum 为 1
    pageSize: 6,
    did: props.did,
    pid: props.pid
  }
});
const {  queryParams } = toRefs(data);

const commentList=ref([]);
const hasMoreData=ref(true);

async function getList() {
  try {
    const response = await api.get('/wiki/discussComment/listReply?' + tansParams(queryParams.value));
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

<template>

  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <q-list bordered>
        <div v-for="(value,index) in commentList" :key="index">
          <common-item-component :value="value"></common-item-component>
        </div>
      </q-list>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>

</template>

<style scoped>

</style>
