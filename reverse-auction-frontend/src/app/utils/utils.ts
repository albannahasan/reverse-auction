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