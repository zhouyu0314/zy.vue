<template>
    <div>
        <el-row type="flex" justify="center" style="width: 1700px">
            <el-col :span="6">
                <el-progress :text-inside="true" :stroke-width="24" :percentage="capacity.percentage"
                             :status="this.$options.filters.statusFilter(this.capacity.percentage)"></el-progress>
            </el-col>
            <el-col :span="4">当前系统总容量：{{capacity.allCapacity | capacityFilter}}</el-col>
            <el-col :span="3">已用容量：{{capacity.allCapacity-capacity.useCapacity | capacityFilter}}</el-col>

        </el-row>
        <el-divider content-position="left">
            <el-button-group>
                <el-button type="primary" icon="el-icon-back" size="small" :disabled="backBtnVisitable"
                           @click="handlerBackBtn"></el-button>
                <el-button type="primary" icon="el-icon-right" size="small" :disabled="rightBtnVisitable"
                           @click="handlerRightBtn"></el-button>
                <el-button type="primary" icon="el-icon-refresh-right" size="small"
                           @click="handlerRefreshBtn"></el-button>
            </el-button-group>
        </el-divider>
        <div style="margin: 0 auto;width: 1600px">
            <div v-for="(item,index) of fileList" :key="index" class="icon-div" @dblclick="openFile(item)"
                 @contextmenu.prevent.stop="rightClick(item,$event)"
                 @mouseover="mouseOver(item,$event)"
                 @mouseleave="mouseLeave(item,$event)">
                <img src="../../../assets/directory.png" height="60" width="60" v-if="item.isDirectory==1"
                     class="div-img"/>
                <img src="../../../assets/img.png" height="60" width="60" v-else-if="item.isDirectory==2"
                     class="div-img"/>
                <img src="../../../assets/html.png" height="60" width="60" v-else-if="item.isDirectory==3"
                     class="div-img"/>
                <img src="../../../assets/rar.png" height="60" width="60" v-else-if="item.isDirectory==4"
                     class="div-img"/>
                <img src="../../../assets/txt.png" height="60" width="60" v-else-if="item.isDirectory==5"
                     class="div-img"/>
                <img src="../../../assets/doc.png" height="60" width="60" v-else-if="item.isDirectory==6"
                     class="div-img"/>
                <img src="../../../assets/xls.png" height="60" width="60" v-else-if="item.isDirectory==7"
                     class="div-img"/>
                <img src="../../../assets/ppt.png" height="60" width="60" v-else-if="item.isDirectory==8"
                     class="div-img"/>
                <img src="../../../assets/music.png" height="60" width="60" v-else-if="item.isDirectory==9"
                     class="div-img"/>
                <img src="../../../assets/movie.png" height="60" width="60" v-else-if="item.isDirectory==10"
                     class="div-img"/>
                <img src="../../../assets/exe.png" height="60" width="60" v-else-if="item.isDirectory==11"
                     class="div-img"/>
                <img src="../../../assets/js.png" height="60" width="60" v-else-if="item.isDirectory==12"
                     class="div-img"/>
                <img src="../../../assets/vue.png" height="60" width="60" v-else-if="item.isDirectory==13"
                     class="div-img"/>
                <img src="../../../assets/java.png" height="60" width="60" v-else-if="item.isDirectory==14"
                     class="div-img"/>

                <img src="../../../assets/blank.png" height="60" width="60" v-else class="div-img"/>
                <el-tooltip class="item" effect="dark" :content="item.name" placement="bottom">
                    <p class="img-div-p" v-text="item.name" style="margin: 5px 0 5px 0"></p>
                </el-tooltip>
            </div>
        </div>


        <div v-show="menuVisible">
            <ul id="menu" class="menu" style="margin: 0 0 0 0;padding: 0 15px 0 15px">
                <li class="menu__item">打开</li>
                <li class="menu__item_line"></li>

                <li class="menu__item">下载</li>
                <li class="menu__item_line"></li>
                <li class="menu__item">复制</li>
                <li class="menu__item_line"></li>
                <li class="menu__item">剪切</li>
                <li class="menu__item_line"></li>
                <li class="menu__item">删除</li>
                <li class="menu__item_line"></li>
                <li class="menu__item">重命名</li>
                <li class="menu__item_line"></li>
                <li class="menu__item" @click="getFileInfo">详细信息</li>
                <li class="menu__item_line"></li>
            </ul>
        </div>


        <!--文件详细信息弹框-->
        <el-dialog title="详细信息" :visible.sync="fileInfoVisible" width="20%" :before-close="handleFileInfoClose"
                   :close-on-click-modal="false">
            <!--                <img src="../../../assets/directory.png" height="20" width="20" v-if="currentItem.isDirectory==1" class="div-img"/>-->
            <!--                <img src="../../../assets/img.png" height="20" width="20" v-else-if="currentItem.isDirectory==2" class="div-img"/>-->
            <!--                <img src="../../../assets/html.png" height="20" width="60" v-else-if="currentItem.isDirectory==3" class="div-img"/>-->
            <!--                <img src="../../../assets/rar.png" height="20" width="20" v-else-if="currentItem.isDirectory==4" class="div-img"/>-->
            <!--                <img src="../../../assets/txt.png" height="20" width="20" v-else-if="currentItem.isDirectory==5" class="div-img"/>-->
            <!--                <img src="../../../assets/doc.png" height="20" width="20" v-else-if="currentItem.isDirectory==6" class="div-img"/>-->
            <!--                <img src="../../../assets/xls.png" height="20" width="20" v-else-if="currentItem.isDirectory==7" class="div-img"/>-->
            <!--                <img src="../../../assets/ppt.png" height="20" width="20" v-else-if="currentItem.isDirectory==8" class="div-img"/>-->
            <!--                <img src="../../../assets/music.png" height="20" width="20" v-else-if="currentItem.isDirectory==9" class="div-img"/>-->
            <!--                <img src="../../../assets/movie.png" height="20" width="20" v-else-if="currentItem.isDirectory==10" class="div-img"/>-->
            <!--                <img src="../../../assets/exe.png" height="20" width="20" v-else-if="currentItem.isDirectory==11" class="div-img"/>-->
            <!--                <img src="../../../assets/js.png" height="20" width="20" v-else-if="currentItem.isDirectory==12" class="div-img"/>-->
            <!--                <img src="../../../assets/vue.png" height="20" width="20" v-else-if="currentItem.isDirectory==13" class="div-img"/>-->
            <!--                <img src="../../../assets/java.png" height="20" width="20" v-else-if="currentItem.isDirectory==14" class="div-img"/>-->
            <!--                <span v-text="currentItem.name"></span>-->
            <el-row type="flex" justify="space-around" :gutter="30">
                <el-col :span="2"></el-col>
                <el-col :span="6"><p class="el-p">类型</p></el-col>
                <el-col :span="16"><p class="el-p">文件夹</p></el-col>
            </el-row>
            <el-row type="flex" justify="space-around" :gutter="30">
                <el-col :span="2"></el-col>
                <el-col :span="6"><p class="el-p">大小</p></el-col>
                <el-col :span="16"><p class="el-p">1024</p></el-col>
            </el-row>
            <el-row type="flex" justify="space-around" :gutter="30">
                <el-col :span="2"></el-col>
                <el-col :span="6"><p class="el-p">创建时间</p></el-col>
                <el-col :span="16"><p class="el-p">2020-10-10 18:00:00</p></el-col>
            </el-row>
            <el-row type="flex" justify="space-around" :gutter="30">
                <el-col :span="2"></el-col>
                <el-col :span="6"><p class="el-p">修改时间</p></el-col>
                <el-col :span="16"><p class="el-p">2020-10-10 18:00:00</p></el-col>
            </el-row>
        </el-dialog>

    </div>
</template>

<script>

    import {showCapacity, showAllFile, showFileInfo} from '../api/FileManager'

    export default {
        name: "FileManager",
        data() {
            return {
                visible: false,
                baseURL: '',
                path: _basePath,
                capacity: {},//系统容量信息
                status: {success: 'success', warning: 'warning', exception: 'exception'},
                fileList: [],
                pathArr: [],//维护了访问的历史记录
                backBtnVisitable: true,
                rightBtnVisitable: true,
                menuVisible: false,
                fileInfoVisible: false,
                fit: 'scale-down',
                currentItem: {},
            }
        },
        created() {
            this.pathArr.push(this.path);
            this.getCapacity();
            this.getFileList();
        },
        methods: {
            getCapacity() {
                let param = {path: this.path};
                showCapacity(param).then((result) => {
                    let data = result.data;
                    if (data.success == "true") {
                        this.capacity = data.data;
                    } else {
                        this.$message({type: 'error', message: '获取系统信息失败！'})
                    }
                })
            },
            getFileList() {
                let loading = showLoad(this);
                let param = {path: this.path};
                showAllFile(param).then((result) => {
                    let data = result.data;
                    if (data.success == "true") {
                        this.fileList = data.data;
                    } else {
                        this.$message({type: 'error', message: '获取文件列表失败！'})
                    }
                    loading.close();
                })

            },
            openFile(item) {
                if (item.isDirectory == 1) {//是目录
                    this.path = item.path;
                    this.pathArr.push(this.path);
                    this.getFileList();
                } else if (item.isDirectory == 2) {

                }

            },
            //后退
            handlerBackBtn() {
                //获取当前path在数组中的index
                let index = this.pathArr.indexOf(this.path);
                if (index != -1) {
                    //得到前一个元素
                    this.path = this.pathArr[index - 1];
                    this.getFileList();
                }

            },
            //前进
            handlerRightBtn() {
                //获取当前path在数组中的index
                let index = this.pathArr.indexOf(this.path);
                if (index != -1) {
                    //得到前一个元素
                    this.path = this.pathArr[index + 1];
                    this.getFileList();
                }
            },
            //刷新
            handlerRefreshBtn() {
                this.getFileList();

            },
            //右击
            rightClick(item, event) { // 鼠标右击触发事件
                this.currentItem = item;
                this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
                this.menuVisible = true  // 显示模态窗口，跳出自定义菜单栏
                let menu = document.querySelector('#menu')
                //menu.style.left = event.clientX - 160 + 'px'
                menu.style.left = event.clientX + 'px';
                document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
                //menu.style.top = event.clientY - 10 + 'px'
                menu.style.top = event.clientY + 'px';
            },
            foo() { // 取消鼠标监听事件 菜单栏
                this.menuVisible = false
                document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
            },
            //鼠标移入
            mouseOver(item, event) {
                let currentTarget = event.currentTarget;
                currentTarget.style.cssText += 'background-color: rgba(64,158,255,0.3);'
            },
            //鼠标移出
            mouseLeave(item, event) {
                let currentTarget = event.currentTarget;
                currentTarget.style.cssText -= 'background-color:rgba(64,158,255,0.3);'
            },
            //getFileInfo查看文件详细信息
            getFileInfo() {
                this.fileInfoVisible = true;
                let param = {path: this.currentItem.path};
                showFileInfo(param).then((result) => {
                    let data = result.data;
                    console.log(data);
                    // if (data.success == "true") {
                    //     this.capacity = data.data;
                    // } else {
                    //     this.$message({type: 'error', message: '获取系统信息失败！'})
                    // }
                })
            },
            handleFileInfoClose() {
                this.fileInfoVisible = false;
            }
        },

        watch: {
            path() {
                //如果当前数组元素大于1
                if (this.pathArr.length > 1) {
                    //如果当前path处于arr的0index，则不可以后退
                    if (this.pathArr.indexOf(this.path) == 0 && this.pathArr.indexOf(this.path) != -1) {
                        this.backBtnVisitable = true;
                    } else {
                        this.backBtnVisitable = false;
                    }
                    //如果当前path处于arr的last index，则不可以前进
                    if (this.pathArr.indexOf(this.path) == this.pathArr.length - 1 && this.pathArr.indexOf(this.path) != -1) {
                        this.rightBtnVisitable = true;
                    } else {
                        this.rightBtnVisitable = false;
                    }

                } else {
                    this.backBtnVisitable = true;
                    this.rightBtnVisitable = true;
                }

            }
        },
        filters: {
            statusFilter(val) {
                if (val > 60) {
                    return "success";
                } else if (val > 20) {
                    return "warning";
                } else {
                    return "exception";
                }
            },
            capacityFilter(val) {
                let data = val / 1000 / 1000;

                if (data >= 1000) {
                    return (data / 1000).toFixed(1).toString() + " GB";
                } else {
                    return data.toFixed(0).toString() + " MB";
                }
            }
        }
    }
</script>

<style scoped>
    .icon-div {
        float: left;
        margin: 5px 5px 0 5px;
        cursor: pointer;
        /*overflow: hidden;*/
    }

    .div-img {
        margin-top: 15px;
    }

    .img-div-p {

        /*width: 60px;*/
        /*overflow: hidden;*/
        /*text-overflow:ellipsis;*/
        /*white-space: nowrap;*/
        width: 120px;
        height: 20px;
        display: inline-block;
        overflow: hidden; /* 超出的文本隐藏 */
        text-overflow: ellipsis; /* 溢出用省略号显示 */
        display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
        -webkit-box-orient: vertical; /* 这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数 */
        -webkit-line-clamp: 1; /*  从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式） */
    }

    .img-div-p:hover {
        text-overflow: ellipsis;
        white-space: nowrap;

    }

    .menu__item {
        display: block;
        line-height: 20px;
        text-align: left;
        margin-top: 10px;


    }

    .menu__item_line {
        margin: 0px;
        padding: 0px;
        font-size: 0px;
        height: 1px;
        overflow: hidden;
        background: #d7d7d7;
    }

    .menu {
        width: 70px;
        position: absolute;
        border-radius: 4px;
        border: 1px solid #999999;
        background-color: #f4f4f4;
    }

    li:hover {
        background-color: #1790ff;
        color: white;
    }

    .el-p {
        margin: 5px 0 5px 0;
        text-align: left;
    }

</style>