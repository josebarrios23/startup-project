import { Link } from 'react-router-dom';
import "../App.css"
import "../components/Landing.css";

const Landing = () => {
    return (
        <section className="landing-functionality">
            <h1>Welcome to SkillShop,</h1>
            <h1>Our Freelance Platform!</h1>
            <Link to="/projectcards">
              <button className="btn btn-rect-to-round btn-rect-to-round--red"> Explore </button>
            </Link>
        </section>
    )
}

export default Landing;
