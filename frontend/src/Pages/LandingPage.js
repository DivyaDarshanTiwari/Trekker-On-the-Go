import React from "react";
import "../CSS/LandingPage.css"; // You'll define custom styles here
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <nav className="navbar">
        <h1 className="logo">Trekker on the Go</h1>
        <ul className="nav-links">
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
      <header className="hero">
        <div className="hero-content">
          <h2>Find a Ride, Anytime</h2>
          <p>
            Trekker on the Go makes it easy for students to find trekkers,
            ensuring you never miss a ride back home. Stay updated in real-time
            and plan your trips efficiently.
          </p>
          <Link to="/login" className="cta-button">
            Get Started
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Real-Time Notifications</h3>
            <p>Get instant updates when trekkers are available for rides.</p>
          </div>
          <div className="feature-item">
            <h3>Easy Communication</h3>
            <p>Stay in touch with drivers and fellow passengers seamlessly.</p>
          </div>
          <div className="feature-item">
            <h3>Simple, Intuitive Interface</h3>
            <p>
              Our platform is designed to be user-friendly, making it easy for
              everyone to navigate.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>
          Trekker on the Go is designed to address the transportation challenges
          faced by students who often struggle to find trekkers or transport
          options after college hours. We understand the difficulties of
          commuting, especially when students leave college late and are unsure
          about the availability of rides. Our goal is to bridge this gap and
          make transportation more reliable, accessible, and efficient.
        </p>
        <p>
          Our platform connects students with trekkers in real-time, providing
          updates on trekker availability and allowing trekkers to easily decide
          when and where to pick up passengers. By facilitating seamless
          communication between trekkers and students, we aim to save time,
          reduce stress, and ensure that students can commute home safely
          without delays or uncertainties.
        </p>

        <p>
          Whether you're a student looking for a ride or a trekker managing your
          routes, Trekker on the Go is here to help. Join us in making commuting
          hassle-free and more reliable for everyone involved!
        </p>
      </section>

      {/* Footer / Contact Section */}
      <footer id="contact" className="footer">
        <h2>Contact Us</h2>
        <p>Email: support@trekkeronthego.com</p>
        <p>Phone: +123 456 7890</p>
      </footer>
    </div>
  );
};

export default LandingPage;
