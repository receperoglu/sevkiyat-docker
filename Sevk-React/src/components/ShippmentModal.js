import React from "react";
import BlueButton from "./Tools/BlueButton";
import CancelBtn from "./Tools/CancelBtn";
import { useSevk } from "../store/context"; // Import the useSevk hook
import ProgressBar from "./Tools/ProgressBar";

export default function ShippmentModal() {
  const { dispatch, state } = useSevk(); // Use the useSevk hook to get context values
  const { ShowShippmentModal, Loading } = state;

  const toggleOut = () => dispatch({ type: "toggleShippment", payload: false });
  const saveWayBill = () => dispatch({ type: "saveWayBill" });

  return ShowShippmentModal ? (
    <div className="ms-Layer animate ms-Layer--fixed effect layer-351">
      <div className="root-345">
        <div className="ms-Dialog-main main-412">
          <CancelBtn click={toggleOut} />
          <div>
            <h4>İrsaliye</h4>
            <ProgressBar isVisible={Loading} />
            <input type="file" id="FileWayBill" />
          </div>
          <div className="padd0 text-center">
            <div>
              {!Loading && (
                <BlueButton click={() => saveWayBill()} text="Kaydet" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}