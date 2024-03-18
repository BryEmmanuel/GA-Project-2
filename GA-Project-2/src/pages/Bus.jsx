import React from "react";
import BusItems from "../components/BusItems";

const Bus = (props) => {
  return (
    <BusItems
      getBusArrivalTime={props.getBusArrivalTime}
      busArrival={props.busArrival}
      addFavourite={props.addFavourite}
      busCodeRef={props.busCodeRef}
      isModalOpen={props.isModalOpen}
      openModal={props.openModal}
      closeModal={props.closeModal}
    ></BusItems>
  );
};

export default Bus;
