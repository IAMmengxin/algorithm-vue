//最长公共子序列
class LCS {
    private S1: string = 'AGGTAB'
    private S2: string = 'GXTXAYB'

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
        console.log("最长子序列为：",lscStr)
        return lsc[lsc.length - 1][2];
    }
    //记忆法
    public memory(S1 = this.S1, S2 = this.S2, m = S1.length, n = S2.length): number {
    }
}

const lcs = new LCS();
export default lcs;
