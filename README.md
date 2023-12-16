# dragger
a localStorage lists/item dragging widget with original javascript drag api.

#### 功能简介

- 本地储存
- 列表嵌套
- 列表重排

![dragger3](https://raw.githubusercontent.com/2Broear/dragger/main/dragger3.gif "dragger3.gif")

## 使用说明
可 _手动_ 加载脚本并完成初始化，也可直接在前端中使用 _异步（`xhr`）_ 加载资源后完成初始化：
#### Usage 01
```javascript
new dragger.init();
```
### 初始化参数（可选）
在初始化时，可携带部分参数对象以重载默认配置，常用配置项如下列表所示（`a->b` 表示对象 `a` 的子对象 `b`）：

#### static-> 静态参数

| 参数 | 类型 | 描述 | 备注 |
| :---- | :---- | :---- | :---- |
| listTag | String | 列表项标签 | 默认 `LI` |
| maxRemains | Number | 列表项最小值 | 默认 `0`（同时影响拖拽列表/列表项） |
| dataPrefix | String | 本地储存前缀 | 默认 `ls_` |
| dataStored | String | 本地储存记录 | 默认 `false`（默认初始化后为 `true` 所有初始化列表记录被删除后返回 `false`） |


#### class-> 静态参数

| 参数 | 类型 | 描述 | 备注 |
| :---- | :---- | :---- | :---- |
| wrap | String | 元素：列表组外包元素 | 默认 `lists` |
| list | String | 元素：列表组 | 默认 `list` |
| press | String | 状态：拖拽 | 默认 `press` |
| enter | String | 状态：拖拽进入 | 默认 `enter` |
| drop | String | 状态：拖拽放置 | 默认 `drop` |
| dropBefore | String | 状态：拖拽前置 | 默认 `before`（同时包含列表/列表项） |
| dropAfter | String | 状态：拖拽后置 | 默认 `after`（同时包含列表/列表项） |

#### element-> 元素参数

| 参数 | 类型 | 描述 | 备注 |
| :---- | :---- | :---- | :---- |
| wrap | HTMLElement | 列表组外包元素 | 缺省 `null`；可指定包裹元素 |

### 增查删改（可选）
初始化后，可携带以下指定参数对象以查询（getter）或更新（setter）当前已储存列表，参数列表如下所示：

```javascript
// getter
gragger.list;  // 返回当前本地储存列表及列表组包裹元素
// setter
dragger.list = {
    select: {
        list: 2,  // 列表索引
        item: 0  // 列表项索引
    },
    action: {
        group: {  // 选择列表操作（仅当 group->tag 为真时）
            tag: 'ol',  // 生成列表标签
            count: 1,  // 生成列表数量
            child: 1  // 生成列表项数量
        },
        delete: true,  // 删除列表/项操作
        update: true,  // 更新本地储存
    }
}
```

#### 携带参数初始化示例
```javascript
// 自定义参数对象
const custom_args = {
    static: {
        maxRemains: 1,  // 所有列表在拖拽时至少保留 1 个列表项（防止空列表）
    }
};
// 初始化并重载自定义配置
new dragger.init(custom_args);
```

## 其他
任何问题及建议可提 issue.
