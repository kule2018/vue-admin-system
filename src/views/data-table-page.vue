<template>
  <div style="width: 90%;margin: 20px auto">
    <el-data-table v-bind="tableConfig" />
  </div>
</template>

<script>
import baseAddress from "@/api/base";
export default {
  name: "data-table-page",
  created() {
    this.$api.userInfoAPI.getUserList({ size: 10, page: 1 }).then(res => {
      console.log(res);
    });
  },
  data() {
    return {
      tableConfig: {
        url: `${baseAddress.mock}/getUserList`,
        dataPath: "userList",
        totalPath: "totalElements",
        columns: [
          {
            prop: "name",
            label: "用户名"
          },
          {
            prop: "email",
            label: "邮箱"
          },
          {
            prop: "phone",
            label: "电话"
          },
          {
            prop: "QQ",
            label: "QQ"
          },
          {
            prop: "weChat",
            label: "微信"
          },
          {
            prop: "age",
            label: "年龄"
          }
        ],
        searchForm: [
          {
            type: "input",
            id: "name",
            label: "用户名",
            el: {
              placeholder: "请输入"
            }
          }
        ],
        form: [
          {
            type: "input",
            id: "name",
            label: "用户名",
            el: {
              placeholder: "请输入用户名"
            },
            rules: [
              {
                required: true,
                message: "请输入用户名",
                trigger: "blur"
              }
            ]
          }
        ]
      }
    };
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/data-table-page.scss";
</style>
