# Craft Documentation Theme for VuePress

This is the [VuePress](https://vuepress.vuejs.org/) theme used for [Craft CMS documentation](https://docs.craftcms.com/).

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
                twig: 'Twig',
                // any other code language labels you want to include in code toggles...
            }
        },
        markdown: {
            anchor: { level: [2, 3] },
            config(md) {
                let markup = require('vuepress-theme-craftdocs/markup')
                md.use(markup)
            }
        }
    }
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

## Split Views

You can create split view pages by adding `split: true` to your page’s frontmatter:

```yaml
---
split: true
---
```

In split view, any content that contains a horizontal rule (`---`) will be divided into `left` and `right` portions, starting and ending at the closest H2/H3 headings.

```markdown
## Cool Headings

Left-side content

---

Right-side content
```

In split view, code toggles can share a single page-wide toggle UI, floated at the top of the right-hand content pane. To do this, add a `code` list to your page’s frontmatter:

```yaml
---
split: true
code:
  - php
  - twig
---
```

(Use the same language handles defined by `themeConfig.codeLanguages` in `.vuepress/config.js`.)
