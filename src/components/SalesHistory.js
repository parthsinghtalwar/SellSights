import React, { useEffect, useState } from "react";

function SalesHistory({ sales }) {
  const [selectedDate, setSelectedDate] = useState("");

  const getDateKey = (sale) => {
    const date = new Date(sale.createdAt.seconds * 1000);
    return date.toISOString().split("T")[0];
  };

  const dateOptions = [...new Set(sales.map(getDateKey))].sort(
    (a, b) => new Date(b) - new Date(a)
  );

  useEffect(() => {
    if (dateOptions.length > 0 && !selectedDate) {
      setSelectedDate(dateOptions[0]);
    }
  }, [dateOptions, selectedDate]);

  const filteredSales = sales
    .filter((sale) => getDateKey(sale) === selectedDate)
    .sort((a, b) => a.productName.localeCompare(b.productName));

  return (
    <div style={styles.innerCard}>
      <div style={styles.header}>
        <div>
          <p style={styles.kicker}>Sales</p>
          <h2 style={styles.title}>Sales History</h2>
        </div>

        <select
          style={styles.select}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {dateOptions.map((date) => (
            <option key={date} value={date}>
              {new Date(date).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.list}>
        {filteredSales.map((sale) => (
          <div key={sale.id} style={styles.saleCard}>
            <div>
              <div style={styles.productName}>{sale.productName}</div>

              <div style={styles.saleInfo}>
                {new Date(
                  sale.createdAt.seconds * 1000
                ).toLocaleDateString()}{" "}
                / qty {sale.quantitySold}
              </div>
            </div>

            <div style={styles.revenue}>Rs {sale.totalRevenue}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  innerCard: {
    width: "100%",
  },

  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "16px",
    flexWrap: "wrap",
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
    fontSize: "22px",
    color: "#17211b",
  },

  select: {
    minWidth: "190px",
    padding: "12px 14px",
    borderRadius: "14px",
    border: "1px solid #dfe6d8",
    fontSize: "14px",
    backgroundColor: "#f8faf4",
    color: "#17211b",
    outline: "none",
  },

  list: {
    display: "grid",
    gap: "10px",
  },

  saleCard: {
    border: "1px solid #e5eadf",
    borderRadius: "16px",
    padding: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    backgroundColor: "#ffffff",
  },

  productName: {
    fontWeight: "800",
    fontSize: "15px",
    color: "#17211b",
    marginBottom: "6px",
  },

  saleInfo: {
    fontSize: "13px",
    color: "#6d766f",
  },

  revenue: {
    fontWeight: "800",
    fontSize: "15px",
    color: "#17211b",
    whiteSpace: "nowrap",
  },
};

export default SalesHistory;
