<template>
    <ul class="code-language-switcher">
        <li v-for="(label, language) in $site.themeConfig.codeLanguages">
            <a :class="{ active: isActive(language) }" @click="$root.setCodeLanguage(language)">{{ label }}</a>
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
