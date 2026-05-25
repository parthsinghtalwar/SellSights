import { useState } from "react";

import { db } from "../firebase";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Sales({
  user,
  products,
  fetchProducts,
  fetchSales,
}) {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [discount, setDiscount] = useState("");

  const handleSale = async (e) => {
    e.preventDefault();

    if (!user) return;

    if (!selectedProduct || !quantitySold) {
      alert("Please fill all fields");
      return;
    }

    const productData = products.find(
      (product) => product.name === selectedProduct
    );

    if (!productData) {
      alert("Product not found");
      return;
    }

    if (Number(quantitySold) > Number(productData.quantity)) {
      alert("Not enough stock available!");
      return;
    }

    try {
      const discountValue = Number(discount || 0);

      const originalRevenue =
        Number(productData.salePrice) * Number(quantitySold);

      const finalRevenue = originalRevenue - discountValue;

      if (finalRevenue < 0) {
        alert("Discount cannot be greater than total revenue!");
        return;
      }

      const profit =
        (Number(productData.salePrice) - Number(productData.costPrice)) *
          Number(quantitySold) -
        discountValue;

      await addDoc(
        collection(db, "users", user.uid, "sales"),
        {
          productName: productData.name,
          category: productData.category,
          quantitySold: Number(quantitySold),
          salePrice: Number(productData.salePrice),
          discount: discountValue,
          totalRevenue: finalRevenue,
          profit: profit,
          createdAt: new Date(),
        }
      );

      const newQuantity =
        Number(productData.quantity) - Number(quantitySold);

      if (newQuantity <= 0) {
        await deleteDoc(
          doc(db, "users", user.uid, "products", productData.id)
        );
      } else {
        await updateDoc(
          doc(db, "users", user.uid, "products", productData.id),
          {
            quantity: newQuantity,
          }
        );
      }

      alert("Sale Recorded!");

      setSelectedProduct("");
      setQuantitySold("");
      setDiscount("");

      await fetchProducts();
      await fetchSales();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.innerCard}>
      <h2 style={styles.title}>Record Sale</h2>

      <form onSubmit={handleSale}>
        <select
          style={styles.input}
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Select Product</option>

          {products.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>

        <input
          style={styles.input}
          type="number"
          placeholder="Quantity Sold"
          value={quantitySold}
          onChange={(e) => setQuantitySold(e.target.value)}
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Discount (Optional)"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />

        <button style={styles.button} type="submit">
          Record Sale
        </button>
      </form>
    </div>
  );
}

const styles = {
  innerCard: {
    width: "100%",
  },

  title: {
    marginTop: "0",
    marginBottom: "18px",
    fontSize: "18px",
    color: "#17211b",
  },

  input: {
    width: "100%",
    padding: "13px 14px",
    marginBottom: "12px",
    borderRadius: "14px",
    border: "1px solid #dfe6d8",
    fontSize: "14px",
    boxSizing: "border-box",
    backgroundColor: "#f8faf4",
    color: "#17211b",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#b8f24b",
    color: "#17211b",
    fontWeight: "800",
    cursor: "pointer",
    marginTop: "6px",
    boxShadow: "0 12px 26px rgba(143, 220, 34, 0.22)",
  },
};

export default Sales;
