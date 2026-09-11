/**
 * A deliberately tiny syntax tokenizer for the short, hand-written snippets in
 * the Toolkit previews. It runs on the server only, so no highlighting library
 * ships to the browser.
 */

export type TokenType =
  | 'comment'
  | 'string'
  | 'keyword'
  | 'number'
  | 'tag'
  | 'attr'
  | 'fn'
  | 'prop'
  | 'type'
  | 'punct'
  | 'plain';

export type Token = { type: TokenType; text: string };

const KEYWORDS = new Set([
  'const', 'let', 'function', 'return', 'export', 'default', 'async', 'await', 'type',
  'import', 'from', 'new', 'if', 'else', 'for', 'of', 'in', 'true', 'false', 'null', 'git',
]);

const RULES: Array<[RegExp, TokenType | ((match: string) => TokenType)]> = [
  [/^(?:\/\/[^\n]*|\/\*[\s\S]*?\*\/)/, 'comment'],
  [/^(["'`])(?:\\.|(?!\1)[\s\S])*?\1/, 'string'],
  [/^(?:<\/?[A-Za-z][\w.]*|\/?>)/, 'tag'],
  [/^-?\d*\.?\d+(?:px|rem|em|vw|vh|ms|s|%)?/, 'number'],
  [/^[A-Za-z_$][\w$-]*(?=\s*\()/, 'fn'],
  [/^[A-Za-z_$][\w-]*(?==)/, 'attr'],
  [/^[A-Za-z_$][\w$-]*(?=\??\s*:)/, 'prop'],
  [/^[A-Za-z_$][\w$-]*/, (word) => (KEYWORDS.has(word) ? 'keyword' : /^[A-Z]/.test(word) ? 'type' : 'plain')],
  [/^\s+/, 'plain'],
  [/^[^\sA-Za-z0-9_$]/, 'punct'],
];

/** Splits `code` into lines of tokens. Tokens that span lines are split too. */
export function tokenize(code: string): Token[][] {
  const tokens: Token[] = [];
  let rest = code;

  while (rest.length > 0) {
    let matched = false;
    for (const [pattern, kind] of RULES) {
      const match = pattern.exec(rest);
      if (!match) continue;
      const text = match[0];
      tokens.push({ type: typeof kind === 'function' ? kind(text) : kind, text });
      rest = rest.slice(text.length);
      matched = true;
      break;
    }
    if (!matched) {
      tokens.push({ type: 'plain', text: rest[0] });
      rest = rest.slice(1);
    }
  }

  const lines: Token[][] = [[]];
  for (const token of tokens) {
    token.text.split('\n').forEach((part, index) => {
      if (index > 0) lines.push([]);
      if (part) lines[lines.length - 1].push({ type: token.type, text: part });
    });
  }
  return lines;
}
