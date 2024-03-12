<script lang="ts" setup>
import {Cookies, useQuasar} from 'quasar'
import {reactive, ref, toRefs} from "vue";
import { api } from "boot/axios";
import {tansParams} from "boot/tools";

const $q = useQuasar();

const token = Cookies.get('token');
const total = ref(0);
const maxPage = ref(0);

const current=ref(1)
const collectionSystemList = ref([]);
const collectionUserList = ref([]);

const queryData = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20,
  }
});
const {queryParams} = toRefs(queryData);

async function getListSystem(page: number) {
  queryParams.value.pageNum = page;
  try {
    //server/admin/userCollection/list.get.ts
    const response = await api.get('/admin/userCollection/listSystem?' + tansParams(queryParams.value), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.data.code == 200) {
      total.value = response.data.total;
      maxPage.value=  total.value/queryParams.value.pageSize+1;
      collectionSystemList.value = response.data.data;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
async function getListUser(page: number) {
  queryParams.value.pageNum = page;
  try {
    //server/admin/userCollection/list.get.ts
    const response = await api.get('/admin/userCollection/listUser?' + tansParams(queryParams.value), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.data.code == 200) {
      total.value = response.data.total;
      maxPage.value=  total.value/queryParams.value.pageSize+1;
      collectionUserList.value = response.data.data;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
getListSystem(1);
getListUser(1);

const tab = ref('mails')

function getImageUrl(imgUrl:string) {
  if (imgUrl != null && imgUrl != undefined && imgUrl != '') {
    return `${$q.config.sourceWeb}${imgUrl}`; // Replace with your default image URL
  }
  return `/empty.png`;
}
function getSystemImageUrl(album) {
  if (album.sourceUrl != null && album.sourceUrl.startsWith('/image')) {
    return `${$q.config.sourceWeb}${album.sourceUrl}`;
  }
  return album.sourceWeb + album.imgUrl;
}

</script>

<template>
  <q-page>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>我的关注</q-toolbar-title>
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </div>

    <div class="q-pa-md">
    <div class="q-gutter-y-md" >
      <q-card>
        <q-tabs
            v-model="tab"
            align="justify"
            class="bg-purple text-white"
            narrow-indicator
        >
          <q-tab label="世界" name="mails"/>
          <q-tab label="小说" name="alarms"/>
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="bg-orange-1 text-dark ">
          <q-tab-panel class="bg-lime-1 text-dark" name="mails">
            <q-item  to="/world/detail">
              <q-item-section avatar>
                <img src="/150.webp" class="small-head-image">
              </q-item-section>

              <q-item-section>
                <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">最近更新：这是一个元素名称</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">更新世界：2011-11-11 11:11:34</q-item-label>
                <q-item-label class="one-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-item-label color="yellow"  caption>待发布</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-icon name="delete" color="red" ></q-icon>
                <q-icon color="yellow" name="star"/>
                <q-icon color="white" name="star_border"/>
              </q-item-section>
            </q-item>

            <div class="q-pa-md" style="width: 100%">
              <q-list bordered padding>
                <div v-for="(collectionSystem,index) in collectionSystemList"  :key="index">
                <q-item>
                  <q-item-section class="q-ml-none" thumbnail top>
                    <img :src="getSystemImageUrl(collectionSystem)">
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>
                      <a :href='"/detail?aid="+collectionSystem.id'>
                      {{ collectionSystem.title }}
                    </a>
                    </q-item-label>
                    <q-item-label caption>{{ collectionSystem.intro }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>{{ collectionSystem.createTime }}</q-item-label>
                    <q-icon color="yellow" name="star"/>
                    <q-icon color="white" name="star_border"/>

                  </q-item-section>
                </q-item>
                <q-separator spaced/>
                </div>
              </q-list>
            </div>

          </q-tab-panel>

          <q-tab-panel class="bg-lime-1 text-dark" name="alarms">
            <div class="q-pa-md" style="width: 100%">
              <q-list bordered padding>
                <q-item  to="/story/detail">
                  <q-item-section avatar>
                    <img src="/150.webp" class="small-head-image">
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
                    <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
                    <q-item-label class="one-line-clamp text-weight-thin text-overline">2011-11-11 11:11:34</q-item-label>
                    <q-item-label class="one-line-clamp text-weight-thin text-overline">上次观看：第17章 这是一个章节名称</q-item-label>
                    <q-item-label class="one-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                  </q-item-section>
                  <q-item-section side top>
                    <q-item-label color="yellow"  caption>待发布</q-item-label>
                  </q-item-section>
                  <q-item-section side top>
                    <q-icon name="delete" color="red" ></q-icon>
                    <q-icon color="yellow" name="star"/>
                    <q-icon color="white" name="star_border"/>
                  </q-item-section>
                </q-item>

                <div v-for="(collectionUser,index) in collectionUserList "  :key="index">
                  <q-item>
                    <q-item-section class="q-ml-none" thumbnail top>
                      <img :src="getImageUrl(collectionUser.imgUrl)">
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>
                        <a :href='"/userAlbumDetail?aid="+collectionUser.id'>
                        {{ collectionUser.title }}
                        </a>
                      </q-item-label>
                      <q-item-label caption>{{ collectionUser.intro }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      <q-item-label caption>{{ collectionUser.createTime }}</q-item-label>
                      <q-icon color="yellow" name="star"/>
                      <q-icon color="white" name="star_border"/>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced/>
                </div>
              </q-list>

            </div>

          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
  </q-page>
</template>

<style scoped>

</style>
