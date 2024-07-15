import { db } from './firebase'; // Assuming this is where your Firebase configuration is imported

const listenToUserData = (callback) => {
  // Reference to the root of your database where users' data is stored
  const usersRef = db.ref('users');

  // Attach a listener to watch for changes in users' data
  const listener = usersRef.on('value', (snapshot) => {
    const userData = snapshot.val(); // Retrieve the entire users node
    callback(userData); // Pass the data to your callback function
  });

  // Return a function to unsubscribe the listener
  return () => {
    usersRef.off('value', listener);
  };
};

export { listenToUserData };
