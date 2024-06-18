<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import chapterComponent from 'components/story/chapterComponent.vue';
import { api } from 'boot/axios';

const route = useRoute();

const wid = ref(route.query.wid);
const wname = ref(route.query.wname);
const sid = ref(route.query.sid);
const sname = ref(route.query.sname);
const cid = ref(route.query.cid);

const chapter = ref({});

async function getDetail() {
  const response = await api.get(`/wiki/chapter/getInfo?cid=${cid.value}&sid=${sid.value}&wid=${wid.value}`);
  const data=response.data;
  if (data.code == 200) {
    chapter.value=data.data;
  }
}
getDetail();

// 添加watch来监听wid的变化
watch(() => route.query.wid, async (newSid, oldSid) => {
  if (newSid !== oldSid) {
    // 当wid变化时，重新加载数据
    sid.value = newSid;
    await getDetail(); // 重新获取世界详细信息
    // await getAllWorldComment(); // 重新获取评论列表
  }
}, { immediate: true }); // immediate: true 确保在初始渲染时也触发watcher

const fabPos = ref([ 18, 18 ]);
const draggingFab = ref(false);
function onClick () {
  // console.log('Clicked on a fab action')
};

function moveFab (ev) {
  draggingFab.value = ev.isFirst !== true && ev.isFinal !== true

  fabPos.value = [
    fabPos.value[ 0 ] - ev.delta.x,
    fabPos.value[ 1 ] - ev.delta.y
  ]
};
const alert=ref(false);
const expanded= ref(true);
function edit(){
  console.log("编辑")
}
watch(() => route.query.cid, async (newCid, oldCid) => {
  if (newCid !== oldCid) {
    // 当wid变化时，重新加载数据
    cid.value = newCid;
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
      <q-breadcrumbs-el label="世界首页" icon="widgets"  to="/world/index"/>
      <q-breadcrumbs-el label="小说首页" icon="widgets"  to="/story/index"/>
      <q-breadcrumbs-el :label="wname" icon="navigation"  :to="{ path: '/world/detail', query: { wid: wid ,wname: wname,source: 1 }}" />
      <q-breadcrumbs-el label="世界小说" icon="navigation" :to="{ path: '/world/story', query: { wid: wid ,wname: wname,source: 1 }}"/>
      <q-breadcrumbs-el label="小说列表" icon="navigation" :to="{ path: '/story/order'}" />
      <q-breadcrumbs-el :label="sname" icon="navigation" :to="{ path: '/world/story', query: { wid: wid ,wname: wname,sid: sid ,sname: sname,source: 2 }}"/>
    </q-breadcrumbs>

    <div class="q-ma-md">
      <div class="text-h6 text-center">{{ chapter.title }}
        <q-badge transparent align="middle" color="orange" @click="edit">
          编辑
<!--          <q-btn flat color="white" label="编辑" size="xs"/>-->
        </q-badge>
      </div>
      <div class="text-subtitle1 text-center">
        <div class="q-pa-md q-gutter-sm">
          <span class="text-overline">创建:{{ chapter.createName }}</span>
          <span class="text-overline">创建者:{{ chapter.createTime }}</span>
          <span class="text-overline">更新者:{{ chapter.updateName }}</span>
          <span class="text-overline">更新时间:{{ chapter.updateTime }}</span>
        </div>
      </div>
      <div>
        <div v-html="chapter.contentZip"></div>
      </div>
    </div>
    <div class="q-pa-md">
      <q-btn-group spread>
        <q-btn color="purple" v-if="chapter.previous != undefined && chapter.previous !=null" label="上一章" icon="arrow_back" :to="{ path: '/story/chapter', query: { wid: wid ,wname: wname,sid: sid ,sname: sname,source: 2 ,cid:chapter.previous.id}}" />
        <q-btn color="purple" label="目录" icon="reorder" @click="alert = true"/>
        <q-btn color="purple" v-if="chapter.next != undefined && chapter.next !=null" label="下一章" icon="arrow_forward" :to="{ path: '/story/chapter', query: { wid: wid ,wname: wname,sid: sid ,sname: sname,source: 2 ,cid:chapter.next.id }}"/>

      </q-btn-group>
    </div>
    <q-page-sticky position="bottom-right" :offset="fabPos">
      <q-fab
        icon="add"
        direction="up"
        color="accent"
        :disable="draggingFab"
        v-touch-pan.prevent.mouse="moveFab"
      >
        <q-fab-action @click="onClick" color="primary" icon="person_add" :disable="draggingFab" />
        <q-fab-action @click="onClick" color="primary" icon="mail" :disable="draggingFab" />
      </q-fab>
    </q-page-sticky>
  </q-page>
  <q-dialog v-model="alert">
    <q-card flat bordered style="width: 900px" >
      <!--      <q-card-section>-->
      <!--        <div class="text-h6">Terms of Agreement</div>-->
      <!--      </q-card-section>-->


      <q-card-section class="row items-center q-pb-none ">
        <div class="text-h6">目录</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator inset />

      <q-card-section style="max-height: 50vh" class="scroll">
        <div>
        <chapter-component :sname="sname" :sid="sid"></chapter-component>
        </div>
      </q-card-section>

      <q-separator />

    </q-card>
  </q-dialog>

</template>

<style scoped>

</style>
