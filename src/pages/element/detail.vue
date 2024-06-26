<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from 'boot/axios';
const route = useRoute(); // 使用 Vue Router 的 useRouter 函数
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const wid = ref(route.query.wid);
const wname = ref(route.query.wname);

const eid = ref(route.query.eid);
const cidTagList=ref([]);

const value=ref({});
async function getDetail() {
  const response = await api.get(`/wiki/element/getInfo?eid=${eid.value}&wid=${wid.value}`);
  const data=response.data;
  if (data.code == 200) {
    value.value=data.data;
    for(var i=0;i<value.value.categoryList.length;i++){
      cidTagList.value.push(value.value.categoryList[i].value);
    }
  }
}
getDetail();
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
function  toEdit(){
  router.push('/element/edit'); // Redirect to login page
}

watch(() => route.query.eid, async (newEid, oldEid) => {
  if (newEid !== oldEid) {
    // 当wid变化时，重新加载数据
    eid.value = newEid;
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
      <q-breadcrumbs-el label="世界列表" icon="navigation" to="/world/order" />
      <q-breadcrumbs-el :label="wname" icon="navigation"   :to="{ path: '/world/detail', query: { wid: wid ,wname: wname,source: 1 }}"/>
      <q-breadcrumbs-el label="元素列表" icon="navigation"   :to="{ path: '/world/element', query: { wid: wid ,wname: wname,source: 1 }}"/>
      <q-breadcrumbs-el :label="value.title" icon="navigation"   :to="{ path: '/element/detail', query: { wid: wid ,wname: wname,eid: eid ,title: title,source: 1 }}"/>

    </q-breadcrumbs>
    <div class="q-ma-md">
      <div class="text-h6 text-center">{{ value.title }}<q-chip size="xs" icon="bookmark" @click="toEdit()">
        编辑
      </q-chip></div>
      <div class="text-subtitle1 text-center">
        <div class="q-pa-md q-gutter-sm">
          <span class="text-overline">创建者:{{ value.createName }}</span>
          <span class="text-overline">创建时间:{{ value.createTime }}</span>
          <span class="text-overline">更新者:{{ value.updateName }}</span>
          <span class="text-overline">更新时间:{{ value.updateTime }}</span>
        </div>
      </div>
      <q-card dark bordered class="bg-grey-9">
        <q-card-section>
          <div class="text-h6">分类</div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <div class="q-pa-md q-gutter-sm">
            <q-chip clickable v-for="(tag,index) in cidTagList" :key="index" :color="'yellow' "  >
              {{tag.split("$$")[1]}}
            </q-chip>
          </div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <div class="text-h6">简介</div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <div class="q-pa-md">
            {{value.intro}}
          </div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <div class="text-h6">内容</div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <div>
            <q-expansion-item v-for="(content,index) in value.contentList"
                              :key="index"
                              v-model="content.isExpanded"
                              icon="list"
                              :label="content.title"
            >
              <div v-html="content.contentZip"></div>

            </q-expansion-item>
          </div>

        </q-card-section>
      </q-card>

    </div>
    <div class="q-pa-md">
      <q-btn-group spread>
        <q-btn color="purple"  v-if="value.previousId != undefined && value.previousId !=null"  label="上一个" icon="arrow_back"  :to="{ path: '/element/detail', query: { wid: value.wid, eid: value.previousId }}"/>
        <q-btn color="purple" label="元素列表" icon="reorder" :to="{ path: '/world/element', query: { wid: value.wid }}"/>
        <q-btn color="purple" v-if="value.nextId != undefined && value.nextId !=null" label="下一个" icon="arrow_forward"  :to="{ path: '/element/detail', query: { wid: value.wid, eid: value.nextId }}"/>

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
</template>

<style scoped>

</style>
