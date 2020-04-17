<template>
  <main class="page">
    <!-- almost identical to theme default except for adding this language switcher -->
    <code-language-switcher
      v-if="$page.frontmatter.split && $page.frontmatter.code"
    />
    <slot name="top" />

    <Content class="theme-default-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from "@parent-theme/components/PageEdit.vue";
import PageNav from "@parent-theme/components/PageNav.vue";
//import CodeLanguageSwitcher from "./CodeLanguageSwitcher.vue";

export default {
  components: { PageEdit, PageNav },
  props: ["sidebarItems"],
};
</script>

<style lang="stylus">
@require '~@parent-theme/styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block
</style>
