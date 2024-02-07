import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <Link className="home-link" to={`/`}>
        <h1 className="home-link">SkillShop</h1>
      </Link>
      {location.pathname !== "/projectcards" && location.pathname !== "/" && (
        <Link className="home-link" to="/projectcards">
          <h3 className="home-link">Back to Project Cards</h3>
        </Link>
      )}
    </header>
  );
}