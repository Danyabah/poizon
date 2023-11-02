import React, { useState } from "react";
import { stage } from "./utils";

export default function useFilter(
  categ,

  products,
  setProducts,
  key = "fullprice"
) {
  const [filters, setFilters] = useState({
    price: false,
    status: false,
    delivery: false,
  });

  return {
    onClick: function () {
      setFilters((prev) => ({ ...prev, [categ]: !prev[categ] }));
      if (categ === "price") {
        setProducts(
          products.sort((a, b) =>
            filters[categ] ? a[key] - b[key] : b[key] - a[key]
          )
        );
      } else if (categ === "delivery") {
        products.sort((a, b) =>
          filters[categ]
            ? a?.delivery_display?.localeCompare(b.delivery_display || "a")
            : b?.delivery_display?.localeCompare(a.delivery_display || "a")
        );
      } else if (categ === "status") {
        products.sort((a, b) =>
          filters[categ]
            ? stage[a.status] - stage[b.status]
            : stage[b.status] - stage[a.status]
        );
      }
    },
    style: { cursor: "pointer" },
  };
}
