import React from "react";

const SwapList = ({ data }) => {
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
                  <th>Amount</th>
                  <th>Sold</th>
                  <th>Bought</th>
                  <th>Token</th>
                  <th>Gas</th>
                </tr>
              </thead>
              <tbody>
                {/* Iterate over each lending record in the current subgraph */}
                {subgraphData.swaps.map((swap, idx) => (
                  <tr key={idx}>
                    <td>{swap.amountOutUSD}</td>
                    <td>{swap.tokenIn.symbol}</td>
                    <td>{swap.tokenOut.symbol}</td>
                    <td>{swap.name}</td>
                    <td>{swap.gasPrice}</td>
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

export default SwapList;
