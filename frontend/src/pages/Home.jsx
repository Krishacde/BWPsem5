import {
  ArrowRight,
  Lightbulb,
  Users,
  MessageCircle,
  TrendingUp,
  Sparkles
} from "lucide-react";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home">

      {/* HERO */}

      <section className="hero">
        <div className="hero-container">

          <div>
            <div className="hero-badge">
              <Sparkles size={15} />
              Build ideas. Find people. Create impact.
            </div>

            <h1 className="hero-title">
              Your idea deserves
              <br />
              the right <span>team.</span>
            </h1>

            <p className="hero-description">
              VicharManthan helps founders and innovators
              share startup ideas, discover talented
              collaborators and turn concepts into real
              projects.
            </p>

            <div className="hero-actions">
              <Link
                to="/register"
                className="btn btn-primary"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="btn btn-secondary"
              >
                Sign In
              </Link>
            </div>
          </div>


          <div className="hero-card">

            <div className="idea-icon">
              <Lightbulb size={29} />
            </div>

            <h3>
              Great ideas start with a conversation.
            </h3>

            <p>
              Share what you're building, find people
              with complementary skills and create
              something meaningful together.
            </p>

            <div
              style={{
                marginTop: "25px",
                display: "flex",
                gap: "8px",
                flexWrap: "wrap"
              }}
            >
              <span className="hero-badge">
                Startup
              </span>

              <span
                className="hero-badge"
                style={{
                  color: "var(--green)",
                  background: "var(--green-light)"
                }}
              >
                Collaboration
              </span>
            </div>

          </div>

        </div>
      </section>


      {/* FEATURES */}

      <section className="features">

        <div className="section-container">

          <div className="section-heading">
            <h2>
              Everything you need to build
            </h2>

            <p>
              From the first idea to finding the right
              collaborators, VicharManthan keeps the
              process simple.
            </p>
          </div>


          <div className="features-grid">

            <div className="feature-card">
              <div className="feature-icon">
                <Lightbulb size={23} />
              </div>

              <h3>Share Ideas</h3>

              <p>
                Present your startup idea and explain
                what you're trying to build.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon">
                <Users size={23} />
              </div>

              <h3>Build Teams</h3>

              <p>
                Find people with skills that complement
                your own.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon">
                <MessageCircle size={23} />
              </div>

              <h3>Collaborate</h3>

              <p>
                Discuss ideas and communicate with
                potential team members.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon">
                <TrendingUp size={23} />
              </div>

              <h3>Grow Together</h3>

              <p>
                Validate your ideas and move from
                concept to execution.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="cta">

        <div className="cta-box">

          <h2>
            Ready to build something?
          </h2>

          <p>
            Create your account and start sharing
            your ideas today.
          </p>

          <Link
            to="/register"
            className="btn btn-primary"
          >
            Create Account
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </main>
  );
};

export default Home;