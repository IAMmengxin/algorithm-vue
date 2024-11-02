<script setup lang="ts">
import subscription from './subscription.vue'
import * as monaco from 'monaco-editor';
//从A到Z
import {onBeforeUnmount, onMounted, Ref, ref} from "vue";
import {editor} from "monaco-editor";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;


const names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

interface DataStruct {
  name: string,
  num: number,
  children: Array<DataStruct>,
  totalNum?: number,
  childrenTotalNum?: number
}

const values = ref(generate())
let inputEditor: IStandaloneCodeEditor | null = null;
let input: Ref<HTMLElement | null> = ref(null)
let output: Ref<HTMLElement | null> = ref(null)
let outputEditor: IStandaloneCodeEditor | null = null
let output2: Ref<HTMLElement | null> = ref(null)
let outputEditor2: IStandaloneCodeEditor | null = null

function generate() {
  let queue: Array<DataStruct> = []
  let qLength = queue.length;
  let qIndex = -1;
  let results = [];
  while (qIndex < qLength) {
    if (qIndex === -1) {
      for (let i = 0; i <= generateRandom(26, 8); i++) {
        results.push(queue[queue.push({
          name: names[i],
          num: generateRandom(10),
          children: []
        }) - 1])
      }
    } else {
      const cQueue = queue[qIndex];
      for (let i = 0; i <= generateRandom(3); i++) {
        const dataStruct: DataStruct = {
          name: cQueue.name + i,
          num: generateRandom(10),
          children: []
        }
        queue.push(dataStruct)
        cQueue.children.push(dataStruct)
      }
    }
    qLength = queue.length;
    qIndex += generateRandom(5);
  }
  console.log(queue)
  return results;
}

function generateRandom(max: number, min: number = 0) {
  if (min !== 0) max -= min;
  return Math.floor(Math.random() * max) + min;
}

function calculate(values: DataStruct[]): DataStruct[] {
  if (values.length <= 0) return [];
  let queue: DataStruct[] = []
  let qIndex = 0;
  let qLength = 0;
  for (let value of values) {
    queue.push(value)
    qLength = queue.length;
    queue[qIndex].totalNum = queue[qIndex].num;
    while (qIndex < qLength) {
      const dataStruct = queue[qIndex];
      for (let struct of dataStruct.children) {
        struct.totalNum = (dataStruct.totalNum ? dataStruct.totalNum : 0) + struct.num;
        queue.push(struct)
      }
      qLength = queue.length;
      qIndex++;
    }
  }
  return values;
}

function deepCalculate(values: DataStruct[]): DataStruct[] {
  for (let value of values) {
    let queue: { index: number, value: DataStruct }[] = []
    queue.push({index: 0, value: value})
    let qLength = queue.length;
    while (qLength > 0) {
      let cQueue = queue[qLength - 1];
      let children: DataStruct[] = cQueue.value.children;
      if (children.length > 0 && cQueue.index < children.length) {
        queue.push({
          index: 0,
          value: children[cQueue.index]
        })
        cQueue.index++;
      } else {
        if (qLength > 1) {
          let cValue: DataStruct = cQueue.value;
          let lastValue: DataStruct = queue[qLength - 2].value;
          lastValue.childrenTotalNum = (cValue.childrenTotalNum ? (cValue.childrenTotalNum + cValue.num) : cValue.num) + (lastValue.childrenTotalNum ? lastValue.childrenTotalNum : 0);
          queue.pop()
        } else {
          if (cQueue.index >= children.length) queue.pop()
        }
      }
      qLength = queue.length;
    }
  }
  return values;
}

onMounted(() => {
  // deepCalculate(values.value);
  let inputValue = JSON.stringify(values.value)
  if (input.value && output.value && output2.value) {
    inputEditor = monaco.editor.create(input.value, {
      value: inputValue,
      // value: JSON.stringify({key: 'name'}),
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true, // 自动调整大小
      lineHeight: 24,
      tabSize: 2,
      // minimap: {
      //   // 关闭小地图
      //   enabled: false,
      // },
      // readOnly: true,
      domReadOnly: true
    });
    outputEditor = monaco.editor.create(output.value, {
      value: JSON.stringify(calculate(JSON.parse(inputValue))),
      // value: JSON.stringify({key: 'name'}),
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true, // 自动调整大小
      lineHeight: 24,
      tabSize: 2,
      // minimap: {
      //   // 关闭小地图
      //   enabled: false,
      // },
      readOnly: true,
      domReadOnly: true
    });
    outputEditor2 = monaco.editor.create(output2.value, {
      value: JSON.stringify(deepCalculate(JSON.parse(inputValue))),
      // value: JSON.stringify({key: 'name'}),
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true, // 自动调整大小
      lineHeight: 24,
      tabSize: 2,
      // minimap: {
      //   // 关闭 小地图
      //   enabled: false,
      // },
      readOnly: true,
      domReadOnly: true
    });
  }

  // 监听内容变化
  // editor.onDidChangeModelContent(() => {
  //   const newValue = editor.getValue();
  // this.$emit('update:code', newValue); // 向父组件发送更新的代码
  // });
})
onBeforeUnmount(() => {
  if (inputEditor) {
    inputEditor.dispose(); // 清理编辑器实例
  }
  if (outputEditor) {
    outputEditor.dispose(); // 清理编辑器实例
  }
  // if (outputEditor2) {
  //   outputEditor2.dispose();
  // }
});

function refresh() {
  const value = generate()
  const strValue = JSON.stringify(value)
  inputEditor?.setValue(strValue)
  outputEditor?.setValue(JSON.stringify(calculate(JSON.parse(strValue))))
  outputEditor2?.setValue(JSON.stringify(deepCalculate(JSON.parse(strValue))))
}
</script>

<template>
  <!--  <div>-->
  <!--    {{ JSON.stringify(values) }}-->
  <!--  </div>-->
  <subscription/>
  <div class="root">
<!--    <div class="tip-title">-->
<!--      要求：使用任意编程语言，通过左边的输入得到右边的输出，可任选一种输出结果，仅需选择一个即可；选择一种输出结果后，实现一个函数通过计算得出这种输出结果。-->
<!--    </div>-->
<!--    <div class="tip">-->
<!--      <span>输出1可以通过广度遍历实现，输出2可以通过深度遍历实现</span>-->
<!--      <span>-->
<!--        输入要求-->
<!--        输入格式：-->
<!--        你的程序应接受一个树的根节点作为输入。-->
<!--        树的节点应包含以下属性：-->
<!--        value：节点的值（字符串类型）。-->
<!--        children：节点的子节点（数组类型）。-->
<!--      </span>-->
<!--    </div>-->
    <button @click="refresh()">
      重新生成
    </button>
    <div class="container">
      <div class="grid">
        <span>输入：</span>
        <div ref="input" id="editor"/>
      </div>
      <div class="grid">
        <span>输出1（难度简单）：</span>
        <div ref="output" id="editor"/>
      </div>
      <div class="grid">
        <span>输出2（难度中等）：</span>
        <div ref="output2" id="editor"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tip-title {
  font-weight: bold;
  font-size: 26px;
}

button {
  background-color: deepskyblue;
  width: 120px;
}

.container {
  display: flex;
  flex-direction: row;
}

.grid {
  margin-right: 1vw;
}

#editor {
  width: 25vw;
  height: 45vh;
  text-align: left;
}
</style>