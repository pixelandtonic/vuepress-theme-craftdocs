import { withKnobs, array, object } from "@storybook/addon-knobs";
import CodeToggle from "../components/CodeToggle.vue";

import "../styles/index.styl";

export default {
  title: "CodeToggle",
  decorators: [withKnobs],
  component: CodeToggle,
};

const codeMarkup = `
<div slot="twig" class="language-twig extra-class"><pre class="language-twig"><code><span class="token comment">{# Create a new entry query #}</span>
<span class="token tag"><span class="token ld"><span class="token punctuation">{%</span> <span class="token keyword">set</span></span> <span class="token property">myEntryQuery</span> <span class="token operator">=</span> <span class="token property">craft</span><span class="token punctuation">.</span><span class="token property">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token rd"><span class="token punctuation">%}</span></span></span>
</code></pre></div>
<div slot="php" class="language-php extra-class"><pre class="language-php"><code><span class="token comment">// Create a new entry query</span>
<span class="token variable">$myEntryQuery</span> <span class="token operator">=</span> \<span class="token package">craft<span class="token punctuation">\</span>elements<span class="token punctuation">\</span>Entry</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>
`;

export const Default = () => ({
  components: { CodeToggle },
  props: {
    languages: { default: array("Languages", ["twig", "php"]) },
    labels: { default: object("Labels", { "twig": "Twig", "php": "PHP" }) },
  },
  methods: {},
  template: `
    <div class="theme-default-content" style="display: flex; align-items: center; height: 100vh; max-width: 740px; margin: 0 auto;">
      <div style="width: 100%;">
        <CodeToggle :languages="languages" :labels="labels">${codeMarkup}</CodeToggle>
      </div>
    </div>
  `,
});
