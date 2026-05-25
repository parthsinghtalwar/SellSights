import React, { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function RevenueTrendChart({
  sales,
}) {

  const [view, setView] =
    useState("week");

  const now = new Date();

  const filteredSales = sales.filter(
    (s) => {

      const date = new Date(
        s.createdAt.seconds * 1000
      );

      if (view === "week") {

        const weekAgo = new Date();

        weekAgo.setDate(
          now.getDate() - 7
        );

        return date >= weekAgo;

      } else {

        const monthAgo = new Date();

        monthAgo.setMonth(
          now.getMonth() - 1
        );

        return date >= monthAgo;
      }
    }
  );

  const revenueMap = {};

  filteredSales.forEach((s) => {

    const rawDate = new Date(
      s.createdAt.seconds * 1000
    );

    const formattedDate =
      rawDate.toLocaleDateString();

    revenueMap[formattedDate] =
      (revenueMap[formattedDate] || 0) +
      Number(s.totalRevenue || 0);

  });

  const revenueData = Object.keys(
    revenueMap
  )
    .map((date) => ({
      date,
      revenue: revenueMap[date],
      sortableDate: new Date(date),
    }))
    .sort(
      (a, b) =>
        a.sortableDate - b.sortableDate
    );

  return (
    <div>

      <div style={styles.header}>
        <h3 style={styles.title}>Revenue Trend</h3>

        <div style={styles.toggle}>

          <button
            style={{
              ...styles.toggleButton,
              ...(view === "week" ? styles.activeButton : {}),
            }}
            onClick={() =>
              setView("week")
            }
          >
            Weekly
          </button>

          <button
            style={{
              ...styles.toggleButton,
              ...(view === "month" ? styles.activeButton : {}),
            }}
            onClick={() =>
              setView("month")
            }
          >
            Monthly
          </button>

        </div>
      </div>

      <div style={styles.chartFrame}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>

            <XAxis dataKey="date" tick={{ fontSize: 11 }} />

            <YAxis tick={{ fontSize: 11 }} />

            <Tooltip />

            <CartesianGrid stroke="#e5eadf" vertical={false} />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8fdc22"
              strokeWidth={3}
              dot={{ r: 4, fill: "#17211b", strokeWidth: 0 }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "14px",
    flexWrap: "wrap",
  },

  title: {
    margin: "0",
    color: "#17211b",
    fontSize: "16px",
  },

  toggle: {
    display: "flex",
    gap: "6px",
    padding: "4px",
    borderRadius: "999px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5eadf",
  },

  toggleButton: {
    border: "none",
    borderRadius: "999px",
    padding: "8px 12px",
    backgroundColor: "transparent",
    color: "#6d766f",
    fontSize: "12px",
    fontWeight: "800",
    cursor: "pointer",
  },

  activeButton: {
    backgroundColor: "#b8f24b",
    color: "#17211b",
  },

  chartFrame: {
    width: "100%",
    height: "300px",
  },
};

export default RevenueTrendChart;
