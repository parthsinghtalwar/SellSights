import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
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

      <h3>Top Seller Units</h3>

      <BarChart
        width={350}
        height={250}
        data={topSellerData}
      >

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="units"
          fill="#8884d8"
        />

      </BarChart>

    </div>
  );
}

export default TopSellerChart;
