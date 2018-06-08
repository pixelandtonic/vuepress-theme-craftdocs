import Vuex from 'vuex'
import CodeToggle from './CodeToggle'
import CodeLanguageSwitcher from './CodeLanguageSwitcher'
import OutboundLink from './OutboundLink'
import { setStorage } from './Storage'

export default ({ Vue, options, router, siteData }) => {
    Vue.component('code-toggle', CodeToggle)
    Vue.component('code-language-switcher', CodeLanguageSwitcher)
    Vue.component('outbound-link', OutboundLink)

    Vue.use(Vuex)

    Vue.mixin({
        computed: {
            $title() {
                const page = this.$page
                const siteTitle = this.$siteTitle
                const selfTitle = page.frontmatter.home ? null : (
                    page.frontmatter.title || // explicit title
                    (
                        // inferred title
                        page.title ? page.title.replace(/[_`]/g, '') : 'Page Not Found'
                    )
                )
                return siteTitle
                    ? selfTitle
                        ? (selfTitle + ' | ' + siteTitle)
                        : siteTitle
                    : selfTitle || 'VuePress'
            }
        }
    })

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
                    state.codeLanguage = language;
                    setStorage('codeLanguage', language);
                }
            }
        })
    })
}
