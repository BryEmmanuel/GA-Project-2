import React, { useState } from "react";
import SearchPage from "./components/SearchPage";

function App() {
  // to get bus stops data with ID and ADDRESS
  const [busStops, setBusStops] = useState([]);

  const getBusStopsData = async () => {
    try {
      const res = await fetch("https://data.busrouter.sg/v1/stops.min.json");
      if (res.ok) {
        const data = await res.json();
        console.log(data);
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

  const [busArrival, setBusArrival] = useState([]);

  const getBusArrivalTime = async (buscodeID) => {
    try {
      const res = await fetch(
        `https://arrivelah2.busrouter.sg/?id=${buscodeID}`
      );
      if (res.ok) {
        const data = await res.json();
        setBusArrival(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <div>
        <SearchPage
          getBusArrivalTime={getBusArrivalTime}
          busArrival={busArrival}
        />
      </div>
    </>
  );
}

export default App;
