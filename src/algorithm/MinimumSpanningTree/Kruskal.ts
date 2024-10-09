import UnionFind from "./UnionFind.ts";
import {Edge, graph} from "./MinimumData.ts";



// 最小生成树算法，卡鲁斯卡尔
class Kruskal {
    private minimumEdges: Array<Edge> = [];

    constructor() {
        this.buildUnionFind(graph.vertices.length);
        console.log("最小生成树：", this.minimumEdges)
    }

    private buildUnionFind(size: number) {
        //步骤1：初始化并查集
        const unionFind = new UnionFind(size);
        //步骤2：排序边
        const sortGraph = graph.edges.map(edge => edge).sort((a, b) => {
            return a.cost - b.cost;
        })
        for (let i = 0; i < sortGraph.length; i++) {
            const edge = sortGraph[i];
            const from = edge.from;
            const to = edge.to;
            //步骤3：判断是否形成环
            if (!unionFind.connected(from, to)) {
                //步骤4：如果形成环，则将边加入最小生成树
                this.minimumEdges.push(edge);
                //步骤5：合并两个集合
                unionFind.union(from, to);
            }
        }
    }

    test() {
        let unionFind = new UnionFind(graph.vertices.length);
        unionFind.union(0, 1)
        unionFind.union(2, 0)
        unionFind.union(1, 3)
        console.log(unionFind.parent)
    }
}

const kruskal = new Kruskal();
export default kruskal;
