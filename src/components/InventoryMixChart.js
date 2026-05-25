import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
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
    "#8fdc22",
    "#17211b",
    "#a8b0aa",
    "#d7dfcf",
    "#b8f24b",
  ];

  return (
    <div>

      <h3 style={styles.title}>Inventory Mix</h3>

      <div style={styles.chartFrame}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Tooltip />

            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius="76%"
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

export default InventoryMixChart;
