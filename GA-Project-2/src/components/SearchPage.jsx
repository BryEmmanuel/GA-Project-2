import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

const SearchPage = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [busCode, setBusCode] = useState(""); // State to hold the bus stop code
  const [invalidBusCode, setInvalidBusCode] = useState(""); // State to hold invalid bus stop code

  const [busStops, setBusStops] = useState([]); // State to hold bus stop data

  // to get data of bus stops, specfically the bus stop ID for form validation

  const getBusStopsData = async () => {
    try {
      const res = await fetch("https://data.busrouter.sg/v1/stops.min.json");
      if (res.ok) {
        const data = await res.json();
        // data is a giant KVP of BusCode : ARRAY [long , lat , start , end]
        console.log(data);
        // for...in iterates through the KVP and returns individual objects based on the params I set
        const formattedData = [];
        for (const key in data) {
          const busStop = {
            ID: key,
            Name: data[key][2],
            Long: data[key][0],
            Lat: data[key][1],
          };
          formattedData.push(busStop);
        }
        console.log(formattedData);
        setBusStops(formattedData);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  // map through busStop and for each 'bus stop' return the ID and store in the new array
  const validBusStopCodes = busStops.map((busStop) => busStop.ID);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setBusCode(value);

    // validation to check if the input contains a valid bus stop code
    // trim checks if the input form is empty or contains spaces, ! negates that and returns true
    if (!value.trim()) {
      setInvalidBusCode("Bus stop code is required.");
    } else if (value.length !== 5) {
      // Check if the input is exactly 5 digits long
      setInvalidBusCode("Bus stop code must be 5 digits.");
    } else if (!validBusStopCodes.includes(value)) {
      // Check with the bus stop code data to see if it matches any of the valid bus stop codes
      setInvalidBusCode("Invalid Bus Stop Code");
    } else {
      setInvalidBusCode("");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    console.log(props.busCodeRef.current.value);
    console.log(props.busCode);
    getBusStopsData();
  }, []);
  return (
    <div>
      <br />
      <div className="flex justify-center">
        <div className="flex">
          <input
            type="text"
            placeholder="Bus Stop Code"
            value={busCode}
            onChange={handleInputChange}
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
      {invalidBusCode && (
        <p className="text-red-500 text-s text-center">{invalidBusCode}</p>
      )}
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

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  props.addFavourite(props.busCodeRef.current.value);
                  openModal();
                }}
                className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                Add to Favourites
              </button>
              <div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                  <h2 className="text-center">Added to favourites!</h2>
                </Modal>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default SearchPage;
