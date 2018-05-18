import Vuex from 'vuex'
import CodeToggle from './CodeToggle'
import CodeLanguageSwitcher from './CodeLanguageSwitcher'
import outboundLink from './OutboundLink'
import { setStorage } from './Storage'

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
                    state.codeLanguage = language;
                    setStorage('codeLanguage', language);
                }
            }
        })
    })
}
