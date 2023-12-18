# dragger
a localStorage lists/item dragging widget with original javascript drag api.

#### 功能简介

- 列表/列表项嵌套
- 列表/列表项重排
- 自定义更新列表
- 本地储存记录

![dragger3](https://raw.githubusercontent.com/2Broear/dragger/main/dragger3.gif "dragger3.gif")

## 使用说明
可 _手动_ 加载 `main.js` 脚本后完成初始化，也可在前端中使用异步 `xhr` 加载后完成初始化：

```javascript
new dragger.init();
```

### 初始化参数（可选）
初始化时，可携带部分对象参数以重载默认配置，常用配置项如下列表所示（`a->b` 表示对象 `a` 的子对象 `b`）：

#### static-> 静态参数

| 参数 | 类型 | 描述 | 备注 |
| :---- | :---- | :---- | :---- |
| listTag | String | 列表项标签 | 默认 `LI` |
| maxRemains | Number | 列表项最小值 | 默认 `0`（拖拽列表/列表项） |
| defaultRow | Number | 默认列表行数 | 默认 `2` |
| defaultCol | Number | 默认列表列数 | 默认 `2` |
| dataPrefix | String | 本地储存前缀 | 默认 `ls_` |
| dataStored | Boolean | 本地储存记录 | 默认 `false`（初始化后为 `true`，所有列表记录被删除后返回 `false` 并自动重建默认列表） |


#### class-> 静态参数

| 参数 | 类型 | 描述 | 备注 |
| :---- | :---- | :---- | :---- |
| wrap | String | 元素：列表组外包元素 | 默认 `lists` |
| list | String | 元素：列表组 | 默认 `list` |
| press | String | 状态：拖拽 | 默认 `press` |
| enter | String | 状态：拖拽进入 | 默认 `enter` |
| drop | String | 状态：拖拽放置 | 默认 `drop` |
| dropBefore | String | 状态：拖拽前置 | 默认 `before`（包含列表/列表项） |
| dropAfter | String | 状态：拖拽后置 | 默认 `after`（包含列表/列表项） |

#### element-> 元素参数
<details>
      <summary>展开内容</summary>

| 参数 | 类型 | 描述 | 备注 |
| :---- | :---- | :---- | :---- |
| wrap | HTMLElement | 列表组外包元素 | 缺省 `null`；可指定包裹元素 |

</details>

### 增查删改（可选）
完成初始化后，可通过 `list` 接口指定以下对象参数以查询（getter）或更新（setter）当前已储存列表，如下所示：

```javascript
// getter
gragger.list;  // 返回当前本地储存列表及列表组包裹元素

// setter
dragger.list = {
    select: {  // 除执行 delete->true 外（0为第一项），当索引为 0 时，默认选中当前列表中最后一项（如操作新增时）
        list: 0,  // 选择列表索引
        item: 0  // 选择列表项索引
    },
    action: {
        group: {  // 操作列表（仅当 `group->tag` 为真时，执行删除或新增列表）
            tag: 'ol',  // 生成列表标签
            count: 1,  // 生成列表数量
            child: 1  // 生成列表项数量
        },
        delete: false,  // 删除已选列表/列表项
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
        defaultCol: 1,  // 默认生成一列（此项为 0 时 需手动指定 element->wrap 元素以响应 setter 操作）
        defaultRow: 1   // 默认生成一行
    }
};

// 初始化并重载自定义配置
new dragger.init(custom_args);
```

## 其他
任何问题及建议可提 issue.