export const formatDate = (isoDateString: string): string => {
  // Create a Date object from the ISO string
  const date = new Date(isoDateString);

  // Format the date in the desired style
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC", // Keep the time in UTC
  })
    .format(date)
    .replace(",", ""); // Remove any comma if present

  return formattedDate;
};


export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  
  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (years > 0) {
      return years === 1 ? '1 year ago' : `${years} years ago`;
  } else if (months > 0) {
      return months === 1 ? '1 month ago' : `${months} months ago`;
  } else if (weeks > 0) {
      return weeks === 1 ? 'last week' : `${weeks} weeks ago`;
  } else if (days > 0) {
      return days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (hours > 0) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (minutes > 0) {
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  } else {
      return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
  }
}