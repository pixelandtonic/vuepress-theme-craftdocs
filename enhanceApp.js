import { siteData } from '@temp/siteData'
import Vuex from 'vuex'
import CodeToggle from './CodeToggle'
import CodeLanguageSwitcher from './CodeLanguageSwitcher'
import outboundLink from './OutboundLink'

function storagePrefix() {
    let p = siteData.base.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '.');
    return p ? p+'.' : '';
}

export default ({ Vue, options, router, siteData }) => {
    Vue.component('code-toggle', CodeToggle)
    Vue.component('code-language-switcher', CodeLanguageSwitcher)
    Vue.component('outbound-link', outboundLink)

    Vue.use(Vuex)

    Object.assign(options, {
        data: {
            codeLanguage: null,
        },

        store: new Vuex.Store({
            state: {
                codeLanguage: null
            },
            mutations: {
                changeCodeLanguage(state, language) {
                    if (typeof localStorage !== 'undefined') {
                        localStorage[storagePrefix()+'codeLanguage'] = language;
                    }
                    state.codeLanguage = language;
                }
            }
        }),

        beforeMount() {
            if (typeof this.$page.frontmatter.code !== 'undefined') {
                if (
                    typeof localStorage !== 'undefined' &&
                    typeof localStorage[storagePrefix()+'codeLanguage'] !== 'undefined' &&
                    this.$page.frontmatter.code.indexOf(localStorage[storagePrefix()+'codeLanguage']) !== -1
                ) {
                    this.$store.commit('changeCodeLanguage', localStorage[storagePrefix()+'codeLanguage'])
                } else {
                    this.$store.commit('changeCodeLanguage', this.$page.frontmatter.code[0])
                }
            }
        }
    })
}
