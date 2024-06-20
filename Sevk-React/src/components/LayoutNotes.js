import React from "react";
import LayoutHead from "./Layout/LayoutHead";
import { useSevk } from "../store/context"; // Import the useSevk hook
import BlueButton from "./Tools/BlueButton";
import ProgressBar from "./Tools/ProgressBar";

export default function LayoutNotes() {
  const { dispatch, state } = useSevk(); // Use the useSevk hook to get context values
  const { Loading, ShowLayoutNote, ArticelNotes, } = state

  const UpdateArticelNote = (e) => {
    dispatch({ type: "UpdateArticelNote", payload: e.target.value });
  };

  const toggleNote = () => {
    dispatch({
      type: "toggleNote",
      payload: false,
    });
  };

  const SaveNotes = () => {
    dispatch({
      type: "SaveNotes",
      payload: false,
    });
  };

  return ShowLayoutNote ? (
    <div className="ms-Layer animate ms-Layer--fixed effect layer-351">
      <div className="effect RightLayout">
        <LayoutHead click={toggleNote} text="Notlar" />

        <textarea
          onChange={UpdateArticelNote}
          className="NotesArea ms-TextField-field"
          defaultValue={ArticelNotes}
        ></textarea>

        <ProgressBar isVisible={Loading} />
        {!Loading && <BlueButton text="Güncelle" click={SaveNotes} />}
      </div>
    </div>
  ) : null;
}