import React from "react";
import FavList from "../components/FavList";

const Faves = (props) => {
  return (
    <FavList
      busCode={props.busCode}
      isModalOpen={props.isModalOpen}
      openModal={props.openModal}
      closeModal={props.closeModal}
    ></FavList>
  );
};

export default Faves;
