const calculateTimeLeft = ({ createdDate }: { createdDate: string }): string => {
  const endDate = new Date(createdDate);
  const now = new Date();
  const difference = endDate.getTime() - now.getTime();

  if (difference > 0) {
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    return `${hours}h ${minutes}m left`
  } else {
    return `TimeUp`
  }
};

export const calculateAuctionTimeLeft = (startTime: string, endTime: string): string => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const now = new Date();

  if (now < start) {
    return "Not started";
  }

  const difference = end.getTime() - now.getTime();

  console.log("Difference in milliseconds:", difference, start, end, now);

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    return `${days > 0 ? `${days}d ` : ""}${hours}h ${minutes}m left`;
  } else {
    return "Time Up";
  }
};
export function timeAgo(date: string | number | Date): string {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: [number, string][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.34524, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];

  let unitIndex = 0;
  let count = seconds;

  for (let i = 0; i < intervals.length - 1; i++) {
    if (count < intervals[i][0]) break;
    count /= intervals[i][0];
    unitIndex = i + 1;
  }

  const unit = intervals[unitIndex][1];
  const rounded = Math.floor(count);

  if (rounded === 0) return "just now";
  return `${rounded} ${unit}${rounded !== 1 ? "s" : ""} ago`;
}