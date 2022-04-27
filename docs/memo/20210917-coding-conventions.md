## 编码规约 Coding Conventions

为了保持代码风格的一致性，总结沉淀编码规约

## 组件

事件绑定的函数即通过 `@` 开头的方法，需要以 handle 前缀命名
在method 中首先排列 handle 的方法，handle 方法通过字母表顺序排列， 建议在 handleEvent 中尽量通过调用方法的形式实现功能。

```vue
// <Button @click="handleClickCancel></Button>
methods: {
    handleClickCancel(){
        this.closeModal()
    },
    handleClickOK() {},
    handleClickRefresh() {},
    otherFunction() {}
}
```

生命周期钩子函数，只调用方法

```vue
// This is Bad Example
created () {
    this.loading = true
    this.booksList = ListBooks()
    this.loading = false
}
// This is Good Example
methods: {
    listBooks() {
        this.loading = true
        this.booksList = ListBooks()
        this.loading = false
    }
}
created () {
    this.listBook()
}
```

## 网络请求

参考 Google Cloud API Naming Convention。

```javascript
// src/book/service.js
export const  ListBooks = async () => { 
    let { data } = await axios.request({
        method: 'GET',
        baseURL: BASE_SERVICE_URL
    })

    return data
}

// or 
export const ListBooks = async () => {
    return axios.request({
        method: 'GET',
        baseURL: BASE_SERVICE_URL
    })
}

const Book = {
    ListBooks
}

export default Book
```

## 其他

`IS_DEV` 是一个脚手架变量。相关的函数通过 `DEV_TEST` 的形式命名
