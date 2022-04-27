/*
 * @Author: your name
 * @Date: 2021-01-27 14:29:27
 * @LastEditTime: 2021-01-29 17:48:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \archetype-resources\src\views\theme\theme.js
 */
function ChangeTheme (theme) {
    this.biyiPrimary = theme.biyiPrimary // 页面主色
    this.biyiHover = theme.biyiHover // 划过的颜色
    this.biyiThead = theme.biyiThead // 表格划过的颜色
    this.biyiSecondMenu = theme.biyiSecondMenu // 展开的二级菜单背景色
    this.biyiText = theme.biyiText || 'white'
    this.url = 'url(' + require('../../assets/bj.png') + ') no-repeat left 0 bottom/80%'
    this.style = ''
    //  biyiPrimary的元素
    this.biyiPrimaryEle = {
    //  更改bordercolor的元素
        'border-color': [
            '.ivu-input:hover, .ivu-page-item-active, .ivu-select-selection-focused, .ivu-select-selection:hover',
            '.ivu-btn-primary, .ivu-radio-checked .ivu-radio-inner, .ivu-radio-wrapper-checked.ivu-radio-border',
            '.ivu-checkbox-checked .ivu-checkbox-inner'
        ],
        'background-color': [
            '.ivu-btn-primary, .ivu-menu-dark',
            '.main-sider, .ivu-menu-dark',
            '.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title',
            'ivu-menu-submenu-title, .ivu-menu-opened .ivu-menu-submenu',
            '.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title',
            '.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu)',
            '.ivu-checkbox-checked .ivu-checkbox-inner',
            '.ivu-radio-inner:after, .ivu-tabs-ink-bar',
            '.ivu-page-item-active'
        ]
    }
    //  biyiHover的元素
    this.biyiHoverEle = {
        'background-color': [
            '.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu)',
            '.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover',
            '.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover',
            '#app .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active',
            '#app .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover',
            '#app .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item:hover',
            '.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover',
            '.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover',
            '.ivu-tag-primary.ivu-tag-dot .ivu-tag-dot-inner'
        ],
        'color': [
            '.ivu-tabs-nav .ivu-tabs-tab-active',
            '.ivu-tabs-nav .ivu-tabs-tab:hover'
        ]
    }
    //  biyiThead的元素
    this.biyiTheadEle = {
        'background-color': ['.ivu-table-row-hover td']
    }
    this.biyiSecondMenuEle = {
        'background-color': ['.ivu-menu-opened .ivu-menu']
    }
    // biyiText的元素
    this.biyiTextEle = {
        'color': [
            '.ivu-page-item-active a, .ivu-page-item-active:hover a'
        ]
    }
    // 图片
    this.biyiImgEle = {
        'background': ['.main-sider']
    }
}
ChangeTheme.prototype.writeStyle = function () {
    var style = ''
    this.setStyle('biyiImgEle', 'url')
    this.setStyle('biyiPrimaryEle', 'biyiPrimary')
    this.setStyle('biyiHoverEle', 'biyiHover')
    this.setStyle('biyiTheadEle', 'biyiThead')
    this.setStyle('biyiSecondMenuEle', 'biyiSecondMenu')
    this.setStyle('biyiTextEle', 'biyiText')
    this.creatStyle(style)
}
//  创建style标签 并插入
ChangeTheme.prototype.creatStyle = function (style) {
    let styledom = document.querySelector('.biyi-style')
    if (!styledom) {
        styledom = document.createElement('style')
        styledom.type = 'text/css'
        styledom.className = 'biyi-style'
    }
    styledom.innerHTML = this.style
    document.getElementsByTagName('head').item(0).appendChild(styledom)
}

// 拼接style的方法
ChangeTheme.prototype.setStyle = function (classEle, attr) {
    for (let key in this[classEle]) {
        var len = this[classEle][key].length
        this[classEle][key].forEach((ele, index) => {
            if (index === len - 1) {
                this.style += ele
            } else {
                this.style += ele + ', '
            }
        })
        this.style = this.style + '{' + key + ':' + this[attr] + ' !important}'
    }
}
export default ChangeTheme
