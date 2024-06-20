
import React, { useEffect } from "react";
import { useSevk } from "../store/context";

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
  const { state, fetchArticels, fetchOrders } = useSevk();
  const { Articels, showOrder, isMobile } = state;

  useEffect(() => {
    fetchArticels();
  }, [fetchArticels]);

  const GetOrder = (Articel) => {
    fetchOrders(Articel);
  };

  return (
    <table className="Articels table table-hover">
      <TableHead showOrder={showOrder} isMobile={isMobile} />
      <tbody>
        {Articels && Articels.map((a) => (
          <tr
            className="ArticelRow flex_one"
            id={"Articel" + a.id}
            key={a.id}
            onClick={() => GetOrder(a)}
          >
            {showOrder || isMobile ? (
              <td className="break-spaces">
                {a.CustomerName}
                <br />
                <span className="ArticelId">AT-{a.id}</span>
                {a.ArticelName}
              </td>
            ) : (
              <td className="flex_one break-spaces">
                <div className="flex_one">{a.CustomerName}</div>
                <div className="flex_one">
                  <span className="ArticelId">AT-{a.id}</span>
                  {a.ArticelName}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}