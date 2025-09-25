import { Link, useParams } from "react-router-dom";

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

const poolBackgrounds = {
  it: `${import.meta.env.BASE_URL}images/it-bg.jpg`,
  electronique: `${import.meta.env.BASE_URL}images/electronique-bg.jpg`,
  mecanique: `${import.meta.env.BASE_URL}images/mecanique-bg.jpg`
};


export default function Pool() {
  const { pool } = useParams();
  const tests = testsByPool[pool] || [];
  const bgImage = poolBackgrounds[pool] || `${import.meta.env.BASE_URL}images/home-bg.png`;

  return (
    <div
      className="min-h-screen p-10 bg-cover bg-center relative"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Contenu */}
      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold capitalize text-yellow-300 drop-shadow-lg">
          {pool} - Tests
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {tests.map((test) => (
            <Link
              key={test.id}
              to={`/${pool}/${test.id}`}
              className="bg-white/90 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition backdrop-blur-sm"
            >
              <h2 className="text-xl font-semibold text-blue-700">{test.name}</h2>
              <p className="text-sm text-gray-600 mt-2">📄 Voir le README</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
