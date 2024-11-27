import React, { useState, useEffect } from "react";
import { API_KEY, SUBGRAPH_ID } from "./stuff"; // Ensure correct path
import TokenList from "./TokenList"; // Import TokenList component
// import MarketList from "./MarketList";
// import DepositList from "./DepositList";
// import SwapList from "./SwapList";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tokens"); // Default to "tokens" tab

  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        SUBGRAPH_ID.map(async (subgraph) => {
          try {
            const response = await fetch(
              `https://gateway.thegraph.com/api/${API_KEY}/subgraphs/id/${subgraph.key}`, // Correct URL with backticks
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  query: `{
  tokens(
    first: 10
    where: {lastPriceUSD_not: null}
    orderBy: lastPriceUSD
    orderDirection: desc
  ) {
    lastPriceUSD
    name
    symbol
  }
}`, // Proper query syntax inside a template literal
                }),
              }
            );

            const data = await response.json();

            const tokens = (data?.data?.tokens || []).map((token) => ({
              lastPriceUSD: token?.lastPriceUSD
                ? parseFloat(token.lastPriceUSD).toFixed(2)
                : "-",
              name: token?.name || "-",
              symbol: token?.symbol || "-",
            }));

            return { name: subgraph.name, tokens }; // Return subgraph name and tokens
          } catch (err) {
            console.error(`Error fetching data for ${subgraph.name}:`, err); // Error logging fixed
            return {
              name: subgraph.name,
              tokens: [], // Return empty array if error occurs
            };
          }
        })
      );

      setData(results);
      setLoading(false);
    };

    fetchData();
  }, []); // Dependency array is empty so it runs only on mount

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Change active tab
  };

  if (loading) return <p>Loading...</p>; // Display loading message while data is being fetched

  return (
    <div className="app">
      <h1>DeFi Subgraph Data</h1>

      {/* Tab buttons to switch between content */}
      <div className="button-container">
        <button onClick={() => handleTabClick("tokens")}>Tokens</button>
      </div>

      {/* Display Tokens only */}
      {activeTab === "tokens" && <TokenList data={data} />}
    </div>
  );
};

export default App;
