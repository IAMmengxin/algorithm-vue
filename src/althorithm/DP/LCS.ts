//最长公共子序列
class LCS {
    private S1: string = 'AGGTABA1Y'
    private S2: string = 'GXTXAYBY'

    //递归法解决
    public recursion(S1 = this.S1, S2 = this.S2, m = S1.length, n = S2.length): number {
        const queue = [[m, n, 0]];
        const lsc: Array<[number, number, number]> = [[0, 0, 0]];
        let qIndex = 0;
        // let m = S1.length;
        // let n = S2.length;
        while (qIndex < queue.length) {
            const [i, j, max] = queue[qIndex];
            if (i !== 0 && j !== 0) {
                if (S1[i - 1] === S2[j - 1]) {
                    const newMax = max + 1;
                    queue.push([i - 1, j - 1, newMax]);
                    if (newMax > lsc[lsc.length - 1][2])
                        lsc.push([i, j, newMax]);
                } else {
                    queue.push([i - 1, j, max])
                    queue.push([i, j - 1, max])
                }
            }
            qIndex++;
        }
        // if (m === 0 || n === 0) {
        //     return 0;
        // }
        // if (S1[m - 1] === S2[n - 1]) {
        //     return 1 + this.recursion(S1, S2, m - 1, n - 1)
        // } else {
        //     return Math.max(this.recursion(S1, S2, m - 1, n), this.recursion(S1, S2, m, n - 1))
        // }
        lsc.sort((a, b) => a[2] - b[2])
        let lscStr = '';
        for (let i = lsc.length - 1; i > 0; i--) {
            const [s, _, max] = lsc[i];
            if (max !== lsc[i - 1][2]) {
                lscStr += S1[s - 1];
            }
        }
        console.log("最长子序列为：", lscStr, "暴力递归法时间复杂度：", queue.length)
        return lsc[lsc.length - 1][2];
    }

    //记忆法
    public memory(S1 = this.S1, S2 = this.S2, m = S1.length, n = S2.length): number {
        const queue = [[m, n, 0]];
        const memoryQueue = new Array(m + 1).fill([]).map(() => new Array(n + 1).fill(-1));
        const lsc: Array<[number, number, number]> = [[0, 0, 0]];
        let qIndex = 0;

        while (qIndex < queue.length) {
            let [i, j, max] = queue[qIndex]
            if (i !== 0 && j !== 0) {
                if (S1[i - 1] == S2[j - 1]) {
                    max = 1 + max;
                    queue.push([i - 1, j - 1, max])
                    memoryQueue[i - 1][j - 1] = max;
                    if (max > lsc[lsc.length - 1][2])
                        lsc.push([i - 1, j - 1, max])
                } else {
                    if (memoryQueue[i - 1][j] === -1) {
                        queue.push([i - 1, j, max])
                        memoryQueue[i - 1][j] = max;
                    }
                    if (memoryQueue[i][j - 1] === -1) {
                        queue.push([i, j - 1, max])
                        memoryQueue[i][j - 1] = max;
                    }
                }
            }
            qIndex++;
        }
        let lscStr = '';
        for (let i = lsc.length - 1; i > 0; i--) {
            const [s, _] = lsc[i];
            lscStr += S1[s];
        }
        console.log("最长子序列为：", lscStr, "记忆法时间复杂度：", qIndex)
        return lsc[lsc.length - 1][2];
    }

    //动态规划方法
    public dynamicProg(S1 = this.S1, S2 = this.S2) {
        let dp1 = new Array(S2.length + 1).fill(0);
        let dp2 = new Array(S2.length + 1).fill(0);
        for (let i = S1.length; i > 0; i--) {
            for (let j = S2.length; j > 0;) {
                j--;
                if (S1[i - 1] === S2[j]) {
                    dp2[j] = dp1[j + 1] + 1;
                } else if (dp2[j + 1] < dp1[j]) {
                    dp2[j] = dp1[j]
                } else {
                    dp2[j] = dp2[j + 1]
                }
            }
            dp1 = dp2.map((num) => num);
            dp2.fill(0);
        }
        let lscStr = ''
        for (let i = 0; i < dp1.length - 1; i++) {
            if (dp1[i] !== dp1[i + 1])
                lscStr += S2[i]
        }
        // lscStr += S2[dp2[dp2.length - 1]]
        console.log("最长子序列为：", lscStr, "动态规划法时间复杂度：", S1.length * S2.length)
        return dp2[0];
    }
}

const lcs = new LCS();
export default lcs;
