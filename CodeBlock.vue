<template>
    <div v-if="mounted && show">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['language'],

    data() {
        return {
            mounted: false
        }
    },

    computed: {
        show() {
            // show if this isn't one of the toggled languages, or it's the currently-selected language
            return (
                typeof this.$site.themeConfig.codeLanguages[this.language] === 'undefined' ||
                this.$root.codeLanguage === this.language
            );
        }
    },

    mounted() {
        this.mounted = true;
    }
}
</script>
