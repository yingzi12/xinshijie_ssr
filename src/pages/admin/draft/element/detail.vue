<script setup lang="ts">
import { ref } from 'vue';
import Head from 'components/world/headComponent.vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from 'boot/axios';
import { getImageUrl } from 'boot/tools';

const route = useRoute(); // 使用 Vue Router 的 useRouter 函数
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const wid = ref(route.query.wid);
const wname = ref(route.query.wname);

const deid = ref(route.query.deid);
const cidTagList=ref([]);

const value=ref({});
async function handValue() {
  const response = await api.get(`/admin/draftElement/getInfo?deid=${deid.value}&wid=${wid.value}`);
  const data=response.data;
  if (data.code == 200) {
    value.value=data.data;
    for(var i=0;i<value.value.categoryList.length;i++){
      cidTagList.value.push(value.value.categoryList[i].value);
    }
  }
}
handValue();
const alert=ref(false);
const expanded= ref(true);

</script>

<template>
  <q-page>
<!--    <Head></Head>-->
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="keyboard_return" />
        <q-toolbar-title>元素草稿内容</q-toolbar-title>
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </div>
    <div class="q-ma-md">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="col-5 flex flex-center ">
            <q-img
              class="rounded-borders"
              spinner-color="white"
              style="width: 180px;height: 200px;"
              :src="getImageUrl(value.imgUrl)"
              @error.once="() => { $event.target.src = '/empty.jpg'; }"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs">
<!--            <div class="text-overline">{{value.title}}</div>-->
            <div class="text-h5 q-mt-sm q-mb-xs">{{value.title}}</div>
            <div class="text-subtitle1 q-mt-sm q-mb-xs">{{value.wname}}</div>
            <div class=" q-mb-xs">
              <div class="text-overline">创建者:{{value.createName}}</div>
              <div class="text-overline">创建:{{value.createTime}}</div>
            </div>
          </q-card-section>


        </q-card-section>

        <q-separator />

<!--        <q-card-actions>-->
<!--          <q-btn flat round icon="event" />-->
<!--          <q-btn flat>-->
<!--            7:30PM-->
<!--          </q-btn>-->
<!--          <q-btn flat color="primary">-->
<!--            Reserve-->
<!--          </q-btn>-->
<!--        </q-card-actions>-->
      </q-card>

<!--      <div class="text-h6 text-center">{{value.title}}</div>-->
<!--      <div class="text-subtitle2 text-center">{{value.wname}}</div>-->
<!--      <div class="text-subtitle1 text-center">-->

<!--      </div>-->
      <q-card  bordered class="bg-grey-2">
        <q-card-section>
          <div class="text-h6">分类</div>
          <q-chip clickable v-for="(tag,index) in cidTagList" :key="index" :color="'yellow' "  >
            {{tag.split("$$")[1]}}
          </q-chip>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <div class="text-h6">简介</div>
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
        <q-btn color="purple" label="编辑" icon="edit"  :to="{ path: '/admin/draft/element/edit', query: { wid: value.wid, deid: value.id }}"/>
        <q-btn color="purple" label="发布" icon="send" @click="alert = true" />
        <q-btn color="purple" label="比对" icon="visibility" />
      </q-btn-group>
    </div>
  </q-page>
</template>

<style scoped>

</style>
