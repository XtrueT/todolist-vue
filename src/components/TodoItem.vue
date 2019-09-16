<template>
<ol>
    <li v-for="(item,key) in todoList" :key="key">
        <!-- 需要使用:key="item.id"来绑定 对应的item.isDone 
        不然好像是会出现点击如果已经完成和未完成相同的key会都打勾 --> 
        <input type="checkbox" v-model="item.isDone" @change="saveCheck" :key="item.id"/>
        <div @click="setIsEdit(key)">
            <p v-if="!item.isEdit">{{item.todo}}</p> 
            <p v-else-if="item.isEdit">
                <!-- 回车事件，esc事件，失去焦点事件 -->
                <input ref="editInput" type="text" :key="item.id" v-model="item.todo" 
                @keyup.enter="putTodoItem(item.id,item.todo)" 
                @keyup.esc="putTodoItem(item.id,item.todo)" 
                @blur="putTodoItem(item.id,item.todo)"/>
            </p>
        </div>
        <a @click="delTodoItem(item.id)">-</a> 
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
        // 因为这里是对应被筛选过的数组所以需要key来指定他的编辑与否
        setIsEdit(key){
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
        // 进行对某一个元素的操作都要使用唯一标识id来进行原数组的操作
        putTodoItem(id,content){
            this.$emit('update',id,content);
        },
        delTodoItem(id){
            // 第一个参数是props里方法对应的函数属性,
            // 后面跟上参数列表是父组件里需要的子组件传回的数据
            // 实现子组件给父组件传递值
            // 单向数据流的概念需要理解，实际上是由父组件改变内容,子组件是触发这个改动
            this.$emit('del',id);
        },
        saveCheck(){
            this.$emit('save');
        }
    }
}
</script>

<style scoped>

</style>