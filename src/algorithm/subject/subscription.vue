<template>
  <div class="container">
    <h1>树形数据结构遍历题目</h1>

    <h2>题目描述</h2>
    <p>
      在计算机科学中，树是一种基本的数据结构，广泛用于表示层级关系和组织数据。
      树的遍历是对树中节点进行访问的过程，常见的遍历方式包括广度优先遍历（BFS）和深度优先遍历（DFS）。
      本题旨在考察你对树形数据结构的理解以及对其遍历算法的实现能力。
    </p>

    <h3>给定一个树形结构（如下所示）：</h3>
    <pre>
       A
       /  \
      B     C
     / \      \
     D   E      G
    </pre>

    <h2>输入要求</h2>
    <ol>
      <li>
        <strong>输入格式</strong>：
        <ul>
          <li>你的程序应接受一个树的根节点作为输入。</li>
          <li>树的节点应包含以下属性：
            <ul>
              <li><code>value</code>：节点的值（字符串类型）。</li>
              <li><code>num</code>：节点的附带信息（数字类型）。</li>
              <li><code>children</code>：节点的子节点（数组类型）。</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <strong>示例输入</strong>：
        <div ref="exampleInput" style="text-align: left;" class="editor">
        </div>
        <button @click="refresh" style="margin-top: 10px;margin-left: 90%;">重新生成</button>
      </li>
    </ol>

    <h2>输出要求</h2>
    <ol>
      <li>
        <strong>输出格式</strong>：
        <ul>
          <li>选择一种遍历方式（广度遍历或深度遍历），并返回节点值的列表或字符串。</li>
        </ul>
      </li>
      <li>
        <strong>输出示例</strong>：
        <ul>
          <li>对于广度优先遍历（BFS），输出结果应为<span style="font-weight: bold;color: yellow;">（难度简单）</span>：
            <div ref="output" style="text-align: left;" class="editor"></div>
          </li>
          <li>对于深度优先遍历（DFS），输出结果应为<span style="font-weight: bold;color: yellow;">（难度中等）</span>：
<!--            <pre>["A", "B", "D", "E", "C", "F", "G"]</pre>-->
            <div ref="output2" style="text-align: left;" class="editor"></div>
          </li>
        </ul>
      </li>
    </ol>

    <h2>实现要求</h2>
    <ol>
      <li>
        <strong>函数签名</strong>：
        <ul>
          <li>实现以下两个函数中的一个（仅需实现其中的一个）：
            <ul>
              <li><code>bfs(root)</code>：使用广度优先遍历并返回节点值的列表。<span style="font-weight: bold;color: yellow;">（难度简单）</span></li>
              <li><code>dfs(root)</code>：使用深度优先遍历并返回节点值的列表。<span style="font-weight: bold;color: yellow;">（难度中等）</span></li>
            </ul>
          </li>
        </ul>
      </li>
<!--      <li>-->
<!--        <strong>算法复杂度</strong>：-->
<!--        <ul>-->
<!--          <li>请在代码中注明算法的时间和空间复杂度。</li>-->
<!--        </ul>-->
<!--      </li>-->
      <li>
        <strong>错误处理</strong>：
        <ul>
          <li>对于无效输入（例如，空树或非树形结构），请添加适当的错误处理逻辑。</li>
        </ul>
      </li>
    </ol>

<!--    <h2>测试用例</h2>-->
<!--    <p>请为你的函数设计以下测试用例：</p>-->
<!--    <ol>-->
<!--      <li><strong>正常情况</strong>：-->
<!--        <p>传入一个完整的树结构，验证输出是否符合预期。</p>-->
<!--      </li>-->
<!--      <li><strong>空树</strong>：-->
<!--        <p>传入一个空树节点，验证返回值是否为一个空列表或合适的错误消息。</p>-->
<!--      </li>-->
<!--      <li><strong>单节点树</strong>：-->
<!--        <p>传入一个只有根节点的树，验证返回的节点值是否正确。</p>-->
<!--      </li>-->
<!--    </ol>-->

    <h2>提交要求</h2>
    <p>请将实现的代码、运行结果一并提交。确保代码可读性高，添加适当的注释以解释关键部分的逻辑。</p>
  </div>
</template>

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
// let inputEditor: IStandaloneCodeEditor | null = null;
// let input: Ref<HTMLElement | null> = ref(null)
let output: Ref<HTMLElement | null> = ref(null)
let outputEditor: IStandaloneCodeEditor | null = null
let output2: Ref<HTMLElement | null> = ref(null)
let outputEditor2: IStandaloneCodeEditor | null = null
let exampleEditor: IStandaloneCodeEditor | null = null
let exampleInput: Ref<HTMLElement | null> = ref(null)

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

function createManaco(htmlElement: HTMLElement, value: string, readOnly = true): IStandaloneCodeEditor {
  return monaco.editor.create(htmlElement, {
    value: value,
    // value: JSON.stringify({key: 'name'}),
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true, // 自动调整大小
    lineHeight: 24,
    tabSize: 2,
    readOnly: readOnly,
    domReadOnly: true,
    wordWrap: 'on'
  })
}

onMounted(() => {
  // deepCalculate(values.value);
  let inputValue = JSON.stringify(values.value)
  if (exampleInput.value && output.value && output2.value) {
    // inputEditor = createManaco(input.value, inputValue, false)
    outputEditor = createManaco(output.value, JSON.stringify(calculate(JSON.parse(inputValue))));
    outputEditor2 = createManaco(output2.value, JSON.stringify(deepCalculate(JSON.parse(inputValue))))
    exampleEditor = createManaco(exampleInput.value, inputValue, false)
  }

  // 监听内容变化
  // editor.onDidChangeModelContent(() => {
  //   const newValue = editor.getValue();
  // this.$emit('update:code', newValue); // 向父组件发送更新的代码
  // });
})
onBeforeUnmount(() => {
  // if (inputEditor) {
  //   inputEditor.dispose(); // 清理编辑器实例
  // }
  if (outputEditor) {
    outputEditor.dispose(); // 清理编辑器实例
  }
  if (outputEditor2) {
    outputEditor2.dispose();
  }
  if(exampleEditor){
    exampleEditor.dispose();
  }
});

function refresh() {
  const value = generate()
  const strValue = JSON.stringify(value)
  // inputEditor?.setValue(strValue)
  outputEditor?.setValue(JSON.stringify(calculate(JSON.parse(strValue))))
  outputEditor2?.setValue(JSON.stringify(deepCalculate(JSON.parse(strValue))))
  exampleEditor?.setValue(strValue)
}
</script>
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

h1 {
  text-align: center;
  color: white;
}

h2, h3 {
  color: white;
  text-align: left;
}

ol {
  margin-left: 20px;
  text-align: left;
}

pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
  color: black;
}

code {
  background-color: #f4f4f4;
  padding: 2px 4px;
  border-radius: 3px;
  color: black;
}

.editor {
  width: 800px;
  height: 300px;
  text-align: left;
  color: white;
}
button {
  background-color: deepskyblue;
  width: 120px;
}
</style>
