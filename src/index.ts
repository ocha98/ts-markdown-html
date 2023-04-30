import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm"
import remarkCodeTitles from "remark-flexible-code-titles";
import remarkFlexibleContainers from "remark-flexible-containers";
import remarkRehype from "remark-rehype";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema, Options } from "rehype-sanitize";
import rehypeImageSize from "./plugin/rehype-image-size.js"
import rehypeWrapTable from "./plugin/rehype-wrap-table.js"
import hastToString from "./plugin/hast-to-String.js";

const sanitizeOptions: Options = {
    ...defaultSchema,
    attributes: {
        ...defaultSchema.attributes,
        div: [
            ...(defaultSchema.attributes &&  defaultSchema.attributes.div || []),
            ['className', 'math', 'math-display', 'math-inline', 'table-scroll', "md-flexcon", "md-flexcon-title", "warn", "info", "alert", "code-title"]
        ],
        span: [
            ...(defaultSchema.attributes && defaultSchema.attributes.span || []),
            ['className', 'math', 'math-inline', 'hljs-addition', 'hljs-attr', 'hljs-attribute', 'hljs-built_in', 'hljs-bullet', 'hljs-char', 'hljs-code', 'hljs-comment', 'hljs-deletion', 'hljs-doctag', 'hljs-emphasis', 'hljs-formula', 'hljs-keyword', 'hljs-link', 'hljs-literal', 'hljs-meta', 'hljs-name', 'hljs-number', 'hljs-operator', 'hljs-params', 'hljs-property', 'hljs-punctuation', 'hljs-quote', 'hljs-regexp', 'hljs-section', 'hljs-selector-attr', 'hljs-selector-class', 'hljs-selector-id', 'hljs-selector-pseudo', 'hljs-selector-tag', 'hljs-string', 'hljs-strong', 'hljs-subst', 'hljs-symbol', 'hljs-tag', 'hljs-template-tag', 'hljs-template-variable', 'hljs-title', 'hljs-type', 'hljs-variable']
        ],
        code: [
            ...(defaultSchema.attributes && defaultSchema.attributes.code || []),
            ['className', 'hljs']
        ]
    }
}

export default async function markdownToHtml (text: string): Promise<string> {
    if(!text) return '';

    const html = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkCodeTitles, {titleClassName:"code-title"})
        .use(remarkFlexibleContainers, {containerClassName: "md-flexcon", titleClassName: "md-flexcon-title"})
        .use(remarkMath)
        .use(remarkRehype, {allowDangerousHtml: true, })
        .use(rehypeRaw)
        .use(rehypeSlug)
        .use(rehypeExternalLinks, { target: "_blank", rel: ['noopener noreferrer nofollow'] })
        .use(rehypeHighlight, {ignoreMissing: true})
        .use(rehypeImageSize)
        .use(rehypeWrapTable, {className: "table-scroll"})
        .use(rehypeSanitize, sanitizeOptions)
        .use(rehypeKatex)
        .use(hastToString)
        .process(text);

    return html.toString()
}
