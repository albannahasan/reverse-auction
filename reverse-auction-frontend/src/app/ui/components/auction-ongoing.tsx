import CountdownTimer from "./countdown_timer";

const AuctionOngoing = ({ time }) => {
    return (
      <div>
        <h3 className="font-semibold mb-1">Time Remaining:</h3>
        <ul>
          <CountdownTimer time={time}/>
        </ul>
      </div>
    );
  };

  export default AuctionOngoing;
