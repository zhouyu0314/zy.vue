<template>
    <div>
        <test-head :headParams="headParams" @headParams="headParamsReturn"></test-head>
        <el-divider></el-divider>
        <el-button type="primary" @click="testMap" size="mini">测试map</el-button>
    </div>
</template>

<script>
    import TestHead from "../component/TestHead";
    export default {
        name: "index",
        components:{
            TestHead
        },
        data(){
            return{
                headParams:{name:'张三',age:20,gender:1}
            }
        },
        methods:{
            headParamsReturn(item){
                console.log(item);
            },
            testMap(){
              let map = new Map();
                let arr = ['a','b','c','d'];
                let person = {"name":"lisi","age":30};
                map.set("name","zhangsan");
                map.set("age","20");
                map.set("arr",arr);
                map.set("lisi",person);


                console.log(map);
                console.log(map.get("arr"));

                map.delete("arr");
                console.log("删除arr",map);

            }
        }
    }
</script>

<style scoped>

</style>