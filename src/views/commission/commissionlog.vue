<template>
  <basic-container>
    <div id="indexPage">
      <div class="shopro-screen-container">
        <div class="shopro-button shopro-refresh-button">
          <i class="el-icon-refresh"></i>
        </div>

        <div class="display-flex shopro-screen-item">
          <div class="really-status-tip">实时动态</div>
          <el-popover
            placement="top"
            trigger="hover"
            content="开启后，该页面将实时刷新"
          >
            <i class="el-icon-question really-status-icon" slot="reference"></i>
          </el-popover>
          <el-switch
            @change="changeReallyStatus"
            v-model="really_status"
            active-value="1"
            inactive-value="0"
            active-color="#7536D0"
            inactive-color="#eee"
          >
          </el-switch>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="shopro-screen-condition">
            <el-input
            v-model="searchForm.form_1_value"
            placeholder="请输入内容"
            class="screen-item-select"
            size="small"
          >
            <el-select
              v-model="searchForm.form_1_key"
              slot="prepend"
              placeholder="请选择"
            >
              <el-option label="分销用户ID" value="agent_id"></el-option>
              <el-option label="分销用户昵称" value="b"></el-option>
              <el-option label="分销用户手机号" value="c"></el-option>
            </el-select>
          </el-input>
          </div>
        </div>


        <div class="display-flex shopro-screen-item">
          <div class="shopro-screen-tip">操作人类型</div>
          <div class="shopro-screen-condition">
            <el-select
              placeholder="请选择动态类型"
              size="small"
              v-model="searchForm.oper_type"
            >
              <el-option
                v-for="(type,index) in this.operTypeOptions"
                :key="index"
                :label="type.label"
                :value="type.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague"
        v-if="
            this.searchForm.oper_type == 'user' || this.searchForm.oper_type == 'admin'
          "
        >
          <div class="shopro-screen-condition">
          <el-input
            placeholder="请输入内容"
            v-model="searchForm.form_2_value"
            class="screen-item-select"
            size="small"
          >
            <el-select
              v-model="searchForm.form_2_key"
              slot="prepend"
              placeholder="请选择"
            >
              <el-option label="操作人ID" value="oper_id"></el-option>
              <el-option label="操作人昵称" value="oper_nickname"></el-option>
              <el-option
                label="操作人手机号"
                value="oper_mobile"
                v-if="this.searchForm.oper_type == 'user'"
              ></el-option>
            </el-select>
          </el-input>
          </div>
        </div>

        <div class="display-flex shopro-screen-item">
          <div class="shopro-screen-tip">动态时间</div>
          <div>
            <el-date-picker
              v-model="this.searchForm.createtime"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              size="small"
              format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </div>

        <div class="display-flex shopro-screen-item">
          <div class="shopro-screen-tip">动态类型</div>
          <div class="shopro-screen-condition">
            <el-select
              v-model="searchForm.event"
              placeholder="请选择动态类型"
              size="small"
            >
              <el-option
                :label="log.name"
                :value="log.type"
                v-for="(log,i) in logOptions"
                :key="i"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        
        <div class="display-flex shopro-screen-item-button">
          <div class="shopro-button shopro-reset-button">
            重置
          </div>
          <div
            class="shopro-button shopro-screen-button"
          >
            筛选
          </div>
        </div>
      </div>

      <div class="shopro-table-container">
        <el-table :data="listData" style="width: 100%" border stripe="true" :cell-class-name="tableCellClassName"
            :header-cell-class-name="tableCellClassName">
           
            <el-table-column prop="tenanId" label="动态筛选" min-width="100">
              
            </el-table-column>
            <el-table-column label="分销商" width="160">
                <template slot-scope="scope">
                      <div class="active-cursor-line">
                          {{scope.row.event}}
                      </div>
                    <!-- <el-popover placement="bottom"  width="180">
                        <div class="popover-container">
                            <div class="display-flex">
                                <div class="display-flex">
                                    <div class="popover-tip">用户ID</div>：
                                </div>
                                <div class="active-cursor-line">
                                    {{scope.row.event}}
                                </div>
                            </div>
                            <div class="display-flex" v-if="scope.row.agent && scope.row.agent.mobile">
                                <div class="display-flex">
                                    <div class="popover-tip">手机号</div>：
                                </div>
                                <div></div>
                            </div>
                        </div>
                        <div class="display-flex" slot="reference" v-if="scope.row.agent">
                            <div class="table-image">
                                <el-image fit="contain">
                                    <div slot="error" class="image-slot">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </el-image>
                            </div>
                            <div class="ellipsis-item"></div>
                        </div>
                    </el-popover> -->
                    <!-- <div v-if="!scope.row.agent">-</div> -->
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="内容" width="400">
            </el-table-column>
            <el-table-column prop="operId" label="操作人类型" width="100">
            </el-table-column>
            <el-table-column label="操作人" width="160">
                <template slot-scope="scope">
                  <div>
                    {{scope.row.operType}}
                  </div>
                    <!-- <div class="display-flex" v-if="scope.row.oper">
                        <div class="table-image">
                            <el-image fit="contain">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                        </div>
                        <div class="ellipsis-item">{{scope.row.operType}}</div>
                    </div> -->
                    <!-- <div v-if="!scope.row.oper">系统</div> -->
                </template>
            </el-table-column>
            <el-table-column label="动态时间" width="160">
                <template slot-scope="scope">
                    <div>
                        <!-- {{scope.row.createtime*1000).format("YYYY-MM-DD HH:mm:ss")}} -->
                        {{scope.row.updateTime}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="80">
                <template>
                    <div class="operation-status">
                        <span 
                          >详情</span>
                        <!-- <span>-</span> -->
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="shopro-pagination-container">
            <el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage">
            </el-pagination>
        </div>
    </div>
    </div>
  </basic-container>
</template>

<script>
import {
  getList,
  getDetail,
  add,
  update,
  remove,
} from "@/api/commission/commissionlog";
import option from "@/const/commission/commissionlog";
import { mapGetters } from "vuex";
import { getDictionary } from "@/api/system/dict";

export default {
  data() {
    return {
      searchForm: {

        form_1_key: "agent_id",
        form_1_value: "",

        form_2_key: "oper_id",
        form_2_value: "",

        oper_type: "all",

        event: "all",
        createtime: [],
      },
      operTypeOptions: [
        {
          label: "全部",
          value: "all",
        },
        {
          label: "用户",
          value: "user",
        },
        {
          label: "管理员",
          value: "admin",
        },
        {
          label: "系统",
          value: "system",
        },
      ],
      logOptions: [
        {name:'全部',type:'all'},
        {name:'分销商',type:'2'},
        {name:'等级变动',type:'3'},
        {name:'分销业绩',type:'4'},
        {name:'团队',type:'5'},
        {name:'佣金',type:'6'},
        {name:'绑定关系',type:'7'},
      ],
      really_status: "",
      listData:[
        {
          tenanId:'动态筛选',
          event :'分销商',
          remark:'内容',
          operId:'操作人类型',
          operType:'操作人',
          updateTime:'动态时间',
        }
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
    // changeReallyStatus(val) {
    //   clearInterval(this.reallyTimer);
    //   if (val == 1) {
    //     this.reallyTimer = setInterval(() => {
    //       this.getListData();
    //     }, 3000);
    //   }
    // },

    init() {},
    onLoad(page, params = {}) {
      const that = this;
      that.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, that.query)
      ).then((res) => {
        that.listData = res.data.data.records;
        // console.log('log数据：',res)
        // that.page.total = data.total;
        // that.data = data.records;
        // that.loading = false;
      });
    },
  },
};
</script>

<style
  lang="scss"
  scoped
  src="@/views/commission/style/commissionlog.scss"
></style>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
