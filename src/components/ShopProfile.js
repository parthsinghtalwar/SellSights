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
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

          @media (max-width: 900px) {
            .profile-layout {
              grid-template-columns: 1fr !important;
            }

            .profile-hero h1 {
              font-size: 46px !important;
            }
          }

          @media (max-width: 520px) {
            .profile-page {
              padding: 18px !important;
            }

            .profile-card,
            .profile-hero {
              padding: 24px !important;
              border-radius: 24px !important;
            }

            .profile-hero h1 {
              font-size: 36px !important;
            }
          }
        `}
      </style>

      <div className="profile-layout" style={styles.layout}>

        <section className="profile-hero" style={styles.hero}>
          <div>
            <p style={styles.eyebrow}>SellSights</p>
            <h1 style={styles.heroTitle}>
              Your shop command center is ready.
            </h1>
            <p style={styles.heroText}>
              Set your workspace name, then move into a clean dashboard for inventory, sales, revenue, and profit.
            </p>
          </div>

          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <span style={styles.infoLabel}>Account</span>
              <strong style={styles.infoValue}>{user.email}</strong>
            </div>
            <div style={styles.infoCard}>
              <span style={styles.infoLabel}>Workspace</span>
              <strong style={styles.infoValue}>{savedShopName || "Not set"}</strong>
            </div>
          </div>
        </section>

        <section className="profile-card" style={styles.card}>

          <div style={styles.initialsCircle}>
            {initials}
          </div>

          <p style={styles.eyebrow}>
            Welcome back
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

              <h2 style={styles.title}>
                Name your workspace
              </h2>

              <p style={styles.text}>
                This name appears in your dashboard and helps personalize your shop view.
              </p>

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

        </section>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f1",
    display: "grid",
    placeItems: "center",
    padding: "34px",
    fontFamily: "Inter, sans-serif",
    color: "#17211b",
  },

  layout: {
    width: "min(1080px, 100%)",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(340px, 430px)",
    gap: "24px",
    alignItems: "stretch",
  },

  hero: {
    minHeight: "560px",
    borderRadius: "30px",
    padding: "42px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5eadf",
    boxShadow: "0 18px 45px rgba(26, 36, 28, 0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
    maxWidth: "650px",
    margin: "0",
    fontSize: "58px",
    lineHeight: "1",
    letterSpacing: "0",
    color: "#17211b",
  },

  heroText: {
    maxWidth: "560px",
    margin: "22px 0 0",
    color: "#6d766f",
    fontSize: "16px",
    lineHeight: "1.7",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "14px",
    marginTop: "34px",
  },

  infoCard: {
    minHeight: "112px",
    borderRadius: "22px",
    border: "1px solid #e5eadf",
    backgroundColor: "#f8faf4",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minWidth: 0,
  },

  infoLabel: {
    color: "#6d766f",
    fontSize: "12px",
    fontWeight: "800",
    textTransform: "uppercase",
  },

  infoValue: {
    color: "#17211b",
    fontSize: "15px",
    overflowWrap: "anywhere",
  },

  card: {
    borderRadius: "30px",
    padding: "34px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5eadf",
    boxShadow: "0 18px 45px rgba(26, 36, 28, 0.08)",
    alignSelf: "center",
    textAlign: "center",
  },

  initialsCircle: {
    width: "76px",
    height: "76px",
    borderRadius: "24px",
    backgroundColor: "#b8f24b",
    color: "#17211b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
    fontSize: "24px",
    fontWeight: "800",
    letterSpacing: "0",
  },

  title: {
    margin: "0",
    fontSize: "30px",
    lineHeight: "1.15",
    color: "#17211b",
  },

  text: {
    margin: "12px 0 24px",
    color: "#6d766f",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  shopName: {
    margin: "0 0 24px",
    fontSize: "34px",
    color: "#17211b",
    lineHeight: "1.1",
    overflowWrap: "anywhere",
  },

  timeBlock: {
    marginBottom: "24px",
    borderRadius: "22px",
    backgroundColor: "#f8faf4",
    border: "1px solid #e5eadf",
    padding: "18px",
  },

  date: {
    margin: "0",
    fontSize: "14px",
    color: "#6d766f",
  },

  time: {
    margin: "8px 0 0",
    fontSize: "32px",
    fontWeight: "800",
    color: "#17211b",
  },

  email: {
    fontSize: "13px",
    color: "#6d766f",
    margin: "0 0 28px",
    overflowWrap: "anywhere",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "14px",
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
    boxShadow: "0 12px 26px rgba(23, 33, 27, 0.16)",
  },
};

export default ShopProfile;
