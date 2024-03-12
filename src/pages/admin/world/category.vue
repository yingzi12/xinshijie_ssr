<script setup lang="ts">
import { reactive, ref } from 'vue';
import Head from 'pages/admin/world/head.vue';
import { findAndModify, removeNodeById } from 'boot/TreeUtils';

const selected = ref(null);
function selectGoodService () {
  if (selected.value !== 'Good service') {
    selected.value = 'Good service'
  }
}

function unselectNode () {
  selected.value = null
}

const state = reactive({
   props : [
    {
      id: 1,
      label: 'Satisfied customers',
      avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      isOp: false,
      children: [
        {
          id: 2,
          label: 'Good food',
          icon: 'restaurant_menu',
          isOp: false,
          children: [
            {
              id: 10,
              label: 'Quality ingredients',
              isOp: false,
              children: []
            },

            {
              id: 11,
              isOp: false,
              label: 'Good recipe',
              children: []
            }
          ]
        },
        {
          id: 3,
          label: 'Good service',
          icon: 'room_service',
          isOp: false,
          children: [
            {
              id: 8,
              isOp: false,
              label: 'Prompt attention',
              children: []
            },
            {
              id: 9,
              isOp: false,
              label: 'Professional waiter',
              children: []
            }
          ]
        },
        {
          id: 4,
          label: 'Pleasant surroundings',
          icon: 'photo',
          isOp: false,
          children: [
            {
              id: 5,
              isOp: false,
              label: 'Happy atmosphere',
              children: []
            },
            {
              id: 6,
              isOp: false,
              label: 'Good table presentation',
              children: []
            },
            {
              id: 7,
              isOp: false,

              label: 'Pleasing decor',
              children: []

            }
          ]
        }
      ]
    },
    {
      id: 21,
      label: 'Satisfied customers1',
      avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      isOp: false,
      children: []
    }
  ]
});

function onAddClick (id:number) {
  // console.log('Clicked on a fab action')
  console.log(`onDeleteClick ${id}`)
  let timestamp = Date.now();

  const newChild = {
    id: timestamp,
    label: `Newly added child`,
    icon: 'new_icon',
    children: []
  };
  // insertObjectAfterId(props,id,newObjectToAdd);
  const modifiedProps = findAndModify(state.props, id, newChild);
  // state.props=modifiedProps;
}
function onDeleteClick (id:number) {
  console.log(`onDeleteClick ${id}`)
  const updatedArrayAfterRemove = removeNodeById(state.props, id);
  // state.props=updatedArrayAfterRemove;
}

function  addNewClick(){
  let timestamp = Date.now();

  const newPropObject = {
    id: timestamp,
    label: `Satisfied customers`,
    avatar: 'https://example.com/new-avatar.png',
    isOp: false,
    children: [] // 根据需要初始化 children 数组
  };

// 将新对象添加到 state.props 数组的末尾
  state.props.push(newPropObject);

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
    <div class="q-pa-md q-gutter-sm">
      <div>
        <div class="q-gutter-sm">
          <q-btn size="sm" color="primary"  label="添加一级分类" @click="addNewClick"/>
          <q-btn size="sm" color="primary" @click="selectGoodService" label="Select 'Good service'" />
          <q-btn v-if="selected" size="sm" color="red" @click="unselectNode" label="Unselect node" />
        </div>
      </div>
      <q-tree
        :nodes="state.props"
        default-expand-all
        v-model:selected="selected"
        node-key="id"
      >
        <template v-slot:default-header="prop">
          <div class="row items-center">
            <!--          <q-icon :name="prop.node.icon || 'share'" color="orange" size="28px" class="q-mr-sm" />-->
            <div class="text-weight-bold text-primary">{{prop.node.label}}
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
              <q-fab-action padding="5px" color="primary" @click="onAddClick(prop.node.id)" icon="add" label="添加子类" />
              <q-fab-action padding="5px"   color="orange" @click="onDeleteClick(prop.node.id)" icon="delete" label="删除" />
            </q-fab>
          </div>
        </template>

      </q-tree>
    </div>
  </q-page>
</template>

<style scoped>

</style>
