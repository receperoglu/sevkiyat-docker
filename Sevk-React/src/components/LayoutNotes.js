import React from "react";
import LayoutHead from "./Layout/LayoutHead";
import { useSevk } from "../store/context"; // Import the useSevk hook
import BlueButton from "./Tools/BlueButton";
import ProgressBar from "./Tools/ProgressBar";
import { useNotes } from "../store/NoteContext";

export default function LayoutNotes() {
  const { dispatch, state } = useSevk();
  const { Loading, ShowLayoutNote } = state

  const { NotesDispatch, NotesState, SaveNotes } = useNotes();
  const { ArticelNotes } = NotesState;

  const UpdateArticelNote = (e) => {
    NotesDispatch({ type: "setNotes", payload: e.target.value });
  };

  const toggleNote = () => {
    dispatch({
      type: "toggleNote",
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