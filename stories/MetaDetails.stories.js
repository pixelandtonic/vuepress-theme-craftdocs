import { withKnobs, object } from "@storybook/addon-knobs";
import MetaDetails from "../global-components/MetaDetails.vue";

import "../styles/index.styl";

export default {
  title: "MetaDetails",
  decorators: [withKnobs],
  component: MetaDetails
};

const demoItems = [
  {
    label: "read time",
    value: "5 minutes"
  },
  {
    label: "skill level",
    value: "advanced 🔥"
  },
  {
    label: "Craft edition",
    value: "PRO"
  }
];

export const Default = () => ({
  components: { MetaDetails },
  props: {
    items: { default: object("Items", demoItems) }
  },
  methods: {},
  template: `
    <div class="content" style="display: flex; align-items: center; height: 100vh; max-width: 740px; margin: 0 auto;">
      <div style="width: 100%;">
        <h1>Pretend Page Title</h1>
        <MetaDetails :items="items" />
      </div>
    </div>
  `
});
