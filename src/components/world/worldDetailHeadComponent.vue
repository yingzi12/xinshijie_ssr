<script setup lang="ts">
//详情页的头
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { getImageUrl } from 'boot/tools';

const router = useRouter()
const $q = useQuasar();

interface World {
  imgUrl: string;
  id: string;
  name: string;
  intro: string;
  tags: string;
  updateTime: string;
  userName: string;
  createName: string;
  numberPhotos: string;
  countDiscuss: string;
  countLike: string;
  countSee: string;
  source:string;
  typeName:string;
  ranks:number;
  scores:number;
}

const props = defineProps<{ value: World }>();
const scores = ref(0)

</script>

<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="col-5 flex flex-center" style="width: 200px">
        <q-img style="height: 240px;width: 180px"
             class="rounded-borders"
             :src="getImageUrl(props.value.imgUrl) || `/empty.jpg`" @error.once="e => { e.target.src = `/empty.jpg` }"
        />
      </q-card-section>
      <q-card-section class="q-pt-xs">
        <!--        <div class="text-overline">Overline</div>-->
        <div class="text-h5 q-mt-sm q-mb-xs">{{props.value.name}}
          <q-badge outline align="middle" color="teal">
            v.{{props.value.ranks}}
          </q-badge>
        </div>
        <!--        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">创造着：我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>-->
        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">管理员: {{props.value.createName ==null ? "未知" :props.value.createName}}</q-item-label>
        <!--        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">更新时间:2024-11-11 11:32:23</q-item-label>-->
        <!--        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">最新章节:第436章 第356章 捕虫大会</q-item-label>-->
        <q-item-label class="q-mb-xs">
          <q-chip class="glossy" color="orange" v-if="props.value.source != null" text-color="white" size="xs">
            {{ props.value.source }}
          </q-chip>
          <q-chip class="glossy" color="yellow"  text-color="black" size="xs">
            {{ (props.value.typeName != null && props.value.typeName != '') ? props.value.typeName:"其他"  }}
          </q-chip>

          <q-chip class="glossy" color="orange" v-for="(tags,index) in tagList " :key="index" text-color="white" size="xs">
            {{ tags }}
          </q-chip>
        </q-item-label>
        <q-item-label class="three-line-clamp text-caption text-grey q-mb-xs" caption>
          {{props.value.intro}}
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
          <q-btn color="red" icon="comment" to="/world/discuss"   size="small" >讨论({{props.value.countDiscuss}})</q-btn>
        </div>
        <div class="q-gutter-sm q-mb-xs">
          <q-btn color="secondary" icon="hotel_class" to="/world/element"  size="small">元素列表({{props.value.countElement}})</q-btn>
          <q-btn color="secondary" icon="photo_album" to="/world/story"  size="small">故事列表({{props.value.countStory}})</q-btn>
          <q-btn color="secondary" icon="manage_accounts" to="/world/manage" label="管理员列表" size="small" />
        </div>
        <div class="q-gutter-sm q-mb-xs">
          <q-btn color="secondary" icon="add_circle" label="创建元素" to="/element/create" size="small" />
          <q-btn color="secondary" icon="add_circle" label="创建故事" to="/story/create" size="small"/>
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
        <div class="text-h5 q-mt-sm q-mb-xs">生机值：{{props.value.vitality}}</div>
      </q-card-section>

    </q-card-section>
  </q-card>


</template>

<style scoped>

</style>
