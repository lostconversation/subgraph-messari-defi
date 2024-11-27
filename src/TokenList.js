import React from "react";

const TokenList = ({ data }) => {
  return (
    <div className="lists-container">
      {data.map((subgraph) => (
        <div key={subgraph.name} className="table-container">
          <h3>{subgraph.name}</h3>
          <table>
            <thead>
              <tr>
                <th>Price $</th>
                <th>Symbol</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {subgraph.tokens.map((token, index) => (
                <tr key={index}>
                  <td>{token.lastPriceUSD}</td>
                  <td>{token.symbol}</td>
                  <td>{token.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default TokenList;
