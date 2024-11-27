import React from "react";

const DepositList = ({ data }) => {
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
              {subgraph.deposits.map((deposit, index) => (
                <tr key={index}>
                  <td>{deposit.amountUSD}</td>
                  <td>{deposit.id}</td>
                  <td>{deposit.blockNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default DepositList;
