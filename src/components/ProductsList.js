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
      <div style={styles.header}>
        <div>
          <p style={styles.kicker}>Inventory</p>
          <h2 style={styles.title}>Products</h2>
        </div>
      </div>

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
                {product.name} / {product.category}
              </div>

              <div style={styles.productInfo}>
                Stock {product.quantity} / Rs {product.salePrice}
              </div>
            </div>

            <button
              style={styles.deleteButton}
              onClick={() => deleteProduct(product.id)}
              aria-label={`Delete ${product.name}`}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  innerCard: {
    width: "100%",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "16px",
  },

  kicker: {
    margin: "0 0 8px",
    color: "#8fdc22",
    fontSize: "12px",
    fontWeight: "800",
    textTransform: "uppercase",
  },

  title: {
    margin: "0",
    fontSize: "22px",
    color: "#17211b",
  },

  search: {
    width: "100%",
    padding: "13px 14px",
    marginBottom: "16px",
    borderRadius: "14px",
    border: "1px solid #dfe6d8",
    fontSize: "14px",
    boxSizing: "border-box",
    backgroundColor: "#f8faf4",
    color: "#17211b",
    outline: "none",
  },

  list: {
    display: "grid",
    gap: "10px",
  },

  productCard: {
    border: "1px solid #e5eadf",
    borderRadius: "16px",
    padding: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    backgroundColor: "#ffffff",
  },

  productName: {
    fontWeight: "800",
    fontSize: "15px",
    color: "#17211b",
    marginBottom: "6px",
  },

  productInfo: {
    fontSize: "13px",
    color: "#6d766f",
  },

  deleteButton: {
    width: "36px",
    height: "36px",
    borderRadius: "12px",
    border: "1px solid #e5eadf",
    backgroundColor: "#f8faf4",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "800",
    color: "#17211b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    lineHeight: "1",
  },
};

export default ProductsList;
