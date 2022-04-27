# JavaScript Naming Conventions


## 注意点

1. 尽量用英文
2. 注意命名格式

## 命名格式

一般来讲，有下面几种命名格式

- PascalCase：组件名、网络请求
- camelCase：变量、方法
- snake_case
- kebab-case：源代码路径、组件标签 <kebab-case>、url、路由
- ALL_UPPERCASE_WITH_SNAKE_CASE：常量

以下为示例:

```javascript
// PascalCase
import HeaderContainer from './HeaderContainer.vue'
const UpdateBook = () => { return axioa.get() }

// camelCase
const addItem = () => {}
const removeItem = () => {}

let userList = []

// kebab-case
// <header-container></header-container>

// ALL_UPPERCASE_WITH_SNAKE_CASE
const DEFAULT_PAGE_SIZE = 10
```


## References

`github/kettanito/naming-cheatsheet` ， `Google Cloud API Naming Convention`， 需要简单看一下，其他材料可以做进一步研究参考。

- [github/kettanito/naming-cheatsheet](https://github.com/kettanaito/naming-cheatsheet)
- [Google Cloud API Naming Convention](https://cloud.google.com/apis/design/naming_convention)
- [Code Complete](https://book.douban.com/subject/1432042/), Steve McConnell
- [The Elements of Java™ Style](http://derek.dkit.ie/java/the_elements_of_java_style/the_elements_of_java_style.pdf), Vermeulen et al. 2000
