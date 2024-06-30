<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { api, tansParams } from 'boot/axios';

const  current= ref(1);
const  total= ref(1);
const  maxPage= ref(1);

const valueList=ref([]);
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20,
  }
});
const { queryParams } = toRefs(data);
async function getValueList() {
  try {
    const response = await api.get('/wiki/announcement/list?'+ tansParams(queryParams.value));
    if (response.data.code == 200) {
      total.value = response.data.total;
      valueList.value = response.data.data;
      if(total.value % queryParams.value.pageSize == 0){
        maxPage.value=total.value/queryParams.value.pageSize;
      }else{
        maxPage.value=total.value/queryParams.value.pageSize+1;
      }
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
getValueList();
</script>

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
      <q-breadcrumbs-el label="公告列表" icon="widgets"  to="/notice/index"/>
    </q-breadcrumbs>
    <div class="q-pa-md q-gutter-md">
      <q-list bordered padding class="rounded-borders">
        <div v-for="(value,index) in valueList" :key="index">
          <q-item  :to="{ path: '/notice/detail', query: { aname: value.title, aid: value.id }}">
            <q-item-section side>
              {{(current-1)*10+index+1}}
            </q-item-section>
            <q-item-section>
              <q-item-label class="one-line-clamp">【公告】{{value.title}}</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">{{value.intro}}</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">{{value.createTime}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced />
        </div>


      </q-list>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="current"
          color="purple"
          :max="maxPage"
          :max-pages="6"
          boundary-numbers
        />
      </div>
    </div>

  </q-page>
</template>

<style scoped>

</style>
