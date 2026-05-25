import {
  useEffect,
  useState,
} from "react";

import { db, auth } from "./firebase";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import Auth from "./components/Auth";
import ShopProfile from "./components/ShopProfile";
import AddProduct from "./components/AddProduct";
import ProductsList from "./components/ProductsList";
import Sales from "./components/Sales";
import SalesHistory from "./components/SalesHistory";
import StatsBar from "./components/StatsBar";
import AnalyticsPanel from "./components/AnalyticsPanel";

function App() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [user, setUser] = useState(null);
  const [shopName, setShopName] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);

  const fetchProducts = async () => {};

  const fetchSales = async () => {};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setShowDashboard(false);

        if (currentUser) {
          const userRef = doc(
            db,
            "users",
            currentUser.uid
          );

          getDoc(userRef).then((snap) => {
            if (snap.exists()) {
              setShopName(
                snap.data().shopName || ""
              );
            }
          });

        } else {
          setProducts([]);
          setSales([]);
          setShopName("");
        }
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const productsRef = collection(
      db,
      "users",
      user.uid,
      "products"
    );

    const salesRef = collection(
      db,
      "users",
      user.uid,
      "sales"
    );

    const unsubscribeProducts = onSnapshot(
      productsRef,
      (snap) => {
        setProducts(
          snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );

    const unsubscribeSales = onSnapshot(
      salesRef,
      (snap) => {
        setSales(
          snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );

    return () => {
      unsubscribeProducts();
      unsubscribeSales();
    };
  }, [user]);

  const deleteProduct = async (id) => {
    if (!user) return;

    await deleteDoc(
      doc(
        db,
        "users",
        user.uid,
        "products",
        id
      )
    );

  };

  const logout = async () => {
    await signOut(auth);
    setShowDashboard(false);
  };

  if (!user) {
    return <Auth />;
  }

  if (!showDashboard) {
    return (
      <ShopProfile
        user={user}
        onEnterDashboard={() =>
          setShowDashboard(true)
        }
      />
    );
  }

  return (
    <div style={styles.app}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

          .dashboard-card {
            transition:
              transform 0.2s ease,
              box-shadow 0.2s ease;
          }

          .dashboard-card:hover {
            transform: translateY(-4px);
            box-shadow: 8px 10px 0px #11172F;
          }
        `}
      </style>

      <header style={styles.header}>
        <div>
          <h1 style={styles.logo}>
            SellSights
          </h1>

          <p style={styles.subtitle}>
            your shop, in numbers
          </p>
        </div>

        <button
          style={styles.profileButton}
          onClick={logout}
        >
          ↪ {shopName || "Shop"}
        </button>
      </header>

      <StatsBar
        products={products}
        sales={sales}
      />

      <section style={styles.mainGrid}>
        <div style={styles.leftColumn}>
          <div
            className="dashboard-card"
            style={styles.analyticsCard}
          >
            <AnalyticsPanel
              products={products}
              sales={sales}
            />
          </div>

          <div
            className="dashboard-card"
            style={styles.historyCard}
          >
            <SalesHistory sales={sales} />
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.formGrid}>
            <div
              className="dashboard-card"
              style={styles.card}
            >
              <AddProduct
                user={user}
                products={products}
                fetchProducts={fetchProducts}
              />
            </div>

            <div
              className="dashboard-card"
              style={styles.card}
            >
              <Sales
                user={user}
                products={products}
                fetchProducts={fetchProducts}
                fetchSales={fetchSales}
              />
            </div>
          </div>

          <div
            className="dashboard-card"
            style={styles.productsWideCard}
          >
            <ProductsList
              products={products}
              deleteProduct={deleteProduct}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  app: {
    backgroundColor: "#0A1430",
    minHeight: "100vh",
    padding: "22px",
    fontFamily: "Inter, sans-serif",
    color: "#E8D9B5",
  },

  header: {
    marginBottom: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "72px",
    fontWeight: "600",
    margin: "0",
    color: "#E8D9B5",
    letterSpacing: "-2px",
    lineHeight: "1",
  },

  subtitle: {
    marginTop: "8px",
    color: "#CFC2A3",
    fontSize: "18px",
    fontStyle: "italic",
    letterSpacing: "0.5px",
  },

  profileButton: {
    marginTop: "6px",
    padding: "14px 24px",
    borderRadius: "999px",
    border: "3px solid #11172F",
    backgroundColor: "#11172F",
    color: "#F7F3EA",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "5px 6px 0px #00000040",
    transition: "all 0.2s ease",
  },

  mainGrid: {
    display: "flex",
    alignItems: "flex-start",
    gap: "22px",
    marginTop: "18px",
  },

  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  formGrid: {
    display: "flex",
    gap: "18px",
  },

  analyticsCard: {
    backgroundColor: "#F7F3EA",
    border: "3px solid #11172F",
    borderRadius: "18px",
    padding: "22px",
    color: "#0A1430",
    boxShadow: "5px 6px 0px #11172F",
    width: "fit-content",
    flexShrink: 0,
  },

  historyCard: {
    backgroundColor: "#F7F3EA",
    border: "3px solid #11172F",
    borderRadius: "18px",
    padding: "22px",
    color: "#0A1430",
    boxShadow: "5px 6px 0px #11172F",
    width: "778px",
    boxSizing: "border-box",
  },

  card: {
    backgroundColor: "#F7F3EA",
    border: "3px solid #11172F",
    borderRadius: "18px",
    padding: "22px",
    color: "#0A1430",
    boxShadow: "5px 6px 0px #11172F",
    width: "380px",
    minHeight: "450px",
    boxSizing: "border-box",
    flexShrink: 0,
  },

  productsWideCard: {
    backgroundColor: "#F7F3EA",
    border: "3px solid #11172F",
    borderRadius: "18px",
    padding: "22px",
    color: "#0A1430",
    boxShadow: "5px 6px 0px #11172F",
    width: "778px",
    minHeight: "450px",
    boxSizing: "border-box",
  },
};

export default App;
