import React from "react";
import { useSevk } from "../../store/context"; // Import the useSevk hook
import { ico } from "./../../components/Tools/Urls";

export default function ListImage({ File }) {
  const { dispatch } = useSevk(); // Use the useSevk hook to get dispatch

  const showPreview = (File, type) => {
    dispatch({
      type: "show" + type + "Preview",
      payload: File,
    });
  };

  return (
    <img
      className="FileTypeIcon-icon"
      alt=""
      onClick={() => showPreview(File, File.Type)}
      src={
        File.Type === "Picture"
          ? `${ico}/photo.png`
          : `${ico + File.ext}.png`
      }
    />
  );
}