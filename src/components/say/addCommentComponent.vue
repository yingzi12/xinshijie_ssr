<script setup lang="ts">
import { Cookies, Dialog, useQuasar } from 'quasar';
import { defineProps, reactive, toRefs } from 'vue';
import { api } from 'boot/axios';
import { getImageUrl } from 'boot/tools';
const $q = useQuasar();
const data = reactive({
  addForm: {
    did: "",
    comment: ""
  }
});
const { addForm } = toRefs(data);
const circleUrl = Cookies.get("avatar");
const props = defineProps({
  did: {
    type: String,
    default: '世界类型'
  }
});
async function onSubmit() {
  if (!addForm.value.comment) {
    Dialog.create({
      title: '提示',
      message: '评论不能为空',
      ok: { label: '确定' },
      cancel: { label: '取消' },
    });
    return;
  }
  if (addForm.value.comment.length < 20) {
    Dialog.create({
      title: '提示',
      message: '评论不能少于20字',
      ok: { label: '确定' },
      cancel: { label: '取消' },
    });
    return;
  }
  addForm.value.did = props.did;
  const response = await api.post('/admin/discussComment/add', JSON.stringify(addForm.value), {
    headers: { 'Content-Type': 'application/json' },
  });
  const data = response.data;
  if (data.code === 200) {
    Dialog.create({
      title: '提示',
      message: '评论成功',
      ok: { label: '确定' }
    });
  }
}

</script>

<template>
  <div class="q-ma-md bg-grey-2">
    <div class="text-h6">评论</div>
    <q-item>
      <q-item-section avatar>
        <q-avatar  size="38px">
          <q-img
            :src="getImageUrl(circleUrl)"
            @error.once="() => { $event.target.src = '/empty.jpg'; }"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <div>
<!--          <q-input-->
<!--            v-model="addForm.comment"-->
<!--            filled-->
<!--            type="textarea"-->
<!--          />-->
          <q-editor v-model="addForm.comment" min-height="5rem" />

        </div>
        <div class="float-right q-ma-xs">
          <q-btn color="red" icon="send" label="发送评论" @click="onSubmit" />
        </div>
      </q-item-section>
    </q-item>
  </div>

</template>

<style scoped>

</style>
