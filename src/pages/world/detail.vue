<template>
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

  </q-breadcrumbs>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="col-5 flex flex-center" style="width: 200px">
        <q-img style="height: 240px;width: 180px"
          class="rounded-borders"
          src="https://cdn.quasar.dev/img/parallax2.jpg"
        />
      </q-card-section>
      <q-card-section class="q-pt-xs">
<!--        <div class="text-overline">Overline</div>-->
        <div class="text-h5 q-mt-sm q-mb-xs">这是一个标题
          <q-badge outline align="middle" color="teal">
          v.17
        </q-badge>
        </div>
        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">创造着：我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">管理员: 我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">更新时间:2024-11-11 11:32:23</q-item-label>
        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">最新章节:第436章 第356章 捕虫大会</q-item-label>
        <q-item-label class="q-mb-xs">连载 · 签约 · VIP · 轻小说 · 衍生同人 · 轻小说
        </q-item-label>
        <q-item-label class="three-line-clamp text-caption text-grey q-mb-xs" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        <div class="q-gutter-sm q-mb-xs">
          <span class="text-h6">
            1000次
            <q-badge outline align="middle" color="teal">
              点击
            </q-badge>
          </span>
          <span class="text-h6">
            3333次
            <q-badge outline align="middle" color="teal">
              观看
            </q-badge>
          </span>
          <span class="text-h6">
            3333次
            <q-badge outline align="middle" color="teal">
              喜欢
            </q-badge>
          </span>
        </div>
        <div class="q-gutter-sm q-mb-xs">
          <q-btn color="secondary" icon="favorite" label="喜欢" />
          <q-btn color="red" icon="comment" to="/world/discuss"  label="讨论" />
          <q-btn color="secondary" icon="hotel_class" to="/world/element" label="元素列表" />
          <q-btn color="secondary" icon="photo_album" to="/world/story" label="故事列表" />
          <q-btn color="secondary" icon="manage_accounts" to="/world/manage" label="管理员列表" />
          <q-btn color="secondary" icon="add_circle" label="创建元素" />
          <q-btn color="secondary" icon="add_circle" label="创建故事" />
          <q-btn color="secondary" icon="add_circle" label="申请管理员" />

        </div>

      </q-card-section>
<!--      <q-card-section class="q-pt-xs">-->
<!--        <div class="text-overline">Overline</div>-->
<!--        <div class="text-h5 q-mt-sm q-mb-xs">Title</div>-->
<!--        <div class="text-caption text-grey">-->
<!--          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.-->
<!--        </div>-->

<!--      </q-card-section>-->

    </q-card-section>
  </q-card>
  <div class="row">
    <div style="width: 75%" >
      <div  class="q-ma-md bg-grey-2" >
        <div class="text-h6">简介</div>
        <q-separator   />
        <div >
          <pre>
        QLayout允许您将视图配置为3x3矩阵，包含可选的左侧和/或右侧侧滑菜单。 如果尚未安装，请先阅读QLayout文档页面。

        QDrawer是QLayout的侧边栏部分。
        QLayout允许您将视图配置为3x3矩阵，包含可选的左侧和/或右侧侧滑菜单。 如果尚未安装，请先阅读QLayout文档页面。

        QDrawer是QLayout的侧边栏部分。
        QLayout允许您将视图配置为3x3矩阵，包含可选的左侧和/或右侧侧滑菜单。 如果尚未安装，请先阅读QLayout文档页面。

        QDrawer是QLayout的侧边栏部分。
        QLayout允许您将视图配置为3x3矩阵，包含可选的左侧和/或右侧侧滑菜单。 如果尚未安装，请先阅读QLayout文档页面。

        QDrawer是QLayout的侧边栏部分。
          </pre>
        </div>
      </div>
      <div  class="q-ma-md bg-grey-2">
        <div class="text-h6">评论</div>
        <div class="row">
          <div class="q-pa-md">
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>          </div>
          <div style="width: 90%">
        <div class="q-pa-md" >
          <div >
          <q-input
            v-model="text"
            filled
            type="textarea"
          />
          </div>
          <div class="float-right q-ma-xs">
          <q-btn color="red" icon="send"  label="发送评论" />
          </div>
        </div>
        </div>
        </div>
        <div class="">
          <div class="text-subtitle1">全部评论</div>
          <q-separator   />
          <q-list bordered>
          <q-item clickable v-ripple v-for="index in 10 " :key="index">
            <q-item-section avatar>
              <q-avatar square>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-banner rounded class="bg-purple-8 text-white">
                We can't find your saved recipes until you sign in.
                <template v-slot:action>
                  <q-btn flat color="white" label="Continue as a Guest"  icon="thumb_up"/>
                  <q-btn flat color="white" label="Sign in"  icon="thumb_down"/>
                </template>
              </q-banner>
            </q-item-section>
          </q-item>
        </q-list>
        </div>
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
    </div>
    <div>
      <div class="q-pa-md q-gutter-md">
        <q-list bordered padding class="rounded-borders" style="max-width: 300px">
          <q-item-label header>随机推荐</q-item-label>
          <q-separator spaced />

          <q-item>
            <q-item-section avatar>
              <img src="/150.webp" class="small-head-image">
            </q-item-section>

            <q-item-section>
              <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
              <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <img src="/150.webp" class="small-head-image">
            </q-item-section>

            <q-item-section>
              <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
              <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <img src="/150.webp" class="small-head-image">
            </q-item-section>

            <q-item-section>
              <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
              <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <img src="/150.webp" class="small-head-image">
            </q-item-section>

            <q-item-section>
              <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
              <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>
          </q-item>


          <q-item>
            <q-item-section avatar>
              <img src="/150.webp" class="small-head-image">
            </q-item-section>

            <q-item-section>
              <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
              <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>
          </q-item>


          <q-item>
            <q-item-section avatar>
              <img src="/150.webp" class="small-head-image">
            </q-item-section>

            <q-item-section>
              <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
              <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="q-pa-md q-gutter-md">
        <q-list bordered padding class="rounded-borders" style="max-width: 300px">
          <q-item-label header>随机推荐</q-item-label>
          <q-separator spaced />

          <q-item>
            <q-item-section avatar>
              <img src="/150.webp" class="small-head-image">
            </q-item-section>

            <q-item-section>
              <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
              <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <img src="/150.webp" class="small-head-image">
            </q-item-section>

            <q-item-section>
              <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
              <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <img src="/150.webp" class="small-head-image">
            </q-item-section>

            <q-item-section>
              <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
              <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <img src="/150.webp" class="small-head-image">
            </q-item-section>

            <q-item-section>
              <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
              <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>
          </q-item>


          <q-item>
            <q-item-section avatar>
              <img src="/150.webp" class="small-head-image">
            </q-item-section>

            <q-item-section>
              <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
              <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>
          </q-item>


          <q-item>
            <q-item-section avatar>
              <img src="/150.webp" class="small-head-image">
            </q-item-section>

            <q-item-section>
              <q-item-label class="one-line-clamp">我是超级长的小说标题，我是超级长的小说标题，我是超级长的小说标题</q-item-label>
              <q-item-label class="one-line-clamp text-weight-thin text-overline">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
              <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const  current= ref(6);
const  text= ref("");

</script>

<style scoped>

</style>
