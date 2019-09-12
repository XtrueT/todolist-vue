<template>
<section id="todo-section">
    <header>
        <label for="todo-input">{{text}}</label>
        <!-- 监听回车事件 -->
        <input id="todo-input" type="text" v-model="todo"  placeholder="todo" @keyup.enter="addTodoItem"/>  
    </header>
    <section>
        <!-- 动态绑定todoList -->
        <!-- 驼峰式命名的props属性需要改变 -->
        <h2>进行中<span id="todocount">{{notDoneList.length}}</span></h2>
        <TodoItem :todo-list="notDoneList" @del="delTodoItem"/>
        <h2>已完成<span id="donecount">{{isDoneList.length}}</span></h2>
        <TodoItem :todo-list="isDoneList" @del="delTodoItem" style="opacity: 0.5;"/>
    </section>
</section>
</template>


<script>
import TodoItem from './TodoItem'

export default {
    name: 'Todo',
    // 在这里注册引入的子组件TodoItem
    components:{
        TodoItem,
    },
    // 父组件传递的数据
    props:{
        text:String
    },
    // 此组件的数据
    data(){
        return {
            // 双向绑定
            todo:'',
            // 保存数据
            todoList:[],
        }
    },
    // 进行事件的处理
    methods:{
        addTodoItem(){
            if(this.todo!==''){
                this.todoList.push({
                    todo:this.todo,
                    isDone:false
                });
                this.todo = '';
            }
        },
        // 等待子组件触发这个函数，并拿到key
        delTodoItem(key){
            this.todoList.splice(key,1);
        },
    },
    // 计算属性,返回过滤的数据或者对象
    computed:{
        isDoneList(){
            return this.todoList.filter(item=>item.isDone);
        },
        notDoneList(){
            return this.todoList.filter(item=>!item.isDone);
        }
    }
}
</script>

<style scoped>

</style>