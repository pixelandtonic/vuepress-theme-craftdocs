# Craft Documentation Theme for VuePress

This is the [VuePress](https://vuepress.vuejs.org/) theme used for Craft CMS documentation.

## Setup

1. [Install](https://vuepress.vuejs.org/guide/getting-started.html) VuePress like normal
2. Require this theme

    ```
    yarn add -D vuepress-theme-craftdocs
    ```

3. Set these things in `.vuepress/config.js`:

    ```js
    module.exports = {
        // ...
        theme: 'craftdocs',
        themeConfig: {
            // ...
            codeLanguages: {
                php: 'PHP',
                // any other languages you want to include in code toggles...
            }
        },
        markdown: {
            anchor: { level: [2, 3] },
            config: require('vuepress-theme-craftdocs/markup')
        }
    }
    ```

4. In pages that you want a split view, add this to the frontmatter:

    ```yaml
    ---
    pageClass: split
    ---
    ```
