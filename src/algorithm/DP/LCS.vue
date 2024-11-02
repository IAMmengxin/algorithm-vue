<script setup lang="ts">
import LCS from "./LCS.ts";
import {Ref, ref} from "vue";
import {ElMessage} from "element-plus";

LCS.dynamicProg()

const row = ref(LCS.getS1)
const col = ref(LCS.getS2)
const arr = ref(new Array(col.value.length + 1).fill([]).map(() => new Array(row.value.length + 1).fill(-1)))
LCS.memory(arr.value)
const pause: Ref<{ is: boolean }> = ref(LCS.pause)
pause.value.is = true
const pauseStep: Ref<{ is: boolean }> = ref(LCS.pauseStep)
pauseStep.value.is = true
const lcs = ref(LCS.memoryLcs)
const finish = ref(LCS.finish)
const lsc = ref(LCS.memoryLsc)
const nextOver = () => {
  pause.value.is = !pause.value.is;
  if (finish.value.is) {
    ElMessage('已经结束')
  }
}
const nextStep = () => {
  pauseStep.value.is = false;
}

const step = () => {
  let ar = [[0,0],[0,0],[0,0]]
  let cAr:number[][] = []
  for(let [i,a] of ar[0].entries()){
    cAr.push([])
    for(let [j,b] of ar.entries()){
      cAr[i].push(ar[j][i])
    }
  }
  console.log(cAr)
}
</script>

<template>
  <div class="root">
    <el-button @click="nextOver">步过</el-button>
    <el-button @click="nextStep" style="margin-left: 20px;">步进</el-button>
    <div class="lcsTable">
      <div class="top">
        <span v-for="r of row">{{ r }}</span>
      </div>
      <div class="bottom">
        <div class="left">
          <span v-for="c of col">{{ c }}</span>
        </div>
        <div class="right" :style="{width: (row.length+1) * 30 + 'px',height: (col.length+1) * 30 + 'px'}">
          <div class="r-row" v-for="(items,i) of arr[0]">
            <div class="grid" v-for="(item,j) of arr">
              {{ arr[j][i] === -1 ? '' : arr[j][i] }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="result">
      输出结果:{{ lcs.lcs }}
    </div>
    <div class="result">当前位置:{{ lsc[lsc.length - 1] }}</div>
  </div>
</template>

<style scoped lang="less">
.result {
  margin-top: 45px;
}

el-button {
  cursor: pointer;
  background: #0fbec2;
  width: 40px;
  height: 30px;
  font-size: 26px;
  border-radius: 10%;
}

.lcsTable {
  display: flex;
  flex-direction: column;
}


.top {
  display: flex;
  margin-left: 30px;
  align-items: center;
  jusitify-content: center;

  span {
    width: 30px;
    height: 30px;
    text-align: center;
  }
}

.bottom {
  display: flex;
  flex-direction: row;
  //margin-top: 30px;
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    jusitify-content: center;

    span {
      width: 30px;
      height: 30px;
    }
  }

  .right {
    .r-row {
      display: flex;
      flex-direction: row;

      .grid {
        display: flex;
        width: 26px;
        height: 26px;
        margin: 1px;
        border-radius: 2px;
        border: white 1px solid;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.row {
  display: flex;
  flex-direction: row;
}


</style>
