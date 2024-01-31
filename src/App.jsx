import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import ProjectCards from "./components/ProjectCards";
import SingleProject from "./components/SingleProject"
import Header from "./components/Header";
import Landing from "./components/Landing";

const App = () => {
  const location = useLocation();
  return (
    <div>
      <Header/>
      <main>
        {/* next line will hide aside on landing page */}
        {location.pathname !== "/" && (
        <aside>
          <h2>Aside</h2>
          User Drop Down
          <button>Log In</button>
        </aside>
        )}
        <Routes>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="/projectcards" element={<ProjectCards />} />
            <Route path=":id" element={<SingleProject />} />
          </Route>
        </Routes>
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default App;