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
      <q-breadcrumbs-el :label="story.wname" icon="navigation"  :to="{ path: '/world/detail', query: { wid: story.wid ,wname: story.wname,source: 1 }}" />
      <q-breadcrumbs-el label="世界小说" icon="navigation" :to="{ path: '/world/story', query: { wid: story.wid ,wname: story.wname,source: 1 }}"/>
      <q-breadcrumbs-el label="小说列表" icon="navigation" :to="{ path: '/story/order'}" />
      <q-breadcrumbs-el :label="sname" icon="navigation" />
    </q-breadcrumbs>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="col-5 flex flex-center" style="width: 200px">
        <q-img style="height: 240px;width: 180px"
               class="rounded-borders"
               :src="getImageUrl(story.imgUrl)"
               @error.once="() => { $event.target.src = '/empty.jpg'; }"
        />
      </q-card-section>
      <q-card-section class="q-pt-xs">
<!--        <div class="text-overline">Overline</div>-->
        <div class="text-h5 q-mt-sm q-mb-xs">
          {{story.name}}
          <q-badge outline align="middle" color="teal">
          v.{{story.ranks}}
          </q-badge>
        </div>
        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">管理员: {{story.createName ==null ? "未知" :story.createName}}</q-item-label>
        <!--        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">更新时间:2024-11-11 11:32:23</q-item-label>-->
        <!--        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">最新章节:第436章 第356章 捕虫大会</q-item-label>-->
        <q-item-label class="q-mb-xs">
          <q-chip class="glossy" color="orange" v-if="story.source != null" text-color="white" size="xs">
            {{ story.source }}
          </q-chip>
          <q-chip class="glossy" color="yellow"  text-color="black" size="xs">
            {{ (story.typeName != null && story.typeName != '') ? story.typeName:"其他"  }}
          </q-chip>

          <q-chip class="glossy" color="orange" v-for="(tags,index) in tagList " :key="index" text-color="white" size="xs">
            {{ tags }}
          </q-chip>
        </q-item-label>
        <q-item-label class="three-line-clamp text-caption text-grey q-mb-xs" caption>
          {{story.intro}}
        </q-item-label>
        <div class="q-gutter-sm q-mb-xs">
          <span class="text-h6">
            {{ story.countSee }}次
            <q-badge outline align="middle" color="teal">
              点击
            </q-badge>
          </span>
          <span class="text-h6">
            {{ story.countLike }}次
            <q-badge outline align="middle" color="teal">
              喜欢
            </q-badge>
          </span>
          <span class="text-h6">
            {{ story.countFllow }}人
            <q-badge outline align="middle" color="teal">
              关注
            </q-badge>
          </span>
        </div>
        <div class="q-gutter-sm q-mb-xs">
          <q-btn color="secondary" icon="favorite" label="喜欢" size="small"/>
          <q-btn color="secondary" icon="grade" label="收藏"  size="small"/>
          <q-btn color="red" icon="comment" :to="{ path: '/story/discuss', query: {wid: story.wid ,wname: story.wname, sid: sid ,sname: story.name,source: 2 }}"   size="small" >讨论({{story.countDiscuss}})</q-btn>
        </div>
        <div class="q-gutter-sm q-mb-xs">
          <q-btn color="primary" icon="book" label="阅读" />
<!--          <q-btn color="secondary" icon="add" label="新增章节"  :to="{ path: '/admin/chapter/add', query: { sid: sid,rid:rid,sname:sname,rname:rname,id:4}}"/>-->
          <q-btn color="secondary" icon="add" label="申请作者"  @click="prompt=true"/>
        </div>

      </q-card-section>

    </q-card-section>
  </q-card>
    <div class="row">
      <div class="col-9" >
        <div  class="q-ma-md bg-grey-2" >
          <div class="text-h6">简介</div>
          <q-separator   />
          <div>
          <pre style="white-space: pre-wrap; word-break: break-word; width: 100%;">
          {{story.descriptionZip}}
          </pre>
          </div>
        </div>
        <q-card flat bordered style="width: 100%" >
          <q-card-section class="row items-center q-pb-none ">
            <div class="text-h6">目录</div>
            <q-space />
<!--            <q-btn icon="close" flat round dense v-close-popup />-->
          </q-card-section>
          <q-separator inset />

          <q-card-section style="max-height: 50vh" class="scroll">
            <div>
              <chapter-component :sname="story.name" :sid="sid" :wid="story.wid" :wname="story.wname"></chapter-component>
            </div>
          </q-card-section>

          <q-separator />

        </q-card>

        <commont-list-component :wid="story.wid" :sid="sid" :source="2"></commont-list-component>

      </div>
      <div class="col">
        <div class="q-pa-md q-gutter-md">
          <rendom-world-item-list size="6"></rendom-world-item-list>
        </div>
        <div class="q-pa-md q-gutter-md">
          <rendom-story-item-list size="6"></rendom-story-item-list>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, watch } from 'vue';
import { api } from 'boot/axios';
import { useRoute, useRouter } from 'vue-router';
import { getImageUrl } from 'boot/tools';
import rendomStoryItemList from 'components/story/rendomStoryItemListComponent.vue'; // 确保路径正确对应你的文件结构
import rendomWorldItemList from 'components/world/rendomWorldItemListComponent.vue'; // 确保路径正确对应你的文件结构
import chapterComponent from 'components/story/chapterComponent.vue';
import commontListComponent from 'components/common/commontListComponent.vue';
// 接收url里的参数
const route = useRoute();
const router = useRouter();

const sid = ref(route.query.sid);
const sname = ref(route.query.sname);
const scores = ref(0)
const tagList=ref([]);

const story=ref({});
/** 查询世界详细 */
async function getDetail() {
  const response = await api.get(`/wiki/story/getInfo/${sid.value}`);
  const data=response.data;
  if (data.code == 200) {
    story.value=data.data;
    scores.value= story.value.scores;
    if(story.value.tags != undefined && story.value.tags !=null && story.value.tags !=""){
      tagList.value=story.value.tags.split(";");
    }
  }
}
getDetail();

// 添加watch来监听wid的变化
watch(() => route.query.sid, async (newSid, oldSid) => {
  if (newSid !== oldSid) {
    // 当wid变化时，重新加载数据
    sid.value = newSid;
    await getDetail(); // 重新获取世界详细信息
    // await getAllWorldComment(); // 重新获取评论列表
  }
}, { immediate: true }); // immediate: true 确保在初始渲染时也触发watcher

</script>

<style scoped>

</style>
