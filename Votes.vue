<template>
    <div>
        <div id="happy-thumbs"></div>
    </div>
</template>

<script>
export default {
  props: ['frontmatter'],
  mounted() {
    const thumbsSrc = document.createElement("script");
    // TODO: move script to permanent CDN home
    thumbsSrc.setAttribute(
      "src",
      "https://exprmnt.s3.us-west-1.amazonaws.com/happy-thumbs.js"
    );
    thumbsSrc.onload = this.resetVote;
    document.head.appendChild(thumbsSrc);
  },
  methods: {
    resetVote() {
      if (typeof window.happyThumbs.reset === "function") {
        window.happyThumbs.reset();
      }

      if (this.frontmatter.votes === false) {
        this.disableVoteWidget();
      } else {
        this.enableVoteWidget();
      }
    },
    enableVoteWidget() {
      if (typeof window.happyThumbs.enable === "function") {
        window.happyThumbs.enable();
      }
    },
    disableVoteWidget() {
      if (typeof window.happyThumbs.disable === "function") {
        window.happyThumbs.disable();
      }
    }
  }
};
</script>