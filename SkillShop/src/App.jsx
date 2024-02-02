import { Routes, Route } from "react-router-dom"; // imports Routes to render navigation paths and Route which specifies a path and a component that should be rendered when the application's URL matches that path
import "./App.css";

const App = () => {
  return (
    <div>
      <header>
        <h1>
          {/* We can separate static components and import Link or useNavigate if needed so we can use it along with Routes and Route */}
          Header
        </h1>
      </header>
      <main>
        <aside>
            <h2>Aside</h2>
            User Drop Down
            <button>Log In</button>
        </aside>
        <Routes>
          {/* home route next line */}
          <Route
            path="/"
            // after creating code in App.jsx and separating into component for AllJobs type in this element: element = { <AllJobs /> } the component will also need useNavigate or Link for route to work
            element = {
              <section>
                <div className="search-bar">Search Bar</div>
                <h2>All Jobs</h2>
                <section className="job-posts">
                  <ul className="job">
                    Job post
                    {/* once we get data we can map through it and use li tags (may need useParams for id) */}
                  </ul>
                  <ul className="job">Job post</ul>
                  <ul className="job">Job post</ul>
                </section>
              </section>
            }
            >
          </Route>
        </Routes>
      </main>
      <footer>
        
      </footer>
    </div>
  )
}

export default App
