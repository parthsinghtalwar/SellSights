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

import "./App.css";

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
  const [activeSection, setActiveSection] = useState("overview");

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
    <div className="dashboard-shell">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        `}
      </style>

      <aside className="dashboard-sidebar">
        <div className="brand-block">
          <div>
            <h1>SellSights</h1>
            <p>{shopName || "Shop workspace"}</p>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Dashboard sections">
          <a
            className={activeSection === "overview" ? "active" : ""}
            href="#overview"
            onClick={() => setActiveSection("overview")}
          >
            Overview
          </a>
          <a
            className={activeSection === "analytics" ? "active" : ""}
            href="#analytics"
            onClick={() => setActiveSection("analytics")}
          >
            Analytics
          </a>
          <a
            className={activeSection === "sales" ? "active" : ""}
            href="#sales"
            onClick={() => setActiveSection("sales")}
          >
            Sales
          </a>
          <a
            className={activeSection === "inventory" ? "active" : ""}
            href="#inventory"
            onClick={() => setActiveSection("inventory")}
          >
            Inventory
          </a>
        </nav>

        <button className="logout-button" onClick={logout}>
          Sign out
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header" id="overview">
          <div>
            <p className="eyebrow">Business dashboard</p>
            <h2>Overview</h2>
            <p className="header-copy">
              Track stock, sales, revenue, and profit from one clean workspace.
            </p>
          </div>

          <div className="profile-pill">
            <span>{(shopName || "S").charAt(0).toUpperCase()}</span>
            <div>
              <strong>{shopName || "Shop"}</strong>
              <small>Live workspace</small>
            </div>
          </div>
        </header>

        <StatsBar products={products} sales={sales} />

        <section className="dashboard-grid">
          <div className="primary-column">
            <div className="surface-card" id="analytics">
              <AnalyticsPanel products={products} sales={sales} />
            </div>

            <div className="surface-card" id="sales">
              <SalesHistory sales={sales} />
            </div>

            <div className="surface-card" id="inventory">
              <ProductsList
                products={products}
                deleteProduct={deleteProduct}
              />
            </div>
          </div>

          <aside className="side-panel">
            <div className="surface-card">
              <AddProduct
                user={user}
                products={products}
                fetchProducts={fetchProducts}
              />
            </div>

            <div className="surface-card">
              <Sales
                user={user}
                products={products}
                fetchProducts={fetchProducts}
                fetchSales={fetchSales}
              />
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;
