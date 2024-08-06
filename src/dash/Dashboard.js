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

  // Calculate total profit per hour and divide by 18000
  const totalProfitPerHour = userData
    ? Math.floor(
        Object.keys(userData)
          .filter(userId => (userData[userId].inviteCount || 0) >= 3)
          .reduce((total, userId) => {
            return total + (userData[userId].autoIncrement || 0) * 3600;
          }, 0) / 18000
      )
    : 0;

  // Sort user data by profit per hour in descending order
  const sortedUserData = userData
    ? Object.keys(userData).sort((a, b) => {
        const profitA = (userData[a].autoIncrement || 0) * 3600;
        const profitB = (userData[b].autoIncrement || 0) * 3600;
        return profitB - profitA;
      })
    : [];

  return (
    <div className="dashboard-layout">
      <h1>User Data</h1>
      {userData ? (
        <>
          <div className="summary">
            <p className="total-users">Total Users: {totalUsers}</p>
            <p className="total-profit">Total Coin: {totalProfitPerHour.toFixed(2)}</p>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>UserID</th>
                  <th>Profit per Hour</th>
                  <th>Invite Count</th>
                </tr>
              </thead>
              <tbody>
                {sortedUserData.map((userId, index) => (
                  <tr key={userId}>
                    <td data-label="#">{index + 1}</td>
                    <td data-label="UserID">{userId}</td>
                    <td data-label="Profit per Hour">{Math.floor((userData[userId].autoIncrement || 0) * 3600)}</td>
                    <td data-label="Invite Count">{userData[userId].inviteCount || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
