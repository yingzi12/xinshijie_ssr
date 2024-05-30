<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { api, tansParams } from 'boot/axios';
import { useQuasar } from 'quasar';
import {  chargeListWorldFilterRemo, chargeListWorldRemo, getByCode } from 'boot/consts';
const $q = useQuasar();

const title=ref("");
const editor = ref('What you see is <b>what</b> you get.');
const charge=ref(1);
const charge2=ref(-1);


const chargeList = chargeListWorldRemo;
const chargeList2 = chargeListWorldFilterRemo;

function updateCharge(charge: number) {
  // price.value = 1.0;
  // vipPrice.value = 1.0;
}

function updateCharge2(charge: number) {
  getList(charge)
  // price.value = 1.0;
  // vipPrice.value = 1.0;
}


const widList=ref("");

const wids=ref(["0"]);
const recType=ref(1);
const way=ref(1);

async function onAddWorld() {
  wids.value=widList.value.split(",");
  const response = await api.post("/wiki/recommendWorld/add", JSON.stringify({
    recType: recType.value,
    wids: wids.value,
    way: way.value,
  }),{
    headers: {
      'Content-Type': 'application/json',},
  });
  const data = response.data;
  //console.log(data)
  if (data.code == 200) {
    $q.dialog({
      title: '通知',
      message: '添加成功.',
      ok: {
        push: true
      },
    }).onOk(async () => {
      // router.push('/users/album'); // Redirect to login page
    }).onCancel(async () => {
      // router.push('/users/album'); // Redirect to login page
    });
  } else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: '创建成功'
    });
  }
}
const albumList = ref([]);
const data = reactive({
  queryParams: {
    pageNum: 1,
  }
});
const image=ref("")
const { queryParams } = toRefs(data)
async function getList(recType: number) {
  if(recType != -1){
    queryParams.value.recType = recType;
  }else{
    queryParams.value.recType = null;
  }
  try {
    const response = await api.get('/wiki/recommendWorld/listAll?' + tansParams(queryParams.value));
    if (response.data.code == 200) {
      // total.value = response.data.total;
      // maxPage.value=  total.value/10+1;
      albumList.value = response.data.data;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
getList(-1)


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
      <q-breadcrumbs-el label="世界首页" icon="widgets"  to="/world/index"/>
      <q-breadcrumbs-el label="小说首页" icon="widgets"  to="/story/index"/>
      <q-breadcrumbs-el label="世界列表" icon="navigation" to="/world/order" />
      <q-breadcrumbs-el label="小说列表" icon="navigation" to="/story/order" />
      <q-breadcrumbs-el label="这个是世界名称" icon="navigation"  to="/world/detail"/>
      <q-breadcrumbs-el label="世界小说" icon="navigation"  to="/world/story"/>
      <q-breadcrumbs-el label="这个是小说名称" icon="navigation"  to="/story/detail"/>
      <q-breadcrumbs-el label="章节名称" icon="navigation"  to="/story/chapter"/>
    </q-breadcrumbs>

    <div class="bg-orange text-white">
      <q-toolbar>
        <!--      <q-btn flat round dense icon="menu" class="q-mr-sm" />-->
        <q-toolbar-title>创建推荐</q-toolbar-title>
        <!--      <q-space />-->
        <!--      <q-btn flat round dense icon="search" class="q-mr-xs" />-->
        <!--      <q-btn flat round dense icon="group_add" />-->
      </q-toolbar>
    </div>
    <div style="height: 100%">
      <q-card style="height: 100%">
        <q-card-section>
          <div>
            <q-select v-model="charge" :options="chargeList" emit-value hint="分类" label="分类"
                      map-options
                      outlined
                      @update:modelValue="updateCharge"/>
          </div>
        </q-card-section>
        <q-card-section>
          <!--        <div class="text-h6">创建章节</div>-->
          <q-input
            v-model="widList"
            :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入世界id，长度2-100']"
            filled
            hint="世界ID"
            label="世界id *"
            lazy-rules
          />
<!--          <div class="q-gutter-sm">-->
<!--            <q-radio v-model="shape" val="line" label="Line" />-->
<!--            <q-radio v-model="shape" val="rectangle" label="Rectangle" />-->
<!--            <q-radio v-model="shape" val="ellipse" label="Ellipse" />-->
<!--            <q-radio v-model="shape" val="polygon" label="Polygon" />-->
<!--          </div>-->
        </q-card-section>

        <q-separator />
        <q-card-actions >
          <div>
            <q-btn color="primary" label="提交" type="submit" @click="onAddWorld"/>
            <q-btn class="q-ml-sm" color="primary" flat label="返回" type="reset"/>
          </div>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-pa-md">
      <div class="q-pa-md">
        <div class="row no-wrap shadow-1">
          <q-toolbar class="col-8 bg-grey-3">
            <q-btn flat round dense icon="menu" />
            <q-toolbar-title>人气 </q-toolbar-title>
            <q-select v-model="charge2" :options="chargeList2" emit-value hint="分类" label="分类"
                      map-options
                      outlined
                      @update:modelValue="updateCharge2"/>
            <q-input rounded outlined v-model="seach" label="搜索..." />
            <q-btn flat round dense icon="search" />
          </q-toolbar>
          <q-toolbar class="col-4 bg-primary text-white">
            <q-space />
            <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
            <q-btn flat round dense icon="more_vert" />
          </q-toolbar>
        </div>
      </div>
      <div class="q-pa-md q-gutter-md">
        <q-list bordered padding class="rounded-borders">
          <q-item v-for="(album,index) in albumList" :key="index" to="/admin/world/info">
            <q-item-section avatar>
              <img :src="$q.config.sourceWeb+album.imgUrl" class="small-head-image">
            </q-item-section>

            <q-item-section>
              <q-item-label class="one-line-clamp">{{album.wname}}({{album.wid}})</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline"><span>{{getByCode(album.recType)}}</span></q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">{{album.intro}}</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">{{album.createTime}}</q-item-label>
<!--              <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>-->
            </q-item-section>
            <q-item-section side top>
              <q-item-label color="yellow"  caption>待发布</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon name="delete" color="red" ></q-icon>
            </q-item-section>
          </q-item>
          <q-separator spaced />

        </q-list>
      </div>
    </div>
  </q-page>
</template>

<style scoped>

</style>
