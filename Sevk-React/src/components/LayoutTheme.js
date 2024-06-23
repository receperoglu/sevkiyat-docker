import React from "react";
import LayoutHead from "./Layout/LayoutHead";
import { useTheme } from "../store/themeContext";

export default function LayoutTheme() {
  const { stateTheme, dispatchTheme, changeTheme } = useTheme();

  const { ShowLayoutTheme } = stateTheme;

  const toggleTheme = () => {
    dispatchTheme({
      type: "toggleTheme",
      payload: false,
    });
  };



  return ShowLayoutTheme ? (
    <div className="ms-Layer  animate  ms-Layer--fixed effect layer-351">
      <div className="BaseDrive effect RightLayout">
        <LayoutHead click={toggleTheme} text="Tema Seçin" />
        <div className="themeContainer">
          <div onClick={() => changeTheme("blue")} className="col-xs-4">
            <div className="blue"></div>
          </div>
          <div onClick={() => changeTheme("opaqblue")} className="col-xs-4">
            <div className="opaqblue"></div>
          </div>
          <div onClick={() => changeTheme("navy")} className="col-xs-4">
            <div className="navy"></div>
          </div>
          <div onClick={() => changeTheme("orange")} className="col-xs-4">
            <div className="orange"></div>
          </div>
          <div onClick={() => changeTheme("opaqorange")} className="col-xs-4">
            <div className="opaqorange"></div>
          </div>
          <div onClick={() => changeTheme("purple")} className="col-xs-4">
            <div className="purple"></div>
          </div>
          <div onClick={() => changeTheme("green")} className="col-xs-4">
            <div className="green"></div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}