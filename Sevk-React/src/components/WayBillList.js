import React, { Fragment, useState } from "react";
import HeadSection from "./Layout/HeadSection";
import { useSevk } from "../store/context";
import moment from "moment/moment";
import Skeleton from "./Tools/Skeleton";

function TableHead() {
  return (
    <thead>
      <tr className="  cellName-112">
        <td>Adet</td>
        <td>KG</td>
        <td>Ölçü</td>
        <td>Renk</td>
        <td className="text-center">Tarih - İrsaliye</td>
      </tr>
    </thead>
  );
}

export default function WayBillList() {
  const [WayBillVisible, setWayBillVisible] = useState(true);
  const toggleWayBillList = () => {
    setWayBillVisible(!WayBillVisible);
  };

  const { dispatch, state } = useSevk();
  const { isMobile, Waybill, Loading } = state;


  const GetWayBillPhoto = (Path) => {
    dispatch({
      type: "GetWayBillPhoto",
      payload: Path,
    });
  };

  return (
    <Fragment>
      <HeadSection
        click={toggleWayBillList}
        text="İrsaliyeler"
        isVisible={WayBillVisible}
      />
      {WayBillVisible && (
        <table className="table table-hover">
          <TableHead />
          <tbody aria-live="polite">
            {Waybill.map((w) => (
              <tr key={w.id}>
                <td>{w.SendEdPiece}</td>
                <td>{w.Weight}</td>
                <td>{w.Dimensions}</td>
                <td className={isMobile ? "minifont" : ""}>{w.Color}</td>
                <td
                  className="text-center cpointer"
                  onClick={() => GetWayBillPhoto(w.WayBillId)}
                >
                  {moment(w.CreatedDate).format("DD.MM.YY HH:mm")}{" "}
                  <b>
                    {w.id} <i className="controlIcons"></i>
                  </b>
                </td>
              </tr>
            ))}
            {Loading && Waybill.length === 0 && (
              <Skeleton icons={[{ order: 6, icon: "photo" }]} rowCount="5" columnCount="6" />
            )}
          </tbody>
        </table>
      )}
    </Fragment>
  );
}