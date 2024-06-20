import React from "react";
import CancelBtn from "../Tools/CancelBtn";
import { useSevk } from "../../store/context"; // Import the useSevk hook
import { Url, DocUrl } from "./../Tools/Urls";

export default function DocumentPreview() {
  const { state, dispatch } = useSevk(); // Use the useSevk hook to get state and dispatch
  const { File, ShowDocumentPreview } = state; // Extract state variables

  const cancelDocument = () => {
    dispatch({
      type: "cancelDocument",
      payload: null,
    });
  };

  return ShowDocumentPreview ? (
    <div className="ma5-imgbox ">
      <div className="DocumentPreview">
        <CancelBtn click={cancelDocument} />
      </div>
      <iframe
        title="title"
        className="Iframe"
        src={
          File.ext === "pdf"
            ? Url + File.Path
            : File.ext === "txt"
              ? Url + File.Path
              : DocUrl + File.Path
        }
      />
    </div>
  ) : null;
}