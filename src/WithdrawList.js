import React from "react";

const WithdrawList = ({ data }) => {
  return (
    <div className="lists-container">
      {data.map((subgraph) => (
        <div key={subgraph.name} className="table-container">
          <h3>{subgraph.name}</h3>
          <table>
            <thead>
              <tr>
                <th>Amount $</th>
                <th>ID</th>
                <th>Block</th>
              </tr>
            </thead>
            <tbody>
              {subgraph.withdraws.map((withdraw, index) => (
                <tr key={index}>
                  <td>{withdraw.amountUSD}</td>
                  <td>{withdraw.hash}</td>
                  <td>{withdraw.blockNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default WithdrawList;
