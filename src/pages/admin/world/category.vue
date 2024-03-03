<script setup lang="ts">
import { ref } from 'vue';
import Head from 'pages/admin/world/head.vue';

const selected = ref(null);
function selectGoodService () {
  if (selected.value !== 'Good service') {
    selected.value = 'Good service'
  }
}

function unselectNode () {
  selected.value = null
}

const props= [
  {
    id: 1,
    label: 'Satisfied customers',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    isOp:false,
    children: [
      {
        id: 2,
        label: 'Good food',
        icon: 'restaurant_menu',
        isOp:false,
        children: [
          {
            id: 10,
            label: 'Quality ingredients',
            isOp:false,
          },

          {
            id: 11,
            isOp:false,
            label: 'Good recipe'
          }
        ]
      },
      {
        id: 3,
        label: 'Good service',
        icon: 'room_service',
        isOp:false,
        children: [
          {
            id: 8,
            isOp:false,
            label: 'Prompt attention' },
          {
            id: 9,
            isOp:false,
            label: 'Professional waiter'
          }
        ]
      },
      {
        id: 4,
        label: 'Pleasant surroundings',
        icon: 'photo',
        isOp:false,
        children: [
          {
            id: 5,
            isOp:false,
            label: 'Happy atmosphere'
          },
          {
            id: 6,
            isOp:false,
            label: 'Good table presentation'
          },
          {
            id: 7,
            isOp:false,

            label: 'Pleasing decor'
          }
        ]
      }
    ]
  },
  {
    id:21,
    label: 'Satisfied customers1',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    isOp:false,
  }
]
const fab1 = ref(false);

function onClick () {
  // console.log('Clicked on a fab action')
}
</script>

<template>
  <q-page>
    <Head></Head>

    <q-toolbar class="bg-purple text-white">
      <q-btn flat round dense icon="assignment_ind" />
      <q-toolbar-title>
        Toolbar
      </q-toolbar-title>
      <q-btn flat round dense icon="apps" class="q-mr-xs" />
      <q-btn flat round dense icon="more_vert" />
    </q-toolbar>
    <q-separator dark inset />
<!--    <div class="q-pa-md q-gutter-sm">-->
<!--      <span class="text-overline">全部</span>-->
<!--      <span class="text-overline">点击</span>-->
<!--      <span class="text-overline">观看</span>-->
<!--      <span class="text-overline">全部</span>-->
<!--      <span class="text-overline">全部</span>-->
<!--      <span class="text-overline">全部</span>-->
<!--    </div>-->
    <div class="q-pa-md q-gutter-sm">
      <div>
        <div class="q-gutter-sm">
          <q-btn size="sm" color="primary"  label="添加一级分类" />
          <q-btn size="sm" color="primary" @click="selectGoodService" label="Select 'Good service'" />
          <q-btn v-if="selected" size="sm" color="red" @click="unselectNode" label="Unselect node" />
        </div>
      </div>
      <q-tree
        :nodes="props"
        default-expand-all
        v-model:selected="selected"
        node-key="label"
      >
        <template v-slot:default-header="prop">
          <div class="row items-center">
            <!--          <q-icon :name="prop.node.icon || 'share'" color="orange" size="28px" class="q-mr-sm" />-->
            <div class="text-weight-bold text-primary">{{ prop.node.label }}
              <q-popup-edit v-model=" prop.node.label" auto-save v-slot="scope">
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </div>
            <q-icon name="eco" color="orange" size="28px" class="q-mr-sm" />
            <q-fab
              v-model="prop.node.isOp"
              color="purple"
              icon="keyboard_arrow_right"
              direction="right"
              padding="xs"
            >
<!--              <q-fab-action padding="5px"   color="orange" @click="onClick" icon="update" label="修改名称" />-->
              <q-fab-action padding="5px" color="primary" @click="onClick" icon="add" label="添加子类" />
              <q-fab-action padding="5px"   color="orange" @click="onClick" icon="delete" label="删除" />
            </q-fab>
          </div>
        </template>

      </q-tree>
    </div>
  </q-page>
</template>

<style scoped>

</style>
