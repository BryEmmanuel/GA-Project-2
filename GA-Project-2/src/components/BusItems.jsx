import React from "react";
import SearchPage from "./SearchPage";

const BusItems = (props) => {
  return (
    <>
      bus
      <SearchPage
        getBusArrivalTime={props.getBusArrivalTime}
        busArrival={props.busArrival}
      />
    </>
  );
};

export default BusItems;
