<template>
  <q-header elevated>
    <q-toolbar class="glossy">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>
      <q-toolbar-title>Quasar Framework</q-toolbar-title>
      <q-btn flat round dense icon="whatshot" />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { ref} from 'vue'
const activeIndex = ref('1')
const handleSelect = (key: string,indexPath:String,keyPath: string[]) => {
  activeIndex.value=key
}
const  isLogin=ref(false)
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number,
  userid: Number,
  username: String
})
if(!props.username){
  isLogin.value=false
}else{
  isLogin.value=true
}

// 第一种写法 没有默认值
// defineProps<Props>();
//
// 第二种写法 有默认值
// withDefaults(defineProps<Props>(), {
//   msg: "子组件默认值",
//   list: () => [1, 2, 3],
// });
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
