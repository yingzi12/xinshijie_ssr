<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from 'boot/axios';
const route = useRoute();
const router = useRouter();

const aid = ref(route.query.aid);
const title = ref(route.query.title);
const scores = ref(0)

const value=ref({});
/** 查询世界详细 */
async function getDetail() {
  const response = await api.get(`/wiki/announcement/getInfo/${aid.value}`);
  const data=response.data;
  if (data.code == 200) {
    value.value=data.data;
  }
}
getDetail();

// 添加watch来监听wid的变化
watch(() => route.query.aid, async (newAid, oldAid) => {
  if (newAid !== oldAid) {
    // 当wid变化时，重新加载数据
    aid.value = newAid;
    await getDetail(); // 重新获取世界详细信息
    // await getAllWorldComment(); // 重新获取评论列表
  }
}, { immediate: true }); // immediate: true 确保在初始渲染时也触发watcher

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
      <q-breadcrumbs-el label="公告列表" icon="widgets"  to="/notice/index"/>
      <q-breadcrumbs-el label="公告" icon="navigation"  />
    </q-breadcrumbs>
    <div class="q-ma-md">
      <div class="text-h6 text-center">{{value.title}}</div>
      <div class="text-subtitle1 text-center">
        <div class="q-pa-md q-gutter-sm">
          <span class="text-overline">创建:{{value.createTime}}</span>
        </div>
      </div>
      <div>
       <div v-html="value.content"></div>
      </div>

    </div>
    <div class="q-pa-md">
      <q-btn-group spread>
        <q-btn  v-if="value.previous != undefined && value.previous !=null"  color="purple" label="上一个"  icon="arrow_back"  :to="{ path: '/notice/detail', query: { aname: value.previous.title, aid: value.previous.id }}" />
        <q-btn color="purple" label="目录" icon="visibility" to="/notice/index"/>
        <q-btn  v-if="value.next != undefined && value.next !=null" color="purple" label="下一个" icon="arrow_forward"  :to="{ path: '/notice/detail', query: { aname: value.previous.title, aid: value.next.id }}"/>

      </q-btn-group>
    </div>
  </q-page>
</template>

<style scoped>

</style>
