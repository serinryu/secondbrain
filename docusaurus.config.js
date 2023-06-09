/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Serin Ryu',
  tagline: 'I am Serin Ryu, traveling the WWW.',
  favicon: 'img/building.png',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  organizationName: 'serinryu', 
  projectName: 'second-brain', 
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./config/sidebars.js'),
          routeBasePath: '/wiki',
          breadcrumbs: true,
          sidebarCollapsed: true,
          sidebarCollapsible: true,
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        /*
        blog: {
          blogTitle: 'Blog',
          blogDescription: 'I am Serin',
          postsPerPage: 'ALL',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'blog',
          showReadingTime: false,
          routeBasePath: '/blog',
        },
        */
        pages: {
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/global.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/building.png',
      navbar: {
        title: "Serin's Second Brain",
        logo: {
          alt: 'My Site Logo',
          src: 'img/building.png',
        },
        items: [
          {
            label: 'My Wiki',
            to: '/wiki/',
            type: 'docSidebar',
            sidebarId: 'docSidebar',
            position: 'left',
          },
          /*
          {
            label: 'blog',
            to: '/blog/', 
            position: 'left',
          },
          */
          {
            label: 'About',
            to: '/about',
            position: 'left',
          },
          {
            label: 'GitHub',
            href: 'https://github.com/serinryu',
            position: 'right',
          },
          {
            label: 'Medium',
            href: 'https://medium.com/@serinryu',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Medium',
                href: 'https://medium.com/@serinryu',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/serinryu',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/serinryu',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Serin Ryu.`,
      },
      prism: {
        /*
        theme: require('prism-react-renderer/themes/github'),
        darkTheme: require('prism-react-renderer/themes/dracula'),
        */
        defaultLanguage: 'java',
      },
      algolia: {
        appId: '1PMKUF6C9D',
        apiKey: 'd2ef5fd1efa1eb6ea0c3c78f88dd5b20', // Public API key: it is safe to commit it
        indexName: 'mysecondbrain',
        contextualSearch: true,
      },
    }),
};

module.exports = config;
