---
outline: deep
---

# 虚拟滚动列表

下面是一个虚拟滚动列表的示例。这个实现会包含以下功能：
- 处理大量数据
- 只渲染可视区域的内容
- 根据滚动位置动态更新显示的内容

## 主要特点
- 使用Vue.js实现，但原理适用于任何框架
- 只渲染可视区域内的数据（约8-10条）
- 使用transform来移动内容区域，提高性能
- 支持10万条数据的流畅滚动

## 实现原理
- 创建一个固定高度的容器
- 使用一个隐藏的元素（phantom）来撑开滚动条
- 根据滚动位置计算应该显示哪些数据
- 使用transform来移动实际显示的内容

## 代码实现
- 直接复制代码到本地 html 文件运行

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>虚拟滚动列表</title>
    <style>
        .list-container {
            height: 400px;
            overflow: auto;
            position: relative;
            border: 1px solid #ccc;
        }

        .list-phantom {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            z-index: -1;
        }

        .list-content {
            left: 0;
            right: 0;
            top: 0;
            position: absolute;
        }

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
            <!-- 用于撑开滚动条 -->
            <div class="list-phantom" :style="{ height: totalHeight + 'px' }"></div>
            <!-- 实际显示的列表内容 -->
            <div class="list-content" :style="{ transform: `translate3d(0, ${startOffset}px, 0)` }">
                <div class="list-item" v-for="item in visibleData" :key="item.id">
                    {{ item.value }}
                </div>
            </div>
        </div>
    </div>

    <!-- 加载慢的话，可把代码下载到本地引入使用 -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
    <script>
        new Vue({
            el: '#app',
            data() {
                return {
                    // 列表总数据，可调整数据量
                    listData: [],
                    // 每一项的高度，可根据需要调整
                    itemHeight: 50,
                    // 可视区域高度，可根据需要调整
                    screenHeight: 400,
                    // 当前滚动位置
                    scrollTop: 0,
                }
            },
            computed: {
                // 列表总高度，用于撑开滚动条
                totalHeight() {
                    return this.listData.length * this.itemHeight
                },
                // 计算可视区域能显示的数据条数
                visibleCount() {
                    return Math.ceil(this.screenHeight / this.itemHeight)
                },
                // 计算可视区域的偏移量，用于transform移动
                startOffset() {
                    return Math.floor(this.scrollTop / this.itemHeight) * this.itemHeight
                },
                // 计算当前可视区域应该显示的数据
                visibleData() {
                    const start = Math.floor(this.scrollTop / this.itemHeight)
                    const end = start + this.visibleCount
                    return this.listData.slice(start, end)
                }
            },
            created() {
                // 初始化数据，这里生成10万条测试数据
                this.listData = Array.from({ length: 100000 }, (_, index) => ({
                    id: index,
                    value: `列表项 ${index}`
                }))
            },
            methods: {
                // 监听滚动事件，更新滚动位置
                handleScroll(e) {
                    this.scrollTop = e.target.scrollTop
                }
            }
        })
    </script>
</body>
</html>
```
