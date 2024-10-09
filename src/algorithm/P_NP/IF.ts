//integer factorization整数因式分解
class IF {
    /*给定正整数 N，求一共有多少组(A,B,C)满足 AxB+C=N。
    其中 1≤A,B,C≤N 且为正整数，注意(1,2,1)和(2,1,1)不相同.*/

    public AFBPC(N: number){
        for (let i = 1; i < N; i++){

        }
    }
    public IntegerFactorization(N: number): number {
        let i, n = N, ans = 0;
        for (i = 1; i < n; i++) {
            ans += Math.floor(n / i);
            if (n % i === 0) {
                ans--;
            }
        }
        return ans;
    }

    public test(): void {
        console.log(_if.IntegerFactorization(45));
        console.log(_if.faction(8));
        console.log(_if.factorize(45));
    }

    //因式分解
    /*1.以整数18为例，从质数2开始，检查 (18) 是否能被2整除。可以，所以 (18 = 2 \times 9)。
    2.继续检查 (9) 是否能被2整除。不可以，所以增加质数到下一个质数3。
    3.检查 (9) 是否能被3整除。可以，所以 (9 = 3 \times 3)。
    4.此时 (N) 已经变为1，分解结束。*/
    faction(N: number): { [key: number]: number[] }[] {
        let n = N;
        const factors: { [key: number]: number[] }[] = [];
        let factor = 2;
        let index = 0;
        while (factor <= n) {
            while (n >= factor) {
                index++;
                if (n % factor === 0) {
                    let f = n / factor;
                    const obj: { [key: number]: number[] } = {};
                    obj[n] = [factor, f];
                    factors.push(obj);
                    n = f;
                } else {
                    factor++;
                }
            }
            factor++;
            n = N;
        }
        console.log("时间复杂度：",index)
        return factors;
    }

    factorize(n: number): { prime: number, exponent: number }[] {
        const factors: { prime: number, exponent: number }[] = [];
        let factor = 2;

        while (n >= 2) {
            if (n % factor === 0) {
                let exponent = 0;
                while (n % factor === 0) {
                    n /= factor;
                    exponent++;
                }
                factors.push({prime: factor, exponent: exponent});
            }
            factor++;
        }

        return factors;
    }
}

const _if = new IF()
export default _if;

class Classes {
    public events:{[key:string]:MessageFun} = {}
    constructor() {
        setTimeout(()=>{
            this.publish("报警","发布警报")
        },1000)
    }
    publish(pName:string,message:string){
        this.events[pName](message)
    }
    subscribe(fName:string, f:MessageFun){
        this.events[fName] = f
    }
    observable(){
    }
}
export const classes = new Classes()
type MessageFun = (data:string)=>void
