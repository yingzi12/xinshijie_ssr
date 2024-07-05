<script setup lang="ts">

import CardItemComponent from 'components/say/cardItemComponent.vue';
import { defineProps, reactive, ref, toRefs } from 'vue';
import { api, tansParams } from 'boot/axios';
const  current= ref(1);
const props = defineProps({
  userId:{
    type: String,
    required: true
  },
});
// const dateRange = ref([]);
const total = ref(0);
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    auditStatus:0,
    userId:"",
    title:"",
    current:1,
    name: "",
    types: -1,
    pid:0,
    ranks:0,
    // wid:wid.value,
  },
});
const { queryParams } = toRefs(data);

const  maxPage=ref(0);
const valueList=ref([]);
async function getValueList() {
  try {
    queryParams.value.userId=props.userId;
    queryParams.value.pageNum=current.value;
    const response = await api.get('/user/say/list?' + tansParams(queryParams.value));
    if (response.data.code == 200) {
      total.value = response.data.total;
      valueList.value=response.data.data;
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

  <!--  </div>-->
  <div class="q-gutter-md">
    <q-list bordered padding class="rounded-borders">
      <q-item v-for="(value,index) in valueList" :key="index">
        <card-item-component :value="value"></card-item-component>
      </q-item>
      <q-separator spaced />

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
</template>

<style scoped>

</style>
