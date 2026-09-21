import {
  ExportOutlined,
  MoreOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Dropdown,
  Flex,
  message,
  Modal,
  Switch,
  Table,
  Typography,
  type MenuProps,
} from "antd";
import type { AxiosError } from "axios";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import "./BillingPartyView.scss";
import {
  deleteBillingPartyById,
  editBillingParty,
  fetchAllBillingParties,
  fetchPendingManufacturers,
  getBillingPartyById,
  requestBillingPartyApproval,
  saveBillingParty,
} from "../../../api/services/billingPartyServices";
import { exportExcelCall } from "../../../api/services/exportService";
import type {
  ApiErrorResponse,
  BillingPartyApiData,
  BillingPartyApprovals,
  BillingPartyEditPayload,
  BillingPartyPayload,
  RequestApprovalPayload,
} from "../../../types";
import { getCurrentTime } from "../../../utils";

import AddBillingPartyModal from "./AddBillingPartyModal";
import type { ModalState, PendingManufacturer } from "./types";

const { Text, Title } = Typography;
interface ToggleTarget {
  party: BillingPartyApiData | null;
  nextStatus: boolean;
}

const BillingPartyView = () => {
  const [billingParties, setBillingParties] = useState<BillingPartyApiData[]>(
    [],
  );
  const [isLoading, startTransition] = useTransition();
  const [pendingManufacturers, setPendingManufacturers] = useState<
    PendingManufacturer[]
  >([]);
  const [isPendingLoading, startPendingTransition] = useTransition();
  const [requestApprovalParty, setRequestApprovalParty] =
    useState<BillingPartyApiData | null>(null);
  const [requestingCode, setRequestingCode] = useState<string | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const [billingPartyModal, setBillingPartyModal] = useState<ModalState>({
    isVisible: false,
    status: "Add",
  });
  const [editingParty, setEditingParty] = useState<BillingPartyApiData | null>(
    null,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [toggleTarget, setToggleTarget] = useState<ToggleTarget>({
    party: null,
    nextStatus: false,
  });
  const [excelLoading, setExcelTransition] = useTransition();
  const showMoreNumber = 4;
  const [showMoreIndex, setShowMoreIndex] = useState(showMoreNumber);

  const getStatusIcon = (status: BillingPartyApprovals["approvalStatus"]) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircleOutlined className="status-icon approved" />;
      case "rejected":
        return <CloseCircleOutlined className="status-icon rejected" />;
      case "pending":
        return <ClockCircleOutlined className="status-icon pending" />;
      default:
        return null;
    }
  };

  const menuItems = useMemo<MenuProps["items"]>(
    () => [
      {
        key: "edit",
        label: "Edit",
        onClick: ({ domEvent }) => domEvent.stopPropagation(),
      },
      {
        key: "delete",
        label: "Delete",
        onClick: ({ domEvent }) => domEvent.stopPropagation(),
      },
    ],
    [],
  );

  const handleMenuClick = (key: string, party: BillingPartyApiData) => {
    if (key === "delete") {
      setIsDeleteModalOpen(true);
      setEditingParty(party);
    }
    if (key === "edit") {
      setBillingPartyModal({ isVisible: true, status: "Edit" });
      handleBillingPartyById(party);
    }
  };

  const handleAddBillingParty = () => {
    setEditingParty(null);
    setBillingPartyModal({ isVisible: true, status: "Add" });
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    if (editingParty?.billingPartyId)
      handleDeleteBillingParty(editingParty?.billingPartyId);
  };

  const handleToggleConfirm = () => {
    handleBillingPartySubmit({ isActive: toggleTarget.nextStatus }, true);
    setToggleTarget({ party: null, nextStatus: false });
  };

  const handleToggle = (party: BillingPartyApiData, nextStatus: boolean) => {
    setEditingParty(party);
    setBillingPartyModal({ isVisible: false, status: "Edit" });
    setToggleTarget({ party, nextStatus });
  };

  const handleRequestApproval = (party: BillingPartyApiData) => {
    setRequestApprovalParty(party);
    setIsRequestModalOpen(true);
    loadPendingManufacturers(party.billingPartyId);
  };

  const handleCloseRequestModal = () => {
    setIsRequestModalOpen(false);
    setPendingManufacturers([]);
    setRequestApprovalParty(null);
  };

  const loadBillingParties = useCallback(() => {
    startTransition(async () => {
      try {
        const response = await fetchAllBillingParties();
        if (!response.isError) {
          setBillingParties(response.data);
        } else {
          message.error(response.message || "Failed to fetch billing parties");
        }
      } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        message.error(
          error.response?.data.message ??
            error.message ??
            "Failed to fetch billing parties",
        );
      }
    });
  }, [startTransition, setBillingParties]);

  const loadPendingManufacturers = useCallback(
    (partyId: number) => {
      startPendingTransition(async () => {
        try {
          const response = await fetchPendingManufacturers(partyId);
          if (!response.isError) {
            setPendingManufacturers(response.data);
          } else {
            message.error(response.message || "Failed to fetch manufacturers");
          }
        } catch (err) {
          const error = err as AxiosError<ApiErrorResponse>;
          message.error(
            error.response?.data.message ??
              error.message ??
              "Failed to fetch pending manufacturers",
          );
        }
      });
    },
    [startPendingTransition, setPendingManufacturers],
  );

  const handleSendApprovalRequest = useCallback(
    async (manufacturerCode: string) => {
      if (!requestApprovalParty) return;

      setRequestingCode(manufacturerCode);
      try {
        const payload: RequestApprovalPayload = {
          billingPartyId: requestApprovalParty.billingPartyId,
          manufacturerCode: manufacturerCode,
        };

        const response = await requestBillingPartyApproval(payload);

        if (!response.isError) {
          message.success(
            response.message || "Approval requested successfully",
          );
          loadPendingManufacturers(requestApprovalParty.billingPartyId);
          loadBillingParties();
        } else {
          message.error(response.message || "Failed to request approval");
        }
      } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        message.error(
          error.response?.data.message ??
            error.message ??
            "An error occurred while requesting approval.",
        );
      } finally {
        setRequestingCode(null);
      }
    },
    [
      setRequestingCode,
      requestApprovalParty,
      loadBillingParties,
      loadPendingManufacturers,
    ],
  );

  const handleBillingPartyById = async (party: BillingPartyApiData) => {
    try {
      const response = await getBillingPartyById(party.billingPartyId);
      if (!response.isError) {
        setEditingParty({
          ...party,
          ...response.data,
          billingPartyId: response.data.id,
        });
      } else {
        message.error(response.message || "Failed to fetch billing parties");
      }
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      message.error(
        error.response?.data.message ??
          error.message ??
          "Failed to fetch the details",
      );
    }
  };

  const handleDeleteBillingParty = async (id: number) => {
    try {
      const response = await deleteBillingPartyById(id);
      if (!response.isError) {
        loadBillingParties();
        message.success(response.message);
      } else {
        message.error(response.message || "Failed to delete the billing party");
      }
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      message.error(
        error.response?.data.message ??
          error.message ??
          "Failed to delete the billing party",
      );
    }
  };

  const handleBillingPartySubmit = async (
    values: BillingPartyEditPayload,
    toggleEdit = false,
  ) => {
    try {
      const payload: unknown = !toggleEdit
        ? {
            partyName: values.partyName,
            gstNumber: values.gstNumber,
            mobileNumber: values.mobileNumber,
            address: values.address,
            email: values.email,
            ...(billingPartyModal.status === "Edit" &&
              editingParty && { isActive: editingParty.isActive }),
          }
        : values;

      let response;
      if (billingPartyModal.status === "Edit" && editingParty) {
        response = await editBillingParty(
          editingParty.billingPartyId,
          payload as BillingPartyEditPayload,
        );
      } else if (billingPartyModal.status === "Add") {
        response = await saveBillingParty(payload as BillingPartyPayload);
      }

      if (response) {
        if (!response?.isError) {
          message.success(
            response?.message ||
              `Billing party ${billingPartyModal.status === "Edit" ? "updated" : "created"} successfully`,
          );
          setBillingPartyModal({ isVisible: false, status: "Add" });
          loadBillingParties();
        } else {
          message.error(response.message || "Failed to save billing party");
        }
      }
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      message.error(
        error.response?.data.message ??
          error.message ??
          "An error occurred while saving the billing party.",
      );
    }
  };

  const requestApprovalColumns = useMemo(
    () => [
      { title: "Name", dataIndex: "manufacturerName", key: "manufacturerName" },
      { title: "GST NO.", dataIndex: "gstNumber", key: "gstNumber" },
      { title: "Address", dataIndex: "address", key: "address" },
      {
        title: "Action",
        key: "action",
        render: (_: unknown, record: PendingManufacturer) => (
          <Button
            type="link"
            className="request-approval-link"
            loading={requestingCode === record.manufacturerCode}
            onClick={() => handleSendApprovalRequest(record.manufacturerCode)}
            style={{ padding: 0 }}
          >
            Request Approval
          </Button>
        ),
      },
    ],
    [requestingCode, handleSendApprovalRequest],
  );

  useEffect(() => {
    loadBillingParties();
  }, [loadBillingParties]);

  return (
    <Flex className="billing-party-view-container" vertical>
      <Flex className="billing-party-header" justify="end" align="center">
        <Flex gap={12}>
          <Button
            icon={<ExportOutlined />}
            loading={excelLoading}
            onClick={() => {
              const timeForName = getCurrentTime();
              exportExcelCall(
                "billing-party",
                `Billing_Party_${timeForName}`,
                setExcelTransition,
              );
            }}
          >
            Export
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddBillingParty}
          >
            Add Billing Party
          </Button>
        </Flex>
      </Flex>
      <Flex className="billing-party-cards" gap={16} wrap>
        {isLoading ? (
          <Text>Loading billing parties...</Text>
        ) : billingParties.length === 0 ? (
          <Text>No billing parties found.</Text>
        ) : (
          billingParties.map((party) => (
            <Card key={party.billingPartyId} className="billing-party-card">
              <Flex
                className="billing-party-card-header"
                justify="space-between"
              >
                <Title level={4} className="billing-party-company-name">
                  {party.partyName || ""}
                </Title>
                <Flex gap={8}>
                  <Text
                    className="billing-party-request-approval"
                    onClick={() => handleRequestApproval(party)}
                  >
                    Request Approval
                  </Text>
                  <Dropdown
                    menu={{
                      items: (menuItems || []).map((item) =>
                        item
                          ? {
                              ...item,
                              onClick: (e) => {
                                e.domEvent.stopPropagation();
                                handleMenuClick(
                                  (item.key as string) || "",
                                  party,
                                );
                              },
                            }
                          : item,
                      ),
                    }}
                    trigger={["click"]}
                    placement="bottomRight"
                    arrow
                  >
                    <MoreOutlined className="billing-party-more-icon" />
                  </Dropdown>
                </Flex>
              </Flex>
              <Flex
                className="billing-party-mobile-section"
                justify="space-between"
                align="center"
              >
                <Text className="billing-party-mobile">
                  Mobile No. : {party.mobileNumber || ""}
                </Text>
                <Flex gap={8} align="center">
                  <Text
                    className={`billing-party-status ${party.isActive ? "active" : "inactive"}`}
                  >
                    {party.isActive ? "Active" : "Inactive"}
                  </Text>
                  <Switch
                    checked={party.isActive}
                    onChange={(checked) => handleToggle(party, checked)}
                  />
                </Flex>
              </Flex>
              <Flex className="billing-party-details">
                <Flex vertical className="billing-party-detail-card">
                  <Text className="billing-party-detail-label">Gst No.</Text>
                  <Text className="billing-party-detail-value">
                    {party.gstNumber || ""}
                  </Text>
                </Flex>
                <Flex vertical className="billing-party-detail-card">
                  <Text className="billing-party-detail-label">Email</Text>
                  <Text className="billing-party-detail-value">
                    {party.email || ""}
                  </Text>
                </Flex>
              </Flex>
              <Flex className="billing-party-system-checks" wrap gap={5}>
                {party.approvals && party.approvals?.length > 0 ? (
                  party.approvals.slice(0, showMoreIndex)?.map((approval) => (
                    <Flex
                      key={approval.manufacturerName}
                      className="billing-party-system-check-item"
                      align="center"
                      gap={8}
                    >
                      {getStatusIcon(approval.approvalStatus)}
                      <Text className="billing-party-system-check-name">
                        {approval.manufacturerName}
                      </Text>
                    </Flex>
                  ))
                ) : (
                  <Text className="billing-party-detail-label">
                    No approvals found
                  </Text>
                )}
              </Flex>
              {party.approvals
                ? party.approvals?.length > 0 &&
                  showMoreIndex < party.approvals?.length && (
                    <Text
                      className="billing-party-see-more"
                      onClick={() =>
                        setShowMoreIndex((prev) => prev + showMoreNumber)
                      }
                    >
                      See More
                    </Text>
                  )
                : ""}
            </Card>
          ))
        )}
      </Flex>

      <Modal
        title={`Request Approval ${requestApprovalParty ? `- ${requestApprovalParty.partyName}` : ""}`}
        open={isRequestModalOpen}
        onCancel={handleCloseRequestModal}
        footer={null}
        width={720}
        className="request-approval-modal"
      >
        <Table
          rowKey="manufacturerCode"
          columns={requestApprovalColumns}
          dataSource={pendingManufacturers}
          pagination={false}
          loading={isPendingLoading}
        />
      </Modal>

      <AddBillingPartyModal
        modalState={billingPartyModal}
        setModalState={setBillingPartyModal}
        editingParty={editingParty}
        onSubmit={handleBillingPartySubmit}
      />

      <Modal
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        closable={false}
        footer={
          <Flex justify="space-between">
            <Button onClick={() => setIsDeleteModalOpen(false)}>No</Button>
            <Button type="primary" onClick={handleDeleteConfirm}>
              Yes
            </Button>
          </Flex>
        }
        className="confirm-modal"
        title="Are you sure you want to Delete Party?"
      />

      <Modal
        open={!!toggleTarget.party}
        onCancel={() => setToggleTarget({ party: null, nextStatus: false })}
        closable={false}
        footer={
          <Flex justify="space-between">
            <Button
              onClick={() =>
                setToggleTarget({ party: null, nextStatus: false })
              }
            >
              No
            </Button>
            <Button type="primary" onClick={handleToggleConfirm}>
              Yes
            </Button>
          </Flex>
        }
        className="confirm-modal"
        title={`Are you sure you want to ${toggleTarget.nextStatus ? "Active" : "Inactive"} Party?`}
      />
    </Flex>
  );
};

export default BillingPartyView;
