import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="space-y-6 text-neutral-700 dark:text-slate-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-neutral-950 dark:text-white">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="pt-4 text-2xl font-bold text-neutral-950 dark:text-white">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="pt-3 text-xl font-semibold text-neutral-950 dark:text-white">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="leading-8">{children}</p>,
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#436896] underline-offset-4 hover:underline dark:text-[#b2d2fa]"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="ml-5 list-disc space-y-2 leading-7">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="ml-5 list-decimal space-y-2 leading-7">{children}</ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#436896] pl-4 italic text-neutral-600 dark:border-[#b2d2fa] dark:text-slate-400">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm text-neutral-950 dark:bg-white/10 dark:text-white">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-md bg-neutral-950 p-4 text-sm leading-6 text-neutral-100">
              {children}
            </pre>
          ),
          img: ({ src = "", alt = "" }) => (
            // Markdown images come from the admin upload flow and may not have dimensions.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              className="rounded-md border border-neutral-200 dark:border-white/10"
            />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-neutral-200 bg-neutral-50 p-2 text-left font-semibold dark:border-white/10 dark:bg-white/5">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-neutral-200 p-2 dark:border-white/10">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
