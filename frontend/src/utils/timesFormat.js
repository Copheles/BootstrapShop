const changeTimeFormat = (timestamp) => {
  const dateObject = new Date(timestamp);

  // Extract date components
  const year = dateObject.getFullYear();
  const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObject.getDate()).slice(-2);
  let hours = dateObject.getHours();
  const minutes = ("0" + dateObject.getMinutes()).slice(-2);
  const seconds = ("0" + dateObject.getSeconds()).slice(-2);

  // Convert to 12-hour format and determine AM/PM
  const period = hours >= 12 ? "pm" : "am";
  if (hours > 12) {
    hours -= 12;
  }

  // Format the date and time string
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${("0" + hours).slice(
    -2
  )}:${minutes}:${seconds} ${period}`;

  // Combine date and time
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return formattedDateTime;
};

export { changeTimeFormat };
