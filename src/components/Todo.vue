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
                

        <!-- todoList是子组件需要的一个props属性，但是在模版中这类驼峰式props需要更换成 todo-list -->
        <!-- 驼峰式命名的props属性需要改变 -->
        
        <!-- 统计进行中的条数 -->
        <h2>进行中<span id="notDoneCount">{{notDoneList.length}}</span></h2>
        <TodoItem :todo-list="notDoneList" @del="delTodoItem" @save="save" @update="updateTodoItem"/>
        <h2>已完成<span id="isDoneCount">{{isDoneList.length}}</span></h2>
        <TodoItem :todo-list="isDoneList" @del="delTodoItem" @save="save" @update="updateTodoItem" style="opacity: 0.5;"/>
    </section>
</section>
</template>


<script>
import TodoItem from './TodoItem'
import storageUtil from '../utils/storageUtil'

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
        save(){
            // 进行保存，保存到浏览器本地存储
            storageUtil.set('todolist',this.todoList);
        },
        addTodoItem(){
            if(this.todo!==''){
                this.todoList.push({
                    todo:this.todo,
                    isDone:false,
                    isEdit:false
                });
                // 由于只靠key值无法区分是那个元素，因为在计算属性里筛选时返回了新的数组导致key值存在冲突
                // 只能在这里进行数据结构重组
                // 将原来数据的下标当作id加入item里作为整个数组的唯一标识
                // 就不会因为已完成和未完成列表里的key值冲突
                let _list = this.todoList.map((item)=>{
                    return {...item,id:this.todoList.indexOf(item)}
                });
                this.todoList = _list;
                this.todo = '';
            }
            this.save();
        },
        updateTodoItem(id,value){
            // 获取原来的值暂存
            let list = storageUtil.get('todolist');
            // console.log(id,value)
            let _value;
            let _key;
            if(list){
                // 由于在删除时出现了最后一个删除失败，原因是
                // 比如id=“1”存在但是数组只有最后一个元素下标为0了只能根据id来选择对应的下标
                list.forEach(item=>{
                    if(item.id===id){
                        _value = item.todo;
                    }
                })
            }
            this.todoList.forEach(item=>{
                if(item.id===id){
                    _key = this.todoList.indexOf(item);
                }
            })
            // 如果不为空就进行保存
            if(value!==''){
                this.todoList[_key].todo = value;
                this.todoList[_key].isEdit = false;
                this.save();
            }else{
                this.todoList[_key].todo = _value;
                this.todoList[_key].isEdit = false;
            }
        },
        // 等待子组件触发这个函数，并拿到key
        delTodoItem(id){
            // console.log(id);
            let _key;
            this.todoList.forEach(item=>{
                if(item.id===id){
                    _key = this.todoList.indexOf(item);
                }
            })
            this.todoList.splice(_key,1);
            this.save();
        },
    },
    // 计算属性,返回过滤的数据或者对象
     // 计算属性,返回过滤的数据或者对象,之前可以v-for和v-if同时使用，现在推荐先计算出要过滤的元素再循环渲染
    computed:{
        isDoneList(){
            return this.todoList.filter(item=>item.isDone);
        },
        notDoneList(){
            return this.todoList.filter(item=>!item.isDone);
        }
    },
    //生命周期函数,模版编译完成
    mounted(){
        // 页面刷新就获取保存在本地存储的数据
        let list = storageUtil.get('todolist');
        if(list){
            this.todoList = list;
        }
    }
}
</script>

<style scoped>
@import url('../assets/index.css');
</style>