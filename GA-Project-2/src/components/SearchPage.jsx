import React, { useRef } from "react";

const SearchPage = (props) => {
  const busCodeRef = useRef();

  return (
    <div>
      <input type="text" placeholder="Bus Stop Code" ref={busCodeRef} />
      <button
        onClick={() => {
          props.getBusArrivalTime(busCodeRef.current.value);
        }}
      >
        Get Bus Arrival times
      </button>
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
                        ) : Math.floor(service.next.duration_ms / 1000 / 60) <
                          20 ? (
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
      </>
    </div>
  );
};

export default SearchPage;
