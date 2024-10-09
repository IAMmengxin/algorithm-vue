// 并查集
export default class UnionFind {
    public readonly parent: number[];
    private readonly rank: number[];

    constructor(size: number) {
        this.parent = new Array(size).fill(-1).map((_, index) => index);
        this.rank = new Array(size).fill(0);
    }

    // 查找操作，使用路径压缩
    find(p: number): number {
        const queue: number[] = [p];
        /*let qIndex = 0;
        let qLength = queue.length;
        while (qIndex < qLength) {
        //这是错误的做法，只把所有子节点的父节点设置为当前节点的父节点，正确做法应该是将每个子节点的父节点设置为根节点
            let cIndex = queue[qIndex];
            if (cIndex !== this.parent[cIndex]) {
                //将子节点的父节点设置为父节点的父节点
                queue.push(this.parent[cIndex] = this.parent[this.parent[cIndex]])
                qLength++;
            }
            qIndex++;
        }*/
        let cIndex = queue[0];
        //寻找根节点
        while (cIndex !== this.parent[cIndex]) {
            queue.push(cIndex = this.parent[cIndex])
        }
        //优化，将所有节点的父节点设置为根节点
        for (let o of queue) {
            this.parent[o] = cIndex;
        }
        /*if(p === this.parent[p]){
            return p;
        }
        let i_parent = this.find(this.parent[p])*/

        // if (p !== this.parent[p]) {
        //     this.parent[p] = this.find(this.parent[p]);
        // }
        return cIndex;
    }

    union(parent: number, child: number): boolean {
        const rootParent = this.find(parent);
        const rootChild = this.find(child);
        if (rootParent === rootChild)
            return false;

        // this.parent[rootChild] = rootParent;//简单的合并，将子节点合并到根节点
        //遵循秩优化，秩大的集合合并到秩小的集合（即将简单的树合并到复杂的树）
        if (this.rank[rootParent] < this.rank[rootChild]) {
            this.parent[rootParent] = this.parent[rootChild];
            this.rank[rootChild]++;
            this.rank[rootParent] = 0;
        }else if(this.rank[rootChild] < this.rank[rootParent]){
            this.parent[rootChild] = this.parent[rootParent];
            this.rank[rootParent]++;
            this.rank[rootChild] = 0;
        }else{
            this.parent[rootChild] = this.parent[rootParent];
            this.rank[rootParent]++;
            this.rank[rootChild] = 0;
        }
        return true;
    }

    connected(p: number, q: number): boolean {
        return this.find(p) === this.find(q);
    }
}