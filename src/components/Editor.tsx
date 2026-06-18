"use client";

import { PubwaveEditor, markdownToHTML, type EditorTheme } from "@pubwave/editor";
import { useMemo } from "react";

type Mark = {
  type: string;
  attrs?: Record<string, unknown>;
};

type RichNode = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: Mark[];
  content?: RichNode[];
};

interface EditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const emptyDocument = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

const editorTheme: EditorTheme = {
  locale: "fr",
  colors: {
    background: "transparent",
    text: "#e5e7eb",
    textMuted: "#94a3b8",
    border: "rgba(255,255,255,0.1)",
    primary: "#b2d2fa",
    linkColor: "#b2d2fa",
  },
};

function getTextContent(node?: RichNode): string {
  if (!node) return "";
  if (node.text) return node.text;
  return (node.content ?? []).map(getTextContent).join("");
}

function escapePipes(value: string) {
  return value.replace(/\|/g, "\\|");
}

function renderInline(node: RichNode): string {
  if (node.type === "hardBreak") return "\n";

  if (!node.text) {
    return (node.content ?? []).map(renderInline).join("");
  }

  let value = node.text;

  for (const mark of node.marks ?? []) {
    if (mark.type === "code") value = `\`${value}\``;
    if (mark.type === "bold") value = `**${value}**`;
    if (mark.type === "italic") value = `*${value}*`;
    if (mark.type === "strike") value = `~~${value}~~`;
    if (mark.type === "link") {
      const href = typeof mark.attrs?.href === "string" ? mark.attrs.href : "#";
      value = `[${value}](${href})`;
    }
  }

  return value;
}

function renderListItem(node: RichNode, prefix: string) {
  const parts = (node.content ?? [])
    .map((child) => renderNode(child))
    .filter(Boolean);
  const [first = "", ...rest] = parts;

  return `${prefix}${first.replace(/\n/g, "\n  ")}${
    rest.length ? `\n  ${rest.join("\n  ")}` : ""
  }`;
}

function renderTable(node: RichNode) {
  const rows = node.content ?? [];
  if (rows.length === 0) return "";

  const renderedRows = rows.map((row) =>
    (row.content ?? []).map((cell) => escapePipes(getTextContent(cell).trim()))
  );
  const columnCount = Math.max(...renderedRows.map((row) => row.length));
  const header = renderedRows[0] ?? [];
  const separator = Array.from({ length: columnCount }, () => "---");
  const body = renderedRows.slice(1);

  return [header, separator, ...body]
    .map((row) => `| ${row.concat(Array(columnCount).fill("")).slice(0, columnCount).join(" | ")} |`)
    .join("\n");
}

function renderNode(node: RichNode): string {
  const children = node.content ?? [];

  switch (node.type) {
    case "doc":
      return children.map(renderNode).filter(Boolean).join("\n\n");
    case "paragraph":
      return children.map(renderInline).join("").trim();
    case "heading": {
      const level =
        typeof node.attrs?.level === "number"
          ? Math.min(Math.max(node.attrs.level, 1), 6)
          : 2;
      return `${"#".repeat(level)} ${children.map(renderInline).join("").trim()}`;
    }
    case "blockquote":
      return children
        .map(renderNode)
        .join("\n")
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");
    case "bulletList":
      return children.map((child) => renderListItem(child, "- ")).join("\n");
    case "orderedList":
      return children
        .map((child, index) => renderListItem(child, `${index + 1}. `))
        .join("\n");
    case "taskList":
      return children
        .map((child) => {
          const checked = child.attrs?.checked === true ? "x" : " ";
          return renderListItem(child, `- [${checked}] `);
        })
        .join("\n");
    case "listItem":
    case "taskItem":
      return children.map(renderNode).join("\n");
    case "codeBlock": {
      const language =
        typeof node.attrs?.language === "string" ? node.attrs.language : "";
      return `\`\`\`${language}\n${getTextContent(node)}\n\`\`\``;
    }
    case "horizontalRule":
      return "---";
    case "image": {
      const src = typeof node.attrs?.src === "string" ? node.attrs.src : "";
      const alt = typeof node.attrs?.alt === "string" ? node.attrs.alt : "";
      return src ? `![${alt}](${src})` : "";
    }
    case "table":
      return renderTable(node);
    default:
      return children.map(renderNode).join("\n");
  }
}

function toMarkdown(content: RichNode) {
  return renderNode(content).trim();
}

export default function Editor({
  initialContent = "",
  onChange,
  placeholder = "Ecrivez votre article...",
  className,
}: EditorProps) {
  const content = useMemo(() => {
    if (!initialContent.trim()) return emptyDocument;

    return markdownToHTML(initialContent);
  }, [initialContent]);

  return (
    <div
      className={`rounded-md border border-neutral-200 bg-white text-neutral-950 dark:border-white/10 dark:bg-white/[0.03] dark:text-white ${
        className ?? ""
      }`}
    >
      <PubwaveEditor
        content={content as never}
        placeholder={placeholder}
        minHeight="360px"
        theme={editorTheme}
        imageUpload={{
          handler: async (file: File) => {
            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });

            const payload = (await response.json()) as {
              secureUrl?: string;
              url?: string;
              message?: string;
            };

            if (!response.ok || (!payload.secureUrl && !payload.url)) {
              throw new Error(payload.message ?? "Upload impossible.");
            }

            return payload.secureUrl ?? payload.url ?? "";
          },
          maxSize: 5 * 1024 * 1024,
          accept: ["image/jpeg", "image/png", "image/webp", "image/avif"],
        }}
        onChange={(nextContent) => onChange(toMarkdown(nextContent as RichNode))}
      />
    </div>
  );
}
