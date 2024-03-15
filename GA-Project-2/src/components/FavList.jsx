import React, { useState, useEffect } from "react";

const FavList = (props) => {
  const [faveList, setFaveList] = useState([]);

  useEffect(() => {
    const getFaveList = async () => {
      try {
        const url =
          "https://api.airtable.com/v0/app19paAgzC7Y35B7/Table%201?maxRecords=50&view=Grid%20view";

        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APIKEY}`,
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setFaveList(data.records);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error.message);
        }
      }
    };

    getFaveList();
  }, []);

  return (
    <>
      <div>
        {props.favorites?.map((busCode, index) => (
          <div key={index}>{busCode}</div>
        ))}
      </div>
      <div>
        {faveList?.map((item) => (
          <div key={item.id}>{item.fields.Bus_Code}</div>
        ))}
      </div>
    </>
  );
};

export default FavList;
