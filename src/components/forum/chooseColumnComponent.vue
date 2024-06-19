<template>
  <div>
    <q-tree
      ref="treeRef"
      :nodes="dataStree"
      v-model:ticked="tickedList"
      default-expand-all
      node-key="value"
      tick-strategy="leaf"
      @update:ticked="onTickedChange"
    >
      <template v-slot:default-header="prop" >
        <div class="row items-center">
          <div class="text-weight-bold text-primary" ><q-chip >{{prop.node.label}}</q-chip></div>
        </div>
      </template>

    </q-tree>

  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, PropType, watch } from 'vue';
import { api } from 'boot/axios';

const emit = defineEmits(['cidList']); // 定义自定义事件

// const selected = ref("");
const tickedList = ref<string[]>([]);
const props = defineProps({
  wid: {
    type: String,
    required: true
  },
  cidList: {
    type: Array as PropType<string[]>, // 假设cid是字符串数组，根据实际情况调整类型
    default: () => [] // 设置默认值为空数组
  }
});

tickedList.value=props.cidList;

getCategoryTree();
const dataStree=ref([]);
async function getCategoryTree() {
  const response =await api.get(`/wiki/forumColumn/getTree?wid=${props.wid}`);
  if(response.data.code ==200) {
    dataStree.value = response.data.data
  }
}
getCategoryTree();
function onTickedChange() {
  // 确保只有叶子节点的ID被收集
  emit('cidList', tickedList.value);
}
watch(
  () => props.cidList,
  (newCidList) => {
    tickedList.value = newCidList;

    // 如果需要在此处执行额外的逻辑，比如过滤或排序数据，可以在这里添加
  },
  { immediate: true } // 添加immediate选项以立即触发watcher
);


</script>
