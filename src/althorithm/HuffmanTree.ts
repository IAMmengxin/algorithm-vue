// 定义节点类型
import {Heap} from "./Heap";

export interface HuffmanNode {
    char: string; // 字符
    freq: number; // 频率
    left?: HuffmanNode | unknown; // 左子节点
    right?: HuffmanNode | unknown; // 右子节点
}

type frequenciesType = { [key: string]: number };

// 定义霍夫曼树类
export class HuffmanTree {
    // private root: HuffmanNode; // 根节点
    // 构造函数
    constructor() {
        // 构建霍夫曼树
        // this.root = this.buildTree(frequencies);
    }

    // 构建霍夫曼树
    buildTree(text: string): HuffmanNode {
        let root: HuffmanNode = {
            char: '',
            freq: 0,
            left: null,
            right: null
        }
        const priorityQueue: Heap<HuffmanNode> = this.createNode(text);
        root = priorityQueue.toTree();
        /*let index = 0;
        while (index < priorityQueue.length - 1) {
            const node1 = priorityQueue[index];
            const node2 = priorityQueue[index + 1];
            const newNode = {
                char: '',
                freq: node1.freq + node2.freq,
                left: node1,
                right: node2
            }
            priorityQueue.push(newNode)
            root = newNode;
            index += 2;
        }*/
        return root;
    }

    //生成霍夫曼编码
    generateHuffmanCodes(text: string = "", root: HuffmanNode | null = null): { [key: string]: string } {
        if (text !== "") {
            root = this.buildTree(text)
        }
        if (root === null) return {};
        const codes: { [key: string]: string } = {}
        const queue: { code: string, node: HuffmanNode }[] = [];
        queue.push({code: '', node: root});
        let index = 0;
        let length = queue.length;
        while (index < length) {
            const item: { code: string; node: HuffmanNode } = queue[index];
            if (item.node.char !== '') {
                codes[item.node.char] = item.code;
            }
            if (item.node.left !== null) {
                let left = <HuffmanNode>item.node.left;
                let nodeLeft = {code: item.code + '0', node: left};
                queue.push(nodeLeft);
            }
            if (item.node.right !== null) {
                let right = <HuffmanNode>item.node.right;
                const nodeRight = {code: item.code + '1', node: right};
                queue.push(nodeRight);
            }
            index++;
            length = queue.length;
        }
        return codes;
    }

    // 生成编码的辅助函数
    generateCodes(node: HuffmanNode, code: string, codes: Map<string, string>) {
        if (!node) return;

        // 如果是叶节点，记录编码
        if (node.char) {
            codes.set(node.char, code);
        }

        // 递归生成左子节点和右子节点的编码
        this.generateCodes(<HuffmanNode>node.left, code + '0', codes);
        this.generateCodes(<HuffmanNode>node.right, code + '1', codes);
    }

    //步骤2：创建节点
    private createNode(text: string): Heap<HuffmanNode> {
        const nodes: Heap<HuffmanNode> = new Heap<HuffmanNode>();
        const frequencies: frequenciesType = this.calculateFrequencies(text);
        for (let key in frequencies) {
            nodes.push({
                key: frequencies[key],
                value: {
                    char: key,
                    freq: frequencies[key],
                    left: null,
                    right: null
                }
            })
        }
        return nodes;
    }

    //步骤1：统计字符频率
    private calculateFrequencies(text: string): frequenciesType {
        const frequencies: frequenciesType = {};
        for (let i = 0; i < text.length; i++) {
            if (frequencies[text[i]] === undefined) {
                frequencies[text[i]] = 0;
            }
            frequencies[text[i]]++;
        }
        return frequencies;
    }
}

const huffmanTree = new HuffmanTree();
export default huffmanTree;