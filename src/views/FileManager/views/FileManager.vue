<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="6">
                <el-progress :text-inside="true" :stroke-width="24" :percentage="capacity.percentage"
                             :status="this.$options.filters.statusFilter(this.capacity.percentage)"></el-progress>
            </el-col>
            <el-col :span="4">当前系统总容量：{{capacity.allCapacity | capacityFilter}}</el-col>
            <el-col :span="4">已用容量：{{capacity.allCapacity-capacity.useCapacity | capacityFilter}}</el-col>
        </el-row>
        <el-divider content-position="left">我的文件</el-divider>
        <div>
            <div v-for="(item,index) of fileList" :key="index" class="icon-div" @click="openFile(item)">
                <img src="../../../assets/directory.png" height="100" width="100" v-if="item.isDirectory==1" /><img
                    src="../../../assets/img1.png" height="100" width="100" v-else/>
                <el-tooltip class="item" effect="dark" :content="item.name" placement="bottom">
                    <p class="img-div-p" v-text="item.name"></p>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name: "FileManager",
        data() {
            return {
                baseURL: this.GLOBAL.baseURL,
                path: this.GLOBAL.path,
                capacity: {},//系统容量信息
                status: {success: 'success', warning: 'warning', exception: 'exception'},
                fileList: [],
            }
        },
        created() {
            this.getCapacity();
            this.getFileList();
        },
        methods: {
            getCapacity() {
                let param = {path: this.path};
                axios.post(
                    "http://localhost:8001/api/file/showCapacity",
                    param
                ).then(result => {
                    let data = result.data;
                    if (data.success == "true") {
                        this.capacity = data.data;
                    } else {
                        this.$message({type: 'error', message: '获取系统信息失败！'})
                    }

                })
            },
            getFileList() {
                let param = {path: this.path};
                axios.post(
                    "http://localhost:8001/api/file/showAllFile",
                    param
                ).then(result => {
                    let data = result.data;
                    if (data.success == "true") {
                        this.fileList = data.data;
                    } else {
                        this.$message({type: 'error', message: '获取文件列表失败！'})
                    }

                })

            },
            openFile(item){
                console.log(item);
                if (item.isDirectory == 1) {//是目录
                    this.path = item.path;
                    this.getFileList();
                }else if(item.isDirectory == 2){

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
        margin: 18px 18px 0 18px;
        cursor: pointer;
    }

    .img-div-p {
        width: 100px;
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

</style>