<script setup lang="ts">
import headComponent from 'components/story/headComponent.vue';
import uploadImageComponent from 'components/common/uploadImageComponent.vue';

import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { api } from 'boot/axios';
import { storyStatusMap } from '../../../boot/consts';
const $q = useQuasar();

// 接收url里的参数
const route = useRoute();
const router = useRouter();

const sid = ref(route.query.sid);
const sname = ref(route.query.sname);
const id = ref(1);

const story=ref({});
/** 查询世界详细 */
async function handStory() {
  const response = await api.get(`/admin/story/getInfo/${sid.value}`);
  const data=response.data;
  if (data.code == 200) {
    story.value=data.data;
  }
}
handStory();

async function updateImage(imgUrl:string){
  const response = await api.post(`/admin/story/updateImage`,JSON.stringify({sid:sid.value,imgUrl:imgUrl}));
}
</script>

<template>
  <q-page>
    <head-component :sid="sid" :sname="sname" :id="id"></head-component>
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="float-right q-ma-xs">
          <q-btn color="orange" icon="send"  label="发布" />
          <q-btn color="red" icon="edit"  label="编辑"   :to="{ path:'/admin/story/edit', query: { sid: sid,sname: sname  }}" />
        </div>
        <div class="text-h4">
          {{story.name}}
          <q-badge transparent align="middle" color="orange">
            v{{story.rank==null?0 : story.rank}}
          </q-badge>
        </div>
        <div class="text-subtitle2">{{story.typeName =="" || story.typeName ==null ? "未知": story.typeName}}</div>

      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <q-card dark bordered class="bg-grey-9 my-card" flat>
          <q-card-section horizontal>
            <q-card-section style="sidth: 235px;height: 352px">
              <upload-image-component :img-url="story.imgUrl" @img-url="updateImage "></upload-image-component>
            </q-card-section>
            <q-separator vertical />
            <q-card-actions vertical class=" q-px-md">
              <q-item-label> <q-chip color="yellow">{{ story.isPrivate ==1 ?"私有":'公开' }}</q-chip><q-chip color="yellow">{{ storyStatusMap.get(story.status) }}</q-chip></q-item-label>
              <q-item-label @click="router.push(`/world/detail?wid?${story.wid}`)"> <q-btn color="blue">{{ story.wname }}</q-btn></q-item-label>

              <q-item-label>{{ story.createTime }}</q-item-label>
              <q-item-label class="q-mb-xs" v-if="story.tags !=null || story.tags !=undefined">
                <q-chip  class="glossy" color="orange" v-for="(tags,index) in story.tags.split(';') " :key="index" text-color="white" size="xs">
                  {{ tags }}
                </q-chip>
              </q-item-label>
              <q-item-label>
                <div>
                  {{story.intro}}
                </div>
              </q-item-label>
              <q-item-label>
                <div class="q-gutter-sm q-mb-xs">
          <span class="text-h6">
            {{ story.countSee ==null? 0: story.countSee}}次
            <q-badge outline align="middle" color="teal" >
              查看
            </q-badge>
          </span>
                  <span class="text-h6">
            {{ story.countLike==null?  0: story.countLike}}次
            <q-badge outline align="middle" color="teal ">
              点赞
            </q-badge>
          </span>
                  <span class="text-h6">
            {{ story.countFllow ==null?  0: story.countFllow }}人
            <q-badge outline align="middle" color="teal" >
              关注
            </q-badge>
          </span>
                </div>

              </q-item-label>
              <q-item-label>
                <q-chip>作家：{{story.countAuthor ==null? 0: story.countAuthor}}</q-chip>
                <q-chip>章节：{{story.countChapter ==null? 0: story.countChapter}}</q-chip>
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
        {{ story.descriptionZip }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>

</style>
