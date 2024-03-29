import React, { Suspense, useRef, useState } from "react";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Faves from "./pages/Faves";
import NotFound from "./pages/NotFound";
import Bus from "./pages/Bus";

function App() {
  // lifting state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const busCodeRef = useRef();

  // fetch data for bus arrival timings based on bus code
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

  const addFavourite = async (busCode) => {
    if (!busCode) {
      console.error("Bus code is undefined or empty.");
      return;
    }

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
                isModalOpen={isModalOpen}
                openModal={openModal}
                closeModal={closeModal}
              />
            }
          />
          <Route
            path="favourites"
            element={
              <Faves
                isModalOpen={isModalOpen}
                openModal={openModal}
                closeModal={closeModal}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
