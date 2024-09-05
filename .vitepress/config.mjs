import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/y-docs/',
  title: "阿洋的文档",
  description: "随便写写的地方",
  themeConfig: {
    head: [["link", { rel: "icon", href: "/y-docs/logo.png" }]],
    outlineTitle: '目录',
    outline: [2, 6],
    logo: '/public/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/markdown-examples' },
      { text: '技术分类', items: [
        { text: 'HTML', link: '/html-docs/html-examples' },
        { text: 'CSS', link: '/css-docs/css-examples' },
        { text: 'JavaScript', link: '/js-docs/js-examples' }
      ] }
    ],

    sidebar: [
      {
        text: '示例',
        items: [
          { text: 'Markdown 示例', link: '/markdown-examples' },
          { text: 'Runtime API 示例', link: '/api-examples' }
        ]
      },
      {
        text: '技术分类',
        items: [
          { text: 'HTML', link: '/html-docs/html-examples' },
          { text: 'CSS', link: '/css-docs/css-examples' },
          { text: 'JS', link: '/js-docs/js-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dadanihoutao' }
    ],

    footer: {
      copyright: 'Copyring@ 2023 ayang All Rights Reserved.'
    },
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  },
})
