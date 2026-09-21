import "./DeliveryOrderList.scss";

import { ExportOutlined } from "@ant-design/icons";
import type { ApiErrorResponse } from "@repo/ui";
import {
  Button,
  Input,
  Flex,
  Typography,
  type TablePaginationConfig,
  message,
} from "antd";
import type { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

import { fetchAllDeliveryOrderList } from "../../api/services/deliveryOrdersManagementService";
import { exportExcelCall } from "../../api/services/exportService";
import type { DeliveryOrdersManagementData } from "../../types";

import DeliveryOrderTable from "./DeliveryOrderTable/DeliveryOrderTable";

const { Title } = Typography;
const { Search } = Input;

const DeliveryOrderList = () => {
  const [data, setData] = useState<DeliveryOrdersManagementData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [excelLoading, setExcelLoading] = useState<boolean>(false);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState<string>("");

  const { current = 1, pageSize = 10 } = pagination;

  const loadData = useCallback(
    async (page: number, limit: number, search: string) => {
      setLoading(true);
      try {
        const response = await fetchAllDeliveryOrderList({
          page,
          limit,
          search,
        });

        setData(response.data);
        setPagination((prev) => ({
          ...prev,
          current: page,
          total: response.meta.total,
        }));
      } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        message.error(error.response?.data.message ?? error.message);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination((prev) => ({
      ...prev,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    }));
  };

  useEffect(() => {
    loadData(current, pageSize, searchText);
  }, [current, pageSize, searchText, loadData]);

  return (
    <Flex vertical className="deliveryorder-container">
      <Title level={5}>Delivery Order List</Title>

      <Flex className="delivery-title-container">
        <Search
          className="Delivery-searchbar"
          placeholder="Search Delivery Order"
          onSearch={handleSearch}
          allowClear
          enterButton
        />

        <Flex className="delivery-tools-container">
          <Button
            icon={<ExportOutlined />}
            loading={excelLoading}
            onClick={() =>
              exportExcelCall(
                "delivery-orders",
                "DeliveryOrderList",
                setExcelLoading,
              )
            }
          >
            Export
          </Button>
        </Flex>
      </Flex>

      <DeliveryOrderTable
        data={data}
        loading={loading}
        pagination={pagination}
        handleTableChange={handleTableChange}
      />
    </Flex>
  );
};

export default DeliveryOrderList;
