var Token = require('markdown-it/lib/token');

function tables(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i]
        if (t.type === 'table_open' && (i === 0 || tokens[i-1].content !== `<div class="table">\n`)) {
            for (let j = i + i; j < tokens.length; j++) {
                let t2 = tokens[j];
                if (t2.type === 'table_close') {
                    let replaceTokens = [
                        openBlock('table'),
                        ...tokens.slice(i, j + 1),
                        closeBlock()
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

function codeBlocks(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i]
        if (t.type === 'fence' && t.info && (i === 0 || tokens[i-1].content !== "<code-block>\n")) {
            tokens.splice(i, 1,
                block(`<code-block language="${t.info}">`),
                t,
                block('</code-block>')
            )

            // skip ahead
            i += 2
        }
    }
}

function isHeading(t, type) {
    return t.type === type && (t.tag === 'h1' || t.tag === 'h2' || t.tag === 'h3');
}

function block(tag) {
    var t = new Token('html_block', '', 0);
    t.content = `${tag}\n\n`;
    t.block = true;
    return t;
}

function openBlock(klass) {
    return block(`<div class="${klass}">`);
}

function closeBlock() {
    return block('</div>');
}

module.exports = (md) => {
    // override parse()
    const parse = md.parse
    md.parse= (...args) => {
        const tokens = parse.call(md, ...args)
        tables(tokens);
        codeBlocks(tokens);
        split(tokens);
        return tokens;
    }
}
