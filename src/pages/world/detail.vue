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
    <q-breadcrumbs-el label="我的世界" icon="description"  to="/world/detail"/>

  </q-breadcrumbs>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="col-5 flex flex-center" style="width: 200px">
        <q-img style="height: 240px;width: 180px"
          class="rounded-borders"
          :src="getImageUrl(world.imgUrl)"
          @error.once="() => { $event.target.src = '/empty.jpg'; }"
        />
      </q-card-section>
      <q-card-section class="q-pt-xs">
<!--        <div class="text-overline">Overline</div>-->
        <div class="text-h5 q-mt-sm q-mb-xs">{{world.name}}
          <q-badge outline align="middle" color="teal">
          v.{{world.ranks}}
        </q-badge>
        </div>
<!--        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">创造着：我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>-->
        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">管理员: {{world.createName ==null ? "未知" :world.createName}}</q-item-label>
<!--        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">更新时间:2024-11-11 11:32:23</q-item-label>-->
<!--        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">最新章节:第436章 第356章 捕虫大会</q-item-label>-->
        <q-item-label class="q-mb-xs">
          <q-chip class="glossy" color="orange" v-if="world.source != null" text-color="white" size="xs">
            {{ world.source }}
          </q-chip>
          <q-chip class="glossy" color="yellow"  text-color="black" size="xs">
            {{ (world.typeName != null && world.typeName != '') ? world.typeName:"其他"  }}
          </q-chip>

          <q-chip class="glossy" color="orange" v-for="(tags,index) in tagList " :key="index" text-color="white" size="xs">
            {{ tags }}
          </q-chip>
        </q-item-label>
        <q-item-label class="three-line-clamp text-caption text-grey q-mb-xs" caption>
          {{world.intro}}
        </q-item-label>
        <div class="q-gutter-sm q-mb-xs">
          <span class="text-h6">
            {{ world.countSee }}次
            <q-badge outline align="middle" color="teal">
              点击
            </q-badge>
          </span>
          <span class="text-h6">
            {{ world.countLike }}次
            <q-badge outline align="middle" color="teal">
              喜欢
            </q-badge>
          </span>
          <span class="text-h6">
            {{ world.countFllow }}人
            <q-badge outline align="middle" color="teal">
              关注
            </q-badge>
          </span>
          <span class="text-h6">
            {{ world.countResident }}名
            <q-badge outline align="middle" color="teal">
              居民
            </q-badge>
          </span>
        </div>
        <div class="q-gutter-sm q-mb-xs">
          <q-btn color="secondary" icon="favorite" label="喜欢" size="small"/>
          <q-btn color="secondary" icon="grade" label="收藏"  size="small"/>
          <q-btn color="red" icon="comment" :to="{ path: '/world/discuss', query: { wid: wid ,wname: world.name,source: 1 }}"   size="small" >讨论({{world.countDiscuss}})</q-btn>
        </div>
        <div class="q-gutter-sm q-mb-xs">
          <q-btn color="secondary" icon="hotel_class"   :to="{ path:'/world/element', query: { wid: wid,wname: world.name  }}"  size="small">元素列表({{world.countElement}})</q-btn>
          <q-btn color="secondary" icon="photo_album"   :to="{ path: '/world/story', query: { wid: wid ,wname: world.name }}"  size="small">故事列表({{world.countStory}})</q-btn>
          <q-btn color="secondary" icon="manage_accounts"  :to="{ path: '/world/manage', query: { wid: wid,wname: world.name  }}" label="管理员列表" size="small" />
        </div>
        <div class="q-gutter-sm q-mb-xs">
          <q-btn color="secondary" icon="add_circle" label="创建元素"  :to="{ path: '/admin/element/create', query: { wid: wid ,wname: world.name }}" size="small" />
          <q-btn color="secondary" icon="add_circle" label="创建故事"  :to="{ path: '/admin/world/create', query: { wid: wid ,wname: world.name }}" size="small"/>
          <q-btn color="secondary" icon="add_circle" label="申请管理员" @click="prompt=true" size="small"/>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">
          <q-rating
            v-model="scores"
            max="5"
            size="3em"
            color="yellow"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
            no-dimming
          />
        </div>
        <div class="text-h5 q-mt-sm q-mb-xs">生机值：{{world.vitality}}</div>
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
          {{world.descriptionZip}}
          </pre>
        </div>
      </div>
      <commont-list-component :wid="wid" :source="1"></commont-list-component>
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
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">申请管理员</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="auditIntro" autofocus @keyup.enter="prompt = false" label="请输入理由" />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="取消" v-close-popup />
        <q-btn flat label="确认" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref,  watch } from 'vue';
import { api } from 'boot/axios';
import { useRoute } from 'vue-router';
import rendomWorldItemList from 'components/world/rendomWorldItemListComponent.vue'; // 确保路径正确对应你的文件结构
import rendomStoryItemList from 'components/story/rendomStoryItemListComponent.vue'; // 确保路径正确对应你的文件结构
import commontListComponent from 'components/common/commontListComponent.vue'; // 确保路径正确对应你的文件结构
import { Cookies, useQuasar } from 'quasar';
import { getImageUrl } from 'boot/tools';
const $q = useQuasar();

// 接收url里的参数
const route = useRoute();
const wid = ref(route.query.wid);
const scores = ref(0)
//
const  current= ref(6);
const token = Cookies.get("token");

const  text= ref("");
const auditIntro=ref("");
const prompt=ref(false);

const world=ref({});
const tagList=ref([]);

/** 查询世界详细 */
async function getDetail() {
  const response = await api.get(`/wiki/world/getInfo/${wid.value}`);
  const data=response.data;
  if (data.code == 200) {
    world.value=data.data;
    scores.value= world.value.scores;
    if(world.value.tags != undefined && world.value.tags !=null && world.value.tags !=""){
      tagList.value=world.value.tags.split(";");
    }
  }
}

getDetail();
onMounted(() => {
  getDetail();
});

// 添加watch来监听wid的变化
watch(() => route.query.wid, async (newWid, oldWid) => {
  if (newWid !== oldWid) {
    // 当wid变化时，重新加载数据
    wid.value = newWid;
    await getDetail(); // 重新获取世界详细信息
    // await getAllWorldComment(); // 重新获取评论列表
  }
}, { immediate: true }); // immediate: true 确保在初始渲染时也触发watcher

</script>

<style scoped>

</style>
