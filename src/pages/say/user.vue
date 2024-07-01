<script setup lang="ts">
import { api } from 'boot/axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getImageUrl } from 'boot/tools';
import { Cookies } from 'quasar';
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

</template>

<style scoped>

</style>
