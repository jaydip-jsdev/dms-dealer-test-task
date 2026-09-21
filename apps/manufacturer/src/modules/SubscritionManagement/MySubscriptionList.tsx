import "./Mysubscription.scss";

import { ExportOutlined, FilterOutlined } from "@ant-design/icons";
import type { ApiErrorResponse } from "@repo/ui";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Popover,
  Select,
  Typography,
  type TablePaginationConfig,
} from "antd";
import type { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

import { exportExcelCall } from "../../api/services/exportService";
import {
  fetchSubscription,
  fetchSubscriptionFilters,
} from "../../api/services/subscriptionServices";
import type { SubscriptionFiltersRes, SubscriptionListType } from "../../types";
import { payloadDate } from "../../utils";

import SubscriptionListTable from "./SubscriptionListTable/SubscriptionListTable";

const { Title } = Typography;
const { Search } = Input;

type ApplyFilterType = {
  createdBy?: string;
  from?: string;
  to?: string;
};

const MySubscriptionList = ({ title }: { title?: string }) => {
  const [data, setData] = useState<SubscriptionListType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [excelLoading, setExcelLoading] = useState<boolean>(false);

  const [form] = Form.useForm();

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState<string>("");

  const [filterOptions, setFilterOptions] = useState<SubscriptionFiltersRes>({
    createdBy: [],
  });
  const [appliedFilters, setAppliedFilters] = useState<ApplyFilterType>({});
  const [isFilterPopup, setIsFilterPopup] = useState<boolean>(false);

  const { current = 1, pageSize = 10 } = pagination;

  const fetchOrdersFiltersFn = useCallback(async () => {
    try {
      const res = await fetchSubscriptionFilters();
      setFilterOptions(res?.data);
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      message.error(error.response?.data.message ?? error.message);
    }
  }, []);

  const handleApplyFilter = (value: ApplyFilterType) => {
    setIsFilterPopup(false);
    setAppliedFilters(value);
  };

  const handleResetFilter = () => {
    form.resetFields();
    setAppliedFilters({});
    setIsFilterPopup(false);
  };

  const filterPopup = () => {
    return (
      <Form
        layout="vertical"
        form={form}
        className="subscription-form"
        onFinish={handleApplyFilter}
      >
        <Form.Item label="Created By" name="createdBy">
          <Select
            placeholder="Select"
            className="subscription-form-select"
            options={filterOptions.createdBy.map((c) => ({
              value: c,
              label: c,
            }))}
          />
        </Form.Item>

        <Form.Item label="From" name="from">
          <DatePicker className="datepicker" />
        </Form.Item>

        <Form.Item label="To" name="to">
          <DatePicker className="datepicker" />
        </Form.Item>

        <Flex justify="end" gap={9}>
          <Button onClick={handleResetFilter}>Reset</Button>
          <Button type="primary" htmlType="submit">
            Apply
          </Button>
        </Flex>
      </Form>
    );
  };

  const loadData = useCallback(
    async (
      page: number,
      limit: number,
      search: string,
      filters: ApplyFilterType,
    ) => {
      setLoading(true);
      try {
        const response = await fetchSubscription({
          page,
          limit,
          search,
          createdBy: filters.createdBy,
          startDate: payloadDate(filters?.from),
          endDate: payloadDate(filters.to),
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
    fetchOrdersFiltersFn();
  }, [fetchOrdersFiltersFn]);

  useEffect(() => {
    loadData(current, pageSize, searchText, appliedFilters);
  }, [current, pageSize, searchText, loadData, appliedFilters]);
  return (
    <Flex className="subscription-container" vertical>
      <Title level={5}>{title || "My Subscription List"}</Title>

      <Flex className="subscription-title-container">
        <Search
          className="subscription-searchbar"
          placeholder="Search Dealer"
          onSearch={handleSearch}
          allowClear
          enterButton
        />

        <Flex className="subscription-tools-container">
          <Button
            icon={<ExportOutlined />}
            loading={excelLoading}
            onClick={() =>
              exportExcelCall(
                "subscriptions",
                "SubscriptionList",
                setExcelLoading,
              )
            }
          >
            Export
          </Button>
          <Popover
            placement="bottomRight"
            title="Filter Options"
            trigger="click"
            content={filterPopup()}
            open={isFilterPopup}
            onOpenChange={setIsFilterPopup}
          >
            <Button>
              <FilterOutlined />
              Filter
            </Button>
          </Popover>
        </Flex>
      </Flex>
      <SubscriptionListTable
        data={data}
        loading={loading}
        pagination={pagination}
        handleTableChange={handleTableChange}
      />
    </Flex>
  );
};

export default MySubscriptionList;
