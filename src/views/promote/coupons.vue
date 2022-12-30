<template>
  <basic-container>
    <div id="indexPage" v-cloak>
      <div class="custom-header display-flex">
        <div class="choose-status">优惠券</div>
        <div class="custom-search">
          <el-input placeholder="请输入标题" suffix-icon="el-icon-search">
          </el-input>
        </div>
      </div>

      <div class="custom-table">
        <div class="custom-table-header display-flex-b">
          <div class="display-flex">
            <div class="custom-refresh display-flex-c">
              <i class="el-icon-refresh"></i>
            </div>
            <div class="create-btn display-flex-c shopro-screen-button" @click="dialogcopons">
              <i class="el-icon-plus"></i>
              <span>新建优惠券</span>
            </div>
          </div>
        </div>

        <div>
          <el-table
            ref="multipleTable"
            :data="coponsdata"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @row-dblclick="operation"
          >
            <el-table-column type="selection" min-width="40"> </el-table-column>
            <el-table-column label="id" min-width="60" prop="id">
            </el-table-column>
            <el-table-column label="优惠券名称" min-width="150">
              <template slot-scope="scope">
                <div class="ellipsis-item">
                  {{ scope.row.name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="优惠券描述" min-width="160">
              <template slot-scope="scope">
                <div class="ellipsis-item">
                  {{ scope.row.description }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="优惠内容" min-width="180">
              <template slot-scope="scope">
                <div>满{{ scope.row.enough }}元,减{{ scope.row.amount }}元</div>
              </template>
            </el-table-column>
            <el-table-column label="优惠券类型" min-width="100">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.type_text }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="getnum" label="已领取" min-width="80">
            </el-table-column>
            <el-table-column prop="usenum" label="已使用" min-width="80">
            </el-table-column>
            <el-table-column prop="stock" label="剩余" min-width="70">
            </el-table-column>
            <el-table-column prop="gettime" label="有效期" min-width="300">
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="110">
              <template>
                <span class="table-edit-text">编辑 </span>

                <span class="table-delete-text">删除</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="pagination-container display-flex">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          >
          </el-pagination>
        </div>

        <!-- 组件调用 -->
        <el-dialog append-to-body="ture" :visible.sync="box" width="60%" center>
          <couponsedit></couponsedit>
        </el-dialog>
      </div>
    </div>
  </basic-container>
</template>

<script>
import { getList } from "@/api/promote/coupons";
import option from "@/const/promote/coupons";
// 组件
import couponsedit from "./components/couponsedit.vue";

export default {
  components: { couponsedit },
  data() {
    return {
      coponsdata: [
        {
          selection: 0,
          id: "1",
          name: "默默1",
          description: "待定",
          enough: 100,
          amount: 80,
          type_text: "不知道",
          getnum: "1",
          usenum: "2",
          stock: "3",
          gittime: "有效日期",
        },
      ],

      // 弹框标题
      title: "",
      // 是否展示弹框
      box: false,
      // 是否显示查询
      search: true,
      // 加载中
      loading: true,
      // 是否为查看模式
      view: false,
      // 查询信息
      query: {},
      // 分页信息
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 40,
      },
      // 表单数据
      form: {},
      // 选择行
      selectionList: [],
      // 表单配置
      option: option,
      // 表单列表
      data: [],
    };
  },
  mounted() {
    this.init();
    this.onLoad(this.page);
  },
  computed: {},
  methods: {
    dialogcopons(){
      this.box= true
    },
    init() {},
    // 发请求
    onLoad(page, params = {}) {
      this.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/promote/style/coupons.scss";
</style>

<style lang="scss"></style>
