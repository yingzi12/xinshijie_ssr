<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { api, tansParams } from 'boot/axios';
import { useQuasar } from 'quasar';
const $q = useQuasar();

const title=ref("");
const editor = ref('What you see is <b>what</b> you get.');
const charge=ref(1);

const chargeList = [
  {
    label: '分卷1',
    value: 1
  },
  {
    label: '分卷2',
    value: 2
  },
]
function updateCharge(charge: number) {
  // price.value = 1.0;
  // vipPrice.value = 1.0;
}


const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]
const visibleColumns= ref([ 'calories', 'desc', 'fat', 'carbs', 'protein', 'sodium', 'calcium', 'iron' ]);
const model =ref(null);
const  options= [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
];
const text = ref('');
const  ph = ref('');
const dense =  ref(false);
const selected = ref([]);
const shape = ref('line');

const widList=ref("");

const wids=ref(["0"]);
const sids=ref([]);
const recType=ref(1);
const way=ref(1);

async function onAddWorld() {
  wids.value=widList.value.split(",");
  const response = await api.post("/wiki/recommendStory/add", JSON.stringify({
    recType: recType.value,
    wids: wids.value,
    way: way.value,
  }));
  const data = response.data;
  //console.log(data)
  if (data.code == 200) {
    $q.dialog({
      title: '通知',
      message: '添加成功.',
      ok: {
        push: true
      },
    }).onOk(async () => {
      // router.push('/users/album'); // Redirect to login page
    }).onCancel(async () => {
      // router.push('/users/album'); // Redirect to login page
    });
  } else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: '创建成功'
    });
  }
}
const albumList = ref([]);
const data = reactive({
  queryParams: {
    pageNum: 1,
    recType:0,
  }
});
const image=ref("")
const { queryParams } = toRefs(data)
async function getList(recType: number) {
  queryParams.value.recType = recType;
  try {
    const response = await api.get('/wiki/recommendWorld/list?' + tansParams(queryParams.value));
    if (response.data.code == 200) {
      // total.value = response.data.total;
      // maxPage.value=  total.value/10+1;
      albumList.value = response.data.data;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
getList(1)
</script>

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
      <q-breadcrumbs-el label="章节名称" icon="navigation"  to="/story/chapter"/>
    </q-breadcrumbs>

    <div class="bg-orange text-white">
      <q-toolbar>
        <!--      <q-btn flat round dense icon="menu" class="q-mr-sm" />-->
        <q-toolbar-title>创建推荐</q-toolbar-title>
        <!--      <q-space />-->
        <!--      <q-btn flat round dense icon="search" class="q-mr-xs" />-->
        <!--      <q-btn flat round dense icon="group_add" />-->
      </q-toolbar>
    </div>
    <div style="height: 100%">
      <q-card style="height: 100%">
        <q-card-section>
          <div>
            <q-select v-model="charge" :options="chargeList" emit-value hint="分类" label="分类"
                      map-options
                      outlined
                      @update:modelValue="updateCharge"/>
          </div>
        </q-card-section>
        <q-card-section>
          <!--        <div class="text-h6">创建章节</div>-->
          <q-input
            v-model="widList"
            :rules="[ val => val && val.length >= 2 && val.length <= 100 || '请输入世界id，长度2-100']"
            filled
            hint="世界ID"
            label="世界id *"
            lazy-rules
          />
<!--          <div class="q-gutter-sm">-->
<!--            <q-radio v-model="shape" val="line" label="Line" />-->
<!--            <q-radio v-model="shape" val="rectangle" label="Rectangle" />-->
<!--            <q-radio v-model="shape" val="ellipse" label="Ellipse" />-->
<!--            <q-radio v-model="shape" val="polygon" label="Polygon" />-->
<!--          </div>-->
        </q-card-section>

        <q-separator />
        <q-card-actions >
          <div>
            <q-btn color="primary" label="提交" type="submit" @click="onAddWorld"/>
            <q-btn class="q-ml-sm" color="primary" flat label="返回" type="reset"/>
          </div>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :visible-columns="visibleColumns"
        selection="multiple"
        v-model:selected="selected"
      >
        <template v-slot:top="props">
          <div class="col-2 q-table__title">Treats</div>

          <q-space />

          <div v-if="$q.screen.gt.xs" class="col">
            <q-toggle v-model="visibleColumns" val="calories" label="Calories" />
            <q-toggle v-model="visibleColumns" val="fat" label="Fat" />
            <q-toggle v-model="visibleColumns" val="carbs" label="Carbs" />
            <q-toggle v-model="visibleColumns" val="protein" label="Protein" />
            <q-toggle v-model="visibleColumns" val="sodium" label="Sodium" />
            <q-toggle v-model="visibleColumns" val="calcium" label="Calcium" />
            <q-toggle v-model="visibleColumns" val="iron" label="Iron" />
            <q-select v-model="model" :options="options" label="Standard" />
            <q-input bottom-slots v-model="text" label="Label" counter :dense="dense">
              <template v-slot:prepend>
                <q-icon name="place" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="text = ''" class="cursor-pointer" />
              </template>

              <template v-slot:hint>
                Field hint
              </template>
            </q-input>
            <div class="q-gutter-sm">
              <q-radio v-model="shape" val="line" label="Line" />
              <q-radio v-model="shape" val="rectangle" label="Rectangle" />
              <q-radio v-model="shape" val="ellipse" label="Ellipse" />
              <q-radio v-model="shape" val="polygon" label="Polygon" />
            </div>
          </div>
          <q-select
            v-else
            v-model="visibleColumns"
            multiple
            borderless
            dense
            options-dense
            :display-value="$q.lang.table.columns"
            emit-value
            map-options
            :options="columns"
            option-value="name"
            style="min-width: 150px"
          />

          <q-btn
            flat round dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          />
          <div class="q-mt-md">
            Selected: {{ JSON.stringify(selected) }}
          </div>
        </template>

      </q-table>
    </div>
  </q-page>
</template>

<style scoped>

</style>
