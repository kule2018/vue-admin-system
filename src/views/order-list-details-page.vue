<template>
  <div class="detail-box" :class="parentData.colNum">
    <div class="fill">
      <div>商品图</div>
      <div>
        <el-image
          v-if="detailsInfo.coverFigurePath"
          style="width: 100px; height: 100px"
          :src="detailsInfo.coverFigurePath"
          :preview-src-list="[detailsInfo.coverFigurePath]"
        >
        </el-image>
      </div>
    </div>
    <div class="fill">
      <div>商品名称</div>
      <div>{{ detailsInfo.name }}</div>
    </div>
    <div>
      <div>分类</div>
      <div>{{ detailsInfo.categoryName }}</div>
    </div>
    <div>
      <div>品牌</div>
      <div>{{ detailsInfo.brandName }}</div>
    </div>
    <div>
      <div>单位</div>
      <div>{{ detailsInfo.unitName }}</div>
    </div>
    <div>
      <div>价格</div>
      <div>{{ detailsInfo.price }}</div>
    </div>
    <div>
      <div>规格</div>
      <div>{{ detailsInfo.specs }}</div>
    </div>
    <div>
      <div>状态</div>
      <div>{{ detailsInfo.statusName }}</div>
    </div>
    <div>
      <div>起售数</div>
      <div>{{ detailsInfo.saleNum }}</div>
    </div>
    <div>
      <div>库存数</div>
      <div>{{ detailsInfo.inventoryNum }}</div>
    </div>
    <div>
      <div>是否新产品</div>
      <div>
        <template v-if="detailsInfo.newProduct">是</template>
        <template v-else>否</template>
      </div>
    </div>
    <div>
      <div>是否特价</div>
      <div>
        <template v-if="detailsInfo.special">是</template>
        <template v-else>否</template>
      </div>
    </div>
    <div class="fill">
      <div>描述</div>
      <div>{{ detailsInfo.describe }}</div>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";
import base from "@/api/base";
export default {
  name: "order-list-details-page",
  data() {
    return {
      detailsInfo: {},
      baseUrl: ""
    };
  },
  mounted() {
    this.$api.orderManageAPI
      .getOrderInfo({
        materialId: this.parentData.materialId
      })
      .then(res => {
        if (lodash.isEqual(res.code, "success")) {
          res.data.coverFigurePath =
            base.defaultBaseUrl + res.data.coverFigurePath;
          this.detailsInfo = res.data;
        } else {
          this.$vb.plugin.message.error(`获取订单信息失败:${res.code}`);
        }
      });
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
