import React, { useRef } from "react";

const SearchPage = (props) => {
  //Test
  const busCodeRef = useRef();

  return (
    <div>
      <input type="text" placeholder="Bus Stop Code" ref={busCodeRef} />
      <button
        onClick={() => {
          props.getBusArrivalTime(busCodeRef.current.value);
        }}
      >
        Get Bus Arrival times
      </button>
      <div>
        {props.busArrival.services &&
          props.busArrival.services.map((service, index) => (
            <div key={index}>
              Service No: {service.no}
              <br />
              Next Bus: {Math.floor(service.next.duration_ms / 1000 / 60)}
              <br />
              Subsequent Bus:
              {Math.floor(service.subsequent.duration_ms / 1000 / 60)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
