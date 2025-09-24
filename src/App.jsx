import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Pool from "./pages/Pool";
import TestViewer from "./pages/TestViewer";
import TestPage from "./pages/TestPage";
import About from "./pages/About";
import Media from "./pages/Media"
function App() {
  return (
    <BrowserRouter>
      {/* NAVBAR */}
      <nav className="p-4 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-extrabold tracking-wide">⚙️ The Winners - EPAC</h1>
        <div className="flex gap-6 text-lg font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">Accueil</Link>
          <Link to="/it" className="hover:text-yellow-300 transition">IT</Link>
          <Link to="/electronique" className="hover:text-yellow-300 transition">Électronique</Link>
          <Link to="/mecanique" className="hover:text-yellow-300 transition">Mécanique</Link>
          <Link to="/media" className="hover:text-yellow-300 transition">FinalTest Media</Link>
          <Link to="/about" className="hover:text-yellow-300 transition">À propos</Link>
        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:pool" element={<Pool />} />
        <Route path="/:pool/:testId" element={<TestPage />} />
        <Route path="/:pool/:testId" element={<TestViewer />} />
         <Route path="/media" element={<Media />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
