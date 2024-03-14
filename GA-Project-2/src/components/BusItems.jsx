import React from "react";
import SearchPage from "./SearchPage";

const BusItems = (props) => {
  return (
    <>
      <SearchPage
        getBusArrivalTime={props.getBusArrivalTime}
        busArrival={props.busArrival}
        addFavourite={props.addFavourite}
        busCodeRef={props.busCodeRef}
      />
    </>
  );
};

export default BusItems;
