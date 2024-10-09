<script src="//unpkg.com/vue@2/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.15.14/lib/index.js"></script>
<div id="app">
<template>
   <el-table
      :data="tableData"
      stripe
      style="width: 100%">
    <el-table-column
              align="center"
       prop="date"
       label="供电方案x"
       width="180">
    </el-table-column>
    <el-table-column align="center"
                          prop="name"
                          label="投资与运维成本C+O(万元)"
                          width="140">
    </el-table-column>
    <el-table-column align="center"
                          prop="address"
                          label="网损变化期望成本E[ΔL](万元)"
                          width="140">
    </el-table-column>
      <el-table-column align="center"
                              value="10"
                              label="总成本(万元)"
                              width="140"
                              align="center">
         <template slot-scope="scope">
   {{ (Number(scope.row.name) + Number(scope.row.address)).toFixed(2) }}
      </template>
    </el-table-column>
  <!--     <el-table-column
     prop="check"
     label="操作">
     <el-button type="primary">查看</el-button>
    </el-table-column> -->
   </el-table>
</template>
</div>
<script>
var Main = {
  data() {
    return {
      tableData: [{
        date: '[1,2,7,4,5,17,20,20]',
        name: '146.4',
        address: '281.05'
      },
        {
          date: '[1,2,7,4,5,17,20,23]',
          name: '147.4',
          address: '281.1'
        }, {
          date: '[1,2,7,4,5,17,20,24]',
          name: '148.6',
          address: '281.9'
        }
      ]
    }
  }
}
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')
</script>
