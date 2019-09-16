<template>
<ol>
    <li v-for="(item,key) in todoList" :key="key" draggable="true">
        <input type="checkbox" v-model="item.isDone" @change="saveCheck"/>
        <div @click="setIsEdit(key)">
            <p v-if="!item.isEdit">{{item.todo}}</p> 
            <p v-else-if="item.isEdit">
                <input ref="editInput" type="text" :key="key" v-model="item.todo" @keyup.enter="putTodoItem(key,item.todo)" @keyup.esc="cancelEdit(key,item.todo)" @blur="cancelEdit(key,item.todo)"/>
            </p>
        </div>
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
        update:Function,
    },
    methods:{
        cancelEdit(key,content){ 
            this.todoList[key].isEdit= false; 
            this.putTodoItem(key,content);
        },
        setIsEdit(key){
            // console.log(this.todoList[index])
            this.todoList[key].isEdit = true ;
            // 对焦到input框
            if(this.todoList[key].isEdit){
                this.$nextTick(()=>{
                    // 由于位于循环中，需要获取refs数组里的第一个元素，就是我们需要的input框
                    // 聚焦
                    this.$refs.editInput[0].focus()
                });
            }
        },
        putTodoItem(key,content){
            this.$emit('update',key,content);
        },
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