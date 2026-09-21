import { CommonPriceListComponent } from "@repo/ui";
import { useState } from "react";

import { priceTableData } from "./constant";

const PriceList = () => {
  const [effectiveDate, setEffectiveDate] = useState<string>("19/08/2025");

  const handleSearch = () => {
    // console.log("Search value:", value);
  };

  const handleEffectiveDateChange = (value: string) => {
    setEffectiveDate(value);
  };

  const handleExport = () => {
    // console.log("Export clicked");
  };

  return (
    <CommonPriceListComponent
      data={priceTableData}
      effectiveDate={effectiveDate}
      onSearch={handleSearch}
      onEffectiveDateChange={handleEffectiveDateChange}
      onExport={handleExport}
    />
  );
};

export default PriceList;
