import { ArrowLeftOutlined } from "@ant-design/icons";
import type { ApiErrorResponse } from "@repo/ui";
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Select,
  Spin,
  Switch,
  Tabs,
  Typography,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import type { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./SubscriptionDetails.scss";
import {
  addDealerInSubscription,
  fetchDealerOptions,
  fetchSubscriptionDetails,
  removeDealerFromSubscription,
  updateDealerStatusForSubscription,
} from "../../../api/services/subscriptionServices";
import { PATH } from "../../../Router/routerPath";
import type {
  AddDealerPayload,
  Dealer,
  RemoveDealerType,
  SubscriptionDetailsType,
} from "../../../types";
import { getClearDate } from "../../../utils";
import { items } from "../constant";

const { Title, Text } = Typography;
const { Search } = Input;

const SubscriptionList = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [subscriptionDetailsData, setSubscriptionDetailsData] =
    useState<SubscriptionDetailsType>({
      activeDealerCount: 0,
      allowedDealersNumber: "",
      dealers: [],
      endDate: "",
      startDate: "",
      inactiveDealerCount: 0,
      subscriptionCode: "",
    });
  const [dealerOptionData, setDealerOptionData] = useState<Dealer[]>([]);

  const [isManageDealerModal, setIsManageDealerModal] =
    useState<boolean>(false);
  const [isRemoveDealerModal, setIsRemoveDealerModal] =
    useState<RemoveDealerType>({
      isVisible: false,
      dealerCode: "",
    });

  const handleOk = (value: AddDealerPayload) => {
    if (id) {
      addDealers(id, value);
    }
    setIsManageDealerModal(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsManageDealerModal(false);
    form.resetFields();
  };

  const handleRemove = (dealerCode: string) => {
    if (id) {
      removeDealer(id, dealerCode);
    }
    setIsRemoveDealerModal({ isVisible: false, dealerCode: "" });
  };

  const handleSwitch = (dealerCode: string) => {
    if (id) {
      updateDealerStatus(id, dealerCode);
    }
  };

  const subscriptionDetails = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await fetchSubscriptionDetails(id);
      setSubscriptionDetailsData(res?.data);
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      message.error(error.response?.data.message ?? error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const dealerOptions = useCallback(async () => {
    try {
      const res = await fetchDealerOptions();
      setDealerOptionData(res.data.dealers);
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      message.error(error.response?.data.message ?? error.message);
    }
  }, []);

  const addDealers = async (id: string, payload: AddDealerPayload) => {
    try {
      const res = await addDealerInSubscription(id, payload);
      message.success(res.data.message);
      subscriptionDetails(id);
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      message.error(error.response?.data.message ?? error.message);
    }
  };

  const removeDealer = async (id: string, dealerCode: string) => {
    try {
      const res = await removeDealerFromSubscription(id, dealerCode);
      subscriptionDetails(id);
      message.success(res.data.message);
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      message.error(error.response?.data.message ?? error.message);
    }
  };

  const updateDealerStatus = async (id: string, dealerCode: string) => {
    try {
      const res = await updateDealerStatusForSubscription(id, dealerCode);
      subscriptionDetails(id);
      message.success(res.data.message);
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      message.error(error.response?.data.message ?? error.message);
    }
  };

  useEffect(() => {
    if (id) {
      subscriptionDetails(id);
    }
    dealerOptions();
  }, [id]);

  const filteredDealers = subscriptionDetailsData.dealers.filter((dealer) => {
    return dealer.dealerName.includes(searchText);
  });

  return (
    <>
      <Spin spinning={isLoading}>
        <Flex className="subscription-card" vertical>
          <Title level={5} className="main-title">
            <Link to={PATH.SUBSCRIPTION}>
              <ArrowLeftOutlined className="arrowicon" />
              <span className="card-title">
                {subscriptionDetailsData?.subscriptionCode}
              </span>
            </Link>
          </Title>
          <Flex>
            <Card className="dealer-details-card">
              <Card.Grid hoverable={false}>
                <Title level={5}>Total Allowed Active Dealer</Title>
                <Text>{subscriptionDetailsData.allowedDealersNumber}</Text>
              </Card.Grid>
              <Card.Grid hoverable={false}>
                <Title level={5}>Active Dealer</Title>
                <Text>{subscriptionDetailsData.activeDealerCount}</Text>
              </Card.Grid>
              <Card.Grid hoverable={false}>
                <Title level={5}>Inactive Dealer</Title>
                <Text>{subscriptionDetailsData.inactiveDealerCount}</Text>
              </Card.Grid>
              <Card.Grid hoverable={false}>
                <Title level={5}>Start Date</Title>
                <Text>{getClearDate(subscriptionDetailsData.startDate)}</Text>
              </Card.Grid>
              <Card.Grid hoverable={false}>
                <Title level={5}>End Date</Title>
                <Text>{getClearDate(subscriptionDetailsData.endDate)}</Text>
              </Card.Grid>
            </Card>
          </Flex>
        </Flex>

        <Flex className="subscription-dealer" vertical>
          <div className="border-div">
            <Tabs defaultActiveKey="1" items={items} className="custom-tabs" />
          </div>

          <Flex className="subscription-list-model">
            <Search
              className="search-dealer"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Dealer"
            />

            <Flex className="inner-list-model">
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    setIsManageDealerModal(true);
                    form.setFieldsValue({
                      dealerCodes: subscriptionDetailsData.dealers.map(
                        (dealer) => dealer.dealerCode,
                      ),
                    });
                  }}
                >
                  Manage Dealer
                </Button>

                <Modal
                  className="antd-modal-dealer-1"
                  title="Add Dealer"
                  open={isManageDealerModal}
                  onCancel={() => handleCancel()}
                  footer={[
                    <Button
                      key="ok"
                      type="primary"
                      htmlType="submit"
                      onClick={() => form.submit()}
                    >
                      OK
                    </Button>,
                  ]}
                >
                  <Form layout="vertical" form={form} onFinish={handleOk}>
                    <FormItem vertical label="Dealer Name" name="dealerCodes">
                      <Select
                        mode="multiple"
                        options={dealerOptionData.map((dealer) => ({
                          value: dealer.dealerCode,
                          label: dealer.dealerName,
                        }))}
                      />
                    </FormItem>
                  </Form>
                </Modal>
              </>
            </Flex>
          </Flex>

          <Flex className="dealer-remover">
            {filteredDealers.map((dealer) => (
              <div key={dealer.dealerCode} className="inner-dealer-remover">
                <div className="dealer-flex-div">
                  <div className="inner-dealer-title">
                    <Title level={4}>{dealer.dealerName}</Title>
                    <Text
                      onClick={() =>
                        setIsRemoveDealerModal({
                          isVisible: true,
                          dealerCode: dealer.dealerCode,
                        })
                      }
                      className="remove-link"
                    >
                      Remove
                    </Text>
                  </div>
                </div>

                <div className="dealer-active">
                  <div>
                    <Text className="dealer-mobile-number">
                      Mobile No. : {dealer.mobileNumber}
                    </Text>
                  </div>

                  <Flex gap={8}>
                    <Flex className={dealer.isActive ? "active" : "inactive"}>
                      <Text>{dealer.isActive ? "Active" : "Inactive"}</Text>
                    </Flex>
                    <div>
                      <Switch
                        onChange={() => handleSwitch(dealer.dealerCode)}
                        checked={dealer.isActive}
                      />
                    </div>
                  </Flex>
                </div>

                <Flex>
                  <Card className="dealer-card-active">
                    <Flex vertical>
                      <Text className="card-active-title">Gst No.</Text>
                      <Text className="card-active-inner">
                        {dealer.gstNumber ?? "NA"}
                      </Text>
                    </Flex>
                  </Card>

                  <Card className="dealer-card-active">
                    <Flex vertical>
                      <Text className="card-active-title">Email</Text>
                      <Text className="card-active-inner">
                        {dealer.email ?? "NA"}
                      </Text>
                    </Flex>
                  </Card>
                </Flex>

                <Flex>
                  <Card className="dealer-card-active">
                    <Flex vertical>
                      <Text className="card-active-title">Contact Person</Text>
                      <Text className="card-active-inner">
                        {dealer.contactPerson ?? "NA"}
                      </Text>
                    </Flex>
                  </Card>
                  <Card className="dealer-card-active">
                    <Flex vertical>
                      <Text className="card-active-title">WhatsApp No.</Text>
                      <Text className="card-active-inner">
                        {dealer.whatsappNumber ?? "NA"}
                      </Text>
                    </Flex>
                  </Card>
                </Flex>
              </div>
            ))}
          </Flex>
        </Flex>
      </Spin>
      <Modal
        open={isRemoveDealerModal.isVisible}
        onCancel={() =>
          setIsRemoveDealerModal({ isVisible: false, dealerCode: "" })
        }
        title="Are you sure you want to remove dealer from this subscription?"
        footer={
          <Flex justify="space-between">
            <Button
              onClick={() =>
                setIsRemoveDealerModal({ isVisible: false, dealerCode: "" })
              }
            >
              No
            </Button>
            <Button
              type="primary"
              onClick={() => handleRemove(isRemoveDealerModal.dealerCode)}
            >
              Yes
            </Button>
          </Flex>
        }
      />
    </>
  );
};

export default SubscriptionList;
