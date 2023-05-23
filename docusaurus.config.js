const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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
          editUrl: ({ docPath }) => {
            return `https://github.com/serinryu/secondbrain/tree/main/docs/${docPath}`
          },
        },
        blog: {
          blogTitle: 'About',
          blogDescription: 'I am Serin',
          postsPerPage: 'ALL',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'About',
          routeBasePath: '/about',
          editUrl: ({ locale, blogDirPath, blogPath }) => {
            return `https://github.com/serinryu/secondbrain/tree/main/posts/${blogPath.replace('/index.md', '')}/${locale}.md`
          },
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
            to: '/wiki/',
            type: 'docSidebar',
            sidebarId: 'docSidebar',
            position: 'left',
            label: 'My Wiki',
          },
          {
            to: '/about/', 
            position: 'left',
            label: 'About',
          },
          {
            href: 'https://github.com/serinryu',
            label: 'GitHub',
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
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/about',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Serin Ryu. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
