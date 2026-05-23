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

    gap: "18px",

    width: "fit-content",
  },

  topRow: {
    display: "flex",

    gap: "18px",
  },

  chartCard: {
    width: "380px",

    backgroundColor: "#FDFBF4",

    border: "3px solid #11172F",

    borderRadius: "18px",

    padding: "20px",

    boxSizing: "border-box",

    boxShadow:
      "5px 6px 0px #11172F",
  },

  revenueCard: {
    width: "778px",

    backgroundColor: "#FDFBF4",

    border: "3px solid #11172F",

    borderRadius: "18px",

    padding: "20px",

    boxSizing: "border-box",

    boxShadow:
      "5px 6px 0px #11172F",
  },
};

export default AnalyticsPanel;
