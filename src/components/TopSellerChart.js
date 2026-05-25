import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TopSellerChart({
  sales,
}) {

  const productSalesMap = {};

  sales.forEach((s) => {

    productSalesMap[s.productName] =
      (productSalesMap[s.productName] || 0) +
      Number(s.quantitySold || 0);

  });

  const topSellerData =
    Object.keys(productSalesMap).map(
      (key) => ({
        name: key,
        units: productSalesMap[key],
      })
    );

  return (
    <div>

      <h3 style={styles.title}>Top Seller Units</h3>

      <div style={styles.chartFrame}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topSellerData}>

            <XAxis dataKey="name" tick={{ fontSize: 11 }} />

            <YAxis tick={{ fontSize: 11 }} />

            <Tooltip />

            <Bar
              dataKey="units"
              fill="#8fdc22"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

const styles = {
  title: {
    margin: "0 0 14px",
    color: "#17211b",
    fontSize: "16px",
  },

  chartFrame: {
    width: "100%",
    height: "260px",
  },
};

export default TopSellerChart;
