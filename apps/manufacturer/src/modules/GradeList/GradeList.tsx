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
import "./GradeList.scss";
import type { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

import { exportExcelCall } from "../../api/services/exportService";
import { fetchGrades } from "../../api/services/gradeService";
import type { Grade } from "../../types";

import GradeTable from "./GradeTable/GradeTable";

const { Title } = Typography;
const { Search } = Input;

const GradeList = () => {
  const [data, setData] = useState<Grade[]>([]);
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
        const response = await fetchGrades({ page, limit, search });

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
    <Flex className="grade-page-container" vertical gap={20}>
      <Flex vertical className="grade-title-container" gap={10}>
        <Title level={5}>Grade List</Title>
        <Flex justify="space-between">
          <Search
            placeholder="Search Grade"
            className="search-grade"
            onSearch={handleSearch}
            allowClear
            enterButton
          />
          <Button
            icon={<ExportOutlined />}
            loading={excelLoading}
            onClick={() =>
              exportExcelCall("grade", "GradeList", setExcelLoading)
            }
          >
            Export
          </Button>
        </Flex>
      </Flex>
      <GradeTable
        data={data}
        loading={loading}
        pagination={pagination}
        handleTableChange={handleTableChange}
      />
    </Flex>
  );
};

export default GradeList;
