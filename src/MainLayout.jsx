import "./index.css";
import Header from './components/Header';

const MainLayout = ({ children }) => {
    /* Landing.jsx will have functionality (Link to navigate to All job posts and log in aside) while App.jsx will have the ternary
     function for location path which determines which layout to choose depending on path location (whether on Landing page view or other views). MainLayout.jsx serves to wrap all the components that will not have landing page layout */
     console.log(children)
  return (
    <>
    <Header />
    <section className="container">
      
      <aside>
        <h2>Aside</h2>
        User Drop Down
        <button>Log In</button>
      </aside>
      {/* <h1 className="user-cards">User Cards</h1> */}
      <main>{children}</main>
      {/* children prop contain 2 objects - each object represents a Route tag */}
      </section>
      <footer>Footer</footer>
    </>
  );
};

export default MainLayout;
