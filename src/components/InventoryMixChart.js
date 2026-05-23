import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

function InventoryMixChart({
  products,
}) {

  const pieData = products.map(
    (p) => ({
      name: p.name,
      value: Number(
        p.quantity || 0
      ),
    })
  );

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#00c49f",
  ];

  return (
    <div>

      <h3>Inventory Mix</h3>

      <PieChart
        width={350}
        height={250}
      >

        <Tooltip />

        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
        >

          {pieData.map(
            (_, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            )
          )}

        </Pie>

      </PieChart>

    </div>
  );
}

export default InventoryMixChart;
