<template>
    <div class="code-toggle">
        <ul class="code-language-switcher">
            <li v-for="language in languages">
                <a :class="{ active: language === selectedLanguage }" @click="setLanguage(language)">{{ $site.themeConfig.codeLanguages[language] }}</a>
            </li>
        </ul>
        <slot :selectedLanguage="selectedLanguage"></slot>
    </div>
</template>

<script>
    export default {
        props: ['languages'],

        data() {
            return {
                selectedLanguage: this.languages[0]
            }
        },

        computed: {
            isActive(language) {
                return language === this.selectedLanguage
            }
        },

        methods: {
            setLanguage(language) {
                this.selectedLanguage = language
            }
        }
    }
</script>
