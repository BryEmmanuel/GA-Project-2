import React from "react";
import BusItems from "../components/BusItems";

const Bus = (props) => {
  return (
    <BusItems
      getBusArrivalTime={props.getBusArrivalTime}
      busArrival={props.busArrival}
      addFavourite={props.addFavourite}
      busCodeRef={props.busCodeRef}
    ></BusItems>
  );
};

export default Bus;
