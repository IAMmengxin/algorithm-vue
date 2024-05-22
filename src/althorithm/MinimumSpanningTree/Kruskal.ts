import UnionFind from "./UnionFind.ts";

// 定义桥梁的数据结构
interface Bridge {
    from: number; // 桥梁连接的第一个岛屿
    to: number; // 桥梁连接的第二个岛屿
    cost: number;   // 桥梁的成本
}

// 定义岛屿的数据结构
interface Island {
    id: number; // 岛屿的唯一标识符
    name?: string; // 岛屿的名称（可选）
}

// 定义图的数据结构
interface Graph {
    vertices: Island[]; // 图中的顶点（岛屿）
    edges: Bridge[];   // 图中的边（桥梁）
}

interface Edge {
    from: number;
    to: number;
    cost: number;
}

// 示例数据
const graph: Graph = {
    vertices: [
        {id: 1, name: "岛屿A"},
        {id: 2, name: "岛屿B"},
        {id: 3, name: "岛屿C"},
        {id: 4, name: "岛屿D"},
        {id: 5, name: "岛屿E"},
        {id: 6, name: "岛屿F"}
    ],
    edges: [
        {from: 1, to: 2, cost: 2},
        {from: 1, to: 5, cost: 4},
        {from: 1, to: 4, cost: 1},
        {from: 2, to: 1, cost: 2},
        {from: 2, to: 4, cost: 3},
        {from: 2, to: 3, cost: 3},
        {from: 2, to: 6, cost: 7},
        {from: 3, to: 6, cost: 8},
        {from: 3, to: 2, cost: 3},
        {from: 3, to: 4, cost: 5},
        {from: 4, to: 3, cost: 5},
        {from: 4, to: 2, cost: 3},
        {from: 4, to: 5, cost: 9},
        {from: 5, to: 1, cost: 4},
        {from: 5, to: 4, cost: 9},
        {from: 6, to: 2, cost: 7},
        {from: 6, to: 3, cost: 8}
    ]
};

// @ts-ignore
interface UnionFindI {
    from: number;
    tos: To[];
}

interface To {
    to: number;
    cost: number;
}
// 最小生成树算法，卡鲁斯卡尔
class Kruskal {
    /*private unionFind: Array<UnionFindI> = [];

    constructor() {
        // 构建并查集
        this.buildUnionFind(graph.edges);
    }
    private buildUnionFind(bridges: Bridge[]) {
        const unionMap:{[key in number]?:To[]} = {};
        for (let i = 0; i < bridges.length; i++) {
            const from = bridges[i].from;
            const to = {
                to: bridges[i].to,
                cost: bridges[i].cost
            }
            if(!unionMap[from]){
                unionMap[from] = [];
            }
            (unionMap[from] as To[]).push(to);
        }
        for (let union in unionMap){
            // 排序并查表
            (unionMap[union] as To[]).sort((a,b)=>{
                return a.cost - b.cost
            })
            this.unionFind.push(<UnionFindI>{
                from: Number(union),
                tos: unionMap[union]
            })
        }
    }*/
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