import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {

return (
   <Link className="home-link" to={`/`}>
     <header>
       <h1 className="home-link">SkillShop</h1>
     </header>
   </Link>
  )
}