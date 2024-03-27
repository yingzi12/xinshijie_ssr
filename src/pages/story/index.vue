<template>
  <q-page >
    <q-tabs v-model="seach" shrink stretch>
      <q-input name="title" label="搜索" v-model="title" style="width: 600px"  @keyup.enter="getList(1)"/>          <q-icon name="search" @click="getList(1)"/>
    </q-tabs>
    <div class="row">
      <div style="width: 80%">
        <div class="q-pa-md">
          <q-carousel
            swipeable
            animated
            v-model="slide"
            thumbnails
            infinite
          >
            <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
            <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
            <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
          </q-carousel>
        </div>
      </div>
      <div>
        <div class="q-pa-md q-gutter-md">
          <q-list bordered  class="rounded-borders" style="max-width: 300px">
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title>编辑推荐</q-toolbar-title>
            </q-toolbar>
            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <span class="text-green">【世界】</span>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">这是非常长的故事名称，这是非常长的故事名称</q-item-label>
                <q-item-label  lines="1" caption>这是作者名称</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <span class="text-blue">【故事】</span>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">这是非常长的故事名称，这是非常长的故事名称</q-item-label>
                <q-item-label  lines="1" caption>这是作者名称</q-item-label>
              </q-item-section>

            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <span class="text-weight-thin">【故事】</span>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">这是非常长的故事名称，这是非常长的故事名称</q-item-label>
                <q-item-label  lines="1" caption>这是作者名称</q-item-label>
              </q-item-section>

            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <span class="text-weight-thin">【故事】</span>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">这是非常长的故事名称，这是非常长的故事名称</q-item-label>
                <q-item-label  lines="1" caption>这是作者名称</q-item-label>
              </q-item-section>

            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <span class="text-weight-thin">【故事】</span>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">这是非常长的故事名称，这是非常长的故事名称</q-item-label>
                <q-item-label  lines="1" caption>这是作者名称</q-item-label>
              </q-item-section>

            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <span class="text-weight-thin">【故事】</span>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">这是非常长的故事名称，这是非常长的故事名称</q-item-label>
                <q-item-label  lines="1" caption>这是作者名称</q-item-label>
              </q-item-section>

            </q-item>
          </q-list>
        </div>
      </div>

    </div>
    <q-toolbar >
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title>
        推荐
      </q-toolbar-title>
      <q-btn flat round dense icon="more_horiz" />
    </q-toolbar>
    <div class="q-pa-md">
      <div class="row">
        <div>
          <q-list bordered  class="rounded-borders" style="max-width: 300px">
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title>本周强推</q-toolbar-title>
            </q-toolbar>
            <q-item v-for="index in 4" :key="index">
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
        <div style="width: 60%">
          <q-list bordered  class="rounded-borders" >
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title>优秀作品</q-toolbar-title>
            </q-toolbar>
            <q-item>
              <div class="row justify-center q-gutter-sm">
                <q-intersection
                  v-for="index in 12"
                  :key="index"
                  class="example-item"
                >
                  <q-card class="story-card">
                    <q-card-section>
                      <img src="/600.webp" class="small-head-image content-center">
                      <span class="one-line-clamp">Our Changing Planet</span>
                      <span class="text-subtitle2">by John Doe</span>
                      <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                    </q-card-section>
                  </q-card>
                </q-intersection>
              </div>
            </q-item>
          </q-list>
        </div>
        <div>
          <q-list bordered  class="rounded-borders" style="max-width: 300px">

            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title>原创推荐</q-toolbar-title>
            </q-toolbar>
            <q-item v-for="index in 4" :key="index">
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
    <q-toolbar >
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title>
        精品
      </q-toolbar-title>
      <q-btn flat round dense icon="more_horiz" />
    </q-toolbar>
    <div class="q-pa-md">
      <div class="row">
        <div>
          <q-list bordered  class="rounded-borders" style="max-width: 300px">
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title>优秀精品</q-toolbar-title>
            </q-toolbar>

            <q-item v-for="index in 4" :key="index">
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
        <div style="width: 60%">
          <q-list bordered  class="rounded-borders" >
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title>精品榜</q-toolbar-title>
            </q-toolbar>
            <q-item>
              <div class="row justify-center q-gutter-sm">
                <q-intersection
                  v-for="index in 12"
                  :key="index"
                  class="example-item"
                >
                  <q-card class="story-card">
                    <q-card-section>
                      <img src="/600.webp" class="small-head-image content-center">
                      <span class="one-line-clamp">Our Changing Planet</span>
                      <span class="text-subtitle2">by John Doe</span>
                      <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                    </q-card-section>

                  </q-card>
                </q-intersection>
              </div>
            </q-item>
          </q-list>
        </div>
        <div>
          <q-list bordered  class="rounded-borders" style="max-width: 300px">
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title>随机作品</q-toolbar-title>
            </q-toolbar>
            <q-item v-for="index in 4" :key="index">
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
    <q-toolbar >
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title>
        分类排行榜
      </q-toolbar-title>
      <q-btn flat round dense icon="more_horiz" />
    </q-toolbar>
    <div class="row">
      <div>
        <div class="q-pa-md q-gutter-md">
          <q-list bordered padding class="rounded-borders" style="max-width: 300px">
            <q-item-label header>随机推荐</q-item-label>
            <q-separator spaced />

            <q-item v-for="index in 7" :key="index">
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
      <div style="width: 80%">
        <div class="row">
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">魔法</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">古文明</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">点击</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">点击</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">点击</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">点击</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">点击</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">点击</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>

    </div>
    <q-toolbar >
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title>
        热门排行榜
      </q-toolbar-title>
      <q-btn flat round dense icon="more_horiz" />
    </q-toolbar>
    <div class="row">
      <div>
        <div class="q-pa-md q-gutter-md">
          <q-list bordered  class="rounded-borders" style="max-width: 300px">
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title>随机推荐</q-toolbar-title>
            </q-toolbar>
            <!--            <q-separator spaced />-->

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
      <div style="width: 80%">
        <div class="row">
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">点击</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">点击</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">点击</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">点击</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">点击</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">点击</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">点击</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header color="black">点击</q-item-label>
              <q-separator spaced />

              <q-item
                v-for="index in 6" :key="index"
                clickable v-ripple >
                <q-item-section>
                  <q-item-label lines="1">
                    <q-badge rounded  v-if="index==1" color="red" :label="index" />
                    <q-badge rounded v-if="index==2" color="blue" :label="index" />
                    <q-badge rounded v-if="index==3" color="green" :label="index" />
                    <q-badge rounded v-if="index>3" color="grey" :label="index" />
                    [魔法] 这是非常
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>

    </div>
  </q-page>

</template>

<script setup lang="ts">
import {reactive, ref, toRefs} from 'vue'
// import { listAlbum } from "../api/album";
import { api,tansParams } from 'boot/axios'
import {useMeta} from "quasar";

const metaData = {
  // sets document title
  title: '图集网',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title: any) => `${title} - 首页 Photo Gallery, Beauty, Photo, Photography, Showman.com`,

  // meta tags
  meta: {
    description: { name: 'description', content: '图集网 美女 写真 摄影 秀人网 Photo Gallery, Beauty, Photo, Photography, Showman.com' },
    keywords: { name: 'keywords', content: '图集网 美女 写真 摄影 秀人网 Photo Gallery, Beauty, Photo, Photography, Showman.com' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle:  {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template (ogTitle: any) {
        return `${ogTitle} - 首页 图集网 美女 写真 摄影 秀人网  Photo Gallery, Beauty, Photo, Photography, Showman.com`
      }
    }
  },
}


// needs to be called in setup()
useMeta(metaData)

const seach=ref("")

const current = ref(1)
const slide = ref(1)
const title = ref('')

const albumList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    title:'',
  },
  rules: {
  }
});
const image=ref("")
const { queryParams, form, rules } = toRefs(data);
function getList(page: number) {
  // 滚动到顶部
  current.value=page
  queryParams.value.title=title.value;
  queryParams.value.pageNum=page;
  api.get("album/list"+'?' + tansParams(queryParams.value)).then(response => {
    albumList.value = response.data.data;
    total.value = response.data.total;
    title.value=''
    // image.value="https://usa.img111.top/uploads/1178/T/UGirls-APP/2642/2642_010_q9q_2766_4614.webp"
  }) .catch(() => {
    // console.log("dddddddddd")
  });
}
getList(1)


</script>
<style lang="sass" scoped>
.custom-caption

  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)

.q-carousel__slide
  background-size: contain
.example-item
  width: 150px
.q-card img
  object-fit: cover
.q-pagination
  text-align: center
.caption
  display: flex
  justify-content: center
  align-items: center


</style>
