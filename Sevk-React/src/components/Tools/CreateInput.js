import React from "react";
import { useSevk } from "../../store/context";

const CreateInput = ({ val, name, type, placeholder, style, process, orderId }) => {
  const { dispatch } = useSevk();

  const InputChange = (e) => {
    const { name, value } = e.target;
    if (process === "productOut") {
      dispatch({
        type: "handleOut",
        payload: {
          name,
          value,
          id: orderId,
        },
      });
    } else {
      dispatch({
        type: "Change" + name,
        payload: value,
      });
    }
  };

  return (
    <input
      type={type || "text"}
      name={name}
      defaultValue={val}
      onChange={InputChange}
      className="ms-TextField-field"
      placeholder={placeholder}
      style={style}
    />
  );
};

export default CreateInput;