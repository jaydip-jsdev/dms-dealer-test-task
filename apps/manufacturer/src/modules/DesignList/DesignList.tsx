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
import "./DesignList.scss";
import type { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

import { fetchDesigns } from "../../api/services/designService";
import { exportExcelCall } from "../../api/services/exportService";
import type { Design } from "../../types";

import { DesignTable } from "./DesignTable/DesignTable";

const { Title } = Typography;
const { Search } = Input;
const DesignList = () => {
  const [data, setData] = useState<Design[]>([]);
  const [loading, setLoading] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState("");

  const { current = 1, pageSize = 10 } = pagination;

  const loadData = useCallback(
    async (page: number, limit: number, search: string) => {
      setLoading(true);
      try {
        const response = await fetchDesigns({ page, limit, search });

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
    setPagination((prev) => ({ ...prev, current: 1 })); // Reset to page 1 on search
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
    <Flex className="design-container" vertical gap={20}>
      <Flex vertical className="design-title">
        <Title level={5}>Design List</Title>
        <Flex justify="space-between">
          <Search
            className="design-search"
            placeholder="Search Design"
            onSearch={handleSearch}
            allowClear
            enterButton
          />
          <Button
            icon={<ExportOutlined />}
            loading={excelLoading}
            onClick={() =>
              exportExcelCall("design", "DesignList", setExcelLoading)
            }
          >
            Export
          </Button>
        </Flex>
      </Flex>
      <DesignTable
        data={data}
        loading={loading}
        pagination={pagination}
        handleTableChange={handleTableChange}
      />
    </Flex>
  );
};

export default DesignList;
