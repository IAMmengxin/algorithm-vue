//最长公共子序列
class LCS {
    private S1: string = 'AGTABAY12342'
    private S2: string = 'GXTXAYBY2323'


    public get getS1() {
        return this.S1;
    }

    public get getS2() {
        return this.S2;
    }

    //阶乘
    public factorial(n: number): number {
        if (n === 1) return 1;
        return n * this.factorial(n - 1);
    }

    public MyRecursion(S1 = this.S1, S2 = this.S2) {
        let m = S1.length;
        let n = S2.length;
        const lcs: Array<[number, number, number]> = new Array();
        const queue: Array<[number, number, number]> = [];
    }


    //递归法解决
    public recursion(S1 = this.S1, S2 = this.S2, m = S1.length, n = S2.length): number {
        const queue = [[m, n, 0]];
        const lsc: Array<[number, number, number]> = [[0, 0, 0]];
        let qIndex = 0;
        // let m = S1.length;
        // let n = S2.length;
        while (qIndex < queue.length) {
            const [i, j, max] = queue[qIndex];
            if (i > 0 && j > 0) {
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

    private mLsc: Array<[number, number, number]> = [];
    private mI: number = 0;

    //记忆法递归
    memoryCall(S1 = this.S1, S2 = this.S2, m = S1.length, n = S2.length, memo = new Array(m + 1).fill([]).map(() => new Array(n + 1).fill(-1))) {
        this.mI++;
        // Base Case
        if (m === 0 || n === 0)
            return 0;

        // Already exists in the memo table
        if (memo[m][n] !== -1)
            return memo[m][n];

        // Match
        if (S1[m - 1] === S2[n - 1]) {
            memo[m][n] = 1 + this.memoryCall(S1, S2, m - 1, n - 1, memo);
            this.mLsc.push([m, n, memo[m][n]])
            if (this.mLsc.length === 8) {
                let lscStr = '';
                this.mLsc.sort((a, b) => a[2] - b[2])
                for (let i = this.mLsc.length - 1; i > 0; i--) {
                    const [s, _] = this.mLsc[i];
                    lscStr += S1[s];
                }
                console.log("记忆法递归最长子序列为：", lscStr, "记忆法递归时间复杂度：", this.mI)
            }
            return memo[m][n];
        }

        // Do not match
        memo[m][n] = Math.max(this.memoryCall(S1, S2, m, n - 1, memo),
            this.memoryCall(S1, S2, m - 1, n, memo));
        return memo[m][n];
    }


    // public memoryQueue:number[][] = [];
    public pause: { is: boolean } = {is: false};
    public finish: { is: boolean } = {is: false};
    public memoryLcs: { lcs: string } = {lcs: ''}
    public memoryLsc: Array<[number, number, number]> = [];

    // '1235324'
    // '213521'
    //记忆法
    public memory(memoryQueue: number[][] = [], S1 = this.S1, S2 = this.S2, m = S1.length, n = S2.length): number {
        const queue = [[m, n, 0]];
        // this.memoryQueue = new Array(m + 1).fill([]).map(() => new Array(n + 1).fill(-1));
        const lsc: Array<[number, number, number]> = [[0, 0, 0]];
        this.memoryLsc = lsc;
        let qIndex = 0;
        const interval: number = setInterval(() => {
            if (this.pause.is) return;
            // while (qIndex < queue.length) {
            let [i, j, max] = queue[qIndex]
            if (i > 0 && j > 0) {
                if (S1[i - 1] === S2[j - 1]) {
                    max = 1 + max;
                    queue.push([i - 1, j - 1, max])
                    memoryQueue[i - 1][j - 1] = max;
                    if (max > lsc[lsc.length - 1][2]) {
                        lsc.push([i - 1, j - 1, max])
                        this.memoryLcs.lcs = this.getLcs()
                        this.pause.is = true;
                    }
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
            if (qIndex >= queue.length) {
                clearInterval(interval)
                this.finish.is = true;
            }
            // }
        }, 1400)
        let lscStr = '';
        for (let i = lsc.length - 1; i > 0; i--) {
            const [s, _] = lsc[i];
            lscStr += S1[s];
        }
        console.log("最长子序列为：", lscStr, "记忆法时间复杂度：", qIndex)
        return lsc[lsc.length - 1][2];
    }

    private getLcs(lsc: number[][] = this.memoryLsc, S1: string = this.S1) {
        let lscStr = '';
        for (let i = lsc.length - 1; i > 0; i--) {
            const [s, _] = lsc[i];
            lscStr += S1[s];
        }
        return lscStr;
    }

    //动态规划方法
    public dynamicProg(S1 = this.S1, S2 = this.S2) {
        if (S1.length < S2.length)
            [S1, S2] = [S2, S1];
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
        return dp1[0];
    }
}

const lcs = new LCS();
export default lcs;
