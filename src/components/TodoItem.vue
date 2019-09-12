<template>
<ol>
    <li v-for="(item,key) in todoList" :key="key" draggable="true">
        <input type="checkbox" v-model="item.isDone" @change="saveCheck"/>
        <p> {{item.todo}} </p>   
        <a @click="delTodoItem(key)">-</a> 
    </li>
</ol>
</template>

<script>
export default {
    name:'TodoItem',
    props:{
        todoList:Array,
        del:Function,
        save:Function,
    },
    methods:{
        delTodoItem(key){
            // 第一个参数是props里方法对应的函数属性,
            // 后面跟上参数列表是父组件里需要的子组件传回的数据
            this.$emit('del',key);
        },
        saveCheck(){
            this.$emit('save');
        }
    }
}
</script>

<style scoped>

</style>