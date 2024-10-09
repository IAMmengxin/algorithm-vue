// 定义桥梁的数据结构
export interface Bridge {
    from: number; // 桥梁连接的第一个岛屿
    to: number; // 桥梁连接的第二个岛屿
    cost: number;   // 桥梁的成本
}

// 定义岛屿的数据结构
export interface Island {
    id: number; // 岛屿的唯一标识符
    name?: string; // 岛屿的名称（可选）
}

// 定义图的数据结构
export interface Graph {
    vertices: Island[]; // 图中的顶点（岛屿）
    edges: Bridge[];   // 图中的边（桥梁）
}

export interface Edge {
    from: number;
    to: number;
    cost: number;
}

// 示例数据
export const graph: Graph = {
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
