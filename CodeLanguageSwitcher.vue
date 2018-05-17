<template>
    <ul class="code-language-switcher">
        <li v-for="language in $page.frontmatter.code">
            <a :class="{ active: isActive(language) }" @click="$store.commit('changeCodeLanguage', language)">{{ $site.themeConfig.codeLanguages[language] }}</a>
        </li>
    </ul>
</template>

<script>
    export default {
        methods: {
            isActive(language) {
                return this.$store.state.codeLanguage === language
            }
        },

        beforeMount() {
            if (this.$page.frontmatter.code.indexOf(this.$store.state.codeLanguage) === -1) {
                this.$store.commit('changeCodeLanguage', this.$page.frontmatter.code[0])
            }
        }
    }
</script>
