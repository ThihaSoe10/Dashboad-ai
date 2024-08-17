// import React, { useEffect, useState } from 'react';
// import { listenToUserData } from '../firebaseFunctions'; // Import the function to listen for data
// import './Dashboard.css'; // Adjust the path as needed

// const Dashboard = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const unsubscribe = listenToUserData((data) => {
//       setUserData(data); // Update state with the received data
//     });

//     // Cleanup function to unsubscribe if the component unmounts
//     return () => {
//       if (typeof unsubscribe === 'function') {
//         unsubscribe();
//       }
//     };
//   }, []);

//   const totalUsers = userData ? Object.keys(userData).length : 0;

//   // Calculate total profit per hour and divide by 18000
//   const totalProfitPerHour = userData
//     ? Math.floor(
//         Object.keys(userData)
//           .filter(userId => (userData[userId].inviteCount || 0) >= 3)
//           .reduce((total, userId) => {
//             return total + (userData[userId].autoIncrement || 0) * 3600;
//           }, 0) / 18000
//       )
//     : 0;

//   // Sort user data by profit per hour in descending order
//   const sortedUserData = userData
//     ? Object.keys(userData).sort((a, b) => {
//         const profitA = (userData[a].autoIncrement || 0) * 3600;
//         const profitB = (userData[b].autoIncrement || 0) * 3600;
//         return profitB - profitA;
//       })
//     : [];

//     //d4
    

//   return (
//     <div className="dashboard-layout">
//       <h1>User Data</h1>
//       {userData ? (
//         <>
//           <div className="summary">
//             <p className="total-users">Total Users: {totalUsers}</p>
//             <p className="total-profit">Total Coin: {totalProfitPerHour.toFixed(2)}</p>
//           </div>
//           <div className="table-container">
//             <table>
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>UserID</th>
//                   <th>Profit per Hour</th>
//                   <th>Invite Count</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sortedUserData.map((userId, index) => (
//                   <tr key={userId}>
//                     <td data-label="#">{index + 1}</td>
//                     <td data-label="UserID">{userId}</td>
//                     <td data-label="Profit per Hour">{Math.floor((userData[userId].autoIncrement || 0) * 3600)}</td>
//                     <td data-label="Invite Count">{userData[userId].inviteCount || 0}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { ref, onValue, getDatabase } from 'firebase/database'; // Adjust imports according to your Firebase setup
import { listenToUserData } from '../firebaseFunctions'; // Import necessary functions
import './Dashboard.css'; // Adjust the path as needed

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [totalTokens, setTotalTokens] = useState(0); // State to store tokens
  const [airdrop, setAirdrop] = useState(0); // State to store airdrop value

  useEffect(() => {
    const unsubscribe = listenToUserData((data) => {
      setUserData(data); // Update state with the received data
      calculateTotalTokens(data); // Calculate total tokens when data is received
      calculateAirdrop(data); // Calculate airdrop based on condition
    });

    // Cleanup function to unsubscribe if the component unmounts
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const calculateTotalTokens = (data) => {
    const tokens = Object.keys(data).reduce((total, userId) => {
      return total + (data[userId]?.exchanges?.tokens || 0);
    }, 0);
    setTotalTokens(tokens);
  };

  const calculateAirdrop = (data) => {
    const passingUsers = Object.keys(data).filter((userId) => {
      const userUpgrades = data[userId].upgrades || {};
      const upgradeLevels = [
        userUpgrades.autoClicker01 || 0,
        userUpgrades.autoClicker02 || 0,
        userUpgrades.autoClicker03 || 0,
        userUpgrades.autoClicker04 || 0,
        userUpgrades.autoClicker05 || 0,
        userUpgrades.autoClicker06 || 0,
        userUpgrades.autoClicker07 || 0,
        userUpgrades.autoClicker08 || 0,
        userUpgrades.autoClicker09 || 0,
        userUpgrades.autoClicker10 || 0,
        userUpgrades.refClicker01 || 0,
        userUpgrades.refClicker02 || 0,
        userUpgrades.refClicker03 || 0,
        userUpgrades.refClicker04 || 0,
        userUpgrades.refClicker05 || 0,
        userUpgrades.refClicker06 || 0,
        userUpgrades.refClicker07 || 0,
        userUpgrades.refClicker08 || 0,
        userUpgrades.refClicker09 || 0,
        userUpgrades.refClicker10 || 0,
        userUpgrades.refClicker11 || 0,
        userUpgrades.refClicker12 || 0,
      ];

      const totalValue = upgradeLevels.reduce((acc, level) => acc + (level > 4 ? 1 : 0), 0);
      return userUpgrades.clickUpgrade > 18 && totalValue > 17;
    });

    setAirdrop(passingUsers.length); // Example: 10 tokens per passing user
  };

  const totalUsers = userData ? Object.keys(userData).length : 0;

  // Calculate total profit per hour and incorporate tokens
  const totalProfitPerHour = userData
    ? Math.floor(
        Object.keys(userData)
          .filter((userId) => (userData[userId].inviteCount || 0) >= 3)
          .reduce((total, userId) => {
            const autoIncrement = (userData[userId].autoIncrement || 0) * 3600;
            const tokens = userData[userId]?.exchanges?.tokens || 0;
            return total + autoIncrement + tokens; // Include tokens in the calculation
          }, 0) / 18000
      )
    : 0;

  // Sort user data by profit per hour in descending order
  const sortedUserData = userData
    ? Object.keys(userData).sort((a, b) => {
        const profitA = (userData[a].autoIncrement || 0) * 3600 + (userData[a]?.exchanges?.tokens || 0);
        const profitB = (userData[b].autoIncrement || 0) * 3600 + (userData[b]?.exchanges?.tokens || 0);
        return profitB - profitA;
      })
    : [];

  return (
    <div className="dashboard-layout">
      <h1>Dashboard</h1>
      {userData ? (
        <>
          <div className="summary">
            <p className="total-users">Total Users: {totalUsers}</p>
            <p className="total-tokens">Total Tokens: {totalTokens}</p> {/* Display total tokens */}
            <p className="airdrop">Valid: {airdrop}</p> {/* Display airdrop value */}
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>UserID</th>
                  <th>Profit per Hour</th>
                  <th>Invite Count</th>
                  <th>Token</th> {/* Add a new column for token value */}
                  <th>Condition</th> {/* Add a new column for condition */}
                </tr>
              </thead>
              <tbody>
                {sortedUserData.map((userId, index) => {
                  const userUpgrades = userData[userId].upgrades || {};
                  const upgradeLevels = [
                    userUpgrades.autoClicker01 || 0,
                    userUpgrades.autoClicker02 || 0,
                    userUpgrades.autoClicker03 || 0,
                    userUpgrades.autoClicker04 || 0,
                    userUpgrades.autoClicker05 || 0,
                    userUpgrades.autoClicker06 || 0,
                    userUpgrades.autoClicker07 || 0,
                    userUpgrades.autoClicker08 || 0,
                    userUpgrades.autoClicker09 || 0,
                    userUpgrades.autoClicker10 || 0,
                    userUpgrades.refClicker01 || 0,
                    userUpgrades.refClicker02 || 0,
                    userUpgrades.refClicker03 || 0,
                    userUpgrades.refClicker04 || 0,
                    userUpgrades.refClicker05 || 0,
                    userUpgrades.refClicker06 || 0,
                    userUpgrades.refClicker07 || 0,
                    userUpgrades.refClicker08 || 0,
                    userUpgrades.refClicker09 || 0,
                    userUpgrades.refClicker10 || 0,
                    userUpgrades.refClicker11 || 0,
                    userUpgrades.refClicker12 || 0,
                  ];

                  const totalValue = upgradeLevels.reduce((acc, level) => acc + (level > 4 ? 1 : 0), 0);
                  const isConditionMet = userUpgrades.clickUpgrade > 18 && totalValue > 17;

                  return (
                    <React.Fragment key={userId}>
                      <tr>
                        <td data-label="#">{index + 1}</td>
                        <td data-label="UserID">{userId}</td>
                        <td data-label="Profit per Hour">
                          {Math.floor((userData[userId].autoIncrement || 0) * 3600 + (userData[userId]?.exchanges?.tokens || 0))}
                        </td>
                        <td data-label="Invite Count">{userData[userId].inviteCount || 0}</td>
                        <td data-label="Token Value">{userData[userId]?.exchanges?.tokens || 0}</td> {/* Display token value */}
                        <td data-label="Condition">{isConditionMet ? 'Pass' : 'Not Pass'}</td> {/* Display 'Pass' or 'Not Pass' */}
                      </tr>
                    </React.Fragment>
                  );
                })}
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


