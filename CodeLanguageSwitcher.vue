<template>
    <ul class="code-language-switcher">
        <li v-for="language in $page.frontmatter.code">
            <a :class="{ active: isActive(language) }" @click="$root.setCodeLanguage(language)">{{ $site.themeConfig.codeLanguages[language] }}</a>
        </li>
    </ul>
</template>

<script>
    export default {
        methods: {
            isActive(language) {
                return this.$root.codeLanguage === language
            }
        }
    }
</script>
