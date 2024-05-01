// Function to check if the notification is within 5 minutes from now
const isWithin5Minutes = (timestamp) => {
  const notificationTime = new Date(timestamp);
  const currentTime = new Date();
  const diffInMilliseconds = currentTime - notificationTime;
  const diffInMinutes = diffInMilliseconds / (1000 * 60);
  return diffInMinutes <= 5;
};

export default isWithin5Minutes