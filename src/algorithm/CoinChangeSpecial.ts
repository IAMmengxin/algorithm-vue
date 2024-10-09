//硬币找零问题，但是硬币面额只有特殊的值，比如硬币面额只能是1，5，10，20，50，100
//这类问题可以简单的使用贪心算法解决
class CoinChangeSpecial {
    coinChange(money: number, coins: number[] = [1, 5, 10, 20, 50, 100]) {
        //如果a比b大，则把a和b交换位置
        coins = coins.sort((a,b)=>a-b)
        let retainMoney = money;
        let coinIndex = coins.length - 1;
        const result: { coin: number, count: number }[] = [];
        const compute: { [coinIndex: number]: number } = {};
        while (retainMoney > 0) {
            if (retainMoney >= coins[coinIndex]) {
                if (compute[coinIndex] === undefined)
                    compute[coinIndex] = 0;
                compute[coinIndex]++;
                retainMoney -= coins[coinIndex];
            }else{
                coinIndex--;
            }
        }
        const keys:string[] = Object.keys(compute);
        for (let skey of keys) {
            const key = parseInt(skey);
            if (compute[key] !== undefined) {
                result.push({ coin: coins[key], count: compute[key] });
            }
        }
        console.log("找零的硬币组合为:",result);
        return result;
    }
}

const coinChangeSpecial = new CoinChangeSpecial();
export default coinChangeSpecial;
