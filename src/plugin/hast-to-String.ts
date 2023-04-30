import { toHtml } from './hast-util-to-html-8.0.4/index.js';
import { Root } from 'hast';
import { Processor } from 'unified';

export default function hastToString(this: Processor) {
    function compiler(tree: Root) {
        return toHtml(tree)
    }
    this.Compiler = compiler
}