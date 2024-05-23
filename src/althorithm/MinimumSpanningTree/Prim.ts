import {Bridge, graph} from "./MinimumData.ts";

// @ts-ignore
interface UnionFindI {
    from: number;
    tos: To[];
}

interface To {
    to: number;
    cost: number;
}

export class Prim {
    public mst: Bridge[] = [];

    constructor(edges: Bridge[] = graph.edges) {
        // 构建并查集
        this.buildMst(edges);
    }

    public test(): void {
        console.log("最小树：", this.mst);
    }

    //寻找v1在v2中没有的边
    // @ts-ignore
    private findNoConnected(v1: { [p: string]: any }, v2: { [p: string]: 0 }): { [p: string]: any } {
        const noConnected: { [p: string]: any } = {};
        for (let key in v1) {
            if (v2[Number(key)] !== 0) {
                noConnected[key] = v1[key];
            }
        }
        return noConnected;
    }

    private buildMst(edges: Bridge[]) {
        let isLands = this.buildData(edges);
        const mst: { [key in string | number]: 0 } = {};
        /*let keys: string[] = Object.keys(isLands);
                let cLand: Bridge | null = {
                    from: Number(keys[0]),
                    to: isLands[Number(keys[0])][0].to,
                    cost: isLands[Number(keys[0])][0].cost
                }
                mst[cLand.from] = 0;
                this.mst.push(cLand)
                while (cLand !== null) {
                    debugger
                    let isConnect: boolean = false;
                    if (cLand.to !== -1) {
                        for (let to of isLands[cLand.to]) {
                            if (mst[to.to] !== 0) {
                                cLand = {
                                    from: cLand.to,
                                    to: to.to,
                                    cost: to.cost
                                }
                                mst[cLand.from] = 0;
                                this.mst.push(cLand);
                                isConnect = true;
                                break;
                            }
                        }
                        delete isLands[cLand.from];
                    }
                    if (!isConnect) {
                        // isLands = this.findNoConnected(isLands, mst);
                        keys = Object.keys(isLands);
                        if (keys.length > 0) {
                            for (let land of isLands[Number(keys[0])]) {
                                if (mst[land.to] !== 0) {
                                    cLand = {
                                        from: Number(keys[0]),
                                        to: land.to,
                                        cost: land.cost
                                    }
                                    mst[cLand.from] = 0;
                                    this.mst.push(cLand);
                                    isConnect = true;
                                    break;
                                }
                            }
                            if (!isConnect) {
                                cLand = {
                                    from: Number(keys[0]),
                                    to: -1,
                                    cost: -1
                                };
                                mst[cLand.from] = 0;
                                this.mst.push(cLand);
                            }
                            delete isLands[cLand.from];
                        } else
                            cLand = null;
                    }
                }*/
        for (let key in isLands) {
            const lands = isLands[key] as To[];
            for (let to of lands) {
                if (mst[to.to] !== 0) {
                    mst[key] = 0;
                    mst[to.to] = 0;
                    this.mst.push({
                        from: Number(key),
                        to: to.to,
                        cost: to.cost
                    });
                }
            }
        }
    }

    private buildData(bridges: Bridge[]): { [key in number]: To[] } {
        const unionMap: { [key in number]: To[] } = {};
        for (let i = 0; i < bridges.length; i++) {
            const from = bridges[i].from;
            const to = {
                to: bridges[i].to,
                cost: bridges[i].cost
            }
            if (!unionMap[from]) {
                unionMap[from] = [];
            }
            (unionMap[from] as To[]).push(to);
        }
        for (let union in unionMap) {
            // 排序并查表
            (unionMap[union] as To[]).sort((a, b) => {
                return a.cost - b.cost
            })
            // unionFind.push(<UnionFindI>{
            //     from: Number(union),
            //     tos: unionMap[union]
            // })
        }
        return unionMap;
    }
}
