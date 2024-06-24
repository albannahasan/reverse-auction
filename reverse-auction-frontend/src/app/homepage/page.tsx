import Homecard from '../ui/components/HomeCard';
import CardColumn from '../ui/components/HomePageCardColumn';

export default function Homepage() {

  const product = {
    name: 'Amazing Product',
    description: 'This is an amazing product you will love.',
    startingPrice: 100,
    highestBid: 150,
    image: '/path-to-image.jpg',
  };

  
    return (
      <div className="flex flex-col items-center py-6 my-6">
        <h1 className="text-center mb-4">Popular Items</h1>
        <div className="mb-4">
          <Homecard />
        </div>
        <h2 className="text-center mt-4 mb-4">Latest Live Listing</h2>
        <CardColumn />
      </div>
    )

  }