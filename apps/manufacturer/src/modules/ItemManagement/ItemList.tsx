import { ExportOutlined } from "@ant-design/icons";
import type { ApiErrorResponse } from "@repo/ui";
import {
  Button,
  Flex,
  Input,
  message,
  Typography,
  type TablePaginationConfig,
} from "antd";
import "./ItemList.scss";
import type { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

import { exportExcelCall } from "../../api/services/exportService";
import { fetchItem } from "../../api/services/itemService";
import type { Item } from "../../types";

import ItemListTable from "./ItemListTable";

const { Title } = Typography;
const { Search } = Input;

const ItemList = () => {
  const [data, setData] = useState<Item[]>([]);

  const [loading, setLoading] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const { current = 1, pageSize = 10 } = pagination;
  const [searchText, setSearchText] = useState("");

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination((prev) => ({ ...prev, current: 1 })); // Reset to page 1 on search
  };
  const loadData = useCallback(
    async (page: number, limit: number, search: string) => {
      setLoading(true);
      try {
        const response = await fetchItem({ page, limit, search });

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
    <Flex className="item-list-container" vertical>
      <Title level={5}>Item List</Title>
      <Flex className="item-list-header">
        <Search
          className="item-list-search"
          placeholder="Search Item"
          onSearch={handleSearch}
          allowClear
          enterButton
        />
        <Button
          loading={excelLoading}
          onClick={() => exportExcelCall("item", "ItemList", setExcelLoading)}
        >
          <ExportOutlined />
          Export
        </Button>
      </Flex>
      <ItemListTable
        data={data}
        loading={loading}
        pagination={pagination}
        handleTableChange={handleTableChange}
        loadData={() => loadData(current, pageSize, searchText)}
      />
    </Flex>
  );
};

export default ItemList;
