import React, { useRef } from "react";

const SearchPage = (props) => {
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
            <div className="table w-full" key={index}>
              <div className="table-header-group">
                <div className="table-row">
                  <div className="table-cell text-left">Service No.</div>
                  <div className="table-cell text-left">Next Bus</div>
                  <div className="table-cell text-left">Subsequent Bus</div>
                </div>
              </div>
              <div className="table-row-group">
                <div className="table-row">
                  <div className="table cell">{service.no}</div>
                  <div className="table cell">
                    {Math.floor(service.next.duration_ms / 1000 / 60)}
                  </div>
                  <div className="table cell">
                    {Math.floor(service.subsequent.duration_ms / 1000 / 60)}
                  </div>
                </div>
              </div>
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
