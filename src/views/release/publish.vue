<template>
    <div id="publish">
        <div class="head">
            <div class="headone">
                <div class="displayflexh clearboder">
                    <div class="boderr">
                        <i class="el-icon-back"></i>
                    </div>
                    <div class="wzfontsize">
                        发布文章
                    </div>
                </div>
                <div class="displayflexh">
                    <div class="gffontsize">
                        发文规范
                    </div>
                    <div class="xxfontsize">
                        <i class="el-icon-bell"></i> 
                         消息
                    </div>
                    <div class="xxfontsize">
                        <span>图片</span>
                        个人信息
                    </div>
                </div>
            </div>
        </div>
            <div class="richtext">
                富文本编辑功能
            </div>
        
        <div class="body">
            <div class="displayflexh edit">
                <h2>标题</h2>
                <div>文字输入范围</div>
            </div>
            <div>
                <hr>
            </div>
            <div class="edittext">
                富文本编写区
            </div>
            <div>
                <hr>
            </div>

            <el-form>
                <el-form-item label="标题设置">
                    <el-radio-group>
                    <el-radio label="singletitle">单标题</el-radio>
                    <el-radio label="multipletitles">多标题</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <!-- <div>
                <el-form>
                    <p>
                        所有有户将看到相同的标题
                    </p>
                </el-form>
            </div>
            <div>
                <el-form-item>
                    <p>
                        <span>
                            所有有户将看到相同的标题 
                        </span>
                        <span>
                            示例
                        </span>
                    </p>
                    <input type="text" name="" id="">
                    <div>
                        <button>
                            添加标题
                        </button>
                        <span>
                            最多添加4个
                        </span>
                    </div>
                </el-form-item>
            </div> -->

            <!-- <el-form>
                <el-form-item label="封面设置">
                    <el-radio-group>
                        <el-radio label="apply">单图</el-radio>
                        <el-radio label="goods">三图</el-radio>
                        <el-radio label="consume">无封面</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <div>
                <el-form>
                <el-form-item>
                    <div>
                        <div>
                            <i class="el-icon-picture-outline"></i>
                        </div>
                        <span>
                            浏览
                        </span>
                    </div>
                    <p>优质的封面有利于推荐，格式支持JPEG、PNG</p>
                </el-form-item>
                </el-form>
            </div>

            <div>
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
@import "@/views/release/style/publish.scss";//publish
</style>