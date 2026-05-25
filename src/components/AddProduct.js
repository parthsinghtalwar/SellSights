import { useState } from "react";

import { db } from "../firebase";

import {
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

function AddProduct({ user, products, fetchProducts }) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return;

    if (!productName || !category || !quantity || !costPrice || !salePrice) {
      alert("Please fill all fields");
      return;
    }

    const existingProduct = products.find(
      (product) =>
        product.name.toLowerCase() === productName.toLowerCase()
    );

    try {
      if (existingProduct) {
        const newQuantity =
          Number(existingProduct.quantity) + Number(quantity);

        await updateDoc(
          doc(db, "users", user.uid, "products", existingProduct.id),
          {
            quantity: newQuantity,
          }
        );

        alert("Product stock updated!");
      } else {
        await addDoc(collection(db, "users", user.uid, "products"), {
          name: productName,
          category: category,
          quantity: Number(quantity),
          costPrice: Number(costPrice),
          salePrice: Number(salePrice),
        });

        alert("New product added!");
      }

      await fetchProducts();

      setProductName("");
      setCategory("");
      setQuantity("");
      setCostPrice("");
      setSalePrice("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.innerCard}>
      <h2 style={styles.title}>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <input
          style={styles.input}
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Stock Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Cost Price"
          value={costPrice}
          onChange={(e) => setCostPrice(e.target.value)}
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Sale Price"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
        />

        <button style={styles.button} type="submit">
          Add Product
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
    backgroundColor: "#17211b",
    color: "#ffffff",
    fontWeight: "800",
    cursor: "pointer",
    marginTop: "6px",
    boxShadow: "0 12px 26px rgba(23, 33, 27, 0.16)",
  },
};

export default AddProduct;
