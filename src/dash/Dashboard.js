import React, { useEffect, useState } from 'react';
import { listenToUserData } from '../firebaseFunctions'; // Import the function to listen for data

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = listenToUserData((data) => {
      setUserData(data); // Update state with the received data
    });

    // Cleanup function to unsubscribe if the component unmounts
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div>
      <h1>User Data</h1>
      {userData ? (
        <ol>
          {Object.keys(userData).map((userId) => (
            <li key={userId}>
              UserID: {userId}, Profit per Hour: {userData[userId].autoIncrement * 3600}
            </li>
          ))}
        </ol>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
