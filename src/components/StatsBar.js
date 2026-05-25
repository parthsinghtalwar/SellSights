import React from "react";

function StatsBar({ products, sales }) {
  const totalProducts = products.filter(
    (p) => Number(p.quantity || 0) > 0
  ).length;

  const totalSales = sales.length;

  const unitsSold = sales.reduce(
    (sum, s) => sum + Number(s.quantitySold || 0),
    0
  );

  const totalRevenue = sales.reduce(
    (sum, s) => sum + Number(s.totalRevenue || 0),
    0
  );

  const totalProfit = sales.reduce(
    (sum, s) => sum + Number(s.profit || 0),
    0
  );

  const stockValue = products.reduce(
    (sum, p) =>
      sum + Number(p.quantity || 0) * Number(p.salePrice || 0),
    0
  );

  const formatNumber = (num) => Number(num).toLocaleString("en-IN");

  return (
    <div style={styles.container}>
      <StatCard label="Products" value={formatNumber(totalProducts)} />
      <StatCard label="Sales" value={formatNumber(totalSales)} />
      <StatCard label="Units Sold" value={formatNumber(unitsSold)} />
      <StatCard label="Revenue" value={`Rs ${formatNumber(totalRevenue)}`} />
      <StatCard label="Profit" value={`Rs ${formatNumber(totalProfit)}`} />
      <StatCard label="Stock Value" value={`Rs ${formatNumber(stockValue)}`} />
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.label}>{label}</p>
      <h2 style={styles.value}>{value}</h2>
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "16px",
    marginBottom: "22px",
  },

  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5eadf",
    borderRadius: "22px",
    padding: "20px",
    minHeight: "118px",
    boxShadow: "0 16px 38px rgba(26, 36, 28, 0.07)",
    color: "#17211b",
    position: "relative",
    overflow: "hidden",
  },

  label: {
    margin: "0 0 16px 0",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "0",
    textTransform: "uppercase",
    color: "#7a837d",
  },

  value: {
    margin: "0",
    fontSize: "clamp(24px, 3vw, 32px)",
    fontWeight: "800",
    color: "#17211b",
    lineHeight: "1.08",
    letterSpacing: "0",
  },
};

export default StatsBar;
