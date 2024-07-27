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

  // Sort user data by profit per hour in descending order
  const sortedUserData = userData
    ? Object.keys(userData).sort((a, b) => {
        const profitA = userData[a].autoIncrement * 3600;
        const profitB = userData[b].autoIncrement * 3600;
        return profitB - profitA;
      })
    : [];

  return (
    <div className="dashboard-layout">
      <h1>User Data</h1>
      {userData ? (
        <>
          <p className="total-users">Total Users: {totalUsers}</p>
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
                    <td data-label="Profit per Hour">{userData[userId].autoIncrement * 3600}</td>
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
