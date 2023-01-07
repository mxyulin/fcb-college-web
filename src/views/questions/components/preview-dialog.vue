<template>
	<el-drawer title="试题预览" :before-close="handleClose" :visible.sync="dialogVisible" size="60%" append-to-body="true">
		<div style="padding:10px 20px;">

			<el-row>
				<el-col :span="1"></el-col>
				<el-col :span="22">
					<el-container>
						<el-header style="text-align: center;">
							<el-row>
								<el-col :span="24" style="text-align:right;"> 
									<el-button type="primary" size="small" plain v-if="permission.questions_edit && qsId" icon="el-icon-edit"
									@click="editQuestion">编辑本题
									</el-button> 
								</el-col>
								 
							</el-row>
						</el-header>
						<el-main>

							<el-scrollbar class="scroll-wrapper" v-if="errorMsg == ''">
								<el-table :data="questionPreviewList" :border="false" :show-header="false">
									<el-table-column label="">
										<template slot-scope="scope">
											<question-item-view :question="scope.row" :indexId="(1)"
												:viewOnly="true"></question-item-view>
										</template>
									</el-table-column>
								</el-table>

							</el-scrollbar>
							<el-alert v-else :title="errorMsg" type="warning" :closable="false" show-icon>
							</el-alert>
						</el-main>
					</el-container>
				</el-col>
				<el-col :span="1"></el-col>
			</el-row>
		</div>
	</el-drawer>
</template>

<script>
import questionItemView from "./question-item-view";
import { mapGetters } from "vuex";
export default {
	name: "preview-dialog",
	components: {
		questionItemView
	},
	computed: {
    ...mapGetters(["permission"])
    },
	data() {
		return {
			dialogVisible: false,
			qsTypeMap: {
				"DX": "单选题",
				"DUX": "多选题",
				"PD": "判断题",
				"TK": "填空题",
				"JD": "问答题",
				"CLT": "材料题",
			},
			loading: true,
			questionPreviewList: [],
			errorMsg: '',
			qsId:null
		}
	},
	created() {
	},
	watch: {
	},
	methods: {
		parseJson(data) {
			try {
				return JSON.parse(data);
			} catch (e) {
				this.errorMsg = "解析试题出错"; 
			}
			return {};
		},
		showQuestion(qs) {
			const that = this;
			that.errorMsg = '';
			that.qsId = null; 
			that.questionPreviewList = [];
			if (!qs) {
				this.errorMsg = "没有试题数据";
				return;
			}

			let qsItem = {};
			that.qsId = qs.id;
			qsItem["id"] = qs.id;
			qsItem["type"] = that.qsTypeMap[qs.type];

			if (qs["resource"]) {
				qsItem["resource"] = that.parseJson(qs.resource);
			}

			if (qs["body"]) {
				if ("TK" == qs.type) {
					let tmpArray = qs.body.replaceAll("<G8INPUT/>", "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)");
					qsItem["body"] = that.parseJson(tmpArray);
				} else {
					qsItem["body"] = that.parseJson(qs.body);
				}

			}

			if (qs["options"]) {
				qsItem["options"] = that.parseJson(qs.options);
			}

			qsItem["answer"] = [];
			if ("PD" == qs.type) {
				let v = qs.answer.indexOf("Y");
				qsItem["answer"] = v ? ["正确"] : ["错误"];
			} else if ("TK" == qs.type) {
				if (qs["answer"]) {
					qsItem["answer"].push(that.parseJson(qs.answer).join(" 、"));
				}
			} else {
				if (qs["answer"]) {
					qsItem["answer"] = that.parseJson(qs.answer);
				}
			}


			if (qs["explain"]) {
				qsItem["explain"] = that.parseJson(qs.explain);
			}

			if (qs["diffLevel"]) {
				qsItem["diffLevel"] = qs.diffLevel;
			}

			if (qs["tags"]) {
				qsItem["tags"] = that.parseJson(qs.tags);
			}

			that.questionPreviewList.push(qsItem);
			this.dialogVisible = true;
		},
		handleClose(done) {
			this.dialogVisible = false;
		},
		editQuestion(){
			debugger;
			this.$emit("editQuestion",this.qsId);
			this.dialogVisible = false;
		}

	}
}
</script>

<style lang="scss" scoped>

</style>
