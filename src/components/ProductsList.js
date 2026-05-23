import React, { useState } from "react";

function ProductsList({ products, deleteProduct }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div style={styles.innerCard}>
      <h2 style={styles.title}>Inventory</h2>

      <input
        style={styles.search}
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={styles.list}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <div>
              <div style={styles.productName}>
                {product.name} · {product.category}
              </div>

              <div style={styles.productInfo}>
                Stock {product.quantity} · ₹{product.salePrice}
              </div>
            </div>

            <button
              style={styles.deleteButton}
              onClick={() => deleteProduct(product.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  innerCard: {
    border: "3px solid #11172F",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "5px 6px 0px #11172F",
    backgroundColor: "#FDFBF4",
  },

  title: {
    marginTop: "0",
    marginBottom: "18px",
    fontSize: "20px",
    color: "#0A1430",
  },

  search: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "16px",
    borderRadius: "10px",
    border: "2px solid #11172F",
    fontSize: "14px",
    boxSizing: "border-box",
    backgroundColor: "#FFFDF7",
    color: "#0A1430",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  productCard: {
    border: "2px solid #11172F",
    borderRadius: "14px",
    padding: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFDF7",
  },

  productName: {
    fontWeight: "700",
    fontSize: "16px",
    color: "#0A1430",
    marginBottom: "6px",
  },

  productInfo: {
    fontSize: "14px",
    color: "#444B6E",
  },

  deleteButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "2px solid #11172F",
    backgroundColor: "#FFFDF7",
    cursor: "pointer",
    fontSize: "24px",
    color: "#11172F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    lineHeight: "1",
  },
};

export default ProductsList;
