<script setup lang="ts">
import {ref} from 'vue'
import {question, knapsackWithItems, knapsack, maxValueWithinHeight} from "../althorithm/DP/DP.ts";
import CoinChangeSpecial from "../althorithm/CoinChangeSpecial";
import ActivitySelection from "../althorithm/ActivitySelection";
import FractionalKnapsack from "../althorithm/FractionalKnapsack";
import Heap from "../althorithm/Heap";
import HuffmanTree from "../althorithm/HuffmanTree";
import Kruskal from "../althorithm/MinimumSpanningTree/Kruskal.ts";
import {Prim} from "../althorithm/MinimumSpanningTree/Prim.ts";
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
const prim = new Prim()
prim.test()
</script>

<template>
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
