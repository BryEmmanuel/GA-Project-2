import React from "react";
import FavList from "../components/FavList";

const Faves = (props) => {
  return (
    <FavList favourite={props.favourite} busCode={props.busCode}></FavList>
  );
};

export default Faves;
