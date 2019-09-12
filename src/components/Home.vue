<template>
    <section>
        <div class="home">
            <div class="options">
                竖向瀑布流：
                <input v-model="direction" type="radio" name="direction" value="column">
                横向瀑布流：
                <input v-model="direction" type="radio" name="direction" value="row">
            </div>
            <template v-if="list.length != 0">
                <ImageWall v-show="direction=='row'"  :list="list" :row="true"/>
                <ImageWall v-show="direction=='column'" :list="list"/>
            </template>
            <p v-if="message==='没有更多了'">
                {{message}}
            </p>
        </div>
    </section>
</template>

<script>

import {Axios_get} from '../api/server';
import ImageWall from './ImageWall';

export default {
    name:'Home',
    components:{
        ImageWall
    },
    data(){
        return{
            list: [],
            direction: 'row',
            flag: false,
            result:[],
            message:'',
            page:1,
            count:'20'
        }
    },
    methods:{
        getImage(page=1,count='20'){
            Axios_get(`/getImages?page=${page}&count=${count}`,(rs)=>{
                const {message,result} = rs;
                this.message = message;
                result.length===0?this.message = '没有更多了':result.map(item=> this.list.push(item)
                )
            });
        }
    },
    mounted(){
        this.getImage(this.page,this.count);
    },
    created() {
        window.onscroll = () => {
            if (this.flag) {
                return;
            }
            if (document.documentElement.scrollTop + document.body.clientHeight === document.documentElement.scrollHeight) {
                this.flag = true
                this.getImage(++this.page,this.count);
                setTimeout(() => {
                    this.flag = false
                }, 500)
            }
        }
    },
}
</script>

<style scoped>
    .options {
        padding: 10px;
        text-align: center;
    }

</style>