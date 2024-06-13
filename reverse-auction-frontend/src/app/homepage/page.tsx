import Homecard from '../ui/components/HomeCard';

export default function Homepage() {

  const product = {
    name: 'Amazing Product',
    description: 'This is an amazing product you will love.',
    startingPrice: 100,
    highestBid: 150,
    image: '/path-to-image.jpg',
  };

  
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-center mb-4">Popular Items</h1>
        <div className="mb-4">
          <Homecard />
        </div>
        <h2 className="text-center">Latest Live Listing</h2>
      </div>
    )

  }