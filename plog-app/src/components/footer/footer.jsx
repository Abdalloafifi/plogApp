import './Footer.css';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>About My Blog</h2>
                    <p>
                        Welcome to My Blog
                        Where passion meets technology
                        Inspire, create, and explore                     </p>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Me</a></li>
                    </ul>
                </div>
                <div className="footer-section social">
                    <h2>
                    <a href="https://portfolio-ee95e.web.app/" target="_blank" rel="noopener noreferrer">Follow Me</a>
                    </h2>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} My Personal Blog | Made with 🖤 by Me
            </div>
        </footer>
    );
}

export default Footer;