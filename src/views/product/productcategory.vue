<template>
  <basic-container>
    <div class="avue-crud">
      <!-- 头部功能菜单 -->
      <el-row>
        <div class="avue-crud__menu">
          <!-- 头部左侧按钮模块 -->
          <div class="avue-crud__left">
            <el-button
              :size="option.size"
              plain
              icon="el-icon-refresh"
              @click="searchChange"
            ></el-button>
            <el-button
              :size="option.size"
              type="primary"
              icon="el-icon-plus"
              @click="handleAdd"
              >新增</el-button
            >
            <el-button
              :size="option.size"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete"
              plain
              >删除
            </el-button>
          </div>
          <!-- 头部右侧按钮模块 -->
          <div class="avue-crud__right"></div>
        </div>
      </el-row>
      <!-- 列表模块 -->
      <el-row>
        <el-table
          stripe
          ref="table"
          v-loading="loading"
          :size="option.size"
          @selection-change="selectionChange"
          :data="data"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          style="width: 100%"
          :border="option.border"
        >
          <el-table-column
            type="selection"
            v-if="option.selection"
            width="55"
            align="center"
          ></el-table-column>
          <!-- 预留展开按钮 -->
          <el-table-column
            type="expand"
            v-if="option.expand"
            align="center"
          ></el-table-column>
          <el-table-column
            v-if="option.index"
            label="ID"
            type="index"
            width="50"
            align="center"
          >
          </el-table-column>
          <template v-for="(item, index) in option.column">
            <!-- table字段 -->
            <el-table-column
              v-if="item.hide !== true"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :key="index"
              :lable="item.lable"
            >
              <!-- 分类图 -->
              <el-image
                v-if="item.label === '分类图片'"
                style="width: 58px; height: 58px"
                :src="item.lable"
                :fit="contain"
                class="image-slot"
              ></el-image>
            </el-table-column>
          </template>
          <!-- 操作栏模块 -->
          <el-table-column
            prop="menu"
            label="操作"
            :min-width="100"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-button
                :size="option.size"
                type="text"
                icon="el-icon-magic-stick"
                @click="rowHide(row)"
              >
                <!-- 阿里 svg -->
                <!-- <svg
                  t="1667744486012"
                  color="red"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1742"
                  width="12"
                  height="12"
                >
                  <path
                    type="primary"
                    d="M917.333333 573.866667l-87.466666-87.466667c34.133333-32 66.133333-68.266667 91.733333-108.8 8.533333-14.933333 4.266667-34.133333-10.666667-44.8-14.933333-8.533333-34.133333-4.266667-44.8 10.666667-76.8 125.866667-209.066667 200.533333-356.266666 200.533333-145.066667 0-279.466667-74.666667-354.133334-198.4-8.533333-14.933333-29.866667-19.2-44.8-10.666667-14.933333 8.533333-19.2 29.866667-10.666666 44.8 25.6 40.533333 55.466667 76.8 91.733333 108.8l-85.333333 85.333334c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333l91.733333-91.733334c38.4 25.6 81.066667 46.933333 125.866667 59.733334l-34.133333 130.133333c-4.266667 17.066667 6.4 34.133333 23.466666 38.4 2.133333 0 6.4 2.133333 8.533334 2.133333 14.933333 0 27.733333-8.533333 29.866666-23.466666l36.266667-132.266667c25.6 4.266667 51.2 6.4 78.933333 6.4 27.733333 0 55.466667-2.133333 83.2-6.4l36.266667 132.266667c4.266667 14.933333 17.066667 23.466667 29.866667 23.466666 2.133333 0 6.4 0 8.533333-2.133333 17.066667-4.266667 27.733333-21.333333 23.466667-38.4L661.333333 584.533333c44.8-12.8 85.333333-34.133333 123.733334-59.733333l91.733333 91.733333c6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466666-8.533334c6.4-10.666667 6.4-29.866667-6.4-42.666666z"
                    p-id="1743"
                  ></path></svg> -->
                隐藏
              </el-button>
              <el-button
                :size="option.size"
                type="text"
                icon="el-icon-view"
                @click="handleView(row)"
                >查看</el-button
              >
              <el-button
                :size="option.size"
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(row)"
                >编辑</el-button
              >
              <el-button
                :size="option.size"
                type="text"
                icon="el-icon-delete"
                @click="rowDel(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 表单模块 -->
      <el-dialog
        :title="title"
        :visible.sync="box"
        width="50%"
        :before-close="beforeClose"
        append-to-body
      >
        <el-form
          :disabled="view"
          :size="option.size"
          ref="form"
          :model="form"
          label-width="80px"
          :rules="category"
        >
          <!-- 表单字段 -->
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入" @blur="valiForm('分类名称' ,form.name)" />
          </el-form-item>
          <el-form-item label="分类类型" prop="type">
            <el-select
              v-model="form.type"
              clearable
              placeholder="请选择栏目类型"
            >
              <el-option
                v-for="item in typeData"
                :key="item.dictKey"
                :label="item.dictValue"
                :value="item.dictKey"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类图片" prop="image">
            <el-input v-model="form.image" placeholder="请输入图片地址" @blur="valiForm('分类图片' ,form.image)"/>
          </el-form-item>
          <el-form-item label="上级分类" prop="parentId">
            <el-tree
              :data="treeData"
              v-model="form.parentId"
              placeholder="请选择父ID"
              :props="defaultProps"
              @node-click="handleNodeClick"
            >
            </el-tree>
          </el-form-item>
          <!-- 结构返回数据字段有误，应该是 weight -->
          <el-form-item label="分类权重" prop="weigh">
            <el-input v-model="form.weigh" placeholder="请输入权重" />
          </el-form-item>
          <el-form-item label="分类描述" prop="description">
            <el-input v-model="form.description" placeholder="请输入描述" />
          </el-form-item>
          <el-form-item label="分类状态" prop="status">
            <el-input v-model="form.status" placeholder="请输入状态" />
          </el-form-item>
        </el-form>
        <!-- 表单按钮 -->
        <span v-if="!view" slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            icon="el-icon-circle-check"
            :size="option.size"
            @click="handleSubmit"
            >提 交</el-button
          >
          <el-button
            icon="el-icon-circle-close"
            :size="option.size"
            @click="box = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
    </div>
  </basic-container>
</template>

<script>
import {
  getList,
  getDetail,
  getTree,
  add,
  update,
  remove,
} from "@/api/product/productcategory";
import option from "@/const/product/productcategory";
import { mapGetters } from "vuex";
import { validatenull } from "@/util/validate";

export default {
  data() {
    return {
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
      // 树型组件默认配置
      defaultProps: {
        children: "children",
        label: "name",
      },
      // 某一行表单数据
      form: {},
      // 选择行
      selectionList: [],
      // 表单配置
      option: option,
      // 表单列表
      data: [],
      // 父节点列表
      treeData: [],
      // 表单树组件配置选项
      defaultProps: {
        label: "title",
        children: "children",
      },
      // 商品分类类型
      typeData: [
        { dictKey: 1, dictValue: "食品" },
        { dictKey: 2, dictValue: "数码" },
        { dictKey: 3, dictValue: "学习" },
      ],
    };
  },
  mounted() {
    this.init();
    this.onLoad(this.page);
  },
  computed: {
    ...mapGetters(["permission"]),
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  methods: {
    init() {},
    handleNodeClick(data) {
      this.form.parentId = data.id;
    },
    searchHide() {
      this.search = !this.search;
    },
    searchChange() {
      this.onLoad(this.page);
    },
    searchReset() {
      this.query = {};
      this.page.currentPage = 1;
      this.onLoad(this.page);
    },
    handleSubmit() {
      if (validatenull(this.form.parentId)) {
        this.form.parentId = 0;
      }
      if (!this.form.id) {
        add(this.form).then(() => {
          this.box = false;
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
      } else {
        update(this.form).then(() => {
          this.box = false;
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
      }
    },
    // 新增分类
    handleAdd() {
      this.title = "新增分类";
      this.form = {};
      this.box = true;
    },
    // 编辑分类
    handleEdit(row) {
      this.title = "编辑分类";
      this.box = true;
      getDetail(row.id).then((res) => {
        this.form = res.data.data;
      });
    },
    // 查看分类
    handleView(row) {
      this.title = "查看分类";
      this.view = true;
      this.box = true;
      getDetail(row.id).then((res) => {
        this.form = res.data.data;
      });
    },
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.selectionClear();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    rowHide(row) {
      let that = this;

      that
        .$confirm("确定隐藏该分类？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then((res) => {
          console.log("隐藏分类测试", res, row);
          that.$message({
            message: "已隐藏",
            type: "success",
          });
        })
        .catch((err) => {
          console.log("隐藏分类测试", err);
          that.$message({
            message: "已取消隐藏",
            type: "warning",
          });
        });
    },
    // 关闭弹窗前的回调
    beforeClose(done) {
      done();
      this.form = {};
      this.view = false;
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.table.clearSelection();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.onLoad(this.page);
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.onLoad(this.page);
    },
    onLoad(page, params = {}) {
      this.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then((res) => {
        this.data = res.data.data;
        this.loading = false;
        getTree().then((res) => {
          this.treeData = res.data.data;
        });
      });
    },
    // 验证表单不为空
    valiForm(key ,val) {
      let that = this;
      if (validatenull(val)) {
        return that.$message({
          message: `${key}不能为空！`,
          type: "error"
        })
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
