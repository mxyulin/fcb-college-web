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

            <!-- 标题 -->
            <el-form>
                <el-form-item :label-width="formLabelWidth" label="标题设置：">
                    <el-radio-group @change="changetitle(publishData)" v-model="publishData">
                        <el-radio label="singletitle">单标题</el-radio>
                        <el-radio label="multipletitles">多标题</el-radio>
                    </el-radio-group>

                    <div class="singletitle" v-show="publishData == 'singletitle'">
                        <span>所有用户将会看到相同的标题</span>
                    </div>
                    <div v-show="publishData == 'multipletitles'">
                        <div class="singletitle displayflexh spanbetween">
                            <span>不同标题会推荐给不同用户，获得更多推荐流量</span>
                             <el-popover
                                class="popoverm"
                                placement="top-start"
                                width="400"
                                trigger="hover">
                                <p>将为每个用户推荐出对他最有吸引力的一个标题，提升读者的体验，获得更多流量</p>
                                <el-image :src="imageurl"></el-image>
                                <span slot="reference">实例</span>
                            </el-popover>
                        </div>

                        <div class="btmargin" >
                            <div 
                            class="btpadding" 
                            v-for="(it, index) in this.params_arr"
                            :key="index"
                            >
                                <el-input
                                class="elinputw"
                                    type="text"
                                    placeholder="请输入内容"
                                    v-model="it.text"
                                    maxlength="30"
                                    show-word-limit
                                    size="small"
                                    >
                                </el-input>
                                <div class="iconh" @click="delParams(index)">
                                    <i class="el-icon-delete"></i>
                                </div>
                            </div>
                        </div>
                        <div class="btmargin displayf boxsizi">
                            <el-button @click="addParams" size="small" icon="el-icon-plus">添加标题</el-button>
                            <p>还能添加 4 个</p>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item :label-width="formLabelWidth" label="封面设置：">
                    <el-radio-group v-model="figuredata">
                        <el-radio label="Monograph">单图</el-radio>
                        <el-radio label="Threefigures">三图</el-radio>
                        <el-radio label="Nocover">无封面</el-radio>
                    </el-radio-group>
                    <div v-show="figuredata=='Monograph'">
                        <div class="displayf">
                            <div class="bgimage-add">
                            <i class="el-icon-plus"></i>
                            </div>
                            <div class="stylespan" @click="dialog = true">
                                浏览
                            </div>
                        </div>
                        <p class="fontsizi">优质的封面有利于推荐，格式支持JPEG、PNG</p>
                    </div>
                    <div v-show="figuredata=='Threefigures'">
                        <div>
                            <div class="displayf">
                                <div class="bgimage-add">
                                    <i class="el-icon-plus"></i>
                                </div>
                                <div class="bgimage-add">
                                    <i class="el-icon-plus"></i>
                                </div>
                                <div class="bgimage-add">
                                    <i class="el-icon-plus"></i>
                                </div>
                                <div class="stylespan" @click="dialog = true">浏览</div>
                            </div>
                        </div>
                        <p class="fontsizi">优质的封面有利于推荐，格式支持JPEG、PNG</p>
                    </div>
                </el-form-item>
            </el-form>
            <div class="cleandialogpadding">
                <el-dialog :showClose="false" append-to-body="ture" width="500px" :visible.sync="dialog">
                    <div class="dsdiv">
                        <h2>推荐频道浏览</h2>
                        <el-image class="elimage" :src="imagebrowse"></el-image>
                        <el-button size="medium" class="buttoncenter" type="primary" @click="dialog = false">关闭浏览</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>

        <div style="height:100px;">

        </div>
        <div class="container">
            <div>
                回到顶部
                回到设置
            </div>
            <div class="shopro-submit-button">浏览</div>
            <div class="shopro-submit-button">定时分布</div>
            <div class="shopro-submit-button">浏览并分布</div>
        </div>
    </div>
</template>

<script>
// api api/news/article.js
import {
  getList,
  getDetail,
  submit
} from "@/api/news/article";
    export default {
        data() {
            return {
                // 
                dialog:false,
                imagebrowse:'https://lf6-cdn-tos.bytegoofy.com/goofy/pgcfe/mp/graphic/1ac3bb7600f29b9a8025ef0e4f8abbf9.png',
                imageurl:'https://lf6-cdn-tos.bytegoofy.com/goofy/pgcfe/mp/graphic/60963ee5fa0b51ff805c17eafb3b0eeb.png',
                params_arr:[
                    {text:''}
                ],
                publishData:'singletitle',
                figuredata:'Monograph',
                formLabelWidth:'100px',

                //请求需要配置
                // 加载中
                loading: true,
                // 分页信息
                page: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 40,
                },
                // 查询信息
                query: {},
            }
        },
        methods: {
            changetitle(value) {
                // console.log(value)
            },
            addParams(){
                if(this.params_arr.length<4){
                    this.params_arr.push({
                        name: "",
                    });
                }
            },
            delParams(index){
                if(this.params_arr.length>1){
                    this.params_arr.splice(index, 1);
                }
            },
            obtaindata(){
                let that = this;
                that.loading = true;
                getList(
                    page.currentPage,
                    page.pageSize,
                    Object.assign(params, that.query)
                ).then((res) => {
                    console.log(res)
                });
            },
            obtaindetail(){
                let id=2
                getDetail(id).then((res) => {
                    console.log(res)
                });
            },
            obtainsubmit(){
                let that = this;
                submit(that.params).then((res) => {
                    console.log(res)
                });
            },

        },
    }
</script>

<style lang="scss" scoped>
@import "@/views/release/style/publish.scss";//publish
</style>