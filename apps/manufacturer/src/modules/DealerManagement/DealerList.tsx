import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import type { ApiErrorResponse } from "@repo/ui";
import "./DealerList.scss";
import {
  Button,
  Checkbox,
  ConfigProvider,
  Flex,
  Input,
  message,
  Select,
  Typography,
  type CheckboxChangeEvent,
  type TablePaginationConfig,
} from "antd";
import type { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

import {
  fetchAllDealers,
  updateDealerStatusById,
} from "../../api/services/dealerService";
import { exportExcelCall } from "../../api/services/exportService";
import type {
  DealerManagementData,
  DealerUpdateStatusPayload,
} from "../../types";

import { AddDealerModal } from "./DealerTable/DealerActions";
import Dealertable from "./DealerTable/Dealertable";

const DealerList = () => {
  const { Title } = Typography;
  const { Search } = Input;
  const [Filter, setFilter] = useState<string>();
  const [data, setData] = useState<DealerManagementData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [excelLoading, setExcelLoading] = useState(false);
  const [Addbtn, setAddbtn] = useState(false);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const { current = 1, pageSize = 10 } = pagination;

  const loadData = useCallback(
    async (page: number, limit: number, search: string, status: string) => {
      setLoading(true);
      try {
        const response = await fetchAllDealers({
          page,
          limit,
          search,
          status: !status || status === "all" ? undefined : status,
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
    loadData(current, pageSize, searchText, Filter ?? "");
  }, [current, pageSize, searchText, Filter, loadData]);
  const handleUpdateStatus = async (
    id: number,
    payload: DealerUpdateStatusPayload,
  ): Promise<boolean> => {
    try {
      await updateDealerStatusById(id, payload);
      await loadData(current, pageSize, searchText, Filter ?? "");
      message.success("Dealer status updated successfully");
      return true;
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      message.error(error.response?.data.message ?? error.message);
      return false;
    }
  };

  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  const onChange = (e: CheckboxChangeEvent) => {
    const value = e.target.value;
    setSelectedValue((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((item) => item !== value),
    );
  };
  const CheckBoxNames = [
    { label: "Login Email", value: "email" },
    { label: "Created At", value: "createdAt" },
    { label: "Created By", value: "createdBy" },
  ];

  return (
    <Flex className="Dealer-list-container" vertical gap={20}>
      <Title className="heading">Dealer List</Title>
      <Flex className="main-container" justify-between>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorText: "black",
              },
            },
          }}
        >
          <Flex className="left-container" gap={20}>
            <Search
              className="search-order-field"
              placeholder="Search Dealer"
              allowClear
              onSearch={handleSearch}
            />
            <Select
              className="select-btn-field"
              placeholder="Select Status"
              value={Filter || undefined}
              onChange={(value: string) => {
                setFilter(value);
                setPagination((prev) => ({ ...prev, current: 1 }));
              }}
              options={[
                { label: "All", value: "all" },
                { label: "Pending", value: "pending" },
                { label: "Approved", value: "approved" },
                { label: "Rejected", value: "rejected" },
                { label: "Blacklisted", value: "blacklisted" },
              ]}
            />
          </Flex>
        </ConfigProvider>
        <Flex className="right-container" gap={20}>
          <Button
            type="primary"
            className="export-btn"
            icon={<ExportOutlined />}
            loading={excelLoading}
            onClick={() =>
              exportExcelCall("dealers", "DealerList", setExcelLoading)
            }
          >
            Export
          </Button>
          <Button
            type="primary"
            className="add-dealer"
            icon={<PlusOutlined />}
            onClick={() => setAddbtn(true)}
          >
            Add Dealer
          </Button>
        </Flex>
      </Flex>
      <Flex>
        {CheckBoxNames.map(({ label, value }) => (
          <Checkbox
            key={value}
            value={value}
            checked={selectedValue.includes(value)}
            onChange={onChange}
          >
            {label}
          </Checkbox>
        ))}
      </Flex>
      <Dealertable
        data={data}
        loading={loading}
        pagination={pagination}
        handleTableChange={handleTableChange}
        loadData={loadData}
        handleUpdateStatus={handleUpdateStatus}
        selectedValue={selectedValue}
      />
      <AddDealerModal
        open={Addbtn}
        setOpen={setAddbtn}
        onAdded={() => loadData(current, pageSize, searchText, Filter ?? "")}
      />
    </Flex>
  );
};
export default DealerList;
