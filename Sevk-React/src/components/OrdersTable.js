import React, { Fragment, useState } from "react";
import HeadSection from "./Layout/HeadSection";
import { useSevk } from "../store/context";
import FilesComponent from "./ComponentFiles/ComponentFiles";
import WayBillList from "./WayBillList";
import CreateIcon from "./Tools/CreateIcon";
import Skeleton from "./Tools/Skeleton";
import { useOrder } from "../store/OrderContext";
import { useWayBill } from "../store/WayBillContext";

function TableHead() {
  return (
    <thead>
      <tr className=" cellName-112">
        <td>Adet</td>
        <td>Ölçü</td>
        <td>Renk</td>
        <td>Tip</td>
        <td>#</td>
      </tr>
    </thead>
  );
}

export default function OrdersTable() {
  const [OrderVisible, setOrderVisible] = useState(true);
  const toggleOrderList = () => {
    setOrderVisible(!OrderVisible);
  };

  const { dispatch, state } = useSevk();
  const { DetailActive, ArticelName, isMobile, Loading } = state;

  const { OrderState } = useOrder();
  const { Orders } = OrderState;

  const { CallOutonMouseMove } = useWayBill();



  const toggleEdit = (Order) => {
    dispatch({
      type: "toggleEdit",
      payload: Order,
    });
  };

  const MP = (e, Order) => {
    dispatch({
      type: "Mouse_Position",
      payload: { x: e.pageY + "px", y: e.pageX + "px", Order: Order },
    });
    CallOutonMouseMove(Order);
  };

  return DetailActive ? (
    <Fragment>
      <HeadSection
        click={toggleOrderList}
        text={ArticelName}
        isVisible={OrderVisible}
      />
      {OrderVisible && (
        <table className="table table-hover">
          <TableHead />
          <tbody>
            {Orders && Orders.map((o) => (
              <tr key={o.id} id={"Order" + o.id}>
                <td className="cpointer" onClick={(e) => MP(e, o)}>
                  {o.Piece} {o.Metrics}
                </td>
                <td>{o.Dimensions}</td>
                <td className={isMobile ? "minifont" : ""}>{o.Color}</td>
                <td>{o.ProductTypeName}</td>
                <td>
                  <CreateIcon click={() => toggleEdit(o)} symbol="" />
                </td>
              </tr>
            ))}
            {Loading && Orders.length === 0 && (
              <Skeleton
                icons={[{ order: 5, icon: "edit" }]}
                rowCount="5"
                columnCount="5"
              />
            )}
          </tbody>
        </table>
      )}
      <FilesComponent />
      <WayBillList />
    </Fragment>
  ) : null;
}