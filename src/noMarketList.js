import React from "react";

const MarketList = ({ data }) => {
  // Check if data is available
  if (!data || data.length === 0) {
    return <p>No lending data available.</p>;
  }

  return (
    <div>
      {data.map((subgraphData, index) => (
        <div key={index}>
          <h2>{subgraphData.name}</h2>
          <div className="tableFrame">
            <table>
              <thead>
                <tr>
                  <th>Borrow</th>
                  <th>Deposit</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {/* Iterate over each lending record in the current subgraph */}
                {subgraphData.markets.map((market, idx) => (
                  <tr key={idx}>
                    <td>{market.cumulativeBorrowUSD}</td>
                    <td>{market.cumulativeDepositUSD}</td>
                    <td>{market.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketList;
