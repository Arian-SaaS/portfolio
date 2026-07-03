const KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "if", "else", "for", "while",
  "import", "export", "from", "default", "async", "await", "new", "class",
  "extends", "implements", "interface", "type", "public", "private", "protected",
  "static", "void", "null", "undefined", "true", "false", "this", "super",
  "try", "catch", "finally", "throw", "package", "final", "orElseThrow",
]);

type Token = { text: string; type: "keyword" | "type" | "string" | "comment" | "number" | "plain" };

// Single-pass tokenizer (one combined regex, no sequential replace) so token
// boundaries never overlap — a correctness requirement, not a style choice.
// Every character class in the source must be covered by some group, or
// unmatched characters (e.g. digits) silently vanish from the output.
const TOKEN_REGEX =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\d+(?:\.\d+)?)|([A-Za-z_$][A-Za-z0-9_$]*)|(\s+)|([^\sA-Za-z0-9_$]+)/g;

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let match: RegExpExecArray | null;
  TOKEN_REGEX.lastIndex = 0;
  while ((match = TOKEN_REGEX.exec(line)) !== null) {
    const [, comment, str, num, word, space, punct] = match;
    if (comment) tokens.push({ text: comment, type: "comment" });
    else if (str) tokens.push({ text: str, type: "string" });
    else if (num) tokens.push({ text: num, type: "number" });
    else if (word) {
      if (KEYWORDS.has(word)) tokens.push({ text: word, type: "keyword" });
      else if (/^[A-Z]/.test(word)) tokens.push({ text: word, type: "type" });
      else tokens.push({ text: word, type: "plain" });
    } else if (space) tokens.push({ text: space, type: "plain" });
    else if (punct) tokens.push({ text: punct, type: "plain" });
  }
  return tokens;
}

const colorFor: Record<Token["type"], string> = {
  keyword: "text-accent-blue",
  type: "text-accent-cyan",
  string: "text-status-good",
  comment: "text-muted-foreground/60",
  number: "text-status-warning",
  plain: "text-foreground",
};

export function HighlightedCode({ code }: { code: string }) {
  const lines = code.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <div key={i}>
          {line.length === 0 ? (
            " "
          ) : (
            tokenizeLine(line).map((token, j) => (
              <span key={j} className={colorFor[token.type]}>
                {token.text}
              </span>
            ))
          )}
        </div>
      ))}
    </>
  );
}
