import React from "react";
import { useSevk } from "../../store/context"; // Import the useSevk hook

export default function CreateOption({ Json, val, name }) {
  const { dispatch } = useSevk(); // Use the useSevk hook to get the dispatch function

  const SelectChange = (e) => {
    dispatch({ type: "Change" + e.target.name, payload: e.target.value });
  };

  return (
    <select
      className="ms-TextField-field"
      name={name}
      value={val}
      onChange={SelectChange}
    >
      {Json.map((p) => (
        <option key={p.id} value={p.id}>
          {p.Name}
        </option>
      ))}
    </select>
  );
}