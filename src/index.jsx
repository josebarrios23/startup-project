// import { BrowserRouter } from "react-router-dom"; // imports BrowserRouter which listens to changes in the URL and ensures that the correct components are rendered when the URL changes
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";


// ReactDOM.createRoot(document.getElementById("root")).render(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
// );

import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './App.css';

function Root() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const changeBackground = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        const updateCSSVariables = () => {
            if (isDarkMode) {
                // For dark mode
                document.documentElement.style.setProperty('--background', 'url("https://images-assets.nasa.gov/image/iss040e090835/iss040e090835~medium.jpg")');
                document.documentElement.style.setProperty('--lightblue', 'rgba(0, 0, 0, 0.583)');
                document.documentElement.style.setProperty('--white', 'rgba(0, 0, 0, 0.8)');
                // document.documentElement.style.setProperty('--lm-blue', 'rgba(255, 255, 255, 0.8)');
                document.documentElement.style.setProperty('--lm-blue', '#ffc107');
                document.documentElement.style.setProperty('--yellow', '#ffc107');
                document.documentElement.style.setProperty('--dark', 'aliceblue');
                
            } else {
                // For light mode
                document.documentElement.style.setProperty('--background', 'url("https://sanctuaries.noaa.gov/media/eib/2758.jpg")');
                document.documentElement.style.setProperty('--lightblue', 'aliceblue');
                document.documentElement.style.setProperty('--white', 'rgba(255, 255, 255, 0.629)');
                document.documentElement.style.setProperty('--lm-blue', 'rgba(0, 153, 214, 0.871)');
                document.documentElement.style.setProperty('--yellow', '#ffc107');
                document.documentElement.style.setProperty('--dark', 'rgba(0, 0, 0, 1)');
            }
        };

        updateCSSVariables();
    }, [isDarkMode]);

    const divStyle = {
        minHeight: '100vh',
        width: '100%',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        position:'fixed',
        top: 70,
        left: 0,
    };

    return (
        <div style={divStyle}>
            <button onClick={changeBackground}>Change Background</button>
            <App />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Root />
    </BrowserRouter>
);
