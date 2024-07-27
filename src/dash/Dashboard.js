import React, { useEffect, useState } from 'react';
import { listenToUserData } from '../firebaseFunctions'; // Import the function to listen for data
import './Dashboard.css'; // Adjust the path as needed

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

  const totalUsers = userData ? Object.keys(userData).length : 0;

  return (
    <div>
      <h1>User Data</h1>
      {userData ? (
        <>
          <p>Total Users: {totalUsers}</p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>UserID</th>
                <th>Profit per Hour</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(userData).map((userId, index) => (
                <tr key={userId}>
                  <td>{index + 1}</td>
                  <td>{userId}</td>
                  <td>{userData[userId].autoIncrement * 3600}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
