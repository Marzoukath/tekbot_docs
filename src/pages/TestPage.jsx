import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect, useState } from "react";

const testsByPool = {
  it: [
    { id: "test1", name: "Test 1 - Simulation Tekbot" },
    { id: "test2", name: "Test 2 - Initiation à ROS2" },
    { id: "test3", name: "Test 3 - Pathfinding A*" },
    { id: "final", name: "Test 4 - Convoyeur" }
  ],
  electronique: [
    { id: "test1", name: "Test 1 - Carte électronique" },
    { id: "test2", name: "Test 2" },
    { id: "test3", name: "Test 3" },
    { id: "final", name: "Test 4 - Carte finale" }
  ],
  mecanique: [
    { id: "test1", name: "Test 1 - Structure du robot" },
    { id: "test2", name: "Test 2" },
    { id: "test3", name: "Test 3" },
    { id: "final", name: "Test 4 - Structure finale" }
  ]
};

// Fonction utilitaire : extraire les titres pour le sommaire
function extractHeadings(markdown) {
  const regex = /^(#{1,3})\s+(.*)$/gm;
  const headings = [];
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const slug = text.toLowerCase().replace(/\s+/g, "-");
    headings.push({ level, text, slug });
  }
  return headings;
}

export default function TestPage() {
  const { pool, testId } = useParams();
  const [content, setContent] = useState("");
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const basePath = import.meta.env.BASE_URL || '';
    fetch(`${basePath}/docs/${pool}/${testId}.md`)
      .then((res) => res.text())
      .then((md) => {
        setContent(md);
        setHeadings(extractHeadings(md));
      })
      .catch(() =>
        setContent(`# ❌ Erreur : Impossible de charger ${testId}.md du pool ${pool}`)
      );
  }, [pool, testId]);

  const tests = testsByPool[pool] || [];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar gauche */}
      <aside className="w-64 bg-gray-100 border-r p-4 sticky top-0 h-screen">
        <h2 className="text-xl font-bold capitalize mb-4">{pool}</h2>
        <ul className="space-y-2">
          {tests.map((t) => (
            <li key={t.id}>
              <Link
                to={`/${pool}/${t.id}`}
                className={`block px-3 py-2 rounded ${
                  t.id === testId
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {t.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Contenu central */}
      <main className="flex-1 p-8 bg-white overflow-y-auto h-screen">
        <article className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              a: ({ node, ...props }) => {
                // 🔹 Cas 1 : Lien vers un fichier .zip → téléchargement auto
                if (props.href?.endsWith(".zip")) {
                  return (
                    <a
                      href={props.href}
                      download
                      className="text-green-600 font-semibold hover:underline"
                    >
                      {props.children}
                    </a>
                  );
                }
                // 🔹 Cas 2 : Lien interne (ex: /media, /about) → React Router
                if (props.href?.startsWith("/")) {
                  return (
                    <Link
                      to={props.href}
                      className="text-blue-600 hover:underline"
                    >
                      {props.children}
                    </Link>
                  );
                }
                // 🔹 Cas 3 : Lien externe (http ou https)
                return (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  />
                );
              },
              h1: ({ node, ...props }) => {
                const slug = String(props.children).toLowerCase().replace(/\s+/g, "-");
                return <h1 id={slug} {...props} />;
              },
              h2: ({ node, ...props }) => {
                const slug = String(props.children).toLowerCase().replace(/\s+/g, "-");
                return <h2 id={slug} {...props} />;
              },
              h3: ({ node, ...props }) => {
                const slug = String(props.children).toLowerCase().replace(/\s+/g, "-");
                return <h3 id={slug} {...props} />;
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </main>

      {/* Sidebar droite (sommaire) */}
      <aside className="w-64 bg-gray-50 border-l p-4 sticky top-0 h-screen overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Sommaire</h2>
        <ul className="space-y-2 text-sm">
          {headings.map((h, i) => (
            <li key={i} className={`ml-${(h.level - 1) * 2}`}>
              <a href={`#${h.slug}`} className="text-blue-600 hover:underline">
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
