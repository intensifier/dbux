/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [{ 
    type: 'autogenerated', dirName: '.' 
  }],

  /**
   * NOTE: it used to be possible to override the Sidebar rendering entirely via swizzling, 
   *    but it currently (2021/12) appears broken, and is also not mentioned in current version of API docs.
   * -> `swizzle @docusaurus/theme-classic DocSidebar`
   * @see https://github.com/facebook/docusaurus/blob/ae9a12ff5048ccf0936eb7677a17b0a8b2ea21ba/website/versioned_docs/version-2.0.0-beta.13/cli.md#docusaurus-swizzle-sitedir-docusaurus-swizzle-sitedir
   */

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
};

module.exports = sidebars;
