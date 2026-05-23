import React, { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function RevenueTrendChart({
  sales,
}) {

  const [view, setView] =
    useState("week");

  const now = new Date();

  // FILTER SALES
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

  // REVENUE MAP
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

  // SORT REVENUE DATA
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

      <h3>Revenue Trend</h3>

      <div style={styles.toggle}>

        <button
          onClick={() =>
            setView("week")
          }
        >
          Weekly
        </button>

        <button
          onClick={() =>
            setView("month")
          }
        >
          Monthly
        </button>

      </div>

      <LineChart
        width={350}
        height={250}
        data={revenueData}
      >

        <XAxis dataKey="date" />

        <YAxis />

        <Tooltip />

        <CartesianGrid stroke="#ccc" />

        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#82ca9d"
        />

      </LineChart>

    </div>
  );
}

const styles = {
  toggle: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
};

export default RevenueTrendChart;
