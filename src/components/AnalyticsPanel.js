import React from "react";

import TopSellerChart from "./TopSellerChart";
import InventoryMixChart from "./InventoryMixChart";
import RevenueTrendChart from "./RevenueTrendChart";

function AnalyticsPanel({
  products,
  sales,
}) {

  return (

    <div style={styles.analyticsWrap}>

      <div style={styles.sectionHeader}>
        <div>
          <p style={styles.kicker}>Analytics</p>
          <h2 style={styles.title}>Performance snapshot</h2>
        </div>
      </div>

      <div style={styles.topRow}>

        <div style={styles.chartCard}>

          <TopSellerChart
            sales={sales}
          />

        </div>

        <div style={styles.chartCard}>

          <InventoryMixChart
            products={products}
          />

        </div>

      </div>

      <div style={styles.revenueCard}>

        <RevenueTrendChart
          sales={sales}
        />

      </div>

    </div>
  );
}

const styles = {

  analyticsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "16px",
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
    color: "#17211b",
    fontSize: "22px",
    lineHeight: "1.2",
  },

  topRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
  },

  chartCard: {
    minWidth: 0,
    backgroundColor: "#f8faf4",
    border: "1px solid #e5eadf",
    borderRadius: "20px",
    padding: "18px",
  },

  revenueCard: {
    minWidth: 0,
    backgroundColor: "#f8faf4",
    border: "1px solid #e5eadf",
    borderRadius: "20px",
    padding: "18px",
  },
};

export default AnalyticsPanel;
