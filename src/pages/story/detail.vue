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
        <div class="text-h5 q-mt-sm q-mb-xs">
          这是一个标题
          <q-badge outline align="middle" color="teal">
          v.17
        </q-badge>
        </div>
        <q-item-label class="one-line-clamp text-weight-thin text-overline q-mb-xs">我是超级长的操作者，我是超级长的操作者，我是超级长的操作者</q-item-label>
        <q-item-label class="one-line-clamp   q-mb-xs">世界：我是一个世界名称</q-item-label>
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
          <q-btn color="primary" icon="book" label="阅读" />
          <q-btn color="secondary" icon="favorite" label="喜欢" />
          <q-btn color="secondary" icon="grade" label="收藏" />
          <q-btn color="red" icon="comment" label="讨论" to="/story/discuss" />
          <q-btn color="secondary" icon="add" label="新增章节"  to="/chapter/create"/>
          <q-btn color="secondary" icon="add" label="申请作者"  @click="prompt=true"/>

        </div>

      </q-card-section>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Overline</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
        <div class="text-caption text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>

      </q-card-section>

    </q-card-section>
  </q-card>
  <div class="row">
    <div style="width: 75%">
      <div  class="q-ma-md bg-grey-2">
        <div class="text-h6">简介</div>
        <q-separator   />
        <div>
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
        <div class="text-h6">目录</div>
        <q-separator   />
        <div class="text-subtitle1">分卷1</div>

        <div class="row">
          <div class="col-4" v-for="index in 22" :key="index">
            <div class="q-ma-xs one-line-clamp">
              <a href="/story/chapter" class="background text-overline">QLayout允许您将视图配置为3x3矩阵，包含可选的左侧和/或右侧侧滑菜单。 如果尚未安装，请先阅读QLayout文档页面 </a>
            </div>
          </div>
        </div>
        <div class="text-subtitle1">分卷2</div>

        <div class="row">
          <div class="col-4" v-for="index in 22" :key="index">
            <div class="q-ma-xs one-line-clamp">
              <a href="/story/chapter" class="background text-overline">QLayout允许您将视图配置为3x3矩阵，包含可选的左侧和/或右侧侧滑菜单。 如果尚未安装，请先阅读QLayout文档页面 </a>
            </div>
          </div>
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
import { ref } from 'vue';

const  current= ref(6);
const auditIntro=ref("");
const prompt=ref(false);
</script>

<style scoped>

</style>
