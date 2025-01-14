const fs = require('fs');
const svgpath = require('svgpath');


function svgFontTemplate(options) {
    const fontName = options.fontName;
    const glyphs = options.glyphs;

    return `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" >
<svg xmlns="http://www.w3.org/2000/svg">
    <defs>
        <font id="${fontName}" horiz-adv-x="1024" horiz-adv-y="1024">
            <font-face units-per-em="1024" ascent="960" descent="-64" />
            <missing-glyph />
            <glyph unicode="&#x20;" d="" />
${glyphs.map(glyph => `
            <glyph unicode="&#x${glyph.unicode};" d="${glyph.d ? svgpath(glyph.d).translate(0, -480).scale(2, -2).toString() : ''}" />`).join('')}
        </font>
    </defs>
</svg>`;
}

function fontFileTemplate(fontFile) {
    const base64 = fs.readFileSync(fontFile).toString("base64");

    return `$ki-font-data-url: "data:font/ttf;base64,${base64}" !default;\n`;
}


module.exports.svgFontTemplate = svgFontTemplate;
module.exports.fontFileTemplate = fontFileTemplate;
