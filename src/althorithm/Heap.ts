import {HuffmanNode} from "./HuffmanTree";

interface HeapType<T> {
    key: number,
    value: T
}

//堆
export class Heap<T> {
    get heap(): HeapType<T>[] {
        return this._heap;
    }
    private _heap: HeapType<T>[] = []
    public isMinHeap: boolean = true;
    constructor(isMinHeap: boolean = true) {
        this.isMinHeap = isMinHeap;
    }

    //构建堆，key为用来比较的键
    public buildHeap(arr: HeapType<T>[]) {
        const isMinHeap = this.isMinHeap;
        const heap: HeapType<T>[] = this._heap;
        if (isMinHeap) {
            for (let i = arr.length - 1; i >= 0; i--) {
                const item = arr[i];
                this.pushMin(item);
            }
        } else {
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i];
                this.pushMax(item);
            }
        }
        return heap;
    }

    private pushMin(item: HeapType<T>) {
        const heap = this._heap;
        heap.push(item)
        let length = heap.length - 1;
        while (length > 0) {
            let lengthSqrt = Math.floor(length / 2);
            if (item.key < heap[lengthSqrt].key) {
                this.swap(heap, length, lengthSqrt);
            }
            length = lengthSqrt;
        }
    }

    private pushMax(item: HeapType<T>) {
        const heap = this._heap;
        heap.push(item)
        let length = heap.length - 1;
        while (length > 0) {
            let lengthSqrt = Math.floor(length / 2);
            if (item.key > heap[lengthSqrt].key) {
                this.swap(heap, length, lengthSqrt);
            }
            length = lengthSqrt;
        }
    }

    public push(item: HeapType<T>) {
        const heap: HeapType<T>[] = this._heap;
        if (heap.length === 0) {
            heap.push(item)
            return;
        }
        if (this.isMinHeap) {
            this.pushMin(item)
        } else
            this.pushMax(item)
    }

    //最小堆，删除最小值
    public shift() {
        const heap: HeapType<T>[] = this._heap;
        const length = heap.length - 1;
        const removed = heap[0];
        this.swap(heap, 0, length);
        heap.pop();
        if (this.isMinHeap) {
            this.shiftMin()
        } else
            this.shiftMax()
        return removed;
    }

    public shiftMin() {
        const heap: HeapType<T>[] = this._heap;
        const length = heap.length;
        let cIndex = 0;
        while (cIndex * 2 + 1 < length) {
            const leftIndex = cIndex * 2 + 1;
            const rightIndex = cIndex * 2 + 2;
            const left = heap[leftIndex];
            if (rightIndex < length) {
                const right = heap[rightIndex];
                if (left.key < right.key) {
                    if (left.key < heap[cIndex].key) {
                        this.swap(heap, cIndex, leftIndex);
                        cIndex = leftIndex;
                        continue;
                    }
                } else {
                    if (right.key < heap[cIndex].key) {
                        this.swap(heap, cIndex, rightIndex);
                        cIndex = rightIndex;
                        continue;
                    }
                }
                break;
            } else {
                if (left.key < heap[cIndex].key) {
                    this.swap(heap, cIndex, leftIndex);
                    cIndex = leftIndex;
                } else break;
            }
        }
    }

    public shiftMax() {
        const heap: HeapType<T>[] = this._heap;
        const length = heap.length;
        let cIndex = 0;
        while (cIndex * 2 + 1 < length) {
            const leftIndex = cIndex * 2 + 1;
            const rightIndex = cIndex * 2 + 2;
            const left = heap[leftIndex];
            if (rightIndex < length) {
                const right = heap[rightIndex];
                if (left.key > right.key) {
                    if (left.key > heap[cIndex].key) {
                        this.swap(heap, cIndex, leftIndex);
                        cIndex = leftIndex;
                        continue;
                    }
                } else {
                    if (right.key > heap[cIndex].key) {
                        this.swap(heap, cIndex, rightIndex);
                        cIndex = rightIndex;
                        continue;
                    }
                }
                break;
            } else {
                if (left.key > heap[cIndex].key) {
                    this.swap(heap, cIndex, leftIndex);
                    cIndex = leftIndex;
                } else break;
            }
        }
    }

    //删除最后一个
    public pop(): HeapType<T> | undefined {
        const heap: HeapType<T>[] = this._heap;
        return heap.pop();
    }

    //转换为霍夫曼树
    public toTree(): T {
        const heap: HeapType<T>[] = this._heap;
        let root = heap[0].value;
        // const queue: HuffmanNode[] = [root];
        while (heap.length > 1) {
            const left: T = (this.shift() as HeapType<T>).value;
            const right: T = (this.shift() as HeapType<T>).value;
            const parent: T = {
                left: left,
                right: right,
                freq: (left as HuffmanNode).freq + (right as HuffmanNode).freq,
                char: ''
            } as T;
            this.push({
                key: (<HuffmanNode>parent).freq,
                value: parent
            })
            root = parent;
        }
        return root;
    }

    test() {
        const arr = [
            {key: 14, value: new Test(14) as T},
            {key: 8, value: new Test(8) as T},
            {key: 7, value: new Test(7) as T},
            {key: 1, value: new Test(1) as T},
            {key: 3, value: new Test(3) as T}
        ]
        console.log(this.buildHeap(arr))
    }

    swap(arr: HeapType<T>[], i: number, j: number) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

class Test {
    public key: any;

    constructor(key: number) {
        this.key = key;
    }
}


const heap = new Heap<any>()
export default heap;