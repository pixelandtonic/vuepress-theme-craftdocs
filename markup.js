const Token = require('markdown-it/lib/token');
const container = require('markdown-it-container')

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
            codeBlocks(rightTokens, t => {
                return [
                    block(`<code-block language="${t.info}">`, t.level),
                    t,
                    block('</code-block>', t.level)
                ]
            });

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
                    let languages = [];

                    codeBlocks(innerTokens, t => {
                        languages.push(`'${t.info}'`);
                        return [
                            block(`<div v-if="p.selectedLanguage === '${t.info}'">`, t.level),
                            t,
                            block('</div>', t.level)
                        ]
                    });

                    let openBlock = block('<code-toggle :languages="['+languages.join(',')+']">\n<template slot-scope="p">', tokens[i].level);
                    let closeBlock = block('</template>\n</code-toggle>', tokens[j].level);
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
        if (t.type === 'fence' && t.info && (i === 0 || tokens[i-1].content !== "<code-block>\n")) {
            let replaceTokens = replace(t)
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
