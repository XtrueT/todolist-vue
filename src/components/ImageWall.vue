<template>
    <div :class="{'waterfall-wrap': true, row: row}" ref="imgList" >
    <template v-if="row">
        <div v-for="(item, index) of list" :key="index" class="row-item">
            <img :src="item.img" :style="{height: `${height}px`}">
        </div>
            <div :style="{height: `${height}px`}" class="last-box">
        </div>
    </template>
    <template v-else>
        <div v-for="(item, index) of list" :key="index" class="column-item">
            <img :src="item.img" alt="">
        </div>
    </template>
    </div>  
</template>
<script>
export default {
    name :'ImageWall',
    props: {
        list: {
            type: Array,
            required: true
        },
        row: {
            type: Boolean,
            default: false
        },
        column: {
            type: Number,
            default: 4
        },
        height: {
            type: Number,
            default: 225
        }
    },
    data () {
        return {
            itemWidth: 0,
            columnData: []
        }
    },
    mounted () {
        this.renderList()
    },
    methods: {
        renderList() {
            // 横向排列使用css进行排列
            // 纵向排列使用绝对定位排列
            if (!this.row) {
                // 存储每列已排列的高度
                this.columnData = []
                // 计算出每列应该占总宽度的百分比
                this.itemWidth = `${100 / this.column}% `
                this.$nextTick(() => {
                    // 对所有盒子进行计算绝对定位的位置
                    const boxes = this.$refs.imgList.getElementsByClassName('column-item');
                    for (let i = 0; i < boxes.length; i++) {
                        this.setElementStyle(boxes[i], this.list[i], i);
                    }
                })
            }
        },
        setElementStyle (element, img, index) {
            // 计算出图片实际在项目中显示的高
            const w = this.$refs.imgList.offsetWidth / 4;
            const h = ((w - 6) / img.width) * img.height + 6;
            if (index < this.column) {
                element.style.left = `${index * (100 / this.column)}%`;
                                // console.log( element.style.left)
                this.columnData[index] = this.columnData[index] ? this.columnData[index] + h : h;
            } else {
                // 找出最小高度的列
                let min = {}
                for (let i = 0; i < this.columnData.length; i++) {
                    if (!min.hasOwnProperty('index')) {
                        min = {index: i, value: this.columnData[i]}
                    } else {
                        if (this.columnData[i] < min.value) {
                            min = {index: i, value: this.columnData[i]}
                        }
                    }
                }
                element.style.left = `${min.index * (100 / this.column)}%`;

                element.style.top = `${min.value}px`;
                this.columnData[min.index] += h;
            }
            element.style.width = this.itemWidth;
        }
    }
}
</script>
<style scoped>
    .waterfall-wrap {
    position: relative;
    }
    .waterfall-wrap .column-item {
    position: absolute;
    padding: 3px;
    font-size: 0;
    box-sizing: border-box;
    transition: all 0.3s ease;
    }
    .waterfall-wrap .column-item img {
    max-width: 100%;
    }
    .waterfall-wrap.row {
    display: flex;
    flex-wrap: wrap;
    }
    .waterfall-wrap.row .row-item {
    margin: 5px;
    flex-grow: 1;
    font-size: 0;
    box-sizing: border-box;
    transition: all 0.3s ease;
    }
    .waterfall-wrap.row .row-item img {
    min-height: 100%;
    min-width: 100%;
    object-fit: cover;
    }
    .waterfall-wrap.row .last-box {
    margin: 5px;
    flex-grow: 999;
    }
</style>