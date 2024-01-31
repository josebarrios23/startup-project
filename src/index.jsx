import { BrowserRouter } from "react-router-dom"; // imports BrowserRouter which listens to changes in the URL and ensures that the correct components are rendered when the URL changes
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);