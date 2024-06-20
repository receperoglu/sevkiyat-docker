import React from "react";
import Download from "./Download";
import ListImage from "./ListImage";
import { useSevk } from "../../store/context"; // Import the useSevk hook
import moment from "moment";

export default function ListViewBody() {
  const { state } = useSevk(); // Use the useSevk hook to get state
  const { Files } = state; // Destructure Files from the state

  return (
    Files.map((File) => (
      <div key={File.Id} className="ms-DetailsRow">
        <div className="flex_half">
          <ListImage key={File.Id} File={File} />
        </div>
        <div className="flex_fold">
          <span className="flex1">{File.FileName}</span>
        </div>
        <div className="flex1">{moment(File.CreatedDate).format('d.mm.yy hh:mm')}</div>
        <div className="flex_half text-center">
          <Download key={File.Id} File={File} />
        </div>
      </div>
    ))
  );
}