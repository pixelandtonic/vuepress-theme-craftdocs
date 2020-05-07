const Token = require('markdown-it/lib/token');
const container = require('markdown-it-container');
const { escapeHtml } = require('markdown-it/lib/common/utils');

function renderInlineCode(tokens, idx, options, env, renderer) {
    var token = tokens[idx];

    return  '<code v-pre' + renderer.renderAttrs(token) + '>' +
      escapeHtml(tokens[idx].content) +
      '</code>';
};

function findPrev(tokens, idx, check) {
    for (let i = idx - 1; i >= 0; i--) {
        if (check(tokens[i])) {
            return i;
        }
    }
    return false;
}

function findNext(tokens, idx, check) {
    for (let i = idx + 1; i < tokens.length; i++) {
        if (check(tokens[i])) {
            return i;
        }
    }
    return false;
}

function increment(tokens) {
    tokens.forEach(t => t.level++)
}

function tables(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i]
        if (t.type === 'table_open' && (i === 0 || tokens[i-1].content !== `<div class="table">\n`)) {
            for (let j = i + 1; j < tokens.length; j++) {
                let t2 = tokens[j];
                if (t2.type === 'table_close') {
                    let replaceTokens = [
                        openBlock('table', t.level),
                        ...tokens.slice(i, j + 1),
                        closeBlock(t.level)
                    ];
                    tokens.splice(i, (j - i), ...replaceTokens);

                    // skip ahead
                    i += replaceTokens.length - 1;
                    break;
                }
            }
        }
    }
}

function split(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i];
        if (t.type === 'hr') {
            let leftContentStart = 0,
                rightContentEnd = tokens.length - 1;

            // see if there's a previous h2/h3
            for (let j = i - 1; j >= 0; j--) {
                if (isHeading(tokens[j], 'heading_close')) {
                    leftContentStart = j + 1;
                    break;
                }
            }

            // see if there's another h2/h3 afterwards
            for (let j = i + 1; j < rightContentEnd; j++) {
                if (isHeading(tokens[j], 'heading_open')) {
                    rightContentEnd = j - 1;
                    break;
                }
            }

            let leftTokens = tokens.slice(leftContentStart, i);
            let rightTokens = tokens.slice(i + 1, rightContentEnd + 1);

            let replaceTokens = [
                openBlock('split'),
                openBlock('left'),
                ...leftTokens,
                closeBlock(),
                openBlock('right'),
                ...rightTokens,
                closeBlock(),
                closeBlock()
            ];

            tokens.splice(leftContentStart, (rightContentEnd - leftContentStart) + 1, ...replaceTokens);

            // skip ahead
            i = leftContentStart + replaceTokens.length;
        }
    }
}

function codeToggles(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i]
        if (t.type === 'container_code_open') {
            // find the close tag
            for (let j = i + 1; j < tokens.length; j++) {
                if (tokens[j].type === 'container_code_close') {
                    let innerTokens = tokens.slice(i + 1, j)
                    let slotNames = [];
                    let labels = {};

                    codeBlocks(innerTokens, (t, i) => {
                        let slotName;

                        // does the slot have a custom label?
                        let labelMatch = t.info.match(/([^ ]) +(.*)/);
                        if (labelMatch) {
                            // give the slot a random slot name
                            slotName = 'slot'+i;
                            labels[slotName] = labelMatch[2];

                            // remove the label from the code info
                            t.info = t.info.replace(labelMatch[0], labelMatch[1]);
                        } else {
                            // set the slot name to the language (w/out line numbers)
                            slotName = t.info.replace(/\{.*\}/, '').trim();
                        }

                        slotNames.push(slotName);

                        return [
                            block(`<template slot="${slotName}">`, t.level),
                            t,
                            block('</template>', t.level)
                        ]
                    });

                    let openBlock = block(`<code-toggle :languages='${JSON.stringify(slotNames)}' :labels='${JSON.stringify(labels)}'>`, tokens[i].level);
                    let closeBlock = block('</code-toggle>', tokens[j].level);
                    openBlock.nesting = tokens[i].nesting;
                    closeBlock.nesting = tokens[j].nesting;

                    let replaceTokens = [
                        openBlock,
                        ...innerTokens,
                        closeBlock
                    ]

                    tokens.splice(i, j - i, ...replaceTokens);

                    // skip ahead
                    i += (replaceTokens.length - 1)

                    break;
                }
            }
        }
    }
}

function codeBlocks(tokens, replace) {
    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i]
        if (t.type === 'fence' && t.info) {
            let replaceTokens = replace(t, i)
            tokens.splice(i, 1, ...replaceTokens)

            // skip ahead
            i += (replaceTokens.length - 1)
        }
    }
}

function isHeading(t, type) {
    return t.type === type && (t.tag === 'h1' || t.tag === 'h2' || t.tag === 'h3');
}

function block(tag, level) {
    var t = new Token('html_block', '', 0);
    t.content = `${tag}\n`;
    t.block = true;
    t.level = level || 0;
    return t;
}

function openBlock(klass, level) {
    return block(`<div class="${klass}">`, level);
}

function closeBlock(level) {
    return block('</div>', level);
}

module.exports = (md) => {
    // Custom <code> renders
    md.renderer.rules.code_inline = renderInlineCode;

    // override parse()
    const parse = md.parse
    md.parse = (...args) => {
        const tokens = parse.call(md, ...args)
        tables(tokens);
        codeToggles(tokens);
        split(tokens);
        return tokens;
    }

    md.use(container, 'code', {
        render(tokens, idx) {
            return '';
        }
    })
}
