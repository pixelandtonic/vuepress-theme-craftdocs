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

<style lang="stylus">
.code-toggle {
  margin: 0.85rem 0;

  div[class*='language-'] {
    border-radius: 0 0 6px 6px;

    &:before {
      display: none;
    }
  }

  & > div > div[class*='language-'] {
    & > pre, & > pre[class*='language-'] {
      margin: 0;
    }
  }
}

ul.code-language-switcher {
  border-radius: 6px 6px 0 0;
  height: $navbarHeight;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0.7rem 1.5rem;
  font-size: 15px;
  line-height: 1.4;
  z-index: 2;
  background: darken($blockColor, 5%);

  li {
    margin: 0 5px 0 0;
    padding: 0;
    list-style-type: none;

    a {
      display: block;
      padding: 0 0.625rem;
      line-height: 2.2rem;
      cursor: pointer;
      border-radius: 4px;
      color: lighten($textColor, 20%);

      &:hover {
        text-decoration: none !important;

        &:not(.active) {
          background: rgba(255, 255, 255, 0.5);
        }
      }

      &.active {
        cursor: default;
        background-color: #fff;
      }
    }
  }
}
</style>

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
