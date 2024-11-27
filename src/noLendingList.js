import React from "react";

const LendingList = ({ data }) => {
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
                  <th>Amount USD</th>
                  <th>Lending ID</th>
                  <th>Account ID</th>
                </tr>
              </thead>
              <tbody>
                {/* Iterate over each lending record in the current subgraph */}
                {subgraphData.lendings.map((lending, idx) => (
                  <tr key={idx}>
                    <td>{lending.amountUSD}</td>
                    <td>{lending.id}</td>
                    <td>{lending.accountID}</td>
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

export default LendingList;
