<template>
  <div class="code-toggle">
    <ul class="code-language-switcher" v-if="!usePageToggle">
      <li v-for="(language, index) in languages" :key="index">
        <a
          :class="{ active: language === selectedLanguage }"
          @click="setLanguage(language)"
        >{{ getLanguageLabel(language) }}</a>
      </li>
    </ul>
    <div v-for="(language, index) in languages" :key="index">
      <slot :name="language" v-if="isSelectedLanguage(language)" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["languages", "labels"],

  data() {
    return {
      selectedLanguage: this.languages[0]
    };
  },

  computed: {
    usePageToggle() {
      if (this.$page === undefined) {
        return false;
      }

      return this.$page.frontmatter.split && this.$page.frontmatter.code;
    }
  },

  methods: {
    setLanguage(language) {
      this.selectedLanguage = language;
    },
    getLanguageLabel(language) {
      if (this.labels && this.labels[language]) {
        return this.labels[language];
      }

      const themeLanguages =
        this.$site !== undefined ? this.$site.themeConfig.codeLanguages : false;

      return (
        (this.labels && this.labels[language]) ||
        (themeLanguages && themeLanguages[language]) ||
        language
      );

      return language;
    },
    isSelectedLanguage(language) {
      return (
        language ==
        (this.usePageToggle
          ? this.$store.state.codeLanguage
          : this.selectedLanguage)
      );
    }
  }
};
</script>
