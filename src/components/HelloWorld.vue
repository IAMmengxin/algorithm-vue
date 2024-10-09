<script setup lang="ts">
import {reactive, Ref, ref} from 'vue'
// import {question, knapsackWithItems, knapsack, maxValueWithinHeight} from "../algorithm/DP/DP.ts";
// import CoinChangeSpecial from "../algorithm/CoinChangeSpecial";
// import ActivitySelection from "../algorithm/ActivitySelection";
// import FractionalKnapsack from "../algorithm/FractionalKnapsack";
// import Heap from "../algorithm/Heap";
// import HuffmanTree from "../algorithm/HuffmanTree";
// import Kruskal from "../algorithm/MinimumSpanningTree/Kruskal.ts";
// import {Prim} from "../algorithm/MinimumSpanningTree/Prim.ts";
// import LCS from "../algorithm/DP/LCS.ts";
// import GCD from "../algorithm/DP/GCD.ts";
import IF, {classes} from "../algorithm/P_NP/IF.ts";
import LCS from "../algorithm/DP/LCS.ts";

const count = ref(0)
defineProps<{ msg: string }>()
/*question(66)
const result = knapsackWithItems(66);
console.log(`最大价值: ${result.maxValue}`,`被选中的物品:`, result.selectedItems);
console.log(maxValueWithinHeight())*/
/*CoinChangeSpecial.coinChange(233)
ActivitySelection.activitySelection()
FractionalKnapsack.fractionalKnapsack(210)
let codes = HuffmanTree.generateHuffmanCodes("this is an example for huffman encoding");
console.log(codes)
let map = new Map<string, string>();
HuffmanTree.generateCodes(
    HuffmanTree.buildTree("this is an example for huffman encoding")
    , "", map)
console.log(map)*/
/*//最小生成树，Kruskal算法
Kruskal.test()*/
//最小生成树，Prim算法
/*const prim = new Prim()
prim.test()*/
// console.log("最长公共子序列：",LCS.recursion())
// console.log("记忆法递归最长公共子序列：",LCS.memoryCall())
console.log("记忆法最长公共子序列：",LCS.memory())
console.log("动态规划最长公共子序列：",LCS.dynamicProg())
/*GCD.test()*/
/*IF.test()

classes.subscribe("报警", (data) => {
  console.log(data)
})*/
let g = {
  _value: 11,
  get value() {
    return this._value;
  },
  set value(v) {
    this._value = v;
  }
  // set value(v: number) {
  //   this._value = v;
  //   (<HTMLElement>gD.value).textContent = v.toString()
  // }
}
const refG = ref(g)
// const _g = new Proxy(g, {
//   get(target, key, receiver) {
//     return Reflect.get(target, key, receiver)
//   },
//   set(target, key, value, receiver) {
//     if (gD.value !== null && key === 'value') {
//       gD.value.textContent = target[key] = value
//     }
//     return Reflect.set(target, key, value, receiver)
//   }
// })
/*const gD: Ref<HTMLElement | null> = ref(null)
const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

enum Grade {
  一级,
  二级,
  三级,
  四级
}

enum Status {
  未处理,
  已处理,
  已忽略
}

const enums = [Grade.一级, Grade.二级, Grade.三级, Grade.四级]
const status = [Status.已处理, Status.未处理, Status.已忽略]
const datas: { grade: Grade, dealStatus: Status }[] = [];
for (let i = 0; i < 1000; i++) {
  datas.push({
    grade: enums[generateRandom(0, enums.length)],
    dealStatus: status[generateRandom(0, status.length)]
  })
}

function generateRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - 0.01) + min);
}

// console.log(sorts(datas))

// @ts-ignore
function sorts(datas: { grade: Grade, dealStatus: Status }[]) {
  // @ts-ignore
  const statusSort: {
    [key in Status]: { grade: Grade, dealStatus: Status }[]
  } = {}
  for (let i = 0; i < datas.length; i++) {
    const data = datas[i]
    if (!statusSort[data.dealStatus])
      statusSort[data.dealStatus] = []
    statusSort[data.dealStatus].push(data)
  }
  for (let status in statusSort) {
    // @ts-ignore
    statusSort[status].sort((a, b) => Number(a.grade) - Number(b.grade))
  }
  const result = [...statusSort[Status.未处理], ...statusSort[Status.已处理], ...statusSort[Status.已忽略]]
  return result
}*/
</script>

<template>
  <button @click="()=>refG.value=refG.value+=1">g{{ refG.value }}增加</button>
  <!--  <div ref="gD" v-for="i of items">{{ g.value }}</div>-->
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
    >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
