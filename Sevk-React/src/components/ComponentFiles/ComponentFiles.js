import React, { Fragment, useState } from "react";
import HeadSection from "../Layout/HeadSection";
import MenuItem from "../TopBar/MenuItem";
import { useSevk } from "../../store/context";
import GridView from "./GridView";
import ListViewBody from "./ListViewBody";
import ListViewHeader from "./ListViewHeader";

export default function ComponentFiles() {
  const [FilesVisible, setFilesVisible] = useState(true);
  const toggleView = () => {
    setFilesVisible(!FilesVisible);
  };


  const { dispatch, state } = useSevk();
  const { Files, Vtype, Loading } = state;


  const toggleVtype = () => {
    dispatch({ type: "toggleVtype", payload: null });
  };

  return (
    <Fragment>
      <HeadSection
        click={toggleView}
        text="Dökümanlar"
        isVisible={FilesVisible}
      />
      <div className={FilesVisible ? "FilesArea col-xs-12 " : "hide"}>

        {(Files.length === 0 && !Loading) ? (
          <div className="padd10 fleft">
            <i data-icon-name="Info" role="presentation">
              
            </i>
            Dosya Eklenmemiş
          </div>
        ) : (
          <span className="margin10 changeview">
            <MenuItem
              click={toggleVtype}
              text="Görünümü Değiştir"
              symbol=""
              iconclassname="FabricMDL2Icons-0"
            />
          </span>
        )}

        {Vtype ?
          <GridView />
          :
          <div className="ListViewContainer">
            {!Loading && Files.length > 0 && (
              <Fragment>
                <ListViewHeader />
                <ListViewBody />
              </Fragment>
            )}
            {Loading && Files.length === 0 && divSkeleton()}
          </div>
        }
      </div>
    </Fragment>
  );
}

function divSkeleton() {
  const numItems = 3; // Toplam öğe sayısı

  const skeletonItems = Array.from({ length: numItems }, (_, index) => (
    <tr key={index} className="ms-DetailsRow">
      <td className="loadingData flex_half">
        <img
          className="FileTypeIcon-icon"
          src="https://spoprod-a.akamaihd.net/files/fabric-cdn-prod_20201207.001/assets/item-types/256/pdf.png"
          alt=""
        />
      </td>
      <td className="loadingData flex_fold">
        <span className="bar blur-text">sadasdasdasdasdasd</span>
      </td>
      <td className="loadingData flex1">
        <span className="bar blur-text">asdasdasd</span>
      </td>
      <td className="loadingData flex_half">
        <i data-icon-name="Download" className="FabricMDL2Icons">
          
        </i>
      </td>
    </tr>
  ));

  return (
    <table className="ms-DetailsRow">
      <tbody style={{ display: "flex", flex: 1, width: "100%", flexDirection: "column" }}>
        {skeletonItems}
      </tbody>
    </table>
  );
}