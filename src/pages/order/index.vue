<script setup lang="ts">
import { ref } from 'vue'

</script>

<template>
  <q-page>
  <q-toolbar >
    <q-btn flat round dense icon="menu" />
    <q-toolbar-title>
      世界排行榜
    </q-toolbar-title>
    <q-btn flat round dense icon="more_horiz" />
  </q-toolbar>
  <div>
    <div class="row">
      <div class="q-pa-md q-gutter-md">
        <q-list bordered padding class="rounded-borders" style="width: 300px">
          <q-item-label header color="black">科幻</q-item-label>
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
          <q-item-label header color="black">二创</q-item-label>
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
          <q-item-label header color="black">幻想</q-item-label>
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
          <q-item-label header color="black">校园</q-item-label>
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

  <q-toolbar >
    <q-btn flat round dense icon="menu" />
    <q-toolbar-title>
      故事排行榜
    </q-toolbar-title>
    <q-btn flat round dense icon="more_horiz" />
  </q-toolbar>
  <div >
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
  </q-page>
</template>

<style scoped>

</style>
