<template>
  <basic-container>
    <el-row :gutter="0">
      <el-col :span="24">
        <el-button
          plain
          size="small"
          icon="el-icon-refresh"
          @click="refreshTheTable"
        ></el-button>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="addNewCategory"
          >新 增</el-button
        >
        <el-button
          plain
          size="small"
          type="danger"
          icon="el-icon-delete"
          @click="deleteSelectionCategory"
          >删 除
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        ref="table"
        size="small"
        row-key="id"
        v-loading="loading"
        :data="data"
        :fit="true"
        :stripe="false"
        :border="true"
        :max-height="620"
        :select-on-indeterminate="false"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @selection-change="onSelectionChange"
      >
        <el-table-column
          width="55"
          align="center"
          type="selection"
        ></el-table-column>
        <template v-for="(item, index) of column">
          <el-table-column :key="index" :prop="item.prop" :label="item.label">
            <div
              style="display: inline-block; width: 60%;"
              v-if="item.prop == 'name'"
              key="categoryTypeColumn"
              slot-scope="{ row }"
            >
              <div class="display-flex" style="justify-content: space-around;">
                <el-image
                  style="width: 60px; height: 60px"
                  :src="row.image"
                  :fit="contain"
                  :preview-src-list="[row.image]"
                ></el-image>
                <span>{{ row.name }}</span>
              </div>
            </div>
            <div
              v-else-if="item.prop == 'type'"
              key="typeColumn"
              slot-scope="{ row }"
            >
              <span v-if="row.type == 'default'" key="default">默认</span>
              <span v-else-if="row.type == 'books'" key="books">书籍</span>
              <span v-else key="other">其他</span>
            </div>
            <div
              v-else-if="item.prop == 'status'"
              key="statusColumn"
              slot-scope="{ row }"
            >
              <span v-if="row.status == 1" :key="1">显示</span>
              <span v-else :key="0">隐藏</span>
            </div>
            <div v-else key="descriptionColumn" slot-scope="{ row }">
              <span>{{ row.description }}</span>
            </div>
          </el-table-column>
        </template>
        <el-table-column prop="menu" label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button
              size="small"
              type="text"
              icon="el-icon-edit"
              @click="editCategoryInfo(row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="text"
              icon="el-icon-delete"
              @click="deleteCotegory(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-drawer
      width="50%"
      append-to-body
      :title="title"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :before-close="beforeCloseDialog"
      @open="onDialogFormOpen"
      @close="onDialogFormClose"
    >
      <el-form
        ref="form"
        size="small"
        label-width="auto"
        :model="form"
        :rules="rules"
      >
        <!-- 表单字段 -->
        <el-form-item label="分类名称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入分类名" />
        </el-form-item>
        <el-form-item label="分类类型：" prop="type">
          <el-select v-model="form.type" placeholder="请选择栏目类型">
            <el-option
              v-for="item in categoryType"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父级分类：" prop="parentId">
          <el-cascader
            clearable
            filterable
            ref="goodsCategoryCascader"
            v-model="form.parentId"
            :props="cascaderProps"
            :options="goodsCategory"
            :show-all-levels="false"
            :disabled="isDisableCascader"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="分类状态：" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分类图片：" prop="image">
          <div class="display-flex" style="justify-content: flex-start">
            <div
              class="display-flex add-img-button"
              key="image-button"
              v-if="!form.image"
              @click="addImage"
            >
              <i class="el-icon-plus"></i>
            </div>
            <div class="display-flex main-img-result" key="image-result" v-else>
              <el-image
                style="width: 100%; height: 100%"
                :src="form.image"
                :fit="fit"
                :preview-src-list="[form.image]"
              ></el-image>
              <i class="el-icon-error top-right-error" @click="removeImage"></i>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="分类描述：" prop="description">
          <el-input v-model="form.description" placeholder="请输入描述" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button
          type="primary"
          icon="el-icon-circle-check"
          size="small"
          @click="submitTheForm"
          >提 交</el-button
        >
      </template>
    </el-drawer>
    <resource-table
      width="60%"
      dialogTitle="选择图片"
      tableType="image"
      :dialogVisible.sync="dialogResourceTableVisible"
      :updateForm="updateForm"
      v-bind="$attrs"
    />
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      /* 配置状态 */
      loading: true,
      dialogFormVisible: false,
      dialogResourceTableVisible: false,
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 40,
      },
      column: [
        {
          label: "分类",
          prop: "name",
        },
        {
          label: "类型",
          prop: "type",
        },
        {
          label: "状态",
          prop: "status",
        },
        {
          label: "描述",
          prop: "description",
        },
      ],
      rules: {
        name: [
          {
            required: true,
            message: "请输入商品标题",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择分类类型",
            trigger: "change",
          },
        ],
        parentId: [
          {
            required: true,
            message: "请选择父级分类",
            trigger: "change",
          },
        ],
        status: [
          {
            required: true,
            message: "请选择分类状态",
            trigger: "change",
          },
        ],
      },
      categoryType: [
        { dictKey: "default", dictValue: "默认" },
        { dictKey: "books", dictValue: "书籍" },
        { dictKey: "other", dictValue: "其他" },
      ],
      cascaderProps: {
        multiple: false,
        checkStrictly: true,
        emitPath: false,
        label: "title",
        value: "value",
        children: "children",
      },
      /* 数据 */
      title: "",
      data: [],
      selectionList: [],
      goodsCategory: [],
      form: {
        name: null,
        type: "default",
        image: null,
        description: null,
        status: 1,
        parentId: null,
      },
    };
  },
  mounted() {
    this.getGoodsCategoryList(this.page);
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
    isEditMode() {
      return this.title == "编辑分类" ? true : false;
    },
    isDisableCascader() {
      const { parentId } = this.form;
      return parentId == "0" ? true : false;
    }
  },
  methods: {
    getGoodsCategoryList(page, params = {}) {
      this.loading = true;
      getList(page.currentPage, page.pageSize, params).then(
        ({ data: { code, data } }) => {
          if (code == 200) {
            this.data = data;
            this.loading = false;
          }
        }
      );
    },
    refreshTheTable() {
      this.getGoodsCategoryList(this.page);
    },
    addNewCategory() {
      this.title = "新增分类";
      this.dialogFormVisible = true;
    },
    deleteSelectionCategory() {
      if (this.selectionList.length === 0) {
        return this.$message.warning("请选择至少一条数据");
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
          this.$refs.table.clearSelection();
          this.getGoodsCategoryList(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    editCategoryInfo(row) {
      getDetail(row.id).then(({ data: { code, data } }) => {
        if (code == 200) {
          Object.assign(this.form, data);
        }
      });
      this.title = "编辑分类";
      this.dialogFormVisible = true;
    },
    deleteCotegory(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.getGoodsCategoryList(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    onSelectionChange(selection) {
      this.selectionList = selection;
    },
    onDialogFormOpen() {
      getTree().then(({ data: { code, data } }) => {
        if (code == 200) {
          this.goodsCategory = data;
        }
      });
    },
    onDialogFormClose() {
      this.$refs.form.resetFields();
      this.dialogFormVisible = false;
    },
    addImage() {
      this.dialogResourceTableVisible = true;
    },
    removeImage() {
      this.form.image = "";
    },
    updateForm(tableType, selection, data) {
      this.form.image = data.link;
    },
    submitTheForm() {
      const { isEditMode, form } = this;
      this.$refs.form.validate().then((isPassValidate) => {
        if (isPassValidate) {
          if (isEditMode) {
            update(form).then(({ data: { code } }) => {
              if (code == 200) {
                this.$refs.form.resetFields();
                this.dialogFormVisible = false;
                this.getGoodsCategoryList(this.page);
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
              }
            });
          } else {
            add(form).then(({ data: { code } }) => {
              if (code == 200) {
                this.$refs.form.resetFields();
                this.dialogFormVisible = false;
                this.getGoodsCategoryList(this.page);
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
              }
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.display-flex {
  display: flex;
  align-items: center;
}
.add-img-button {
  width: 60px;
  height: 60px;
  border: 3px dashed #e6e6e6;
  border-radius: 4px;
  justify-content: center;
}
.main-img-result {
  position: relative;
  width: 60px;
  height: 60px;
  border: 3px dashed #e6e6e6;
  border-radius: 4px;
  justify-content: center;
}
.top-right-error {
  position: absolute;
  top: -8px;
  right: -8px;
}
</style>
