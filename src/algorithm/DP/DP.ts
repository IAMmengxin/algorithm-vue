//给定一组物品，每种物品有自己的重量和价值，在有限的重量内选择价值最高的物品
interface Goods {
    price: number;
    height: number;
}

const _goods: Goods[] = [
    {height: 3, price: 3},
    {height: 6, price: 7},
    {height: 2, price: 3},
    {height: 10, price: 13},
    {height: 15, price: 21},
    {height: 13, price: 15},
    {height: 16, price: 25},
    {height: 21, price: 30},
    {height: 23, price: 33},
    {height: 17, price: 26},
    {height: 22, price: 31},
    {height: 26, price: 35}
];

export function question(limitHeight: number = 66, goods: Goods[] = _goods) {
    const dp: number[] = new Array(limitHeight + 1).fill(0);
    const items: number[] = new Array(limitHeight + 1).fill(null);
    let ln = goods.length;
    //能放入的最大物品数量
    let maxGoods: number = 0;
    //最大价值
    let maxPrice = 0;
    //记录每个放入的物品
    let goodsList: Goods[] = [];
    //每个容量下的最大价值
    for (let j = 0; j < ln; j++) {
        // debugger
        const height = goods[j].height;
        const price = goods[j].price;
        //每当容量增加时，遍历物品，寻找能放入的最大价值，这个循环才能计算出每个重量下的最大价值
        for (let i = height; i <= limitHeight; i++) {
            if (dp[i] < dp[i - height] + price) {
                dp[i] = dp[i - height] + price
                items[i] = j; //记录选中为的物品
            }
        }
    }
    /*
    //错误思路，这样的循环无法算出再每个重量下的最优价值，而且这样写并没有叠加之前的计算，仅仅只是覆盖了之前的计算
    for (let i = 0; i <= limitHeight; i++) {
        for (let j = 0; j < ln; j++) {
            const {height, price} = goods[j];
            if (i >= height) {
                dp[i] = Math.max(dp[i], dp[i - height] + price);
                items[i] = j;//记录选中为的物品
            }
        }
    }
    */
    // 从最大高度回溯，构建被选中物品的数组
    let currentHeight = limitHeight;
    while (currentHeight > 0) {
        const itemIndex = items[currentHeight];
        if (itemIndex !== null) {
            // debugger
            goodsList.push(goods[itemIndex]);
            currentHeight -= goods[itemIndex].height;
            maxPrice += goods[itemIndex].price;
            maxGoods++;
        } else {
            currentHeight--;
            break; // 如果没有物品被选中，则跳出循环
        }
    }
    console.log("在" + limitHeight + "kg的重量下能取得的最大价值为:" + dp[limitHeight], "物品为:", goodsList, "最大价值为:" + maxPrice, "最大物品数为:" + maxGoods)
    return dp[limitHeight];
}

export function knapsackWithItems(maxHeight = 66, goods = _goods) {
    const dp = new Array(maxHeight + 1).fill(0);
    const items = new Array(maxHeight + 1).fill(null);

    // 遍历每个物品
    for (let i = 0; i < goods.length; i++) {
        const {height, price} = goods[i];
        // 从最大高度开始向下遍历，确保每个物品只被计算一次
        for (let j = maxHeight; j >= height; j--) {
            if (dp[j] < dp[j - height] + price) {
                dp[j] = dp[j - height] + price;
                items[j] = i; // 记录被选中的物品索引
            }
        }
    }

    // 从最大高度回溯，构建被选中物品的数组
    const selectedItems = [];
    let currentHeight = maxHeight;
    while (currentHeight > 0) {
        const itemIndex = items[currentHeight];
        if (itemIndex !== null) {
            selectedItems.push(goods[itemIndex]);
            currentHeight -= goods[itemIndex].height;
        } else {
            break; // 如果没有物品被选中，则跳出循环
        }
    }

    return {maxValue: dp[maxHeight], selectedItems: selectedItems.reverse()};
}

export function knapsack(W = 66) {
    let weights = []
    let values = []
    for (let i = 0; i < _goods.length; i++) {
        weights.push(_goods[i].height);
        values.push(_goods[i].price);
    }
    const n = weights.length;
    const dp = new Array(n + 1).fill(0).map(() => new Array(W + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= W; j++) {
            if (weights[i - 1] <= j) {
                dp[i][j] = Math.max(
                    dp[i - 1][j],
                    dp[i - 1][j - weights[i - 1]] + values[i - 1]
                );
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    return dp[n][W];
}

export function maxValueWithinHeight(maxHeight = 66, goods = _goods) {
    // 先按高度降序排列物品，便于之后处理
    goods.sort((a, b) => b.height - a.height);

    // 初始化动态规划表，dp[i][j]表示在高度j时能获得的最大价值
    const dp = Array.from({length: maxHeight + 1}, () => 0);

    // 遍历每个物品
    for (const good of goods) {
        // 从当前物品的高度向下遍历，更新dp表
        for (let height = maxHeight; height >= good.height; height--) {
            // 不选择当前物品或选择当前物品的最大价值
            dp[height] = Math.max(dp[height], dp[height - good.height] + good.price);
        }
    }

    // 返回最大价值
    return dp[maxHeight];
}