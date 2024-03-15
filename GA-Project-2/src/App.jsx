import React, { Suspense, useRef, useState } from "react";
import SearchPage from "./components/SearchPage";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Faves from "./pages/Faves";
import NotFound from "./pages/NotFound";
import BusItems from "./components/BusItems";
import Bus from "./pages/Bus";

function App() {
  const [favourite, setFavourite] = useState([]);

  const busCodeRef = useRef();

  const addFavourite = async (busCode) => {
    if (!busCode) {
      console.error("Bus code is undefined or empty.");
      return;
    }
    setFavourite([...favourite, busCode]);

    const url = "https://api.airtable.com/v0/app19paAgzC7Y35B7/Table%201";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APIKEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: { Bus_Code: busCode },
        typecast: true,
      }),
    });
    if (res.ok) {
      console.log(busCodeRef.current.value);
      console.log(busCode);
      console.log("Successfully added to favourites");
    } else {
      console.log("an ERROR has occured", await res.json());
      console.log(busCodeRef.current.value);
      console.log(busCode);
    }
  };

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
      <Suspense fallback={<h1>loading...</h1>}>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route
            path="bus"
            element={
              <Bus
                getBusArrivalTime={getBusArrivalTime}
                busArrival={busArrival}
                addFavourite={addFavourite}
                busCodeRef={busCodeRef}
              />
            }
          />
          <Route path="favourites" element={<Faves favourite={favourite} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
