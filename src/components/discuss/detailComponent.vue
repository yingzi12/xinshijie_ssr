<script setup lang="ts">
import { api } from 'boot/axios';
import { defineProps, ref } from 'vue';
import { useQuasar } from 'quasar';
import { getImageUrl } from 'boot/tools';
import { useRouter } from 'vue-router';
const $q = useQuasar();
const router = useRouter()

const props = defineProps({
  did: {
    type: String,
    default: '世界类型'
  }
});
const value = ref({});
async function getDetail() {
  try {
    const response = await api.get(`/wiki/discuss/getInfo?did=${props.did}`);
    const data = response.data;
    if (data.code === 200) {
      value.value = data.data;
    }
  } catch (error) {
    console.error('Error fetching detail:', error);
  }
}
getDetail();
function onRouterDetail() {
  router.push("/say/user?userId="+ value.value.createId);
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
    <q-breadcrumbs-el v-if="value.source == 1 || value.source == 2" :label="value.wname" icon="navigation" :to="{ path: '/world/detail', query: { wid: value.wid ,wname: value.wname,source: 1 }}" />
    <q-breadcrumbs-el v-if="value.source == 2" label="小说列表" icon="navigation" to="/story/order" />
    <q-breadcrumbs-el v-if="value.source == 2" :label="value.sname" icon="navigation" :to="{ path: '/story/detail', query: { wid: value.wid ,wname: value.wname,source: 1 }}" />
    <q-breadcrumbs-el label="讨论列表" icon="navigation" to="/discuss/index" />
    <q-breadcrumbs-el label="讨论详细" icon="navigation"/>
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
          <q-item-label @click="onRouterDetail">{{ value.nickname }}</q-item-label>
          <q-item-label caption>{{ value.createTime }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-item-section>
    <q-card-section>
      <div class="text-h6">{{ value.title }}</div>
    </q-card-section>

    <q-card-section>
      <div v-html="value.commentZip"></div>

<!--      <q-item-label class="five-line-clamp" caption>{{ value.commentZip }}</q-item-label>-->
    </q-card-section>

    <q-separator dark />

    <q-card-actions>
      <q-chip icon="assistant_navigation">赞同 {{ value.countLike || 0 }}</q-chip>
      <q-chip icon="arrow_drop_down_circle">反对 {{ value.countDisagree || 0 }}</q-chip>
      <q-chip icon="textsms" >{{ value.countReply || 0 }}条评论</q-chip>
      <q-chip icon="grade">收藏</q-chip>
    </q-card-actions>
  </q-card>

</template>

<style scoped>

</style>
