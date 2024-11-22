export default async function Home() {
  return (
    <div className="px-32 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-10">
        {/* col-1 (System Requirements) */}
        <div className="bg-blue-200/80 p-6 rounded-lg col-span-2 row-span-2 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          {/* Header */}
          <div className="text-2xl font-semibold text-gray-800">
            <h1>System Requirements</h1>
            <p className="text-sm text-gray-500 ml-1 mt-1">
              Make sure your computer can run this game:
            </p>
          </div>
          {/* Content */}
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Minimum */}
              <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out">
                <h2 className="text-xl font-semibold text-gray-800">Minimum</h2>
                <ul className="text-gray-600">
                  <li>OS: Windows 7</li>
                  <li>Processor: Intel Core 2 Duo</li>
                  <li>Memory: 4 GB RAM</li>
                  <li>Graphics: NVIDIA GeForce 8600</li>
                  <li>DirectX: Version 9.0</li>
                  <li>Network: Broadband Internet connection</li>
                  <li>Storage: 10 GB available space</li>
                </ul>
              </div>

              {/* Recommended */}
              <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out">
                <h2 className="text-xl font-semibold text-gray-800">
                  Recommended
                </h2>
                <ul className="text-gray-600">
                  <li>OS: Windows 10</li>
                  <li>Processor: Intel Core i5</li>
                  <li>Memory: 8 GB RAM</li>
                  <li>Graphics: NVIDIA GeForce GTX 1060</li>
                  <li>DirectX: Version 11</li>
                  <li>Network: Broadband Internet connection</li>
                  <li>Storage: 10 GB available space</li>
                </ul>
              </div>
            </div>

            {/* Note */}
            <div className="bg-white p-4 rounded-lg shadow-lg mt-4 hover:shadow-xl transition-shadow duration-200 ease-in-out">
              <h2 className="text-xl font-semibold text-gray-800">Note</h2>
              <p className="text-gray-600">
                This game is not supported on Mac OS, Linux, or any other
                operating systems.
              </p>
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
