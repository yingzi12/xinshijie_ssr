<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { getImageUrl } from 'boot/tools';
const $q = useQuasar();
const router = useRouter()

interface Say {
  id: string;
  content: string;
  countLike: number;
  createTime: string;
  updateTime: string;
  urls: string;
  userId:string;
  userName:string;
  userNickname:string;
  avatar:string;
  countReply:number;
}

const props = defineProps<{ value: Say }>();
function getUrls() {
  //转成json数组
  return JSON.parse(props.value.urls);
}
const dialogComm=ref(false);
const dialogReplay=ref(false);
//评论列
const commentHide=ref(false);

const loading = ref(true);
const comment=ref("");

// const items = ref([ {}, {}, {}, {}, {}, {}, {} ])
function onLoad (index, done) {
  setTimeout(() => {
    // items.value.push({}, {}, {}, {}, {}, {}, {})
    done()
  }, 2000)
}

function onRouterSayDetail() {
    router.push(`/say/detail?usid=${props.value.id}`);
}
function onRouterUserDetail() {
  router.push("/say/user?userId="+ props.value.userId);
}
</script>

<template>
  <q-item-section >
    <q-card class="my-card bg-secondary text-white">
      <q-card-section>
        <q-item clickable v-ripple>
          <q-item-section side>
            <q-avatar rounded size="48px">
              <q-img
                :src="getImageUrl(props.value.avatar)"
                @error.once="() => { $event.target.src = '/empty.jpg'; }"
              />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label @click="onRouterUserDetail()">{{ props.value.userNickname }}</q-item-label>
                          <q-item-label caption>{{ props.value.createTime }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section @click="onRouterSayDetail()">
        <q-item-label class="five-line-clamp" lines="5" caption><div v-html="props.value.content"></div></q-item-label>

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
        <q-chip flat icon="assistant_navigation">点赞 {{props.value.countLike==null ? 0:props.value.countLike}}</q-chip>
        <q-chip flat icon="textsms" @click="dialogComm = true">{{props.value.countReply ==null ? 0:props.value.countReply}}条评论</q-chip>
        <q-chip flat icon="grade">收藏</q-chip>
      </q-card-actions>
    </q-card>
  </q-item-section>

  <!--  评论回复-->
</template>

<style scoped>

</style>
