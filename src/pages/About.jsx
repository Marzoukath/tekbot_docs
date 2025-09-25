import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Liste des fichiers à afficher
const files = {
  introduction: "introduction.md",
  college: "college.md",
  goals: "goals.md",
  team: "team.md",
  contacts: "contacts.md",
};

// Fonction utilitaire pour extraire les titres
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

export default function About() {
  const [currentTab, setCurrentTab] = useState("introduction");
  const [content, setContent] = useState("");
  const [headings, setHeadings] = useState([]);

  // Charger le markdown sélectionné
  useEffect(() => {
    const basePath = import.meta.env.BASE_URL || '';
   
    fetch(`${basePath}/docs/about/${files[currentTab]}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fichier introuvable");
        return res.text();
      })
      .then((md) => {
        setContent(md);
        setHeadings(extractHeadings(md));
      })
      .catch(() =>
        setContent(`# ❌ Erreur : Impossible de charger ${files[currentTab]}`)
      );
  }, [currentTab]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar gauche : onglets */}
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-4 sticky top-0 h-screen">
        <h2 className="text-xl font-bold">À propos</h2>
        <ul className="space-y-2">
          {Object.keys(files).map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setCurrentTab(tab)}
                className={`w-full text-left px-3 py-2 rounded ${
                  currentTab === tab
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
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

      {/* Sidebar droite : sommaire */}
      <aside className="w-64 bg-gray-50 border-l p-4 sticky top-0 h-screen">
        <h2 className="text-lg font-bold mb-4">Sommaire</h2>
        <ul className="space-y-2 text-sm">
          {headings.map((h, i) => (
            <li key={i} className={`ml-${(h.level - 1) * 2}`}>
              <a
                href={`#${h.slug}`}
                className="text-blue-600 hover:underline"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
