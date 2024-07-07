export default function BidTable() {
    return (
      <div className="p-10 m-5 w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow flex-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-black">Bidder</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-black">Bid Amount</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-black">Bid Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200 text-black flex-auto text-center">John Doe</td>
                <td className="py-2 px-4 border-b border-gray-200 text-black text-center">$100</td>
                <td className="py-2 px-4 border-b border-gray-200 text-black text-center">10:00 AM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }