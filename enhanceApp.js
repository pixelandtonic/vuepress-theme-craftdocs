import { siteData } from '@temp/siteData'
import CodeToggle from './CodeToggle'
import CodeBlock from './CodeBlock'
import CodeLanguageSwitcher from './CodeLanguageSwitcher'
import outboundLink from './OutboundLink'

export default ({ Vue, options, router, siteData }) => {
    Vue.component('code-toggle', CodeToggle)
    Vue.component('code-block', CodeBlock)
    Vue.component('code-language-switcher', CodeLanguageSwitcher)
    Vue.component('outbound-link', outboundLink)

    Object.assign(options, {
        data: {
            codeLanguage: null,
        },

        beforeMount() {
            if (typeof this.$site.themeConfig.codeLanguages !== 'undefined') {
                if (
                    typeof localStorage !== 'undefined' &&
                    typeof localStorage[this.storagePrefix+'codeLanguage'] !== 'undefined' &&
                    typeof this.$site.themeConfig.codeLanguages[localStorage[this.storagePrefix+'codeLanguage']] !== 'undefined'
                ) {
                    this.codeLanguage = localStorage[this.storagePrefix+'codeLanguage']
                } else {
                    this.codeLanguage = Object.keys(this.$site.themeConfig.codeLanguages)[0];
                }
            }
        },

        methods: {
            setCodeLanguage(language) {
                this.codeLanguage = language;
                if (typeof localStorage !== 'undefined') {
                    localStorage[this.storagePrefix+'codeLanguage'] = language;
                }
            }
        },

        computed: {
            storagePrefix() {
                let p = siteData.base.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '.');
                return p ? p+'.' : '';
            }
        }
    })
}
