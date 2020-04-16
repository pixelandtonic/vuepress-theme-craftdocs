import CodeToggle from "./components/CodeToggle";

export default ({ Vue, options, router, siteData }) => {
  Vue.component("code-toggle", CodeToggle);

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
};
