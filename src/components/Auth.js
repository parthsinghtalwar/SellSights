import { useState } from "react";

import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState("login");

  const [error, setError] = useState("");

  const signup = async () => {
    try {
      setError("");

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const login = async () => {
    try {
      setError("");

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const isLogin = authMode === "login";

  return (
    <div className="auth-page" style={styles.page}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

          @media (max-width: 920px) {
            .landing-hero,
            .auth-layout,
            .step-row,
            .step-row.reverse {
              grid-template-columns: 1fr !important;
            }

            .step-row.reverse .mockup-panel {
              order: 0 !important;
            }

            .landing-hero h1 {
              font-size: 46px !important;
            }

            .landing-nav {
              align-items: flex-start !important;
              flex-direction: column !important;
            }
          }

          @media (max-width: 560px) {
            .auth-page {
              padding: 18px !important;
            }

            .landing-card,
            .auth-card,
            .mockup-panel {
              padding: 22px !important;
              border-radius: 24px !important;
            }

            .landing-hero h1 {
              font-size: 36px !important;
            }

            .hero-actions,
            .landing-nav-actions {
              width: 100% !important;
              flex-direction: column !important;
            }

            .hero-actions a,
            .landing-nav-actions a {
              width: 100% !important;
              justify-content: center !important;
            }

            .mockup-grid,
            .hero-metrics {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>

      <div style={styles.container}>
        <header className="landing-nav" style={styles.nav}>
          <div>
            <h1 style={styles.brand}>SellSights</h1>
            <p style={styles.brandSubtext}>Business math made simple</p>
          </div>

          <div className="landing-nav-actions" style={styles.navActions}>
            <a style={styles.navLink} href="#how-it-works">
              How it works
            </a>
            <a style={styles.navButton} href="#auth-card">
              Login
            </a>
          </div>
        </header>

        <section className="landing-hero" style={styles.hero}>
          <div className="landing-card" style={styles.heroCopy}>
            <p style={styles.eyebrow}>SellSights</p>
            <h1 style={styles.heroTitle}>
              A calmer way to understand your shop numbers.
            </h1>
            <p style={styles.heroText}>
              SellSights helps small shop owners, students, and everyday users make sense of inventory, sales, revenue, and profit without feeling buried in business math.
            </p>
            <p style={styles.heroText}>
              Add products, record sales, and see the numbers that matter in a clean dashboard designed to make tracking less intimidating and more useful.
            </p>

            <div className="hero-actions" style={styles.heroActions}>
              <a style={styles.primaryCta} href="#auth-card">
                Get Started
              </a>
              <a style={styles.secondaryCta} href="#auth-card">
                Login
              </a>
            </div>
          </div>

          <div className="mockup-panel" style={styles.heroMockup}>
            <div style={styles.mockupHeader}>
              <span style={styles.mockupDot}></span>
              <strong>Dashboard preview</strong>
            </div>
            <div className="hero-metrics" style={styles.heroMetrics}>
              <div style={styles.metricCard}>
                <span>Revenue</span>
                <strong>Rs 48,250</strong>
              </div>
              <div style={styles.metricCard}>
                <span>Profit</span>
                <strong>Rs 12,430</strong>
              </div>
            </div>
            <div style={styles.chartPlaceholder}>
              <div style={{ ...styles.chartBar, height: "42%" }}></div>
              <div style={{ ...styles.chartBar, height: "68%" }}></div>
              <div style={{ ...styles.chartBar, height: "54%" }}></div>
              <div style={{ ...styles.chartBar, height: "82%" }}></div>
              <div style={{ ...styles.chartBar, height: "64%" }}></div>
            </div>
            <div style={styles.mockupGrid}>
              <div style={styles.miniPanel}></div>
              <div style={styles.miniPanel}></div>
            </div>
          </div>
        </section>

        <section id="how-it-works" style={styles.stepsSection}>
          <div style={styles.sectionHeader}>
            <p style={styles.eyebrow}>How it works</p>
            <h2 style={styles.sectionTitle}>
              From account setup to clear business insight.
            </h2>
          </div>

          <StepSection
            number="Step 1"
            title="Create your account"
            text="Start with a simple login or signup. Your account becomes the private workspace where your shop data lives."
            mockupTitle="Login page placeholder"
          />

          <StepSection
            reverse
            number="Step 2"
            title="Set up your shop profile"
            text="Add your shop name once, then use it as the identity for your SellSights workspace."
            mockupTitle="Shop profile placeholder"
          />

          <StepSection
            number="Step 3"
            title="Add products and inventory"
            text="Enter product names, categories, quantities, cost prices, and selling prices so stock value becomes easier to understand."
            mockupTitle="Inventory form placeholder"
          />

          <StepSection
            reverse
            number="Step 4"
            title="Record sales"
            text="Choose a product, enter the quantity sold, and SellSights keeps the sales record connected to your stock and revenue."
            mockupTitle="Sales workflow placeholder"
          />

          <StepSection
            number="Step 5"
            title="View analytics and insights"
            text="See revenue, profit, top sellers, sales history, and inventory mix in one clean dashboard instead of calculating everything manually."
            mockupTitle="Analytics dashboard placeholder"
          />
        </section>

        <section className="auth-layout" style={styles.authLayout}>
          <div className="landing-card" style={styles.authIntro}>
            <p style={styles.eyebrow}>Ready when you are</p>
            <h2 style={styles.sectionTitle}>
              Start tracking with less friction.
            </h2>
            <p style={styles.bodyText}>
              Use the same account card for logging in or creating a new workspace. The dashboard flow after signup stays exactly the same.
            </p>
          </div>

          <section id="auth-card" className="auth-card" style={styles.card}>
            <div style={styles.segmentedControl} aria-label="Auth mode">
              <button
                style={{
                  ...styles.segmentButton,
                  ...(isLogin ? styles.segmentButtonActive : {}),
                }}
                onClick={() => setAuthMode("login")}
                type="button"
              >
                Login
              </button>

              <button
                style={{
                  ...styles.segmentButton,
                  ...(!isLogin ? styles.segmentButtonActive : {}),
                }}
                onClick={() => setAuthMode("signup")}
                type="button"
              >
                Create Account
              </button>
            </div>

            <div style={styles.cardHeader}>
              <p style={styles.eyebrow}>Account access</p>
              <h2 style={styles.title}>
                {isLogin ? "Sign in to SellSights" : "Create your SellSights account"}
              </h2>
              <p style={styles.text}>
                {isLogin
                  ? "Login to continue to your shop profile and dashboard."
                  : "Create an account to set up your shop profile and start tracking your numbers."}
              </p>
            </div>

            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              style={styles.button}
              onClick={isLogin ? login : signup}
            >
              {isLogin ? "Login" : "Create Account"}
            </button>

            {error && (
              <p style={styles.error}>
                {error}
              </p>
            )}
          </section>
        </section>
      </div>
    </div>
  );
}

function StepSection({
  number,
  title,
  text,
  mockupTitle,
  reverse = false,
}) {
  return (
    <article
      className={`step-row${reverse ? " reverse" : ""}`}
      style={styles.stepRow}
    >
      <div className="landing-card" style={styles.stepCopy}>
        <p style={styles.stepNumber}>{number}</p>
        <h3 style={styles.stepTitle}>{title}</h3>
        <p style={styles.bodyText}>{text}</p>
      </div>

      <div
        className="mockup-panel"
        style={{
          ...styles.stepMockup,
          ...(reverse ? styles.reverseMockup : {}),
        }}
      >
        <div style={styles.mockupHeader}>
          <span style={styles.mockupDot}></span>
          <strong>{mockupTitle}</strong>
        </div>
        <div style={styles.mockupLineWide}></div>
        <div style={styles.mockupLine}></div>
        <div className="mockup-grid" style={styles.mockupGrid}>
          <div style={styles.miniPanel}></div>
          <div style={styles.miniPanel}></div>
        </div>
      </div>
    </article>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f1",
    padding: "28px",
    fontFamily: "Inter, sans-serif",
    color: "#17211b",
  },

  container: {
    width: "min(1180px, 100%)",
    margin: "0 auto",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "18px",
    marginBottom: "24px",
  },

  brand: {
    margin: "0",
    fontSize: "24px",
    lineHeight: "1",
    letterSpacing: "0",
  },

  brandSubtext: {
    margin: "6px 0 0",
    color: "#6d766f",
    fontSize: "13px",
    fontWeight: "600",
  },

  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  navLink: {
    minHeight: "42px",
    padding: "0 14px",
    borderRadius: "999px",
    display: "inline-flex",
    alignItems: "center",
    color: "#3d463f",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "800",
  },

  navButton: {
    minHeight: "42px",
    padding: "0 18px",
    borderRadius: "999px",
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#17211b",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "800",
  },

  hero: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.08fr) minmax(340px, 0.92fr)",
    gap: "24px",
    alignItems: "stretch",
    marginBottom: "72px",
  },

  heroCopy: {
    minHeight: "580px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  heroMockup: {
    minHeight: "580px",
  },

  eyebrow: {
    margin: "0 0 14px",
    color: "#8fdc22",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "0",
    textTransform: "uppercase",
  },

  heroTitle: {
    maxWidth: "720px",
    margin: "0",
    fontSize: "64px",
    lineHeight: "0.98",
    letterSpacing: "0",
    color: "#17211b",
  },

  heroText: {
    maxWidth: "620px",
    margin: "20px 0 0",
    color: "#6d766f",
    fontSize: "16px",
    lineHeight: "1.7",
  },

  heroActions: {
    display: "flex",
    gap: "12px",
    marginTop: "30px",
  },

  primaryCta: {
    minHeight: "48px",
    padding: "0 22px",
    borderRadius: "999px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#17211b",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "800",
    boxShadow: "0 12px 26px rgba(23, 33, 27, 0.16)",
  },

  secondaryCta: {
    minHeight: "48px",
    padding: "0 22px",
    borderRadius: "999px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #dfe6d8",
    backgroundColor: "#b8f24b",
    color: "#17211b",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "800",
  },

  heroMetrics: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "14px",
    margin: "22px 0",
  },

  metricCard: {
    minHeight: "112px",
    borderRadius: "20px",
    border: "1px solid #e5eadf",
    backgroundColor: "#ffffff",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  chartPlaceholder: {
    height: "250px",
    borderRadius: "22px",
    border: "1px solid #e5eadf",
    backgroundColor: "#ffffff",
    padding: "22px",
    display: "flex",
    alignItems: "flex-end",
    gap: "14px",
  },

  chartBar: {
    flex: 1,
    minHeight: "34px",
    borderRadius: "12px 12px 4px 4px",
    backgroundColor: "#b8f24b",
  },

  stepsSection: {
    display: "grid",
    gap: "24px",
    marginBottom: "72px",
  },

  sectionHeader: {
    maxWidth: "720px",
    marginBottom: "4px",
  },

  sectionTitle: {
    margin: "0",
    fontSize: "clamp(30px, 4vw, 46px)",
    lineHeight: "1.05",
    letterSpacing: "0",
    color: "#17211b",
  },

  stepRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 0.9fr) minmax(340px, 1.1fr)",
    gap: "24px",
    alignItems: "stretch",
  },

  stepCopy: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "320px",
  },

  stepNumber: {
    margin: "0 0 14px",
    color: "#8fdc22",
    fontSize: "13px",
    fontWeight: "800",
    textTransform: "uppercase",
  },

  stepTitle: {
    margin: "0",
    color: "#17211b",
    fontSize: "30px",
    lineHeight: "1.16",
  },

  bodyText: {
    margin: "16px 0 0",
    color: "#6d766f",
    fontSize: "15px",
    lineHeight: "1.7",
  },

  stepMockup: {
    minHeight: "320px",
  },

  reverseMockup: {
    order: -1,
  },

  authLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(340px, 430px)",
    gap: "24px",
    alignItems: "center",
    marginBottom: "18px",
  },

  authIntro: {
    minHeight: "360px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  card: {
    borderRadius: "30px",
    padding: "34px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5eadf",
    boxShadow: "0 18px 45px rgba(26, 36, 28, 0.08)",
  },

  cardHeader: {
    marginBottom: "24px",
  },

  segmentedControl: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "6px",
    padding: "5px",
    marginBottom: "24px",
    borderRadius: "999px",
    border: "1px solid #dfe6d8",
    backgroundColor: "#f8faf4",
  },

  segmentButton: {
    minHeight: "42px",
    border: "none",
    borderRadius: "999px",
    backgroundColor: "transparent",
    color: "#6d766f",
    fontSize: "14px",
    fontWeight: "800",
    cursor: "pointer",
  },

  segmentButtonActive: {
    backgroundColor: "#17211b",
    color: "#ffffff",
    boxShadow: "0 10px 22px rgba(23, 33, 27, 0.14)",
  },

  title: {
    margin: "0",
    fontSize: "30px",
    lineHeight: "1.15",
    color: "#17211b",
  },

  text: {
    margin: "12px 0 0",
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#6d766f",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "12px",
    borderRadius: "14px",
    border: "1px solid #dfe6d8",
    fontSize: "15px",
    boxSizing: "border-box",
    backgroundColor: "#f8faf4",
    color: "#17211b",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "15px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#17211b",
    color: "#ffffff",
    fontWeight: "800",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "6px",
    boxShadow: "0 12px 26px rgba(23, 33, 27, 0.16)",
  },

  secondaryButton: {
    width: "100%",
    padding: "15px",
    borderRadius: "999px",
    border: "1px solid #dfe6d8",
    backgroundColor: "#b8f24b",
    color: "#17211b",
    fontWeight: "800",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "12px",
  },

  error: {
    color: "#b42318",
    margin: "16px 0 0",
    fontSize: "13px",
    fontWeight: "700",
    lineHeight: "1.5",
  },

  landingCard: {},

  mockupHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#17211b",
    fontSize: "14px",
    marginBottom: "18px",
  },

  mockupDot: {
    width: "12px",
    height: "12px",
    borderRadius: "999px",
    backgroundColor: "#b8f24b",
    display: "inline-block",
  },

  mockupLineWide: {
    width: "72%",
    height: "18px",
    borderRadius: "999px",
    backgroundColor: "#dfe6d8",
    marginBottom: "12px",
  },

  mockupLine: {
    width: "48%",
    height: "18px",
    borderRadius: "999px",
    backgroundColor: "#edf2e8",
    marginBottom: "22px",
  },

  mockupGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "14px",
    marginTop: "18px",
  },

  miniPanel: {
    minHeight: "110px",
    borderRadius: "20px",
    border: "1px solid #e5eadf",
    backgroundColor: "#ffffff",
  },
};

styles.landingCard = {
  borderRadius: "30px",
  padding: "42px",
  backgroundColor: "#ffffff",
  border: "1px solid #e5eadf",
  boxShadow: "0 18px 45px rgba(26, 36, 28, 0.08)",
};

styles.heroCopy = {
  ...styles.landingCard,
  ...styles.heroCopy,
};

styles.stepCopy = {
  ...styles.landingCard,
  ...styles.stepCopy,
};

styles.authIntro = {
  ...styles.landingCard,
  ...styles.authIntro,
};

styles.heroMockup = {
  borderRadius: "30px",
  padding: "30px",
  backgroundColor: "#f8faf4",
  border: "1px solid #e5eadf",
  boxShadow: "0 18px 45px rgba(26, 36, 28, 0.08)",
  ...styles.heroMockup,
};

styles.stepMockup = {
  borderRadius: "30px",
  padding: "30px",
  backgroundColor: "#f8faf4",
  border: "1px solid #e5eadf",
  boxShadow: "0 18px 45px rgba(26, 36, 28, 0.08)",
  ...styles.stepMockup,
};

export default Auth;
