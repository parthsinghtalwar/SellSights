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
      <h2 style={styles.title}>Sales History</h2>

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

      <div style={styles.list}>
        {filteredSales.map((sale) => (
          <div key={sale.id} style={styles.saleCard}>
            <div>
              <div style={styles.productName}>{sale.productName}</div>

              <div style={styles.saleInfo}>
                {new Date(
                  sale.createdAt.seconds * 1000
                ).toLocaleDateString()}{" "}
                · qty {sale.quantitySold}
              </div>
            </div>

            <div style={styles.revenue}>₹{sale.totalRevenue}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  innerCard: {
    border: "3px solid #11172F",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "5px 6px 0px #11172F",
    backgroundColor: "#FDFBF4",
  },

  title: {
    marginTop: "0",
    marginBottom: "18px",
    fontSize: "20px",
    color: "#0A1430",
  },

  select: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "16px",
    borderRadius: "10px",
    border: "2px solid #11172F",
    fontSize: "14px",
    backgroundColor: "#FFFDF7",
    color: "#0A1430",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  saleCard: {
    border: "2px solid #11172F",
    borderRadius: "14px",
    padding: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFDF7",
  },

  productName: {
    fontWeight: "700",
    fontSize: "16px",
    color: "#0A1430",
    marginBottom: "6px",
  },

  saleInfo: {
    fontSize: "14px",
    color: "#444B6E",
  },

  revenue: {
    fontWeight: "800",
    fontSize: "16px",
    color: "#0A1430",
  },
};

export default SalesHistory;
