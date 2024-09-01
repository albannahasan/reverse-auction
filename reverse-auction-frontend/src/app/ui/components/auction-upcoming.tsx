import CountdownTimer from "./countdown_timer";

const AuctionUpcoming = ({ time }) => {
    return (
      <div>
        <h1 className="font-semibold">Auction is starting in: </h1>
        <ul>
          <CountdownTimer time={time}/>
        </ul>
      </div>
    );
  };

  export default AuctionUpcoming;
