import {
  useState,
  useEffect,
} from "react";

import { db } from "../firebase";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

function ShopProfile({
  user,
  onEnterDashboard,
}) {

  const [shopName,
    setShopName] =
    useState("");

  const [savedShopName,
    setSavedShopName] =
    useState("");

  const [time,
    setTime] =
    useState(new Date());

  const userRef =
    doc(
      db,
      "users",
      user.uid
    );

  useEffect(() => {

    const fetchShopProfile =
      async () => {

        const userSnap =
          await getDoc(userRef);

        if (userSnap.exists()) {

          setSavedShopName(
            userSnap.data()
              .shopName || ""
          );
        }
      };

    fetchShopProfile();

  }, [userRef]);

  useEffect(() => {

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const saveShopName =
    async () => {

      if (!shopName) {

        alert(
          "Please enter your shop name"
        );

        return;
      }

      await setDoc(

        userRef,

        {
          email: user.email,

          shopName: shopName,
        },

        { merge: true }

      );

      setSavedShopName(shopName);

      setShopName("");
    };

  const initials =
    savedShopName
      ? savedShopName
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "SS";

  return (

    <div style={styles.page}>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        `}
      </style>

      <div style={styles.glow}></div>

      <div style={styles.card}>

        <div style={styles.initialsCircle}>
          {initials}
        </div>

        <h1 style={styles.logo}>
          SellSights
        </h1>

        <p style={styles.subtitle}>
          your shop, in numbers
        </p>

        <div style={styles.divider}></div>

        <p style={styles.welcomeText}>
          Welcome back,
        </p>

        {savedShopName ? (

          <>

            <h2 style={styles.shopName}>
              {savedShopName}
            </h2>

            <div style={styles.timeBlock}>

              <p style={styles.date}>
                {time.toLocaleDateString(
                  "en-IN",
                  {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>

              <p style={styles.time}>
                {time.toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }
                )}
              </p>

            </div>

            <p style={styles.email}>
              {user.email}
            </p>

            <button
              style={styles.button}
              onClick={onEnterDashboard}
            >
              Enter Dashboard
            </button>

          </>

        ) : (

          <>

            <input
              style={styles.input}
              type="text"
              placeholder="Enter your shop name"
              value={shopName}
              onChange={(e) =>
                setShopName(
                  e.target.value
                )
              }
            />

            <button
              style={styles.button}
              onClick={saveShopName}
            >
              Save Shop Name
            </button>

          </>

        )}

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

    transform:
      "translate(-50%, -50%)",
  },

  card: {
    width: "500px",

    backgroundColor: "#F7F3EA",

    border: "3px solid #11172F",

    borderRadius: "28px",

    padding: "42px",

    boxShadow:
      "8px 10px 0px #11172F",

    color: "#0A1430",

    textAlign: "center",

    position: "relative",

    zIndex: 2,
  },

  initialsCircle: {
    width: "90px",

    height: "90px",

    borderRadius: "50%",

    backgroundColor: "#11172F",

    color: "#F7F3EA",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    margin: "0 auto 22px auto",

    fontSize: "30px",

    fontWeight: "700",

    letterSpacing: "1px",
  },

  logo: {
    fontFamily:
      "'Playfair Display', serif",

    fontSize: "68px",

    margin: "0",

    color: "#0A1430",

    letterSpacing: "-2px",

    lineHeight: "1",
  },

  subtitle: {
    marginTop: "8px",

    color: "#444B6E",

    fontSize: "18px",

    fontStyle: "italic",
  },

  divider: {
    width: "100%",

    height: "2px",

    backgroundColor: "#D9CFB4",

    margin: "28px 0",
  },

  welcomeText: {
    margin: "0",

    fontSize: "18px",

    color: "#444B6E",
  },

  shopName: {
    marginTop: "10px",

    marginBottom: "24px",

    fontSize: "38px",

    color: "#0A1430",
  },

  timeBlock: {
    marginBottom: "24px",
  },

  date: {
    margin: "0",

    fontSize: "15px",

    color: "#444B6E",
  },

  time: {
    marginTop: "8px",

    fontSize: "34px",

    fontWeight: "700",

    color: "#0A1430",
  },

  email: {
    fontSize: "13px",

    color: "#666",

    marginBottom: "28px",
  },

  input: {
    width: "100%",

    padding: "14px 16px",

    marginBottom: "18px",

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

    transition: "all 0.2s ease",
  },
};

export default ShopProfile;
