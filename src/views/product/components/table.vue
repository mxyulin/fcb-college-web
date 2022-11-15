<template>
  <!-- 列表模块 -->
  <div v-loading="loading">
    <el-table
      stripe
      ref="table"
      :data="goodsData"
      :size="option.size"
      style="width: 100%"
      tooltip-effect="dark"
      :header-cell-style="{ background: '#FAFAFA' }"
      @row-dblclick="goodsOpt"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
      :cell-class-name="tableCellClassName"
      :header-cell-class-name="tableCellClassName"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="商品" min-width="100">
        <template slot-scope="scope">
          <div class="display-flex goods-name">
            <!-- 商品图 -->
            <div>
              <el-image
                style="width: 58px; height: 58px"
                :src="scope.row.image"
                fit="contain"
                class="image-slot"
              >
                <div slot="error">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <!-- 商品名和规格 -->
            <div>
              <div
                class="ellipsis-item"
                style="margin-top: 8px; line-height: 1"
              >
                {{ scope.row.title }}
              </div>
              <div style="margin-top: 13px">
                <span
                  v-if="scope.row.isSku == 1"
                  style="color: #444; margin-right: 12px; line-height: 20px"
                >
                  {{ scope.row.isSku == 1 ? "多规格" : "" }}
                </span>
                <div
                  v-if="scope.row.activity_type || scope.row.app_type"
                  class="activity-type display-flex"
                >
                  <div
                    v-if="scope.row.app_type"
                    class="activity-tags full-activity-tag"
                  >
                    {{ scope.row.app_type_text }}
                  </div>
                  <!-- 暂不使用 -->
                  <!-- <template
                          v-for="(b, a) in scope.row.activity_type_text_arr"
                        >
                          <template v-if="a == 'groupon'">
                            <div class="activity-tags groupon-activity-tag">
                              拼团
                            </div>
                          </template>
                          <div
                            v-if="a == 'seckill'"
                            class="activity-tags seckill-activity-tag"
                          >
                            {{ b }}
                          </div>
                          <div
                            v-if="
                              a == 'full_reduce' ||
                              a == 'full_discount' ||
                              a == 'free_shipping'
                            "
                            class="activity-tags full-activity-tag"
                          >
                            {{ b }}
                          </div>
                        </template> -->
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" min-width="100" sortable>
      </el-table-column>
      <el-table-column prop="sales" label="销量" min-width="100" sortable>
      </el-table-column>
      <el-table-column prop="views" label="浏览量" min-width="100" sortable>
      </el-table-column>
      <el-table-column prop="stock" label="库存" min-width="100" sortable>
      </el-table-column>
      <el-table-column label="更新时间" min-width="100">
        <template slot-scope="scope">
          <div>
            {{ scope.row.updateTime }}
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="180">
        <template slot-scope="scope">
          <!-- 上架的下拉菜单 -->
          <el-popover placement="bottom" trigger="hover" width="100">
            <div class="display-flex status-box">
              <el-button
                plain
                type="primary"
                class="common-btn status-btn"
                v-if="scope.row.status != 1"
                @click="updateStatus(scope.row.id, 1)"
              >
                上架
              </el-button>
              <el-button
                plain
                type="warning"
                class="common-btn status-btn"
                v-if="scope.row.status != 2"
                @click="updateStatus(scope.row.id, 2)"
              >
                下架
              </el-button>
              <el-button
                plain
                type="info"
                class="common-btn status-btn"
                v-if="scope.row.status != 0"
                @click="updateStatus(scope.row.id, 0)"
              >
                隐藏
              </el-button>
            </div>
            <!-- 上架按钮 -->
            <span slot="reference" style="cursor: pointer; margin-right: 5px">
              <el-button
                icon="icon-move-up"
                type="text"
                v-if="scope.row.status == 1"
                >上架
              </el-button>
              <el-button
                icon="icon-move-down"
                type="text"
                v-if="scope.row.status == 2"
                >下架
              </el-button>
              <el-button
                icon="icon-hideinvisiblehidden"
                type="text"
                v-if="scope.row.status == 0"
                >隐藏
              </el-button>
            </span>
          </el-popover>
          <!-- 编辑 -->
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="goodsEidit(scope.row)"
            >编辑
          </el-button>
          <!-- 复制 -->
          <el-button type="text" icon="el-icon-s-order" disabled>复制 </el-button>
          <!-- 删除 -->
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="rowDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import option from "@/const/product/product";
import { validatenull } from "@/util/validate";
import { update, remove } from "@/api/product/product";

export default {
  /*
   * 父组件传来的数据 goodsData
   * 父组件绑定的事件 getGoodsData, selectionChange, handleEdit
   */
  name: "Table",
  props: ["goodsData", "loading"],
  data() {
    return {
      // 表单配置
      option: option,
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    init() {},
    // 更新上架状态
    updateStatus(id, status) {
      let that = this;
      // 提交数据
      update({ id, status }).then((res) => {
        if (res.data.code == 200) {
          // 上架状态更新后获取最新列表数据
          that.$emit("getGoodsData");
        }
      });
    },
    // 编辑商品
    goodsEidit(row) {
      this.$emit("handleEdit", row);
    },
    // 删除当前行
    rowDel(row) {
      let that = this;
      that
        .$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          that.$$emit("getGoodsData");
          that.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    // 保存已选列表
    handleSelectionChange(val) {
      this.$emit("selectionChange", val);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/views/product/styles/product.scss";
</style>

<style lang="scss">
// *el-popover 与 app 组件平行，故不能限制样式的作用域（不能写 scoped）
.el-popover {
  min-width: 120px;
}
</style>
