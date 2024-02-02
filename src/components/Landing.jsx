import { Link } from 'react-router-dom';
import "../App.css"
import "../components/Landing.css";
    /* Landing.jsx will have functionality (Link to navigate to All job posts and log in aside) while App.jsx will have the ternary
     function for location path which determines which layout to choose depending on path location (whether on Landing page view or other views). MainLayout.jsx serves to wrap all the components that will not have landing page layout */

const Landing = () => {
    return (
        <section className="landing-functionality">
            {/* Welcome message and navigation buttons */}
            <h1>Welcome to Our Freelance Platform!</h1>
            <Link to="/projectcards">
              <button>View Freelance Jobs</button>
            </Link>
        </section>
    )
}

export default Landing;
