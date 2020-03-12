<template>
  <div class="table-panel">
    <div class="search-bar">
      <el-input
        v-model="searchParam"
        placeholder="请输入用户名"
        size="small"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="search"
        >查询</el-button
      >
      <el-button type="primary" plain icon="el-icon-plus" size="small"
        >增加</el-button
      >
      <el-button plain icon="el-icon-refresh-left" size="small">重置</el-button>
    </div>
    <el-tabs v-model="tabActiveName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="冻结" name="freeze"></el-tab-pane>
      <el-tab-pane label="黑名单" name="blacklist"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="120"
      ></el-table-column>
      <el-table-column prop="QQ" label="QQ" width="120"></el-table-column>
      <el-table-column prop="weChat" label="微信"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="20"
      class="page"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchParam: "",
      tabActiveName: "all",
      tableData: [
        {
          name: "马总",
          email: "10001@qq.com",
          phone: "18811118888",
          QQ: "10001",
          weChat: "zht10001",
          age: "49"
        }
      ],
      currentPage: 1
    };
  },
  methods: {
    search() {
      console.log(this.searchParam);
      this.$api.userInfoAPI.getUserList({}).then(res => {
        console.log(res);
      });
    },
    handleClick() {},
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/table-page.scss";
</style>
