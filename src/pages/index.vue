<template>
  <q-page >
    <q-tabs v-model="搜索" shrink stretch>
      <q-input name="title" label="搜索" v-model="title" style="width: 600px"  @keyup.enter="getList(1)"/>          <q-icon name="search" @click="getList(1)"/>
    </q-tabs>
    <div class="row">
      <div>
        <div class="q-pa-md q-gutter-md">
        <q-list bordered padding class="rounded-borders" style="max-width: 300px">
          <q-item-label header>编辑推荐</q-item-label>

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
      <div style="width: 60%">
        <q-carousel
        arrows
        animated
        thumbnails
        v-model="slide"
        height="400px"
      >
        <q-carousel-slide name="first" img-src="https://file2.aazz263.info/images/2021/07/29272649.jpg">
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">First stop</div>
            <!--            <div class="text-subtitle1">Mountains</div>-->
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="second" img-src="https://hotgirl.asia/wp-content/uploads/2023/01/1674255622607_AyanaNishinaga_Minisuka_tv_2023_01_12RegularGallery5_2.jpg">
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">
              <a href="https://aiavr.uk/detail?aid=4">Second stop</a>
            </div>
            <!--            <div class="text-subtitle1">Famous City</div>-->
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="third" img-src="https://usa.img111.top/uploads/1178/T/UGirls-APP/2642/2642_010_q9q_2766_4614.webp">
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Third stop</div>
            <!--            <div class="text-subtitle1">Famous Bridge</div>-->
          </div>
        </q-carousel-slide>
      </q-carousel>
      </div>
      <div>
        <div class="q-pa-md q-gutter-md">
        <q-list bordered padding class="rounded-borders" style="max-width: 300px">
          <q-item-label header>公告</q-item-label>

          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <span class="text-orange">【公告】</span>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">关于世纪呃呃呃是的方式地方史蒂夫</q-item-label>
              <q-item-label caption>February 22nd, 2019</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <span class="text-orange">【公告】</span>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">关于世纪呃呃呃是的方式地方史蒂夫</q-item-label>
              <q-item-label caption>February 22nd, 2019</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <span class="text-orange">【公告】</span>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">关于世纪呃呃呃是的方式地方史蒂夫</q-item-label>
              <q-item-label caption>February 22nd, 2019</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <span class="text-orange">【公告】</span>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">关于世纪呃呃呃是的方式地方史蒂夫</q-item-label>
              <q-item-label caption>February 22nd, 2019</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <span class="text-orange">【公告】</span>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">关于世纪呃呃呃是的方式地方史蒂夫</q-item-label>
              <q-item-label caption>February 22nd, 2019</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <span class="text-orange">【公告】</span>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">关于世纪呃呃呃是的方式地方史蒂夫</q-item-label>
              <q-item-label caption>February 22nd, 2019</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div></div>
    </div>
    <q-toolbar >
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title>
        世界推荐
      </q-toolbar-title>
      <q-btn flat round dense icon="more_horiz" />
    </q-toolbar>
    <div class="q-pa-md">
      <div class="row">
        <div>
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
        </q-list>
        </div>
        <div style="width: 60%">
          <q-list bordered padding class="rounded-borders" >
            <q-item-label header>随机推荐</q-item-label>
            <q-separator spaced />
            <q-item>
              <div class="row justify-center q-gutter-sm">
                <q-intersection
                  v-for="index in 16"
                  :key="index"
                  class="example-item"
                >
                  <q-card class="story-card">
                    <q-card-section>
                      <img src="/600.webp" class="small-head-image content-center">
                      <span class="text-h6 one-line-clamp">Our Changing Planet</span>
                      <span class="text-subtitle2">by John Doe</span>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                      <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                    </q-card-section>
                  </q-card>
                </q-intersection>
              </div>
            </q-item>

          </q-list>


        </div>
        <div>
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
          </q-list>
        </div>

      </div>
    </div>
    <q-toolbar >
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title>
        故事推荐
      </q-toolbar-title>
      <q-btn flat round dense icon="more_horiz" />
    </q-toolbar>
    <div class="q-pa-md">
      <div class="row">
        <div>
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
          </q-list>
        </div>
        <div style="width: 60%">
          <q-list bordered padding class="rounded-borders" >
            <q-item-label header>随机推荐</q-item-label>
            <q-separator spaced />

            <q-item>
              <q-card class="story-card">
                <q-card-section>
                  <img src="/600.webp" class="small-head-image content-center">
                  <span class="text-h6 one-line-clamp">Our Changing Planet</span>
                  <span class="text-subtitle2">by John Doe</span>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-card-section>
              </q-card>
              <q-card class="story-card">
                <q-card-section>
                  <img  src="https://cdn.quasar.dev/img/mountains.jpg" class="small-head-image ">
                  <div class="text-h6 one-line-clamp">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-card-section>
              </q-card>
              <q-card class="story-card">
                <q-card-section>
                  <img src="https://cdn.quasar.dev/img/mountains.jpg" class="small-head-image">
                  <div class="text-h6 one-line-clamp">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>

                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-card-section>
              </q-card>
              <q-card class="story-card">
                <q-card-section>
                  <img src="https://cdn.quasar.dev/img/mountains.jpg" class="small-head-image">
                  <div class="text-h6 one-line-clamp">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>

                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-card-section>
              </q-card>
              <q-card class="story-card">
                <q-card-section>
                  <img src="https://cdn.quasar.dev/img/mountains.jpg" class="small-head-image">
                  <div class="text-h6 one-line-clamp">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>

                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-card-section>
              </q-card>
            </q-item>
            <q-separator spaced />

            <q-item>
              <q-card class="story-card">
                <q-card-section>
                  <img src="https://cdn.quasar.dev/img/mountains.jpg" class="small-head-image content-center">
                  <div class="text-h6 one-line-clamp">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>

                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-card-section>
              </q-card>
              <q-card class="story-card">
                <q-card-section>
                  <img  src="https://cdn.quasar.dev/img/mountains.jpg" class="small-head-image ">
                  <div class="text-h6 one-line-clamp">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>

                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-card-section>
              </q-card>
              <q-card class="story-card">
                <q-card-section>
                  <img src="https://cdn.quasar.dev/img/mountains.jpg" class="small-head-image">
                  <div class="text-h6 one-line-clamp">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>

                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-card-section>
              </q-card>
              <q-card class="story-card">
                <q-card-section>
                  <img src="https://cdn.quasar.dev/img/mountains.jpg" class="small-head-image">
                  <div class="text-h6 one-line-clamp">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>

                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-card-section>
              </q-card>
              <q-card class="story-card">
                <q-card-section>
                  <img src="https://cdn.quasar.dev/img/mountains.jpg" class="small-head-image">
                  <div class="text-h6 one-line-clamp">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>

                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-item-label class="three-line-clamp" caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elitSecondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-card-section>
              </q-card>
            </q-item>


          </q-list>


        </div>
        <div>
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
          </q-list>
        </div>

      </div>
    </div>
    <q-toolbar >
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title>
        世界排行榜
      </q-toolbar-title>
      <q-btn flat round dense icon="more_horiz" />
    </q-toolbar>
    <div class="row">
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
      </div>
      <div style="width: 80%">
        <div class="row">
        <div class="q-pa-md q-gutter-md">
          <q-list bordered padding class="rounded-borders" style="width: 300px">
            <q-item-label header>魔法</q-item-label>
            <q-separator spaced />

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label lines="1">1 这是非常</q-item-label>
              </q-item-section>
              <q-item-section side>
                11111
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label lines="1">2 这是非常</q-item-label>
              </q-item-section>

              <q-item-section side>
                11111
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label lines="1">1 这是非常</q-item-label>
              </q-item-section>

              <q-item-section side>
                11111
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label lines="1">1 这是非常</q-item-label>
              </q-item-section>

              <q-item-section side>
                11111
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label lines="1">1 这是非常</q-item-label>
              </q-item-section>

              <q-item-section side>
                11111
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label lines="1">1 这是非常</q-item-label>
              </q-item-section>

              <q-item-section side>
                11111
              </q-item-section>
            </q-item>
          </q-list>
        </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header>魔法</q-item-label>
              <q-separator spaced />

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header>魔法</q-item-label>
              <q-separator spaced />

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header>魔法</q-item-label>
              <q-separator spaced />

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header>魔法</q-item-label>
              <q-separator spaced />

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header>魔法</q-item-label>
              <q-separator spaced />

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header>魔法</q-item-label>
              <q-separator spaced />

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="width: 300px">
              <q-item-label header>魔法</q-item-label>
              <q-separator spaced />

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
                </q-item-section>

                <q-item-section side>
                  11111
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label lines="1">1 这是非常</q-item-label>
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
        故事排行榜
      </q-toolbar-title>
      <q-btn flat round dense icon="more_horiz" />
    </q-toolbar>
    <div class="row">
      <div>
        <div class="q-pa-md q-gutter-md">
          <q-list bordered padding class="rounded-borders" style="max-width: 300px">
            <q-item-label header>随机推荐</q-item-label>
            <q-separator spaced />

            <q-item>
              <q-item-section top thumbnail class="q-ml-none">
                <img src="https://cdn.quasar.dev/img/mountains.jpg">
              </q-item-section>

              <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>meta</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <q-avatar icon="folder" color="primary" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">Photos</q-item-label>
                <q-item-label caption>February 22nd, 2019</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="info" color="green" />
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <q-avatar icon="folder" color="orange" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">Movies</q-item-label>
                <q-item-label caption>March 1st, 2019</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="info" />
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <q-avatar icon="folder" color="teal" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">Photos</q-item-label>
                <q-item-label caption>January 15th, 2019</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="info" />
              </q-item-section>
            </q-item>

            <q-separator spaced />
            <q-item-label header>Files</q-item-label>

            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <q-avatar icon="assignment" color="grey" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">Expenses spreadsheet</q-item-label>
                <q-item-label caption>March 2nd, 2019</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="info" />
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <q-avatar icon="place" color="grey" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">Places to visit</q-item-label>
                <q-item-label caption>February 22, 2019</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="info" color="amber" />
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <q-avatar icon="library_music" color="grey" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">My favorite song</q-item-label>
                <q-item-label caption>Singing it all day</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="info" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div style="width: 80%">
        <div class="row">
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="max-width: 350px">
              <q-item-label header>Folders</q-item-label>
              <q-separator spaced />

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="primary" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Photos</q-item-label>
                  <q-item-label caption>February 22nd, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" color="green" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="orange" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Movies</q-item-label>
                  <q-item-label caption>March 1st, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="teal" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Photos</q-item-label>
                  <q-item-label caption>January 15th, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-separator spaced />
              <q-item-label header>Files</q-item-label>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="assignment" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Expenses spreadsheet</q-item-label>
                  <q-item-label caption>March 2nd, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="place" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Places to visit</q-item-label>
                  <q-item-label caption>February 22, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="library_music" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">My favorite song</q-item-label>
                  <q-item-label caption>Singing it all day</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="max-width: 350px">
              <q-item-label header>Folders</q-item-label>
              <q-separator spaced />

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="primary" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Photos</q-item-label>
                  <q-item-label caption>February 22nd, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" color="green" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="orange" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Movies</q-item-label>
                  <q-item-label caption>March 1st, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="teal" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Photos</q-item-label>
                  <q-item-label caption>January 15th, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-separator spaced />
              <q-item-label header>Files</q-item-label>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="assignment" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Expenses spreadsheet</q-item-label>
                  <q-item-label caption>March 2nd, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="place" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Places to visit</q-item-label>
                  <q-item-label caption>February 22, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="library_music" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">My favorite song</q-item-label>
                  <q-item-label caption>Singing it all day</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="max-width: 350px">
              <q-item-label header>Folders</q-item-label>
              <q-separator spaced />

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="primary" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Photos</q-item-label>
                  <q-item-label caption>February 22nd, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" color="green" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="orange" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Movies</q-item-label>
                  <q-item-label caption>March 1st, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="teal" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Photos</q-item-label>
                  <q-item-label caption>January 15th, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-separator spaced />
              <q-item-label header>Files</q-item-label>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="assignment" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Expenses spreadsheet</q-item-label>
                  <q-item-label caption>March 2nd, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="place" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Places to visit</q-item-label>
                  <q-item-label caption>February 22, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="library_music" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">My favorite song</q-item-label>
                  <q-item-label caption>Singing it all day</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="max-width: 350px">
              <q-item-label header>Folders</q-item-label>
              <q-separator spaced />

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="primary" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Photos</q-item-label>
                  <q-item-label caption>February 22nd, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" color="green" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="orange" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Movies</q-item-label>
                  <q-item-label caption>March 1st, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="teal" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Photos</q-item-label>
                  <q-item-label caption>January 15th, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-separator spaced />
              <q-item-label header>Files</q-item-label>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="assignment" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Expenses spreadsheet</q-item-label>
                  <q-item-label caption>March 2nd, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="place" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Places to visit</q-item-label>
                  <q-item-label caption>February 22, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="library_music" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">My favorite song</q-item-label>
                  <q-item-label caption>Singing it all day</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="max-width: 350px">
              <q-item-label header>Folders</q-item-label>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="primary" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Photos</q-item-label>
                  <q-item-label caption>February 22nd, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" color="green" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="orange" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Movies</q-item-label>
                  <q-item-label caption>March 1st, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="teal" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Photos</q-item-label>
                  <q-item-label caption>January 15th, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-separator spaced />
              <q-item-label header>Files</q-item-label>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="assignment" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Expenses spreadsheet</q-item-label>
                  <q-item-label caption>March 2nd, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="place" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Places to visit</q-item-label>
                  <q-item-label caption>February 22, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="library_music" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">My favorite song</q-item-label>
                  <q-item-label caption>Singing it all day</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="max-width: 350px">
              <q-item-label header>Folders</q-item-label>
              <q-separator spaced />

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="primary" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Photos</q-item-label>
                  <q-item-label caption>February 22nd, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" color="green" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="orange" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Movies</q-item-label>
                  <q-item-label caption>March 1st, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="teal" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Photos</q-item-label>
                  <q-item-label caption>January 15th, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-separator spaced />
              <q-item-label header>Files</q-item-label>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="assignment" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Expenses spreadsheet</q-item-label>
                  <q-item-label caption>March 2nd, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="place" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Places to visit</q-item-label>
                  <q-item-label caption>February 22, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="library_music" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">My favorite song</q-item-label>
                  <q-item-label caption>Singing it all day</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="q-pa-md q-gutter-md">
            <q-list bordered padding class="rounded-borders" style="max-width: 350px">
              <q-item-label header>Folders</q-item-label>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="primary" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Photos</q-item-label>
                  <q-item-label caption>February 22nd, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" color="green" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="orange" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Movies</q-item-label>
                  <q-item-label caption>March 1st, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="folder" color="teal" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Photos</q-item-label>
                  <q-item-label caption>January 15th, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-separator spaced />
              <q-item-label header>Files</q-item-label>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="assignment" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Expenses spreadsheet</q-item-label>
                  <q-item-label caption>March 2nd, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="place" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Places to visit</q-item-label>
                  <q-item-label caption>February 22, 2019</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar top>
                  <q-avatar icon="library_music" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">My favorite song</q-item-label>
                  <q-item-label caption>Singing it all day</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="info" />
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



const current = ref(1)
const slide = ref('first')
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
