import './AboutMe.css';

const AboutMe = () => {
  return (
    <div className="aboutme-container">
      <section className="about-section">
        <h1>About Me</h1>
        <p>
          Welcome to my personal page! My name is [Your Name], and I'm a web developer with a passion for technology and coding. I created this site to share my thoughts, experiences, and projects in the tech world.
        </p>
      </section>

      <section className="site-info">
        <h2>About the Site</h2>
        <p>
          This website is a personal platform featuring a blog, educational articles, tech news, and a showcase of my projects and innovations in programming.
        </p>
      </section>

      <section className="features">
        <h2>Site Features</h2>
        <ul>
          <li>User-friendly and simple interface.</li>
          <li>Up-to-date content including tech and educational articles.</li>
          <li>Responsive design that adapts to all devices.</li>
          <li>Easy sharing on social media platforms.</li>
        </ul>
      </section>

      <section className="usage">
        <h2>How to Use</h2>
        <p>
          Navigate through the site using the main menu. Click on an article title to read it fully, and use the search feature to find topics of interest.
        </p>
      </section>
    </div>
  );
};

export default AboutMe;
