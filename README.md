
---

# 📄 README.md (projet Tekbot Robotics Challenge)

```markdown
# 🚀 Tekbot Robotics Challenge - Site Vitrine

Bienvenue sur le site vitrine officiel de l’équipe **The Winners - EPAC** pour le **Tekbot Robotics Challenge 2025**.  
Ce site a pour but de :
- Présenter l’équipe et l’EPAC 🎓
- Organiser les sections par **pôles** (IT, Électronique, Mécanique)
- Afficher la documentation des **tests** (README.md) de chaque pôle
- Offrir une interface moderne et responsive basée sur **React + Vite + TailwindCSS**

---

## 📂 Structure du projet

```

tekbot-docs/
├─ public/
│  ├─ docs/            # Documentation de chaque pôle
│  │   ├─ it/
│  │   │   ├─ TEST1.md
│  │   │   ├─ TEST2.md
│  │   │   ├─ FINAL\_TEST.md
│  │   ├─ electronique/
│  │   └─ mecanique/
│  ├─ images/          # Images (robot, icônes des pôles, etc.)
│
├─ src/
│  ├─ components/      # Composants React (Pool, TestViewer, Navbar, etc.)
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ index.css        # TailwindCSS
│
├─ tailwind.config.js
├─ package.json
└─ README.md           # (ce fichier)

````

---

## ⚙️ Prérequis

Avant de commencer, assure-toi d’avoir installé sur ta machine :
- **Node.js** (>= 18.x ou 20.x recommandé)
- **npm** (livré avec Node)

Vérifie avec :
```bash
node -v
npm -v
````

---

## 🚀 Installation

1. **Cloner le projet**

```bash
git clone https://github.com/<ton-repo>/tekbot-docs.git
cd tekbot-docs
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Lancer le serveur de développement**

```bash
npm run dev
```

Le site sera disponible sur :
👉 [http://localhost:5173](http://localhost:5173)

---

## 🎨 Technologies utilisées

* **React + Vite** → framework JS rapide
* **TailwindCSS v3** → design moderne et responsive
* **@tailwindcss/typography** → beau rendu Markdown
* **React Markdown** → lecture et affichage des fichiers `.md`
* **React Syntax Highlighter** → coloration des blocs de code

---

## 📖 Ajouter un nouveau README de test

Pour ajouter un nouveau test :

1. Crée un fichier `.md` dans le dossier correspondant au pôle,
   par ex. pour l’IT :

   ```
   public/docs/it/TEST5.md
   ```

2. Ajoute une entrée dans le fichier `testsByPool` de `Pool.jsx` :

   ```js
   it: [
     { id: "TEST1", name: "Test 1 - Simulation Tekbot" },
     { id: "TEST2", name: "Test 2 - Pathfinding A*" },
     { id: "TEST5", name: "Test 5 - Nouveau test" }, // ← ajout ici
   ]
   ```

3. Relance le serveur → le nouveau test sera automatiquement visible dans la section IT.

---

## ✨ Astuces

* Les images de fond (transparentes) doivent être placées dans `public/images/`.
* Les README supportent les titres, listes, tableaux, code en C++, Python, etc.
* Pour un bloc de code coloré :

  <pre>
  ```cpp
  #include &lt;iostream&gt;
  int main() { return 0; }
  ```
  </pre>

---

## 👥 Équipe

* **The Winners - EPAC**
  Pôles :

  * 💻 IT
  * 🔌 Électronique
  * ⚙️ Mécanique

---

## 📜 Licence

Projet interne pour le **Tekbot Robotics Challenge 2025**.
Usage réservé à l’équipe **The Winners - EPAC**.

```

