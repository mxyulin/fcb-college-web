<template>
	<div class="upload-psd-btn-wrapper">
		<div style="padding:20px;text-align: center;" v-loading="loading">
			<el-scrollbar class="scroll-wrapper" style="height:400px;">
				<div v-for="result of resultList" :key="result" >							 
					<div style="text-align: left;font-size: 14px;">
						导入第<span style="background-color: #fef0f0; color: #F56C6C;">{{result.id}}</span>
						题，{{result.status =="Y"?"成功":"失败"}}
					</div>
					<div v-html="result.message" style="text-align: left;font-size: 14px;color: #F56C6C;">
					</div> 
					<el-divider></el-divider>
				</div>
			</el-scrollbar>

		</div>
	</div>
</template>

<script>
import { doImport } from "@/api/questions/questions";
export default {
	name: "import-panel",
	data() {
		return { 
			resultList: [], 
			loading: false
		}
	},
	created() {
	},
	watch: {
	},
	mounted() {
    	this.doImportQuestion();
  	},
	methods: {
		doImportQuestion(){
			const that = this;
			that.loading = true;
			doImport({}).then(res=>{ 
				that.resultList = res.data.data; 
				that.loading = false;
			});
		}
	}
}   
</script>

<style lang="scss" scoped>

</style> 
