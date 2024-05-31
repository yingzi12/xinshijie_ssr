<script setup lang="ts">

</script>

<template>
  <q-page>
  <q-card>
    <q-card-section>
      <h2 class="">海量图片</h2>
      <p class="">美女写真汇集，各种类型的美女写真图片</p>
      <p class="">用户自建心世界，用户自行定价，用户自定会员</p>
      <p class="">电脑站、手机站、app，多种终端无广告</p>
    </q-card-section>

    <q-card-section>
      <div class="yw-hd-app-dld">
        <a href="https://image.51x.uk/xinshijie/gallery_album_1_1.apk" class="yw-hd-app-btn" target="_blank"><i class="icon-android"></i>安卓版下载 最新版本号：2.0.1 更新时间:2024-01-24 </a>
        <div class="qr-box" onmouseover="this.className='qr-box cur'" onmouseout="this.className='qr-box'">
          <a class="qq-qr-icon jsLoadQr"><i class="icon-qr"></i></a>
        </div>
      </div>
      <div class="yw-app-mb-pic"><img style="width: 400px" src="/gallery_album.svg" class="yw-app-mb"></div>
    </q-card-section>
  </q-card>
  </q-page>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.left, .right {
  margin: 10px;
}

.left img, .right img {
  max-width: 100%;
  height: auto;
}
</style>
