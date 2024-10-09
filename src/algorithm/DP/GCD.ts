//最大公约数 Greatest Common Divisor
class GCD {
    //欧几里得算法
    public gcd(a: number, b: number): number {
        if (b === 0) {
            return a;
        }
        return this.gcd(b, a % b);
    }

    public test(): void {
        console.log(this.gcd2(12, 18));
        console.log(this.lcm(12, 18));
    }

    //队列代替递归
    public gcd2(a: number, b: number): number {
        let queue: number[] = [];
        queue.push(a);
        queue.push(b);
        let index = 0;
        while (queue.length > 0) {
            let a = queue[index];
            let b = queue[index + 1];
            index += 2;
            if (b === 0) {
                return a;
            }
            queue.push(b);
            queue.push(a % b);
        }
        return 0;
    }

    public gcd2Optimized(a: number, b: number): number {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    //暴力求解
    public gcd3(a: number, b: number): number {
        let min = Math.min(a, b);
        let max = Math.max(a, b);
        for (let i = min; i >= 1; i--) {
            if (max % i === 0 && min % i === 0) {
                return i;
            }
        }
        return 0;
    }

    //最小公倍数
    public lcm(a: number, b: number): number {
        return a * b / this.gcd(a, b);
    }
}

const gcd = new GCD();
export default gcd;
