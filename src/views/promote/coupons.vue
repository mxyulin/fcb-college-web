<template>
  <basic-container>
    <div id="indexPage" v-cloak>

      <div class="custom-header display-flex">
        <div class="choose-status">优惠券</div>
        <div class="custom-search">
          <el-input
            placeholder="请输入标题"
            suffix-icon="el-icon-search"
          >
          </el-input>
        </div>
      </div>

      <div class="custom-table">
        <div class="custom-table-header display-flex-b">
          <div class="display-flex">
            <div class="custom-refresh display-flex-c">
              <i class="el-icon-refresh"></i>
            </div>
            <div class="create-btn display-flex-c">
              <i class="el-icon-plus"></i>
              <span>新建优惠券</span>
            </div>
          </div>
        </div>

        <div>
          <el-table
            ref="multipleTable"
            :data="data"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
            :row-class-name="tableRowClassName"
            :cell-class-name="tableCellClassName"
            :header-cell-class-name="tableCellClassName"
            @row-dblclick="operation"
          >
            <el-table-column type="selection" min-width="40"> </el-table-column>
            <el-table-column label="ID" min-width="60" prop="id">
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
              <template slot-scope="scope">
                {if condition = "$auth->check('shopro/coupons/edit')"}
                <span
                  class="table-edit-text"
                  @click="operation('edit', scope.row.id)"
                  >编辑
                </span>
                {/if} {if condition = "$auth->check('shopro/coupons/del')"}
                <span
                  class="table-delete-text"
                  @click="operation('del', scope.row.id)"
                  >删除</span
                >
                {/if}
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="pagination-container display-flex">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPage"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/promote/coupons";
  import option from "@/const/promote/coupons";
  import {mapGetters} from "vuex";
  import {getDictionary} from '@/api/system/dict'

export default {
  data() {
    return {
      // 弹框标题
      title: '',
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
        total: 40
      },
      // 表单数据
      form: {},
      // 选择行
      selectionList: [],
      // 表单配置
      option: option,
      // 表单列表
      data: [],
    }
  },
  mounted() {
    this.init();
    this.onLoad(this.page);
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    init() {
    },
    onLoad(page, params = {}) {
      this.loading = true;
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/views/promote/style/coupons.scss";
</style>

<style lang="scss" >
</style>