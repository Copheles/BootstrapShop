function timeAgo(timestamp) {
  const currentDate = new Date();
  const providedDate = new Date(timestamp);

  const seconds = Math.floor((currentDate - providedDate) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return seconds + "s ago";
  } else if (minutes < 60) {
    return minutes + "m ago";
  } else if (hours < 24) {
    return hours + "hr ago";
  } else {
    return days + "d ago";
  }
}

export default timeAgo;