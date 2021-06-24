# 数据可视化平台

### 资料

[https://gitee.com/pengxiaotian/datav-vue](https://gitee.com/pengxiaotian/datav-vue)

[https://gitee.com/jiasichen/data-v-master](https://gitee.com/jiasichen/data-v-master)

[https://gitee.com/MTrun/big-screen-vue-datav](https://gitee.com/MTrun/big-screen-vue-datav)

### 文档

[http://datav.jiaminghi.com/](http://datav.jiaminghi.com/)


### 图表更新功能

1. 图表整合

&ensp;&ensp;&ensp;&ensp;1. 移除所有堆叠图表

&ensp;&ensp;&ensp;&ensp;2. 可以使用dataset实现的全部使用dataset作为数据源

2. 重新实现

&ensp;&ensp;&ensp;&ensp;1. 轮播列表重新实现，使用transform实现动画，同时移除jquery依赖

&ensp;&ensp;&ensp;&ensp;2. ~~百分比饼图改为进度条实现~~使用饼图实现

3. 添加从接口获取数据

### 设计器功能

- [x] 使用vuex共享数据

- [x] 暗黑主题

&ensp;&ensp;&ensp;&ensp;- [x] 菜单栏

&ensp;&ensp;&ensp;&ensp;- [x] 图层

&ensp;&ensp;&ensp;&ensp;- [x] 大屏设计器

&ensp;&ensp;&ensp;&ensp;- [x] 图表配置项

- [x] 添加大屏缩放功能（自动适配）

&ensp;&ensp;&ensp;&ensp;- [x] 对齐线

&ensp;&ensp;&ensp;&ensp;- [x] 对齐线吸附

&ensp;&ensp;&ensp;&ensp;- [x] 标尺

- [x] 图表基础功能

&ensp;&ensp;&ensp;&ensp;- [x] 元素移动和缩放

&ensp;&ensp;&ensp;&ensp;- [x] 元素旋转

&ensp;&ensp;&ensp;&ensp;- [x] 旋转后的缩放

&ensp;&ensp;&ensp;&ensp;- [x] 优化cursor

- [ ] 添加图层功能

&ensp;&ensp;&ensp;&ensp;- [x] 添加hover事件和大屏联动

&ensp;&ensp;&ensp;&ensp;- [x] 添加click事件和大屏联动

&ensp;&ensp;&ensp;&ensp;- [ ] 实现图表图层事件

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;- [x] 上移

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;- [x] 下移

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;- [x] 置顶

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;- [x] 置底

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;- [x] 显示/隐藏

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;- [ ] 锁定/解锁

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;- [ ] 复制/粘贴

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;- [ ] 删除/恢复

&ensp;&ensp;&ensp;&ensp;- [ ] 图层分组

- [ ] 添加键盘快捷键

&ensp;&ensp;&ensp;&ensp;- [ ] 复制

&ensp;&ensp;&ensp;&ensp;- [ ] 粘贴

&ensp;&ensp;&ensp;&ensp;- [ ] 撤销（参考logicflow）

&ensp;&ensp;&ensp;&ensp;- [ ] 重做

- [ ] 配置项

&ensp;&ensp;&ensp;&ensp;- [ ] 数据配置项

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;- [ ] 静态数据配置项

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;- [ ] 数据源配置项

&ensp;&ensp;&ensp;&ensp;- [x] 位置配置项

&ensp;&ensp;&ensp;&ensp;

### 图表开发

- [ ] 图表

&ensp;&ensp;&ensp;&ensp;- [x] 普通折线图

&ensp;&ensp;&ensp;&ensp;- [x] 普通柱状图

&ensp;&ensp;&ensp;&ensp;- [x] 饼状图

&ensp;&ensp;&ensp;&ensp;- [x] 普通散点图

&ensp;&ensp;&ensp;&ensp;- [x] 中国地图

&ensp;&ensp;&ensp;&ensp;- [x] 象形柱图

&ensp;&ensp;&ensp;&ensp;- [x] 折线面积图

&ensp;&ensp;&ensp;&ensp;- [x] 堆叠柱状图（两种堆叠方式）

&ensp;&ensp;&ensp;&ensp;- [x] 雷达图

&ensp;&ensp;&ensp;&ensp;- [ ] 漏斗图

&ensp;&ensp;&ensp;&ensp;- [ ] 气泡散点图（比较复杂）

&ensp;&ensp;&ensp;&ensp;- [ ] 重新实现计数器（使用antdv统计组件）（必要性不是很大）

- [ ] 场景

&ensp;&ensp;&ensp;&ensp;- [ ] 运维场景

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;- [ ] 预警提示

- [ ] 其他

&ensp;&ensp;&ensp;&ensp;- [x] 轮播列表

&ensp;&ensp;&ensp;&ensp;- [x] 标题文本

&ensp;&ensp;&ensp;&ensp;- [x] 进度条

&ensp;&ensp;&ensp;&ensp;- [x] 计数器

### 图表配置项

- [x] 标题

- [x] 图例

- [x] 直角坐标系内绘图网格

- [x] X轴

- [x] Y轴

- [x] 视觉映射

- [ ] 雷达图

### 图表系列配置项

- [x] 折线/面积图

- [x] 柱状图（条形图）

- [x] 饼图

- [x] 地图

- [ ] 漏斗图

- [ ] 雷达图

- [ ] 气泡散点图

### 设计器更新功能

重新设计可视化大屏设计器

#### 配色参考

[jimureport](http://www.jimureport.com/)

[easyv](https://easyv.dtstack.com/)

#### 大屏实现

1. 大屏布局和自动缩放

&ensp;&ensp;&ensp;&ensp;1. [visual-drag-demo](https://github.com/woai3c/visual-drag-demo)

&ensp;&ensp;&ensp;&ensp;2. [datav-vue](https://gitee.com/pengxiaotian/datav-vue)

&ensp;&ensp;&ensp;&ensp;3. [jimureport](http://www.jimureport.com/)

&ensp;&ensp;&ensp;&ensp;4. [百度Sugar](https://cloud.baidu.com/product/sugar.html)

2. 组件拖拽和旋转

&ensp;&ensp;&ensp;&ensp;1. 布局和更新数据方式参考[visual-drag-demo](https://github.com/woai3c/visual-drag-demo)

&ensp;&ensp;&ensp;&ensp;2. 实现参考[datav-vue](https://gitee.com/pengxiaotian/datav-vue)

3. 组件缩放

&ensp;&ensp;&ensp;&ensp;1. 算法参考[visual-drag-demo](https://github.com/woai3c/visual-drag-demo)

&ensp;&ensp;&ensp;&ensp;2. 边框样式参考[datav-vue](https://gitee.com/pengxiaotian/datav-vue)

4. 组件拖拽参考线和吸附布局

&ensp;&ensp;&ensp;&ensp;1. [visual-drag-demo](https://github.com/woai3c/visual-drag-demo)

5. 组件标尺

&ensp;&ensp;&ensp;&ensp;1. [datav-vue](https://gitee.com/pengxiaotian/datav-vue)

6. 组件组合，拆分

&ensp;&ensp;&ensp;&ensp;1. [visual-drag-demo](https://github.com/woai3c/visual-drag-demo)


