import React, { useState, useEffect } from "react";
import { API_KEY, SUBGRAPH_ID } from "./stuff"; // Ensure correct path
import TokenList from "./TokenList"; // Import TokenList component
import DepositList from "./DepositList";
import WithdrawList from "./WithdrawList";
import "./App.css";

const AppMany = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tokens");
  const ITEMS_PER_QUERY = 50;

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
                      first: ${ITEMS_PER_QUERY}
                      where: {lastPriceUSD_not: null}
                      orderBy: lastPriceUSD
                      orderDirection: desc
                    ) {
                      lastPriceUSD
                      name
                      symbol
                    }
                    deposits(first: ${ITEMS_PER_QUERY}, orderBy: amountUSD, orderDirection: desc) {
                      amountUSD
                      blockNumber
                      id
                    }
                    withdraws(first: ${ITEMS_PER_QUERY}, orderBy: amountUSD, orderDirection: desc) {
                      amountUSD
                      hash
                      blockNumber
                    }
                  }`,
                }),
              }
            );

            const data = await response.json();

            const tokens = (data?.data?.tokens || []).map((token) => {
              const tokenData = {
                lastPriceUSD: "-",
                name: "-",
                symbol: "-",
              };

              try {
                if (token?.lastPriceUSD) {
                  const price = parseFloat(token.lastPriceUSD);
                  tokenData.lastPriceUSD = price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });
                }
                if (token?.name) {
                  tokenData.name = token.name;
                }
                if (token?.symbol) {
                  tokenData.symbol = token.symbol;
                }
              } catch (err) {
                console.warn(`Error processing token fields:`, err);
              }

              return tokenData;
            });

            const deposits = (data?.data?.deposits || []).map((deposit) => {
              const depositData = {
                amountUSD: "-",
                id: "-",
                blockNumber: "-",
              };

              try {
                if (deposit?.amountUSD) {
                  const price = parseFloat(deposit.amountUSD);
                  depositData.amountUSD = price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });
                }
                if (deposit?.id) {
                  depositData.id = deposit.id;
                }
                if (deposit?.blockNumber) {
                  depositData.blockNumber = deposit.blockNumber;
                }
              } catch (err) {
                console.warn(`Error processing deposit fields:`, err);
              }

              return depositData;
            });

            const withdraws = (data?.data?.withdraws || []).map((withdraw) => {
              const withdrawData = {
                amountUSD: "-",
                hash: "-",
                blockNumber: "-",
              };

              try {
                if (withdraw?.amountUSD) {
                  const price = parseFloat(withdraw.amountUSD);
                  withdrawData.amountUSD = price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });
                }
                if (withdraw?.hash) {
                  withdrawData.hash = withdraw.hash;
                }
                if (withdraw?.blockNumber) {
                  withdrawData.blockNumber = withdraw.blockNumber;
                }
              } catch (err) {
                console.warn(`Error processing withdraw fields:`, err);
              }

              return withdrawData;
            });

            return { name: subgraph.name, tokens, withdraws, deposits };
          } catch (err) {
            console.error(`Error fetching data for ${subgraph.name}:`, err);
            return {
              name: subgraph.name,
              tokens: [],
              withdraws: [],
              deposits: [],
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
        <button
          onClick={() => handleTabClick("tokens")}
          className={activeTab === "tokens" ? "clicked" : ""}
        >
          Tokens
        </button>
        <button
          onClick={() => handleTabClick("deposits")}
          className={activeTab === "deposits" ? "clicked" : ""}
        >
          Deposits
        </button>
        <button
          onClick={() => handleTabClick("withdraws")}
          className={activeTab === "withdraws" ? "clicked" : ""}
        >
          Withdraws
        </button>
      </div>

      {/* Display Tokens only */}
      {activeTab === "tokens" && <TokenList data={data} />}
      {activeTab === "withdraws" && <WithdrawList data={data} />}
      {activeTab === "deposits" && <DepositList data={data} />}
      {/* {activeTab === "swaps" && <SwapList data={data} />} */}
    </div>
  );
};

export default AppMany;
