# Changelog

## Unreleased
### Fixed
- Added workaround to fix broken URL hash scroll ([VuePress #2428](https://github.com/vuejs/vuepress/issues/2428)).

## 2.0.5 - 2020-06-18
### Fixed
- Fixed slightly misaligned highlight styling in Algolia search results.

## 2.0.4 - 2020-06-01
### Changed
- Apply bold style to `<dfn>` tags.

## 2.0.3 - 2020-05-06
### Changed
- Vue-style interpolation is now only disabled for inline `<code>` tags now (in addition to code blocks, per VuePress core).

## [2.0.2] - 2020-04-17
### Fixed
- Fixed expandable sidebar heading’s active/expanded color.

## [2.0.1] - 2020-04-17
### Added
- Brought back support for split views. [#13](https://github.com/pixelandtonic/vuepress-theme-craftdocs/issues/13)

## [2.0.0] - 2020-04-15
### Added
- Started a changelog 😎.
- Added `BrowserShot` and `MetaDetails` components.

### Changed
- Updated theme for VuePress ^1.4.1, with customizations applied to [1.4.1 default](https://github.com/vuejs/vuepress/tree/v1.4.1/packages/@vuepress/theme-default).
- Refactored styles.
- Restored code block language hints.
- Refined appearance of `<kbd>` elements.

### Fixed
- Fixed `CodeSwitcher` appearance < 419px.

### Removed
- Removed support for custom split views.
- Removed `CodeLanguageSwitcher` and `Page` components that are no longer needed.
