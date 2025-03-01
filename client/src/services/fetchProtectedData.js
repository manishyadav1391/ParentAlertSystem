import React, { useState } from 'react';
import fetchProtectedData from '../services/fetchProtectedData'; // Make sure to export this function from its file

const ProtectedButton = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    try {
      const response = await fetchProtectedData();
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <button onClick={handleFetchData}>Fetch Protected Data</button>
      {error && <div>Error: {error.message}</div>}
      {data && <div>Data: {JSON.stringify(data, null, 2)}</div>}
    </div>
  );
};

export default ProtectedButton;
