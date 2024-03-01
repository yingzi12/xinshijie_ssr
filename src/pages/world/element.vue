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
      <q-breadcrumbs-el label="我的世界" icon="navigation"  to="/world/detail"/>
      <q-breadcrumbs-el label="元素列表" icon="navigation"  to="/world/element"/>
    </q-breadcrumbs>
    <q-splitter
      v-model="splitterModel"
      unit="px"
    >

      <template v-slot:before>
        <div class="text-h6">排行榜</div>
        <div class="q-pa-md q-gutter-sm">
          <span class="text-overline">全部</span>
          <span class="text-overline">点击</span>
          <span class="text-overline">观看</span>
          <span class="text-overline">全部</span>
          <span class="text-overline">全部</span>
          <span class="text-overline">全部</span>
        </div>
        <q-separator spaced />
        <div class="text-h6">分类(<q-btn flat label="点击筛选更多" color="primary" @click="alert = true" size="xs" />)</div>
        <div class="q-pa-md q-gutter-sm">
          <q-btn  color="brown" label="全部" size="xs"/>
          <q-btn  color="brown" label="魔法" size="xs"/>
          <q-btn  color="brown" label="科学" size="xs"/>
          <q-btn  color="brown" label="远古" size="xs"/>
          <q-btn  color="brown" label="修真" size="xs"/>
          <q-btn  color="brown" label="仙侠" size="xs"/>
        </div>
        <div>
          已增加过滤：
          <div class="q-pa-md q-gutter-sm">
            <q-btn v-for="(t,index) in ticked" :key="index" color="brown" :label="t" size="xs"/>
          </div>
        </div>
        <q-separator spaced />
        <div class="text-h6">标签</div>
        <div class="q-pa-md q-gutter-sm">
          <span class="text-overline">全部</span>
          <span class="text-overline">点击</span>
          <span class="text-overline">观看</span>
          <span class="text-overline">全部</span>
          <span class="text-overline">全部</span>
          <span class="text-overline">全部</span>
        </div>
        <q-separator spaced />
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="row no-wrap shadow-1">
            <q-toolbar class="col-8 bg-grey-3">
              <q-btn flat round dense icon="menu" />
              <q-toolbar-title>我的故事 </q-toolbar-title>
              <q-toolbar-title>元素列表 </q-toolbar-title>
              <q-input rounded outlined v-model="seach" label="搜索..." />
              <q-btn flat round dense icon="search" />
            </q-toolbar>
            <q-toolbar class="col-4 bg-primary text-white">
              <q-space />
              <q-btn flat round dense icon="add" class="q-mr-sm" to="/element/create"/>
              <q-btn flat round dense icon="more_vert" />
            </q-toolbar>
          </div>
        </div>
        <div class="q-pa-md q-gutter-md">
          <q-list bordered padding class="rounded-borders">
            <q-item v-for="index in 10" :key="index" to="/element/detail">
              <q-item-section avatar>
                <img src="/150.webp" class="small-head-image">
              </q-item-section>

              <q-item-section>
                <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">更新人：我是更新人，我是更新人</q-item-label>
                <q-item-label class="one-line-clamp text-weight-thin text-overline">更新时间：2024-02-11 11-11-12</q-item-label>
                <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-item-label caption>5 min ago</q-item-label>
                <q-icon name="star" color="yellow" />
              </q-item-section>
            </q-item>
            <q-separator spaced />

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

      </template>

    </q-splitter>

  </q-page>
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

<script lang="ts" setup>
import { ref } from 'vue';

const splitterModel= ref(200); // start at 150px
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
</script>

<style scoped>

</style>
