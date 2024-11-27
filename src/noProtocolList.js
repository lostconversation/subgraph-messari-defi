const ProtocolList = ({ data }) => {
  return (
    <div className="lists-container">
      {data.map((subgraph) => (
        <div key={subgraph.name} className="table-container">
          <h3>{subgraph.name}</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>TVL (USD)</th>
              </tr>
            </thead>
            <tbody>
              {subgraph.protocols.map((protocol, index) => (
                <tr key={index}>
                  <td>{protocol.name}</td>
                  <td>{protocol.totalValueLockedUSD}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ProtocolList;
