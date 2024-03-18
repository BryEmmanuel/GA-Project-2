import React from "react";
import FavList from "../components/FavList";

const Faves = (props) => {
  return <FavList busCode={props.busCode}></FavList>;
};

export default Faves;
