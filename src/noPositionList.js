import React from "react";

const PositionList = ({ data }) => {
  return (
    <div className="lists-container">
      {data.map((subgraph) => (
        <div key={subgraph.name} className="table-container">
          <h3>{subgraph.name}</h3>
          <table>
            <thead>
              <tr>
                <th>Balance (USD)</th>
                <th>Index</th>
              </tr>
            </thead>
            <tbody>
              {subgraph.positions.map((position, index) => (
                <tr key={index}>
                  <td>{position.balanceUSD}</td>
                  <td>{position.index}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PositionList;
