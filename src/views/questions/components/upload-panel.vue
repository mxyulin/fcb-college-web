<template>
	<div class="upload-psd-btn-wrapper">
		<div style="padding:20px;text-align: center;" v-loading="loading">
			<el-upload drag :before-upload="beforeUpload" :on-progress="uploadProgress" accept=".docx">
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将试题文件拖到此处，或<em>点击上传</em><br />
					只能上传docx文件，且不超过50MB
					<br/>
					<el-link href="https://element.eleme.io" type="primary" target="_blank">如果没有模板，请点击这里下载模板</el-link>
		
				</div>
			</el-upload>
			<el-scrollbar class="scroll-wrapper" style="height:400px;">
				<div v-for="error of errorList" :key="error" >							 
					<div style="text-align: left;font-size: 14px;">第<span style="background-color: #fef0f0; color: #F56C6C;">{{error.id}}</span>
						题，有错：
					</div>
					<div v-html="error.message" style="text-align: left;font-size: 14px;color: #F56C6C;">
					</div> 
					<el-divider></el-divider>
				</div>
			</el-scrollbar>

		</div>
	</div>
</template>

<script>
import { checkImport } from "@/api/questions/questions";
export default {
	name: "upload-panel",
	data() {
		return { 
			errorList: [],
			hasError: false,
			loading: false
		}
	},
	created() {
	},
	watch: {
	},
	methods: {
		beforeUpload(file) {
			this.errorList = [];
			this.hasError = false;
			if (file.size > 50 * 1024 * 1024) {
				this.$message.error('docx文件不能超过50M！')
				return;
			}
			let temp1 = file.name.split('.')
			let temp = temp1[temp1.length - 1]
			if (!['docx'].includes(temp)) {
				this.$message.error('请上传docx文件')
				return false;
			}
			this.loading = true;
			this.uploadFile(file);
			return false;
		},
		uploadFile(file) {
			const that = this;
			let params = new FormData()
			params.append('file', file);
			checkImport(params).then(res => {
				that.errorList = [];
				that.hasError = false;
				let data = res.data.data;
				if (data.length > 0) {
					that.errorList = data;
					that.hasError = true;
				}else{
					this.$emit("onChangeStep",2);
				}
				that.loading = false;
			});
		},
		uploadProgress(event, file, fileList) {
			debugger;
		}

	}
}   
</script>

<style lang="scss" scoped>

</style> 
