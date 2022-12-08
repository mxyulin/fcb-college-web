<template>
	<div class="question-item-wrapper">
		<div style="width:100%;">
			<div style="width:100%;" v-if="question.resource">
				{{ indexId}}、<el-tag type="success" size="small" effect="plain">{{ question.type
				}}</el-tag>
				<span v-for="sub  of question.resource " :key="sub">
					<span v-html="sub"></span>
					<p />
				</span>
			</div>
			<div style="width:100%;" v-if="question.body">
				{{ indexId }}、<el-tag type="success" size="small" effect="plain">{{ question.type
				}}</el-tag>
				<span v-for="sub  of question.body " :key="sub">
					<span v-html="sub"></span>
					<p />
				</span>
			</div>
			<div style="width:100%;" v-if="question.options">
				<p v-for="sub  of question.options " :key="sub">
					<span v-html="sub"></span>
				</p>
			</div>
		</div>

		<div style="width:100%;" v-if="question.answer">
			<span>[答案]</span>
			<span v-for="sub  of question.answer " :key="sub">
				<span v-html="sub"></span>
				<p />
			</span>
		</div>
		<div style="width:100%;" v-if="question.explain">
			[解析]
			<span v-for="sub  of question.explain " :key="sub">
				<span v-html="sub"></span>
				<p />
			</span>
		</div>

		<div style="width:100%;" v-if="question.diffLevel">
			[难度]
			{{ question.diffLevel }}
		</div>
		<div style="width:100%;" v-if="question.tags">
			[标签]
			<span v-for="sub  of question.tags " :key="sub">
				<el-tag effect="plain" type="info" size="small" style="margin:0 5px;">{{ sub }}</el-tag>
			</span>
		</div>
		<div style="width:100%; margin-top:10px;" v-if="!viewOnly">
			<el-button type="danger" @click="doDelete" style="float:left;" size="small" plain><i class="el-icon-delete el-icon--right"></i>删除</el-button>
			<el-button type="primary" @click="doImprot"  size="small" style="float:right" plain><i class="el-icon-upload el-icon--right"></i>上传</el-button>
		</div>
	</div>
</template>

<script>
import {doDeleteCacheById } from "@/api/questions/questions";
export default {
	props: {
		question: {
			type: Object,
			required: true,
		},
		indexId:{
			type: String,
			required: true,
		},
		viewOnly:{
			type: Boolean,
			default: false,
			required: true
		}
		

	},
	methods: {
		doImprot() {
			let that = this;
			that.$emit("onReqImport",that.question.id);		 
		},
		doDelete() {
			let that = this;
			this.$confirm('确定要删除这道试题吗？')
				.then(_ => {  
					doDeleteCacheById(that.question.id).then(res=>{ 
						that.$emit("onReqRemove",that.question.id);		
					});
 				}).catch(_ => { });
		}	 
	}
}
</script>

<style lang="scss" scoped>
.question-item-wrapper {
	display: inline-block;
	width: 100%;
}
</style>
