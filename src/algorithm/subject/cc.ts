let a = [
    {
        "name": "A",
        "num": 8,
        "children": []
    },
    {
        "name": "B",
        "num": 4,
        "children": []
    },
    {
        "name": "C",
        "num": 3,
        "children": []
    },
    {
        "name": "D",
        "num": 5,
        "children": [
            {
                "name": "D0",
                "num": 4,
                "children": []
            },
            {
                "name": "D1",
                "num": 1,
                "children": []
            }
        ]
    },
    {
        "name": "E",
        "num": 0,
        "children": []
    },
    {
        "name": "F",
        "num": 5,
        "children": [
            {
                "name": "F0",
                "num": 2,
                "children": [
                    {
                        "name": "F00",
                        "num": 0,
                        "children": [
                            {
                                "name": "F000",
                                "num": 9,
                                "children": [
                                    {
                                        "name": "F0000",
                                        "num": 9,
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "F01",
                        "num": 7,
                        "children": []
                    }
                ]
            },
            {
                "name": "F1",
                "num": 2,
                "children": []
            },
            {
                "name": "F0",
                "num": 8,
                "children": []
            },
            {
                "name": "F1",
                "num": 0,
                "children": []
            },
            {
                "name": "F0",
                "num": 6,
                "children": [
                    {
                        "name": "F00",
                        "num": 7,
                        "children": [
                            {
                                "name": "F000",
                                "num": 3,
                                "children": [
                                    {
                                        "name": "F0000",
                                        "num": 3,
                                        "children": []
                                    },
                                    {
                                        "name": "F0001",
                                        "num": 4,
                                        "children": [
                                            {
                                                "name": "F00010",
                                                "num": 1,
                                                "children": []
                                            },
                                            {
                                                "name": "F00011",
                                                "num": 7,
                                                "children": [
                                                    {
                                                        "name": "F000110",
                                                        "num": 7,
                                                        "children": [
                                                            {
                                                                "name": "F0001100",
                                                                "num": 3,
                                                                "children": []
                                                            },
                                                            {
                                                                "name": "F0001101",
                                                                "num": 5,
                                                                "children": []
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "name": "F000111",
                                                        "num": 8,
                                                        "children": []
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "F0002",
                                        "num": 6,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "F001",
                                "num": 4,
                                "children": []
                            },
                            {
                                "name": "F002",
                                "num": 2,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": "F01",
                        "num": 4,
                        "children": [
                            {
                                "name": "F010",
                                "num": 0,
                                "children": [
                                    {
                                        "name": "F0100",
                                        "num": 4,
                                        "children": []
                                    },
                                    {
                                        "name": "F0101",
                                        "num": 5,
                                        "children": [
                                            {
                                                "name": "F01010",
                                                "num": 5,
                                                "children": []
                                            },
                                            {
                                                "name": "F01011",
                                                "num": 7,
                                                "children": []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "F02",
                        "num": 7,
                        "children": []
                    },
                    {
                        "name": "F00",
                        "num": 2,
                        "children": []
                    },
                    {
                        "name": "F01",
                        "num": 3,
                        "children": []
                    }
                ]
            },
            {
                "name": "F1",
                "num": 2,
                "children": []
            }
        ]
    },
    {
        "name": "G",
        "num": 9,
        "children": [
            {
                "name": "G0",
                "num": 4,
                "children": []
            }
        ]
    },
    {
        "name": "H",
        "num": 0,
        "children": []
    },
    {
        "name": "I",
        "num": 0,
        "children": []
    },
    {
        "name": "J",
        "num": 5,
        "children": []
    },
    {
        "name": "K",
        "num": 2,
        "children": [
            {
                "name": "K0",
                "num": 7,
                "children": []
            }
        ]
    }
]
interface MyObj {
    "name": string;
    "num": number;
    "totalNum"?:number;
    "children": Array<MyObj>;
}
function fun1(arr:Array<MyObj>,totalNum:number = 0) {
    arr.forEach(item=>{
        if(item.children.length < 1){
            //没有子数组，直接赋值
            item.totalNum = item.num + totalNum
        }else {
            //如果是没有父亲的，totalNum一定为0，直接赋值
            if(totalNum ===0 ){
                item.totalNum = item.num
            }else{
                //如果是有父亲的，totalNum为父的totalnum+自己的num
                item.totalNum = item.num + totalNum
            }
            fun1(item.children,item.totalNum)
        }
    })
}
fun1(a)
console.log(a)
