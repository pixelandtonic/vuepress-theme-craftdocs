import { siteData } from '@temp/siteData'
import CodeToggle from './CodeToggle'
import CodeLanguageSwitcher from './CodeLanguageSwitcher'
import outboundLink from './OutboundLink'

export default ({ Vue, options, router, siteData }) => {
    Vue.component('code-toggle', CodeToggle)
    Vue.component('code-language-switcher', CodeLanguageSwitcher)
    Vue.component('outbound-link', outboundLink)

    Object.assign(options, {
        data: {
            codeLanguage: null,
        },

        beforeMount() {
            if (typeof this.$page.frontmatter.code !== 'undefined') {
                if (
                    typeof localStorage !== 'undefined' &&
                    typeof localStorage[this.storagePrefix+'codeLanguage'] !== 'undefined' &&
                    this.$page.frontmatter.code.indexOf(localStorage[this.storagePrefix+'codeLanguage']) !== -1
                ) {
                    this.codeLanguage = localStorage[this.storagePrefix+'codeLanguage']
                } else {
                    this.codeLanguage = this.$page.frontmatter.code[0];
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
