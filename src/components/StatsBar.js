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
      <StatCard label="Revenue" value={`₹${formatNumber(totalRevenue)}`} />
      <StatCard label="Profit" value={`₹${formatNumber(totalProfit)}`} />
      <StatCard label="Stock Value" value={`₹${formatNumber(stockValue)}`} />
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
    display: "flex",
    gap: "18px",
    marginBottom: "18px",
    overflowX: "auto",
    paddingBottom: "8px",
  },

  card: {
    backgroundColor: "#F7F3EA",
    border: "3px solid #11172F",
    borderRadius: "18px",
    padding: "22px 26px",
    minWidth: "220px",
    minHeight: "115px",
    boxSizing: "border-box",
    boxShadow: "5px 6px 0px #11172F",
    color: "#0A1430",
    flexShrink: 0,
  },

  label: {
    margin: "0 0 12px 0",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    color: "#3A4568",
  },

  value: {
    margin: "0",
    fontSize: "34px",
    fontWeight: "800",
    color: "#0A1430",
    lineHeight: "1.1",
  },
};

export default StatsBar;
