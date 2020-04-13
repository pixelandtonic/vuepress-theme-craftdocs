import { withKnobs, number, text, boolean } from "@storybook/addon-knobs";
import BrowserShot from "../global-components/BrowserShot.vue";

import "../styles/index.styl";

export default {
  title: "BrowserShot",
  decorators: [withKnobs],
  component: BrowserShot
};

export const Default = () => ({
  components: { BrowserShot },
  props: {
    url: { default: text("URL", "https://google.com") },
    link: { default: boolean("Use Anchor Link?", true) },
    cleanUrl: { default: boolean("Clean URL?", true) },
    caption: {
      default: text("Caption", "This is an optional caption for the image.")
    },
    maxHeight: { default: number("Max Height", 0) }
  },
  methods: {},
  template: `
    <div class="content" style="display: flex; align-items: center; height: 100vh; max-width: 740px; margin: 0 auto;">
      <BrowserShot :url="url" :link="link" :clean-url="cleanUrl" :caption="caption" :max-height="maxHeight">
        <img src="https://placekitten.com/900/500" alt="adorable kitten image" />
      </BrowserShot>
    </div>
  `
});
