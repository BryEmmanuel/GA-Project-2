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
        isModalOpen={props.isModalOpen}
        openModal={props.openModal}
        closeModal={props.closeModal}
      />
    </>
  );
};

export default BusItems;
