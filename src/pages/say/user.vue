<script setup lang="ts">
import { api } from 'boot/axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getImageUrl } from 'boot/tools';
import { Cookies } from 'quasar';
import SayListComponent from 'components/say/sayListComponent.vue';
const route = useRoute();
const router = useRouter();
const uid = Cookies.get('userId');

const userId = ref(route.query.userId);
const user=ref({});
async function getDetail() {
  const response = await api.get(`/wiki/user/getUserIntro?userId=${userId.value}`);
  const data = response.data;
  if (data.code == 200) {
    user.value = data.data; // 修改了这里
  }
}

getDetail();

function onRouterPrivate() {
  router.push("/users/private?receiverUserId="+userId.value);
}
</script>

<template>
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
    <q-breadcrumbs-el label="小说列表" icon="navigation" to="/story/order" />
    <q-breadcrumbs-el label="说说列表" icon="navigation" to="/say/index" />
    <q-breadcrumbs-el label="说说详细" icon="navigation"  />
  </q-breadcrumbs>
  <q-card bordered  flat style="width: 100%">
    <q-item>
      <q-item-section  side>
        <q-avatar font-size="52px" size="100px">
          <img :src="getImageUrl(user.avatar)">
        </q-avatar>
      </q-item-section>
      <q-item-section side>
          <q-item-label>
            {{ user.nickName==null?"用户还没有昵称哦！": user.nickName}}
          </q-item-label>
        <q-item-label>
          <q-btn v-if="userId != uid" label="私信" flat icon="chat" size="xs" @click="onRouterPrivate"></q-btn>
        </q-item-label>
      </q-item-section>

    </q-item>

    <q-separator/>

    <q-card-section  horizontal>
      <div class="text-body2" style="padding: 10px">
        {{ user.sign ==null?"用户还没有签名哦！": user.sign }}
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-actions>
      <q-btn color="red-8" flat icon="favorite" round>{{user.countAttention==null? 0:user.countAttention}}</q-btn>
      <q-btn color="red-8" flat icon="thumb_up" round>{{user.countLike==null? 0: user.countLike}}</q-btn>
      <q-btn color="red-8" flat icon="visibility" round>{{user.countSee ==null? 0:user.countSee}}</q-btn>
    </q-card-actions>
  </q-card>
  <q-toolbar class="bg-purple text-white">
    <q-toolbar-title>
      说说列表
    </q-toolbar-title>
    <!--      <q-btn flat round dense icon="add" label="新增说说"  @click="addDialog=true"/>-->
    <!--      <q-btn flat round dense icon="apps" class="q-mr-xs" />-->
    <!--      <q-btn flat round dense icon="more_vert" />-->
  </q-toolbar>
<say-list-component :user-id="userId"></say-list-component>

</template>

<style scoped>

</style>
