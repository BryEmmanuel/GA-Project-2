import React, { Suspense, useState } from "react";
import SearchPage from "./components/SearchPage";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Faves from "./pages/Faves";
import NotFound from "./pages/NotFound";
import BusItems from "./components/BusItems";

function App() {
  // to get bus stops data with ID and ADDRESS
  // YAAAAAH
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
              <BusItems
                getBusArrivalTime={getBusArrivalTime}
                busArrival={busArrival}
              />
            }
          />
          <Route path="favourites" element={<Faves />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
