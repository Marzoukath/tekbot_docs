import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw"; // Ajoute ceci
import { vs, solarizedlight, dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function TestViewer() {
  const { pool, testId } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/docs/${pool}/${testId}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Fichier introuvable");
        return res.text();
      })
      .then(setContent)
      .catch(() => setContent("# ❌ README introuvable"));
  }, [pool, testId]);

  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <article className="prose prose-lg lg:prose-xl max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-gray-200 px-1 py-0.5 rounded" {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
