import { Link } from "react-router-dom";
import "./NotFound.css";

import { useEffect } from "react";

const NotFont = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <div className="notfound-container">
            <div className="notfound-content">
                {/* استخدمنا رمز Unicode للإنذار */}
                <div className="notfound-icon">&#9888;</div>
                <h1 className="notfound-title">404</h1>
                <p className="notfound-message">Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" className="home-button">
                    Go Home
                </Link>
            </div>
        </div>
    );
}

export default NotFont;