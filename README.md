# Craft Documentation Theme for VuePress

This is the [VuePress](https://vuepress.vuejs.org/) theme used for [Craft CMS documentation](https://docs.craftcms.com/).

It makes the following changes over the default VuePress theme:

- Adds support for [code language toggles](#code-toggles) and [split page views](#split-views).
- Disables [interpolation](https://vuepress.vuejs.org/guide/using-vue.html#interpolation) by wrapping all page content in a big `v-pre` block.
- Improves `<table>` styling.

## Setup

1. [Install](https://vuepress.vuejs.org/guide/getting-started.html) VuePress like normal
2. Require this theme

   ```
   yarn add -D vuepress-theme-craftdocs # or npm install -D vuepress-theme-craftdocs
   ```

3. Set these things in `.vuepress/config.js`:

   ```js
   module.exports = {
     // ...
     theme: "craftdocs",
     themeConfig: {
       // ...
       codeLanguages: {
         php: "PHP",
         twig: "Twig",
         // any other code language labels you want to include in code toggles...
       },
     },
     markdown: {
       anchor: { level: [2, 3] },
       extendMarkdown(md) {
         let markup = require("vuepress-theme-craftdocs/markup");
         md.use(markup);
       },
     },
   };
   ```

## Code Toggles

You can create code toggles by wrapping multiple fenced code blocks with a `code` container:

````markdown
::: code

```php
echo "Hey, $name";
```

```twig
Hey, {{ name }}
```

:::
````

By default, toggle labels will be pulled from the value in `themeConfig.codeLanguages` that matches the code block’s language. If you want to provide a custom label instead, just type it after the code block language:

````markdown
::: code

```php Craft 2
$success = craft()->entries->saveEntry($entry);
```

```php Craft 3
$success = Craft::$app->elements->saveElement($entry);
```

:::
````

## Storybook

After running `npm install`, use `npm run storybook` to start Storybook for interactive custom component documentation.

## Upgrading from v1.3.x

1. Follow the VuePress [Migration from 0.x](https://vuepress.vuejs.org/miscellaneous/migration-guide.html) guide.
2. Update any custom styles that relied on `.content` to reference `.theme-default-content` instead.
3. If you’re using Algolia DocSearch, make sure your index configuration’s selectors are still valid.
