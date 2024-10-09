//分数背包问题，这是一个资源分配类型的优化问题，它允许你分割物品来获取部分价值。这与“0/1背包问题”不同，后者要求每个物品要么完整地被选中，
// 要么完全不被选中。分数背包问题可以通过贪心算法有效解决，因为你可以按物品单位重量的价值进行决策，以最大化背包中物品的总价值。
type Item = {
    name: string;
    weight: number;
    value: number;
}

class FractionalKnapsack {
    private _items: Item[] = [
        {weight: 10, value: 60, name: 'A'},
        {weight: 20, value: 110, name: 'B'},
        {weight: 30, value: 150, name: 'C'}
    ];

    //在背包中选择物品，使得总重量不超过背包容量，且价值最大。
    fractionalKnapsack(maxWeight: number, items: Item[] = this._items) {
        let _items = items.map(item => {
            return {
                name: item.name,
                percentValue: item.value / item.weight
            }
        });
        let _itemsMap: { [key: string]: number } = {}
        for (let i = 0; i < items.length; i++) {
            _itemsMap[items[i].name] = items[i].weight;
        }
        //从大到小排序
        _items = _items.sort((a, b) => b.percentValue - a.percentValue)
        let currentWeight = maxWeight;
        let cIndex = 0;
        let result: { itemName: string, count: number, value: number }[] = [];
        while (cIndex < _items.length) {
            let sumCount = Math.min(Math.floor(currentWeight / _items[cIndex].percentValue), _itemsMap[_items[cIndex].name])
            if (sumCount > 0) {
                result.push({
                    itemName: _items[cIndex].name,
                    count: sumCount,
                    value: sumCount * _items[cIndex].percentValue
                })
            }
            currentWeight -= sumCount * _items[cIndex].percentValue;
            cIndex++;
        }
        console.log("选择的物品：", result)
        return result;
    }
}

const fk = new FractionalKnapsack();
export default fk;