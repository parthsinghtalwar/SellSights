import { useState } from "react";

import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <div style={styles.page}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        `}
      </style>

      <div style={styles.glow}></div>

      <div style={styles.card}>
        <h1 style={styles.logo}>SellSights</h1>

        <p style={styles.subtitle}>
          your shop, in numbers
        </p>

        <div style={styles.divider}></div>

        <h2 style={styles.title}>Welcome</h2>

        <p style={styles.text}>
          Login or create your shop dashboard.
        </p>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={login}>
          Login
        </button>

        <button style={styles.secondaryButton} onClick={signup}>
          Create Account
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0A1430",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Inter, sans-serif",
  },

  glow: {
    width: "500px",
    height: "500px",
    background:
      "radial-gradient(circle, rgba(232,217,181,0.22) 0%, rgba(10,20,48,0) 70%)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  card: {
    width: "430px",
    backgroundColor: "#F7F3EA",
    border: "3px solid #11172F",
    borderRadius: "28px",
    padding: "42px",
    boxShadow: "8px 10px 0px #11172F",
    color: "#0A1430",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
  },

  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "64px",
    margin: "0",
    color: "#0A1430",
    letterSpacing: "-2px",
    lineHeight: "1",
  },

  subtitle: {
    marginTop: "8px",
    color: "#444B6E",
    fontSize: "17px",
    fontStyle: "italic",
  },

  divider: {
    width: "100%",
    height: "2px",
    backgroundColor: "#D9CFB4",
    margin: "28px 0",
  },

  title: {
    margin: "0 0 8px 0",
    fontSize: "28px",
    color: "#0A1430",
  },

  text: {
    margin: "0 0 24px 0",
    fontSize: "14px",
    color: "#444B6E",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "14px",
    borderRadius: "14px",
    border: "2px solid #11172F",
    fontSize: "15px",
    boxSizing: "border-box",
    backgroundColor: "#FFFDF7",
    color: "#0A1430",
  },

  button: {
    width: "100%",
    padding: "15px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#11172F",
    color: "#F7F3EA",
    fontWeight: "800",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "4px",
  },

  secondaryButton: {
    width: "100%",
    padding: "15px",
    borderRadius: "999px",
    border: "2px solid #11172F",
    backgroundColor: "#F7F3EA",
    color: "#11172F",
    fontWeight: "800",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "12px",
  },
};

export default Auth;
