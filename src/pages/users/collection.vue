<script lang="ts" setup>
import {Cookies, useQuasar} from 'quasar'
import {reactive, ref, toRefs} from "vue";
import { api } from "boot/axios";
import { getImageUrl, tansParams } from 'boot/tools';

const $q = useQuasar();

const token = Cookies.get('token');
const total = ref(0);
const maxPage = ref(0);

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


</script>

<template>
  <q-page>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>我的收藏</q-toolbar-title>
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
            <div class="q-pa-md" style="width: 100%">
              <q-list bordered padding>
                <div v-for="(collectionSystem,index) in collectionSystemList "  :key="index">
                <q-item>
                  <q-item-section class="q-ml-none" thumbnail top>
                    <img :src="getImageUrl(collectionSystem)">
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
