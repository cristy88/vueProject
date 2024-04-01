<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
const username = ref('')
username.value = JSON.parse(localStorage.getItem('token')).username
const router = useRouter()

const tit = ref('资金组成')
const TwoTit = [
  {
    title: '资金组成',
    path: '/fund',
    name: 0
  },
  {
    title: '资金流动',
    path: '/moneyFlow',
    name: 1
  },
  {
    title: '资金来源',
    path: '/fundSource',
    name: 2
  }
]
const curIx = Number(localStorage.getItem('curI')) || 0
// const Onex = Number(localStorage.getItem('One')) || 0
// const Twox = Number(localStorage.setItem('Two')) || 0
const allTabsx = JSON.parse(localStorage.getItem('allTabs')) || [{ title: '资金组成', path: '/fund',name: 0}]

const One = ref(0)
const Two = ref(0)
// const curI = ref(0)
// const allTabs =ref([{
//   title: '资金组成', path: '/fund',name: 0
// }])
const curI = ref(curIx)
// const allTabs = ref(JSON.parse(localStorage.getItem('allTabs'))) || ref([{ title: '资金组成', path: '/fund',name: 0}])
const allTabs = ref(allTabsx)
// router.push(allTabs.value[curI.value].path)
Two.value = allTabs.value[curI.value].name

watch(curI, ()=>{
  if (allTabs.value[curI.value].name <= 2) {
    One.value = 0
  } else {
    One.value = 1
  }
  router.push(allTabs.value[curI.value].path)
  Two.value = allTabs.value[curI.value].name
  localStorage.setItem('curI', curI.value)
})
// router.push(allTabs.value[curI.value].path)
const exit = () => {
  // localStorage.removeItem('token')
  localStorage.clear()
  router.push('/login')
}

const changeMoney = () => {
  One.value = 0
  tit.value = '资金组成'
}
const changeOne = () => {
  One.value = 1
  tit.value = '系统管理'
  // router.push('/system')
  const I = allTabs.value.findIndex(v => v.title === '系统管理')
  if (I === -1) {
    allTabs.value.push({
      title: '系统管理',
      path: '/system',
      name: 3
    })
    ++curI.value
    return
  }
  curI.value = I
  // Two.value = 4
}
const toPage = (index) => {
  tit.value=TwoTit[index].title
  Two.value = index
  const I = allTabs.value.findIndex(v => v.title === TwoTit[index].title)
  if (I > -1) {  //存在
    curI.value = I
  } else {   //如果不存在，添加
    allTabs.value.push({
      ...TwoTit[index]
    })
    ++curI.value
  }
  router.push(TwoTit[index].path)
}

const changeCurI = (index) => {
  curI.value = index
  // Two.value = allTabs.value[index].name
  // router.push(allTabs.value[curI.value].path)
}

const removeTab = (index) => {
  if (allTabs.value.length === 1) {
    exit()
  } else {
    allTabs.value.splice(index, 1)
    if (curI.value === index) {
      if (index - 1 >= 0){
        --curI.value
        // router.push(allTabs.value[index - 1].path)
      } else {
        curI.value = 0
        router.push(allTabs.value[0].path)
        Two.value = allTabs.value[curI.value].name
      }
      // Two.value = allTabs.value[curI.value].name
    }
    if(index < curI.value) { --curI.value }
  }
}

watch(allTabs, () => {
  localStorage.setItem('allTabs', JSON.stringify(allTabs.value))
  // router.push(allTabs.value[curI.value].path)
},
{
  deep: true
})

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div class="mainAside">
          <p :class="{'active': One === 0}" @click="changeMoney">资金管理</p>
          <p :class="{'active': One === 1}" @click="changeOne">系统管理</p>
        </div>
        <div class="smallAside">
          <h1>{{ tit }}</h1>
          <template v-if="One === 0">
            <p
              v-for="(item, index) in TwoTit"
              :key="item.title" :class="{'pactive': Two === index}"
              @click="toPage(index)"
            >{{ item.title }}</p>
          </template>
          <p class="pactive" v-if="One===1">系统管理</p>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <div class="user"><span>{{ username }}</span> | <span @click="exit">退出</span></div>
        </el-header>
        <el-main>
          <div class="Tabs">
            <p v-for="(item, index) in allTabs" :key="item.title">
              <span  :class="{'sactive': curI === index}" @click="changeCurI(index)">{{ item.title }} <strong @click.stop="removeTab(index)">x</strong></span>
            </p>
          </div>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang='scss' scoped>
.user {
  float: right;
}
.common-layout, .el-container {
  width: 100%;
  height: 100%;
  text-align: center;
}
.el-aside {
  display: flex;
  height: 100%
}
.mainAside {
  width: 100px;
  height: 100%;
  background: #001236;
  padding-top: 80px;
  color: white;
  p {
    height: 100px;
    padding-top: 20px;
    &.active {
      background: #061E4A;
    }
  }
}

.smallAside {
  width: 100px;
  height: 100%;
  background: #061E4A;
  color: #eee;
  h1 {
    line-height: 80px;
    height: 80px;
    border-bottom: 1px solid #eee; 
  }
  p {
    height: 50px;
    border-right: 3px solid #061E4A;
    line-height: 50px;
    &.pactive {
      font-weight: 900;
      color: white;
      border-right-color: skyblue;
    }
  }
}
.el-header {
  padding-top: 10px;
  padding-right: 30px;
  border-bottom: 1px solid;
}

.Tabs {
  height: 42px;
  display: flex;
  color: black;
  p {
    width: 100px;
    display: flex;
    justify-content: center;
    span {
      width: 94px;
      height: 38px;
      text-align:center;
      &.sactive {
        border: 1px solid #eee;
        background: #F0F2F6;
      }
    }
  }
}
</style>
