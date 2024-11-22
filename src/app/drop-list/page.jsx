export default async function Home() {
  return (
    <div className="px-32 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-10">
        {/* col-1 (System Requirements) */}
        <div className="bg-blue-200/80 p-6 rounded-lg col-span-2 row-span-2 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          {/* Header */}
          <div className="text-2xl font-semibold text-gray-800">
            <h1>Drop List</h1>
            <p className="text-sm text-gray-500 ml-1 mt-1">
              Item drop list for the game.
            </p>
          </div>
          {/* Content */}
          <div className="p-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Item</th>
                  <th className="text-left">Drop Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Item 1</td>
                  <td>50%</td>
                </tr>
                <tr>
                  <td>Item 2</td>
                  <td>25%</td>
                </tr>
                <tr>
                  <td>Item 3</td>
                  <td>15%</td>
                </tr>
                <tr>
                  <td>Item 4</td>
                  <td>10%</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out">
                    Download Drop List
                </button>
            </div>

            <div className="mt-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out">
                    View Drop List
                </button>
            </div>
          </div>
        </div>

        {/* col-2 (Download Game) */}
        <div className="bg-violet-200/80 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out col-span-1 row-span-1 h-auto">
          {/* Header */}
          <div className="text-2xl font-semibold text-gray-800">
            <h1>Download Game</h1>
            <p className="text-sm text-gray-500 ml-1 mt-1">
              Pick your desired download source:
            </p>
          </div>
          {/* Content */}
          <div className="p-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out w-full">
              Media Fire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
