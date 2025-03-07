import { Link, Outlet } from "react-router";
import "./Default.css";

function Default() {
  return (
    <div className="mx-auto max-w-[50vw] min-h-[50vh]">
      <h1 className="text-5xl font-bold mb-14">
        {/* Le composant Link permet de naviguer vers une autre route */}
        <Link to="/">Kouizz</Link>
      </h1>
      {/* Le composant Outlet permet d'indiquer d'afficher le composant de la route enfant */}
      {/* à cet endroit précis */}
      {/* C'est comme pour children, on choisit où afficher ces composants enfants */}
      <Outlet />
    </div>
  );
}

export default Default;
