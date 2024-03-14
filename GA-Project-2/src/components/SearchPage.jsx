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
          />
        </div>
        <br />
        <div className="flex">
          <button
            className="bg-sky-500 hover:bg-sky-700 rounded-full"
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
        <button
          type="button"
          onClick={() => props.addFavourite(props.busCodeRef.current.value)}
        >
          Add to Favourites
        </button>
      </>
    </div>
  );
};

export default SearchPage;
