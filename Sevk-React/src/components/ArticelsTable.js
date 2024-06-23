import React, { useEffect } from "react";
import { useSevk } from "../store/context";
import { useArticel } from "../store/ArticelContext";
import { useOrder } from "../store/OrderContext";
import { useWayBill } from "../store/WayBillContext";
import { useFiles } from "../store/FilesContext";
import { useNotes } from "../store/NoteContext";

function TableHead({ showOrder, isMobile }) {
  return (
    <thead className="cellName-112">
      {isMobile || showOrder ? (
        <tr>
          <td className="col-md-12 text-center">Firma Articel / Sipariş</td>
        </tr>
      ) : (
        <tr className="flex_one">
          <td className="flex_one">Firma Adı</td>
          <td className="flex_one">Articel / Sipariş</td>
        </tr>
      )}
    </thead>
  );
}

export default function ArticelsTable() {
  const { state, dispatch } = useSevk();
  const { showOrder, isMobile } = state;

  const { articelState, fetchArticels } = useArticel();
  const { Articels } = articelState;

  const { fetchOrders } = useOrder();
  const { fetchWaybills } = useWayBill();
  const { fetchFiles } = useFiles();
  const { fetchNotes } = useNotes();



  useEffect(() => {
    fetchArticels();
  }, [fetchArticels]);

  const getOrder = (articel) => {
    dispatch({ type: "setArticel", payload: articel });
    fetchOrders();
    fetchWaybills();
    fetchFiles();
    fetchFiles();
    fetchNotes();
  };

  return (
    <table className="Articels table table-hover">
      <TableHead showOrder={showOrder} isMobile={isMobile} />
      <tbody>
        {Articels && Articels.map((articel) => (
          <tr
            className="ArticelRow flex_one"
            id={"Articel" + articel.id}
            key={articel.id}
            onClick={() => getOrder(articel)}
          >
            {showOrder || isMobile ? (
              <td className="break-spaces">
                {articel.CustomerName}
                <br />
                <span className="ArticelId">AT-{articel.id}</span>
                {articel.ArticelName}
              </td>
            ) : (
              <td className="flex_one break-spaces">
                <div className="flex_one">{articel.CustomerName}</div>
                <div className="flex_one">
                  <span className="ArticelId">AT-{articel.id}</span>
                  {articel.ArticelName}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}