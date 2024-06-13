<script setup lang="ts">
import headComponent from 'components/world/headComponent.vue';
import uploadImageComponent from 'components/common/uploadImageComponent.vue';

import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import { api } from 'boot/axios';
import { worldStatusMap } from '../../../boot/consts';
const $q = useQuasar();

// 接收url里的参数
const route = useRoute();
const wid = ref(route.query.wid);
const wname = ref(route.query.wname);


const world=ref({});
/** 查询世界详细 */
async function handWorld() {
  const response = await api.get(`/admin/world/getInfo/${wid.value}`);
  const data=response.data;
  if (data.code == 200) {
    world.value=data.data;
  }
}
handWorld();

async function updateImage(imgUrl:string){
  const response = await api.post(`/admin/world/updateImage`,JSON.stringify({wid:wid.value,imgUrl:imgUrl}));
}
</script>

<template>
  <q-page>
    <head-component :wid="wid" :wname="wname" :types="1"></head-component>
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="float-right q-ma-xs">
          <q-btn color="orange" icon="send"  label="发布" />
          <q-btn color="red" icon="edit"  label="编辑"   :to="{ path:'/admin/world/edit', query: { wid: wid,wname: wname  }}" />
        </div>
        <div class="text-h4">
          {{world.name}}
          <q-badge transparent align="middle" color="orange">
            v{{world.rank==null?0 : world.rank}}
          </q-badge>
        </div>
        <div class="text-subtitle2">{{world.typeName =="" || world.typeName ==null ? "未知": world.typeName}}</div>

      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <q-card dark bordered class="bg-grey-9 my-card" flat>
          <q-card-section horizontal>
            <q-card-section style="width: 235px;height: 352px">
              <upload-image-component :img-url="world.imgUrl" @img-url="updateImage "></upload-image-component>
            </q-card-section>
            <q-separator vertical />
            <q-card-actions vertical class=" q-px-md">
              <q-item-label> <q-chip color="yellow">{{ world.isPrivate ==1 ?"私有":'公开' }}</q-chip><q-chip color="yellow">{{ worldStatusMap.get(world.status) }}</q-chip></q-item-label>

              <q-item-label>{{ world.createTime }}</q-item-label>
              <q-item-label class="q-mb-xs" v-if="world.tags !=null || world.tags !=undefined">
                <q-chip  class="glossy" color="orange" v-for="(tags,index) in world.tags.split(';') " :key="index" text-color="white" size="xs">
                  {{ tags }}
                </q-chip>
              </q-item-label>
              <q-item-label>
                <div>
                  {{world.intro}}
                </div>
              </q-item-label>
              <q-item-label>
                <div class="q-gutter-sm q-mb-xs">
          <span class="text-h6">
            {{ world.countSee ==null? 0: world.countSee}}次
            <q-badge outline align="middle" color="teal" >
              查看
            </q-badge>
          </span>
                  <span class="text-h6">
            {{ world.countLike==null?  0: world.countLike}}次
            <q-badge outline align="middle" color="teal ">
              点赞
            </q-badge>
          </span>
                  <span class="text-h6">
            {{ world.countFllow ==null?  0: world.countFllow }}人
            <q-badge outline align="middle" color="teal" >
              关注
            </q-badge>
          </span>
                </div>

              </q-item-label>
              <q-item-label>
                <q-chip>元素：{{world.countElement ==null? 0: world.countElement}}</q-chip>
                <q-chip>故事：{{world.countStory ==null? 0: world.countStory}}</q-chip>
              </q-item-label>
            </q-card-actions>
            <q-card-section>


            </q-card-section>
          </q-card-section>
        </q-card>

      </q-card-section>
    </q-card>
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="text-h6">详细介绍</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        {{ world.descriptionZip }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>

</style>
