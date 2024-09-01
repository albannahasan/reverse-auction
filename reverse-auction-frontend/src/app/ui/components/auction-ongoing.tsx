import CountdownTimer from "./countdown_timer";

const AuctionOngoing = ({ time }) => {
    return (
      <div>
        <h1 className="font-semibold mb-1">Auction ends in:</h1>
        <ul>
          <CountdownTimer time={time}/>
        </ul>
      </div>
    );
  };

  export default AuctionOngoing;
