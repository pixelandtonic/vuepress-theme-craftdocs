import Vuex from "vuex";
import CodeToggle from "./components/CodeToggle";
import CodeLanguageSwitcher from "./components/CodeLanguageSwitcher";
import { setStorage } from "./Storage";

// https://github.com/vuejs/vuepress/issues/1173
import pageComponents from "@internal/page-components";

export default ({ Vue }) => {
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component);
  }
};

export default ({ Vue, options, router, siteData }) => {
  const base = siteData.base;

  Vue.component("code-toggle", CodeToggle);
  Vue.component("code-language-switcher", CodeLanguageSwitcher);

  Vue.use(Vuex);

  Vue.mixin({
    computed: {
      $title() {
        const page = this.$page;
        const siteTitle = this.$siteTitle;
        const selfTitle = page.frontmatter.home
          ? null
          : page.frontmatter.title || // explicit title
            (page.title ? page.title.replace(/[_`]/g, "") : ""); // inferred title
        return siteTitle
          ? selfTitle
            ? selfTitle + " | " + siteTitle
            : siteTitle
          : selfTitle || "VuePress";
      },
    },
  });

  Object.assign(options, {
    data: {
      codeLanguage: null,
    },

    store: new Vuex.Store({
      state: {
        codeLanguage: null,
      },
      mutations: {
        changeCodeLanguage(state, language) {
          state.codeLanguage = language;
          setStorage("codeLanguage", language, base);
        },
      },
    }),
  });
};
