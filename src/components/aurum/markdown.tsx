import { AurumElement, Aurum } from 'aurumjs';
import { Renderer } from 'marked';
import * as marked from 'marked';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/base16/zenburn.css';

const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};

function escapeForHTML(input) {
    return input.replace(/([&<>'"])/g, (char) => escapeMap[char]);
}

// Create your custom renderer.
const renderer = new Renderer();
renderer.code = (code, language) => {
    // Check whether the given language is valid for highlight.js.
    const validLang = !!(language && highlightjs.getLanguage(language));

    // Highlight only if the language is valid.
    // highlight.js escapes HTML in the code, but we need to escape by ourselves
    // when we don't use it.
    const highlighted = validLang
        ? highlightjs.highlight(code, {
              language
          }).value
        : escapeForHTML(code);

    // Render the highlighted code with `hljs` class.
    return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};

// Set the renderer to marked.
marked.setOptions({ renderer });
export function Markdown(_, children): AurumElement {
    return (
        <div
            onAttach={async (element) => {
                element.innerHTML = await marked.marked(children[0], {});
            }}
        ></div>
    );
}
