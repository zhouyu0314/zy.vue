<template>
    <div>
        <el-form label-width="80px" :inline="true" :model="headParams" size="mini">
            <el-form-item label="姓名">
                <el-input v-model="headParams.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="headParams.age"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="headParams.gender">
                    <el-option v-for="item in gender" :key="item.id" :value="item.id" :label="item.gender"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="headBtn">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "TestHead",
        props: ['headParams'],
        data(){
            return{
                gender:[{id:-1,gender:'女'},{id:1,gender:'男'}]
            }
        },
        methods:{
            headBtn(){
                this.$emit('headParams', this.headParams);
            }
        }
    }
</script>

<style scoped>

</style>