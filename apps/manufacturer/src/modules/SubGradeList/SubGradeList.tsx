import "./SubGradeList.scss";
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
import type { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

import { exportExcelCall } from "../../api/services/exportService";
import { fetchSubGrade } from "../../api/services/subGradeService";
import type { SubGrade } from "../../types";

import SubGradeTable from "./SubGradeTable/SubGradeTable";

const { Title } = Typography;
const { Search } = Input;

const SubGradeList = () => {
  const [data, setData] = useState<SubGrade[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [excelLoading, setExcelLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { current = 1, pageSize = 10 } = pagination;

  const loadData = useCallback(
    async (page: number, limit: number, search: string) => {
      setLoading(true);
      try {
        const response = await fetchSubGrade({ page, limit, search });

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
    <Flex className="sub-grade-page-container" vertical gap={20}>
      <Flex vertical className="sub-grade-title-container" gap={10}>
        <Title level={5}>Sub Grade List</Title>
        <Flex justify="space-between">
          <Search
            placeholder="Search Sub Grade"
            className="search-sub-grade"
            onSearch={handleSearch}
          />
          <Button
            icon={<ExportOutlined />}
            loading={excelLoading}
            onClick={() =>
              exportExcelCall("sub-grade", "SubGradeList", setExcelLoading)
            }
          >
            Export
          </Button>
        </Flex>
      </Flex>
      <SubGradeTable
        data={data}
        loading={loading}
        pagination={pagination}
        handleTableChange={handleTableChange}
      />
    </Flex>
  );
};

export default SubGradeList;
