import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/y-docs/',
  title: "SHI 的文档库",
  description: "个人技术文档、教程、总结",
  head: [["link", { rel: "icon", href: "/y-docs/favicon.ico" }]],
  themeConfig: {
    outlineTitle: '目录',
    outline: [2, 6],
    logo: '/min-logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/examples-docs/markdown-examples' },
      { text: '前端', items: [
          { text: 'vue2', link: '/web-docs/vue2/' },
          { text: 'vue3', link: '/web-docs/vue3/' },
          { text: 'typescript', link: '/web-docs/ts/' }
      ]},
      { text: '后端', items: [
          { text: 'nodejs', link: '/service-docs/nodejs/' },
          { text: 'java', link: '/service-docs/java/' },
      ]},
      {text: '教程',items: [
        { text: '教程1', link: '/tutorial-docs/' },
        { text: '教程2', link: '/tutorial-docs/test-2' },
      ]}
    ],

    sidebar: {
      '/examples-docs/': [
        {
          text: '示例',
          items: [
            { text: 'Markdown 示例', link: '/examples-docs/markdown-examples' },
            { text: 'Runtime API 示例', link: '/examples-docs/api-examples' }
          ]
        }
      ],
      // 前端 start
      '/web-docs/vue2/': [
        {
          text: 'vue2',
          items: [
            { text: '简介', link: '/web-docs/vue2/' },
            { text: '快速上手', link: '/web-docs/vue2/quick-start' },
          ]
        },
      ],
      '/web-docs/vue3/': [
        {
          text: 'vue3',
          items: [
            { text: '自定义hook', link: '/web-docs/vue3/' },
            { text: '自定义指令', link: '/web-docs/vue3/custom-v' },
          ]
        },
      ],
      '/web-docs/ts/': [
        {
          text: 'typescript',
          items: [
            { text: '测试', link: '/web-docs/ts/' },
          ]
        },
      ],
      // 前端 end

      // 后端 start
      '/service-docs/nodejs/': [
        {
          text: 'nodejs',
          items: [
            { text: '简介', link: '/service-docs/nodejs/' },
          ]
        },
      ],
      '/service-docs/java/': [
        {
          text: 'java',
          items: [
            { text: '简介', link: '/service-docs/java/' },
          ]
        },
      ],
      // 后端 end

      // 教程 start
      '/tutorial-docs/': [
        {
          text: '各种教程',
          items: [
            { text: '教程1', link: '/tutorial-docs/' },
            { text: '教程2', link: '/tutorial-docs/test-2' },
          ]
        },
      ],
      // 教程 end
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dadanihoutao' }
    ],

    footer: {
      copyright: 'Copyring@ 2023 SHI All Rights Reserved.'
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
