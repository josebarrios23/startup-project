import "./index.css";
import Header from './components/Header';
import Footer from "./components/Footer";

const MainLayout = ({ children }) => {
    /* Landing.jsx will have functionality (Link to navigate to All job posts and log in aside) while App.jsx will have the ternary
     function for location path which determines which layout to choose depending on path location (whether on Landing page view or other views). MainLayout.jsx serves to wrap all the components that will not have landing page layout */
  return (
    <>
    <Header />
      <main>{children}</main>
      {/* children prop contains objects - each object represents a Route tag */}
      <Footer />
    </>
  );
};

export default MainLayout;
