<template>
  <div class="detail-box" :class="parentData.colNum">
    <div>
      <div>登记单号</div>
      <div>AHKJ091823900981</div>
    </div>
    <div>
      <div>资产名称</div>
      <div>文件柜</div>
    </div>
    <div>
      <div>资产分类</div>
      <div>办公分类</div>
    </div>
    <div>
      <div>资产编码</div>
      <div>091829381798283</div>
    </div>
    <div>
      <div>使用时长(月)</div>
      <div>2019-11-01</div>
    </div>
    <div>
      <div>产品价格</div>
      <div>20000.00</div>
    </div>
    <div>
      <div>预计净产值</div>
      <div>1000</div>
    </div>
    <div>
      <div>关联流程</div>
      <div>系统管理员_资产入库</div>
    </div>
    <div>
      <div>管理员</div>
      <div>系统管理员</div>
    </div>
    <div>
      <div>使用范围</div>
      <div>全部人员</div>
    </div>
    <div>
      <div>使用部门</div>
      <div></div>
    </div>
    <div>
      <div>使用角色</div>
      <div></div>
    </div>
    <div>
      <div>登记操作员</div>
      <div>系统管理员</div>
    </div>
    <div>
      <div>登记时间</div>
      <div>2019-11-02 10:54:02</div>
    </div>
    <div>
      <div>备注</div>
      <div></div>
    </div>
    <div>
      <div>物品图片</div>
      <div>
        <div class="img-box">
          <el-image
            class="img"
            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4181552449,3506734506&fm=26&gp=0.jpg"
            :preview-src-list="srcList"
          ></el-image>
          <p>201808121757.png</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail-page",
  data() {
    return {
      srcList: [
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4181552449,3506734506&fm=26&gp=0.jpg"
      ]
    };
  },
  props: {
    // 父组件传的数据
    parentData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  layerid: {
    // 当前弹层id，用于关闭弹层
    type: String,
    default: ""
  },
  lydata: {
    // 该值为父组件data的浅拷贝,更改父窗口传递的数据的时候，可以直接使用lydata来修改
    type: Object,
    default: () => {
      return {};
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/detail-page.scss";
</style>
