import React, { useEffect, useRef } from "react";

const SearchPage = (props) => {
  useEffect(() => {
    console.log(props.busCodeRef.current.value);
    console.log(props.busCode);
  }, []);
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex">
          <input
            type="text"
            placeholder="Bus Stop Code"
            ref={props.busCodeRef}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <br />
        <div className="flex">
          <button
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            onClick={() => {
              props.getBusArrivalTime(props.busCodeRef.current.value);
            }}
          >
            Search
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <>
        {props.busArrival.services && (
          <>
            <div className="table w-full">
              <div className="table-header-group">
                <div className="table-row">
                  <div className="table-cell text-center font-bold">
                    Service No.
                  </div>
                  <div className="table-cell text-center font-bold">
                    Next Bus
                  </div>
                  <div className="table-cell text-center font-bold">
                    Subsequent Bus
                  </div>
                </div>
              </div>

              {props.busArrival.services
                .sort((a, b) => a.no - b.no) // sort in ascending order
                .map((service, index) => (
                  <div className="table-row-group" key={index}>
                    <div className="table-row">
                      <div className="table-cell text-center">{service.no}</div>
                      <div className="table-cell text-center">
                        {Math.floor(service.next.duration_ms / 1000 / 60) <
                        1 ? (
                          <p className="text-green-400">Arriving</p>
                        ) : Math.floor(service.next.duration_ms / 1000 / 60) <=
                          9 ? (
                          <p className="text-yellow-400">
                            {Math.floor(service.next.duration_ms / 1000 / 60) +
                              " mins"}
                          </p>
                        ) : (
                          <p className="text-red-400">
                            {Math.floor(service.next.duration_ms / 1000 / 60) +
                              " mins"}
                          </p>
                        )}
                      </div>
                      <div className="table-cell text-center">
                        {Math.floor(
                          service.subsequent.duration_ms / 1000 / 60
                        ) < 1 ? (
                          <p className="text-green-400">Arriving</p>
                        ) : Math.floor(
                            service.subsequent.duration_ms / 1000 / 60
                          ) <= 9 ? (
                          <p className="text-yellow-400">
                            {Math.floor(
                              service.subsequent.duration_ms / 1000 / 60
                            ) + " mins"}
                          </p>
                        ) : (
                          <p className="text-red-400">
                            {Math.floor(
                              service.subsequent.duration_ms / 1000 / 60
                            ) + " mins"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => props.addFavourite(props.busCodeRef.current.value)}
            className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            Add to Favourites
          </button>
        </div>
      </>
    </div>
  );
};

export default SearchPage;
