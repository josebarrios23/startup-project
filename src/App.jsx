import { Routes, Route } from "react-router-dom";
import "./App.css";
import ProjectCards from "./components/ProjectCards";
import SingleProject from "./components/SingleProject"
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header/>
      <main>
        <aside>
          <h2>Aside</h2>
          User Drop Down
          <button>Log In</button>
        </aside>
        <Routes>
          <Route path="/">
            <Route index element={<ProjectCards />} />
            <Route path=":id" element={<SingleProject />} />
          </Route>
        </Routes>
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default App;