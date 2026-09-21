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
import "./PaymentTermsList.scss";
import type { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

import { exportExcelCall } from "../../api/services/exportService";
import { fetchPaymentTerms } from "../../api/services/paymentTermsService";
import type { PaymentTerm } from "../../types";

import PaymentTermsTable from "./PaymentTermsTable/PaymentTermsTable";

const { Title } = Typography;
const { Search } = Input;

const PaymentTermsList = () => {
  const [data, setData] = useState<PaymentTerm[]>([]);
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
        const response = await fetchPaymentTerms({ page, limit, search });

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
    <Flex className="payment-terms-container" vertical gap={20}>
      <Flex vertical className="payment-terms-title" gap={10}>
        <Title level={5}>Payment Terms List</Title>
        <Flex justify="space-between">
          <Search
            className="payment-terms-search"
            placeholder="Search Payment Terms"
            onSearch={handleSearch}
            allowClear
            enterButton
          />
          <Button
            icon={<ExportOutlined />}
            loading={excelLoading}
            onClick={() =>
              exportExcelCall(
                "payment-term",
                "PaymentTermList",
                setExcelLoading,
              )
            }
          >
            Export
          </Button>
        </Flex>
      </Flex>
      <PaymentTermsTable
        data={data}
        loading={loading}
        pagination={pagination}
        handleTableChange={handleTableChange}
      />
    </Flex>
  );
};

export default PaymentTermsList;
