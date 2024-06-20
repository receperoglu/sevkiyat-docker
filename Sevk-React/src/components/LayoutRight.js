import React from "react";
import LayoutHead from "./Layout/LayoutHead";
import { useSevk } from "../store/context";

export default function LayoutRight() {
  const { state, dispatch } = useSevk();
  const { ShowLayoutRight } = state;

  const toggleShare = () => {
    dispatch({
      type: "toggleShare",
      payload: false,
    });
  };

  const Share = [
    { ico: "OutlookLogo", text: "E-posta Gönder" },
    { ico: "OneDrive", text: "Kaydet" },
    { ico: "WordLogo", text: "Whatsapp ile Gönder" },
  ];

  return ShowLayoutRight ? (
    <div className="ms-Layer  animate  ms-Layer--fixed effect layer-351">
      <div className="BaseDrive effect RightLayout">
        <LayoutHead click={toggleShare} text="Paylaş" />
        {Share.map((item, index) => (
          <span key={index} className="BaseDriveContainer">
            <span
              className={`DriveIcon ms-svg-Icon ms-Icon--${item.ico}`}
            />
            <div className="DriveTextContainer">
              <span>{item.text}</span>
            </div>
          </span>
        ))}
      </div>
    </div>
  ) : null;
}