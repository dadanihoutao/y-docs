---
outline: deep
---

# 虚拟滚动列表

下面是一个虚拟滚动列表的示例。这个实现会包含以下功能：
- 处理大量数据
- 只渲染可视区域的内容
- 根据滚动位置动态更新显示的内容

## 虚拟滚动列表实现原理说明：
- 创建一个固定高度的容器，设置overflow: auto启用滚动
- 使用一个隐藏的元素(phantom)来撑起滚动条，高度等于所有列表项的总高度
- 实际显示的内容容器通过transform来定位，位置根据滚动位置计算
- 只渲染可视区域内的数据，根据滚动位置动态计算显示哪些数据
- 当用户滚动时，更新scrollTop，重新计算可见数据

## 性能优化要点：
- 使用计算属性缓存计算结果
- 只渲染可见区域的数据，大大减少DOM节点数量
- 使用transform做位移，避免重排
- 使用vue的虚拟DOM和key优化更新

## 和Vue2版本比较：
- Vue2版本快速滑动起来底部会有空白区域（更新渲染速度慢） 
- Vue3版本快速滑动起来底部不会出现空白区域（更新渲染速度快）

## 代码实现
- 直接复制代码到本地 html 文件运行

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>虚拟滚动列表 - Vue 3</title>
    <style>
        /* 容器样式：设置固定高度和滚动条 */
        .list-container {
            height: 400px;
            overflow: auto;
            position: relative;
            border: 1px solid #ccc;
        }

        /* 虚拟滚动条：用于模拟真实滚动高度 */
        .list-phantom {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            z-index: -1;
        }

        /* 实际显示的内容容器 */
        .list-content {
            left: 0;
            right: 0;
            top: 0;
            position: absolute;
        }

        /* 列表项样式 */
        .list-item {
            padding: 10px;
            border-bottom: 1px solid #eee;
            height: 50px;
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    <div id="app">
        <div class="list-container" @scroll="handleScroll">
            <div class="list-phantom" :style="{ height: totalHeight + 'px' }"></div>
            <div class="list-content" :style="{ transform: `translate3d(0, ${scrollTop}px, 0)` }">
                <div class="list-item" v-for="item in visibleData" :key="item.id">
                    {{ item.value }}
                </div>
            </div>
        </div>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        const { createApp, ref, computed, onMounted } = Vue

        const app = createApp({
            setup() {
                // 定义响应式数据
                const listData = ref([])          // 存储所有列表数据
                const itemHeight = ref(50)        // 每个列表项的高度
                const screenHeight = ref(400)     // 可视区域的高度
                const scrollTop = ref(0)          // 滚动条距离顶部的距离

                // 计算列表总高度
                const totalHeight = computed(() => {
                    return listData.value.length * itemHeight.value
                })

                // 计算可视区域能显示的列表项数量
                const visibleCount = computed(() => {
                    return Math.ceil(screenHeight.value / itemHeight.value)
                })

                // 计算当前需要显示的数据
                const visibleData = computed(() => {
                    // 计算起始索引：根据滚动位置计算第一个可见项的索引
                    const start = Math.floor(scrollTop.value / itemHeight.value)
                    // 计算结束索引：起始索引加上可视区域能显示的数量
                    const end = start + visibleCount.value
                    // 返回当前需要显示的数据片段
                    return listData.value.slice(start, end)
                })

                // 处理滚动事件
                const handleScroll = (e) => {
                    // 更新滚动位置
                    scrollTop.value = e.target.scrollTop
                }

                // 组件挂载后执行
                onMounted(() => {
                    // 初始化数据：生成10万条测试数据
                    listData.value = Array.from({ length: 100000 }, (_, index) => ({
                        id: index,
                        value: `列表项 ${index}`
                    }))
                })

                // 返回模板中需要使用的数据和方法
                return {
                    totalHeight,    // 列表总高度
                    scrollTop,      // 滚动位置
                    visibleData,    // 当前显示的数据
                    handleScroll    // 滚动事件处理函数
                }
            }
        })

        app.mount('#app')

    </script>
</body>
</html>
```
