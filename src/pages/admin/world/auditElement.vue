<script setup lang="ts">
import Head from 'pages/admin/world/head.vue';
import { ref } from 'vue';
const  current= ref(6);
const seach=ref("");

const alert=ref(false);

const selected= ref('Pleasant surroundings');
const ticked=ref([ 'Quality ingredients', 'Good table presentation' ]);
const expanded= ref(['Satisfied customers1', 'Satisfied customers', 'Good service (disabled node)', 'Pleasant surroundings' ]);

const simple=[
  {
    label: 'Satisfied customers1',
    children: [
      {
        label: 'Good food11',
        children: [
          { label: 'Quality ingredients111' },
          {
            label: 'Good recipe112',
            children: [
              { label: 'Quality ingredients1121' },
              { label: 'Good recipe1122' ,
                children: [
                  { label: 'Quality ingredients11221' ,
                    children: [
                      { label: 'Quality ingredients112211' },
                      { label: 'Good recipe112212' }
                    ]
                  },
                  { label: 'Good recipe11222' }
                ]
              }
            ]
          }
        ]
      },
      {
        label: 'Good service (disabled node)',
        disabled: true,
        children: [
          {
            label: 'Prompt attention' ,
            children: [
              { label: 'Quality ingredients' },
              { label: 'Good recipe' }
            ]
          },
          { label: 'Professional waiter'
          }
        ]
      },
      {
        label: 'Pleasant surroundings',
        children: [
          { label: 'Happy atmosphere' },
          { label: 'Good table presentation' },
          { label: 'Pleasing decor' }
        ]
      }
    ]
  }
]
const prompt = ref(false);
const address = ref('');
const shape= ref('line');
</script>

<template>
  <q-page>
    <Head></Head>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-grey-3">
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>统计（11)
<!--          <div class="text-h6">分类(<q-btn flat label="点击筛选更多" color="primary" @click="alert = true" size="xs" />)</div>-->
          <q-btn flat label="点击筛选更多" color="primary" @click="alert = true" size="xs" />
        </q-toolbar-title>
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
        <q-btn flat round dense icon="bluetooth" class="q-mr-sm" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </div>
    <div class="row" style="background-color: orange">
      <q-btn-group outline>
        <q-btn outline color="brown" label="全部状态" />
        <q-btn outline color="brown" label="待审核"/>
        <q-btn outline color="brown" label="审核成功" />
        <q-btn outline color="brown" label="审核失败" />

      </q-btn-group>
    </div>
    <div class="row" style="background-color: orange">
      <q-btn-group outline>
        <q-btn outline color="brown" label="全部分类" />
        <q-btn outline color="brown" label="魔法"/>
        <q-btn outline color="brown" label="科学" />
        <q-btn outline color="brown" label="远古" />
        <q-btn outline color="brown" label="修真" />
        <q-btn outline color="brown" label="历史" />
      </q-btn-group>
    </div>
    <div class="row" style="background-color: orange">
      <div>
        已增加过滤：
        <div class="q-pa-md q-gutter-sm">
          <q-btn v-for="(t,index) in ticked" :key="index" color="brown" :label="t" size="xs"/>
        </div>
      </div>
<!--      <q-btn-group outline>-->
<!--        <q-btn outline color="brown" label="已选择分类" />-->
<!--      </q-btn-group>-->
    </div>



    <div class="q-pa-md q-gutter-md">
      <q-list bordered padding class="rounded-borders">
        <div v-for="index in 10" :key="index">
        <q-item  >
          <q-item-section avatar>
            <img src="/150.webp" class="small-head-image">
          </q-item-section>

          <q-item-section side>
            <q-item-label class="one-line-clamp  text-subtitle1">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
            <q-item-label class="q-mb-xs"><span style="color: #C10015">待审核 · </span><span style="color: #C10015">新增 · </span>连载 · 签约 · VIP · 轻小说 · 衍生同人 · 轻小说</q-item-label>
            <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
            <q-item-label class="one-line-clamp text-weight-thin text-overline">2022-11-11 11:11:23</q-item-label>
            <q-item-label class="twp-line-clamp" lines="1" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>
<!--          <q-item-section side top>-->
<!--            <q-item-label class="one-line-clamp text-weight-thin text-overline">创建人：我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>-->
<!--            <q-item-label class="one-line-clamp text-weight-thin text-overline">创建时间：2022-11-11 11:11:23</q-item-label>-->
<!--          </q-item-section>-->
          <q-item-section side top>
            <q-item-label >
              <span class="text-weight-medium">申请理由：</span>
              <span class="text-grey-8"> - GitHub repositoryGitHub repositoryGitHub repositoryGitHub repositoryGitHub repositoryGitHub repositoryGitHub repository</span>
              <q-separator spaced />
              <span class="text-weight-medium">拒绝理由：</span>
              <span class="text-grey-8"> - GitHub repositoryGitHub repositoryGitHub repositoryGitHub repositoryGitHub repositoryGitHub repositoryGitHub repository</span>
              <div>
                <div class="text-grey-8">审核人：这是名称，这是名称，这是名称，这是名称</div>
                <div class="text-grey-8">审核时间：2025-11-11 11:34:54</div>
              </div>
            </q-item-label>

          </q-item-section>
          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn class="gt-xs" size="12px" flat dense round icon="delete" label="审核" @click="prompt=true"/>
            </div>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        </div>
      </q-list>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="current"
          color="purple"
          :max="10"
          :max-pages="6"
          boundary-numbers
        />
      </div>
    </div>
  </q-page>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6" >审核</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-gutter-sm">
          <q-radio v-model="shape" val="line" label="通过申请" />
          <q-radio v-model="shape" val="rectangle" label="拒绝审核" />
        </div>
        <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" label="理由说明" />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="取消" v-close-popup />
        <q-btn flat label="确认" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-pa-md row q-col-gutter-sm">
          <q-tree class="col-12 col-sm-6"
                  :nodes="simple"
                  node-key="label"
                  tick-strategy="leaf"
                  v-model:selected="selected"
                  v-model:ticked="ticked"
                  v-model:expanded="expanded"
          />
          <div class="col-12 col-sm-6 q-gutter-sm">
            <div class="text-h6">Selected</div>
            <div>{{ selected }}</div>

            <q-separator spaced />

            <div class="text-h6">Ticked</div>
            <div>
              <div v-for="tick in ticked" :key="`ticked-${tick}`">
                {{ tick }}
              </div>
            </div>

            <q-separator spaced />

            <div class="text-h6">Expanded</div>
            <div>
              <div v-for="expand in expanded" :key="`expanded-${expand}`">
                {{ expand }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<style scoped>

</style>
