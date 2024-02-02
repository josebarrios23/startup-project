import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import ProjectCards from './components/ProjectCards';
import SingleProject from './components/SingleProject';
import Landing from './components/Landing';
import MainLayout from './MainLayout';
import Footer from './components/Footer';
// import Footer.css from './components/Footer.css;'

const App = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className={isLandingPage ? 'landing-layout' : ''}>
      {isLandingPage ? (
        // Render Landing page without MainLayout
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      ) : (
      /* Landing.jsx will have functionality (Link to navigate to All job posts and log in aside) while App.jsx will have the ternary
     function for location path which determines which layout to choose depending on path location (whether on Landing page view or other views). MainLayout.jsx serves to wrap all the components that will not have landing page layout */
        <MainLayout>
          <Routes>
            <Route path="/projectcards" element={<ProjectCards />} />
            <Route path="/:id" element={<SingleProject />} />
          </Routes>
          <Footer></Footer>
        </MainLayout>
      )}
    </div>
  );
};

export default App;
