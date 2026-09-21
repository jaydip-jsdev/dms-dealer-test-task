import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import type { ApiErrorResponse } from "@repo/ui";
import {
  Button,
  Checkbox,
  Flex,
  Input,
  message,
  Typography,
  type CheckboxChangeEvent,
  type TablePaginationConfig,
} from "antd";
import "./OrderManagement.scss";
import { isAxiosError } from "axios";
import { useCallback, useEffect, useState, useTransition } from "react";
import type { EditingOrderData, OrderManagementData } from "src/types";

import { exportExcelCall } from "../../api/services/exportService";
import {
  fetchOrderById,
  fetchOrderManagementList,
} from "../../api/services/orderManagementService";
import { getManufacturerCodeFromLocal } from "../../utils/index";

import AddOrderModal from "./AddOrder/AddOrderModal";
import { CheckBoxNames } from "./constant";
import OrderListTable from "./OrderListTable/OrderListTable";

const { Title } = Typography;
const { Search } = Input;

const OrderManagement = () => {
  const manufacturerCode = getManufacturerCodeFromLocal();
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] =
    useState<boolean>(false);
  const [editingOrder, setEditingOrder] = useState<EditingOrderData | null>(
    null,
  );
  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  const [searchText, setSearchText] = useState<string>("");
  const [loading, setTransition] = useTransition();
  const [data, setData] = useState<OrderManagementData[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [excelLoading, setExcelLoading] = useTransition();
  const { current = 1, pageSize = 10 } = pagination;

  const onChange = (e: CheckboxChangeEvent) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedValue([...selectedValue, value]);
    } else {
      setSelectedValue(selectedValue.filter((item) => item !== value));
    }
  };

  const handleAddOrder = () => {
    setEditingOrder(null);
    setIsAddOrderModalOpen(true);
  };

  const handleEditOrder = async (order: OrderManagementData) => {
    try {
      const orderId = order.orderNumber?.split("/")[1];

      if (!orderId) {
        message.error("Invalid Order ID");
        return;
      }

      const response = await fetchOrderById(manufacturerCode, orderId);
      const detail = response.data;

      const mappedEditData = {
        orderNumber: detail.orderNumber,
        orderRefNumber: detail.orderRefNumber,
        billingPartyId: detail.billingParty?.id,
        groupCode: detail.partyGroup?.groupCode,
        partyCode: detail.partyName?.partyCode,
        address: detail.partyName?.address,
        itemCode: detail.itemName?.itemCode,
        itemGrade: detail.grade?.gradeCode,
        subGradeCode: detail.subGrade?.subGradeCode,
        lotNumber: detail.lotNumber?.lotNumber,
        boxPieces: detail.boxPieces,
        copsPieces: detail.copsPieces,
        orderRemark: detail.orderRemark,
        itemDesign: detail.itemDesign,
        itemColor: detail.itemColor,
        shadeName: detail.shadeName,
        beamEnds: detail.beamEnds,
        itemQuantity: detail.itemQuantity?.toString(),
        rate: detail.itemRate?.toString(),
        beamWidth: detail.beamWidth?.toString(),
        beamLength: detail.beamLength?.toString(),
        agePercentage: detail.agePercentage?.toString(),
      };
      setEditingOrder(mappedEditData);
      setIsAddOrderModalOpen(true);
    } catch (err: unknown) {
      if (isAxiosError<ApiErrorResponse>(err)) {
        message.error(
          err.response?.data?.message ?? "Failed to fetch order details",
        );
      } else {
        message.error("An unknown error occurred");
      }
    }
  };

  const handleTableChange = (newPagination: TablePaginationConfig) =>
    setPagination(newPagination);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const loadData = useCallback(
    (page: number, limit: number, search?: string) => {
      setTransition(async () => {
        try {
          if (!manufacturerCode)
            throw new Error("Manufacturer code is missing");
          const response = await fetchOrderManagementList({
            page,
            manufacturerCode: manufacturerCode,
            limit,
            search,
          });

          setData(response.data);
          setPagination((prev) => ({
            ...prev,
            current: page,
            total: response.meta.total,
          }));
        } catch (err: unknown) {
          if (isAxiosError<ApiErrorResponse>(err)) {
            message.error(err.response?.data?.message ?? err.message);
          } else {
            message.error("Unable to fetch Data");
          }
        }
      });
    },
    [manufacturerCode],
  );

  const handleModalSuccess = () => {
    loadData(current, pageSize, searchText);
    setIsAddOrderModalOpen(false);
  };

  useEffect(() => {
    loadData(current, pageSize, searchText);
  }, [current, pageSize, searchText, loadData]);

  return (
    <Flex className="order-list-container" vertical>
      <Title level={5}>Order Management</Title>
      <Flex className="header-container" align="center" justify="space-between">
        <Search
          allowClear
          enterButton
          className="search-order-field"
          placeholder="Search Order"
          onSearch={handleSearch}
        />
        <Flex gap={16}>
          <Button
            icon={<ExportOutlined />}
            loading={excelLoading}
            onClick={() =>
              exportExcelCall(
                "orders",
                "OrdersList",
                setExcelLoading,
                manufacturerCode,
              )
            }
          >
            Export
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddOrder}
          >
            Add Order
          </Button>
        </Flex>
      </Flex>
      <Flex className="checkbox-container">
        {CheckBoxNames.map((name) => (
          <Checkbox key={name} value={name} onChange={onChange}>
            {name}
          </Checkbox>
        ))}
      </Flex>
      <OrderListTable
        data={data}
        loading={loading}
        selectedValue={selectedValue}
        onEdit={handleEditOrder}
        pagination={pagination}
        handleTableChange={handleTableChange}
      />
      <AddOrderModal
        isOpen={isAddOrderModalOpen}
        onClose={() => setIsAddOrderModalOpen(false)}
        editingOrder={editingOrder}
        onSuccess={handleModalSuccess}
      />
    </Flex>
  );
};

export default OrderManagement;
