<script setup lang="ts">
import { api } from 'boot/axios';
import { defineProps, ref } from 'vue';
import { useQuasar } from 'quasar';
import { getImageUrl } from 'boot/tools';
const $q = useQuasar();

const props = defineProps({
  usid: {
    type: String,
    default: '世界类型'
  }
});
const value = ref({});
async function getDetail() {
  try {
    const response = await api.get(`/user/say/getInfo?usid=${props.usid}`);
    const data = response.data;
    if (data.code === 200) {
      value.value = data.data;
    }
  } catch (error) {
    console.error('Error fetching detail:', error);
  }
}
getDetail();
function getUrls() {
  if(value.value != undefined && value.value.urls!=undefined){
  //转成json数组
  return JSON.parse(value.value.urls);
  }else{
    return [];
  }
}
</script>

<template>
  <q-breadcrumbs class="text-brown q-ma-md">
    <template v-slot:separator>
      <q-icon size="1.5em" name="chevron_right" color="primary" />
    </template>

    <q-breadcrumbs-el label="首页" icon="home" to="/"/>
    <q-breadcrumbs-el label="世界首页" icon="widgets"  to="/world/index"/>
    <q-breadcrumbs-el label="世界列表" icon="navigation" to="/world/order" />
    <q-breadcrumbs-el v-if="value.source == 1 || value.source == 2" :label="value.wname" icon="navigation" :to="{ path: '/discuss/create', query: { wid: value.wid ,wname: value.wname,source: 1 }}" />
    <q-breadcrumbs-el v-if="value.source == 2" label="小说列表" icon="navigation" to="/story/order" />
    <q-breadcrumbs-el v-if="value.source == 2" :label="value.sname" icon="navigation" :to="{ path: '/discuss/create', query: { wid: value.wid ,wname: value.wname,source: 1 }}" />

    <q-breadcrumbs-el label="说说列表" icon="navigation" to="/discuss/index" />
  </q-breadcrumbs>

  <q-card class="q-ma-md bg-grey-2 ">
    <q-item-section>
      <q-item clickable v-ripple>
        <q-item-section side>
          <q-avatar rounded size="48px">
            <q-img
              :src="getImageUrl(value.circleUrl)"
              @error.once="() => { $event.target.src = '/empty.jpg'; }"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ value.userNickname }}</q-item-label>
          <q-item-label caption>{{ value.createTime }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-item-section>
    <q-card-section>
      <div v-html="value.content"></div>
    </q-card-section>
    <q-card-section >
      <div class="row" >
        <div  class="col q-pa-xs" v-for="(url,index) in getUrls()" :key="index">
          <q-img          fit="contain"
                          v-if="url.type != 2 "
                          :src="getImageUrl(url.imgUrl)"
                          @error.once="() => { $event.target.src = '/empty.jpg'; }"
                          style="height: 250px"
          />
          <q-video v-if="url.type== 2 "
                   :src="getImageUrl(url.imgUrl)"
          />
        </div>
      </div>
    </q-card-section>

    <q-separator dark />

    <q-card-actions>
      <q-chip icon="assistant_navigation">点赞 {{ value.countLike || 0 }}</q-chip>
<!--      <q-chip icon="arrow_drop_down_circle">反对 {{ value.countDisagree || 0 }}</q-chip>-->
      <q-chip icon="textsms" >{{ value.countReply || 0 }}条评论</q-chip>
      <q-chip icon="grade">收藏</q-chip>
    </q-card-actions>
  </q-card>

</template>

<style scoped>

</style>
