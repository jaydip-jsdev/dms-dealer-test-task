import { CommonDeliveryOrderList } from "@repo/ui";
import type { DeliveryOrderType } from "@repo/ui";

import { deliveryOrdersData, deliveryOrderColumnOptions } from "./constant";

const DeliveryOrderList = () => {
  const handleAddClick = () => console.log("Add Delivery Order clicked");

  const handleSearch = (value: string) =>
    console.log("Searching delivery order:", value);

  const handleExport = () => console.log("Exporting delivery orders");

  const handleAddFormSubmit = async (formData: DeliveryOrderType) =>
    console.log("Submitting delivery order form data:", formData);

  const handleEditClick = (record: DeliveryOrderType) =>
    console.log("Editing delivery order:", record);

  return (
    <CommonDeliveryOrderList
      data={deliveryOrdersData}
      columnOptions={deliveryOrderColumnOptions}
      onAddClick={handleAddClick}
      onSearch={handleSearch}
      onExport={handleExport}
      onAddFormSubmit={handleAddFormSubmit}
      onEditClick={handleEditClick}
    />
  );
};

export default DeliveryOrderList;
