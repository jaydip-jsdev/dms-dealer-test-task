import { ExportOutlined, FilterOutlined } from "@ant-design/icons";
import type { ApiErrorResponse } from "@repo/ui";
import "./OrderList.scss";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  message,
  Popover,
  Select,
  Typography,
  type CheckboxChangeEvent,
  type TablePaginationConfig,
} from "antd";
import type { AxiosError } from "axios";
import { useCallback, useEffect, useState, useTransition } from "react";

import { exportExcelCall } from "../../api/services/exportService";
import {
  fetchOrders,
  fetchOrdersFilters,
} from "../../api/services/orderManagementService";
import type { OrderManagement, OrderManagementFiltersRes } from "../../types";

import OrderListTable from "./OrderListTable";

const { Title } = Typography;
const { Search } = Input;

interface FilterState {
  itemCode?: string;
  dealerCode?: string;
  status?: string;
}

const OrderList = () => {
  const [data, setData] = useState<OrderManagement[]>([]);
  const [loading, startTransition] = useTransition();
  const [excelLoading, setExcelLoading] = useState(false);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState("");
  const [filterOptions, setFilterOptions] = useState<OrderManagementFiltersRes>(
    {
      itemData: [],
      dealerData: [],
      statusData: [],
    },
  );
  const [tempFilters, setTempFilters] = useState<FilterState>({});
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { current = 1, pageSize = 10 } = pagination;

  const fetchOrdersFiltersFn = useCallback(async () => {
    try {
      const res = await fetchOrdersFilters();
      setFilterOptions(res?.data);
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      message.error(error.response?.data.message ?? error.message);
    }
  }, []);

  const loadData = useCallback(
    async (
      page: number,
      limit: number,
      search: string,
      filters: FilterState,
    ) => {
      startTransition(async () => {
        try {
          const response = await fetchOrders({
            page,
            limit,
            search,
            itemCode: filters.itemCode || "",
            dealerCode: filters.dealerCode || "",
            status: filters.status || "",
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
        }
      });
    },
    [],
  );

  const handleApplyFilters = () => {
    setAppliedFilters(tempFilters);
    setPagination((prev) => ({ ...prev, current: 1 }));
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setTempFilters({});
    setAppliedFilters({});
    setPagination((prev) => ({ ...prev, current: 1 }));
    setIsFilterOpen(false);
  };

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
    fetchOrdersFiltersFn();
  }, [fetchOrdersFiltersFn]);

  useEffect(() => {
    loadData(current, pageSize, searchText, appliedFilters);
  }, [current, pageSize, searchText, loadData, appliedFilters]);

  const filterPopup = () => {
    return (
      <Form layout="vertical" style={{ width: "218px" }}>
        <Form.Item label="Dealer">
          <Select
            allowClear
            placeholder="Select Dealer"
            style={{ width: "100%" }}
            value={tempFilters.dealerCode}
            onChange={(val) =>
              setTempFilters((p) => ({ ...p, dealerCode: val }))
            }
            options={filterOptions.dealerData.map((d) => ({
              value: d.dealerCode,
              label: d.dealerName,
            }))}
          />
        </Form.Item>
        <Form.Item label="Status">
          <Select
            allowClear
            placeholder="Select Status"
            style={{ width: "100%" }}
            value={tempFilters.status}
            onChange={(val) => setTempFilters((p) => ({ ...p, status: val }))}
            options={filterOptions.statusData.map((s) => ({
              value: s.value,
              label: s.key,
            }))}
          />
        </Form.Item>
        <Form.Item label="Item">
          <Select
            allowClear
            placeholder="Select Item Name"
            style={{ width: "100%" }}
            value={tempFilters.itemCode}
            onChange={(val) => setTempFilters((p) => ({ ...p, itemCode: val }))}
            options={filterOptions.itemData.map((i) => ({
              value: i.itemCode,
              label: i.itemName,
            }))}
          />
        </Form.Item>
        <Flex justify="end" gap={9}>
          <Button onClick={handleResetFilters}>Reset</Button>
          <Button type="primary" onClick={handleApplyFilters}>
            Apply
          </Button>
        </Flex>
      </Form>
    );
  };
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const onChange = (e: CheckboxChangeEvent) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedValue([...selectedValue, value]);
    } else {
      setSelectedValue(selectedValue.filter((item) => item !== value));
    }
  };
  const CheckBoxNames = [
    "Party Group",
    "Order Date",
    "Lot No.",
    "Grade",
    "Subgrade",
    "Cops/Cheese",
    "Design",
    "Color",
    "Shade",
    "Ends",
    "Width",
    "Length",
  ];
  return (
    <Flex className="order-list-container" vertical>
      <Title level={5}>Order List</Title>
      <Flex className="header-container">
        <Search
          className="search-order-field"
          placeholder="Search Order"
          onSearch={handleSearch}
          allowClear
          enterButton
        />
        <Flex gap={16}>
          <Popover
            placement="bottomRight"
            title="Filter Options"
            trigger="click"
            content={filterPopup}
            open={isFilterOpen}
            onOpenChange={setIsFilterOpen}
          >
            <Button>
              <FilterOutlined />
              Filter
            </Button>
          </Popover>
          <Button
            icon={<ExportOutlined />}
            loading={excelLoading}
            onClick={() =>
              exportExcelCall("orders", "OrderManagementList", setExcelLoading)
            }
          >
            Export
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
        selectedValue={selectedValue}
        data={data}
        loading={loading}
        pagination={pagination}
        handleTableChange={handleTableChange}
      />
    </Flex>
  );
};

export default OrderList;
