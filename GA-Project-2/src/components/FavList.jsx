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
      <div className="flex justify-center">
        <table className="table-auto w-full shadow-lg bg-white border-collapse">
          <thead>
            <tr>
              <th className="bg-blue-100 border text-left px-8 py-4 text-xl">
                Favourites
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {faveList.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border px-8 py-4">{item.fields.Bus_Code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FavList;
