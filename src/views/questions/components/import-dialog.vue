<template>
	<el-drawer title="导入试题" :before-close="handleClose" :visible.sync="dialogVisible" size="60%" append-to-body="true">
		<div style="padding:10px 20px;">
			<el-steps :active="step" style="font-size:12px;">
				<el-step title="1.上传试题" icon="el-icon-upload"></el-step>
				<el-step title="2.预览试题" icon="el-icon-tickets"></el-step>
				<el-step title="3.确认导入" icon="el-icon-finished"></el-step>
			</el-steps>
			<upload-panel  v-if="(step == 1)"  @onChangeStep="onChangeStep"/>
			<preview-panel v-if="(step == 2)"  @onChangeStep="onChangeStep"/>
			<import-panel  v-if="(step == 3)"  @onChangeStep="onChangeStep"/>
		</div>
	</el-drawer>
</template>

<script>
import uploadPanel from "./upload-panel";
import previewPanel from "./preview-panel";
import importPanel from "./import-panel";
export default {
	name: "import-dialog",
	components: {
		uploadPanel,
		previewPanel,
		importPanel		
	},
	data() {
		return {
			dialogVisible: false,
			step: 1,
		}
	},
	created() {
	},
	watch: {
	},
	methods: {
		onChangeStep(e){
			this.step = e;
		},
		showImprtBox() {
			this.dialogVisible = true;
		},
		handleClose(done) {
			this.dialogVisible = false;
		}

	}
}
</script>

<style lang="scss" scoped>
  

</style>
