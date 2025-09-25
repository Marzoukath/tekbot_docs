import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div 
      className="text-center min-h-screen flex flex-col justify-center items-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/home-bg.jpg)` }}

    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Contenu */}
      <div className="relative z-10 text-white">
        <h2 className="text-5xl font-extrabold animate-pulse">
           Tekbot Robotics Challenge
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Bienvenue sur le site vitrine de <span className="font-bold text-yellow-400">The Winners - EPAC</span>.  
          Explorez nos réalisations en <span className="text-blue-400">IT</span>,  
          <span className="text-green-400"> Électronique</span> et  
          <span className="text-red-400"> Mécanique</span>.
        </p>

        {/* Liens vers les pôles */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/it" className="bg-white/90 shadow-lg rounded-2xl p-6 hover:scale-105 transition text-gray-800">
            <h3 className="text-xl font-semibold text-blue-600">💻 IT</h3>
            <p className="text-gray-600 mt-2">Logiciels, simulation, code</p>
          </Link>
          <Link to="/electronique" className="bg-white/90 shadow-lg rounded-2xl p-6 hover:scale-105 transition text-gray-800">
            <h3 className="text-xl font-semibold text-green-600">🔌 Électronique</h3>
            <p className="text-gray-600 mt-2">Cartes, circuits, capteurs</p>
          </Link>
          <Link to="/mecanique" className="bg-white/90 shadow-lg rounded-2xl p-6 hover:scale-105 transition text-gray-800">
            <h3 className="text-xl font-semibold text-red-600">⚙️ Mécanique</h3>
            <p className="text-gray-600 mt-2">Structure, design, assemblage</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
