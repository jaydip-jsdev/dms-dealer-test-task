import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Flex, Tag, Typography, Spin, message } from "antd";
import { isAxiosError } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OrderDetail.scss";
import type { OrderDetailResponseData, ApiErrorResponse } from "src/types";

import { fetchOrderById } from "../../../api/services/orderManagementService";
import { PATH } from "../../../Routers/routerPath";
import { getManufacturerCodeFromLocal } from "../../../utils/index";
import type { DetailItemProps } from "../types";

const { Text } = Typography;

const getStatusDisplay = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "a":
      return { text: "Approved", color: "success" };
    case "p":
      return { text: "Pending", color: "processing" };
    case "r":
      return { text: "Rejected", color: "error" };
    case "h":
      return { text: "Hold", color: "warning" };
    default:
      return { text: status || "Unknown", color: "default" };
  }
};

const OrderDetail = () => {
  const navigate = useNavigate();
  const manufacturerCode = getManufacturerCodeFromLocal();

  const [data, setData] = useState<OrderDetailResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { orderNo, id } = useParams();
  const orderId = id || orderNo;

  useEffect(() => {
    const loadOrderDetail = async () => {
      if (!orderId || !manufacturerCode) {
        message.error("Missing Order ID or Manufacturer Code");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetchOrderById(manufacturerCode, orderId);
        setData(response.data);
      } catch (err: unknown) {
        if (isAxiosError<ApiErrorResponse>(err)) {
          message.error(
            err.response?.data?.message || "Failed to fetch order details",
          );
        } else {
          message.error("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    loadOrderDetail();
  }, [orderId, manufacturerCode]);

  const DetailItem = useCallback(
    ({ label, value, full = false }: DetailItemProps) => (
      <div className={`detail-item ${full ? "full" : ""}`}>
        <Text type="secondary" className="label">
          {label}
        </Text>
        <Text className="value">{value || "-"}</Text>
      </div>
    ),
    [],
  );

  const handleNavigate = () => {
    navigate(PATH.ORDER_MANAGEMENT);
  };

  const detailItems: DetailItemProps[] = useMemo(
    () =>
      data
        ? [
            { label: "Order Ref No.", value: data.orderRefNumber || "-" },
            { label: "Party Group", value: data.partyGroup?.groupName || "-" },
            { label: "Party Name", value: data.partyName?.partyName || "-" },
            { label: "Address", value: data.partyName?.address || "-" },
            { label: "Item Name", value: data.itemName?.itemName || "-" },
            { label: "Lot No.", value: data.lotNumber?.lotNumber || "-" },
            { label: "Grade", value: data.grade?.gradeName || "-" },
            { label: "Subgrade", value: data.subGrade?.subGradeName || "-" },
            { label: "Pieces / Box", value: data.boxPieces?.toString() || "-" },
            {
              label: "Quantity (in Kgs.)",
              value: data.itemQuantity?.toString() || "-",
            },
            { label: "Cops / Cheese", value: data.copsPieces || "-" },
            { label: "Rate", value: data.itemRate || "-" },
            { label: "Remark", value: data.orderRemark || "-", full: true },
            { label: "Design", value: data.itemDesign || "-" },
            { label: "Color", value: data.itemColor || "-" },
            { label: "Shade", value: data.shadeName || "-" },
            { label: "Ends", value: data.beamEnds?.toString() || "-" },
            { label: "Width", value: data.beamWidth?.toString() || "-" },
            { label: "Length", value: data.beamLength?.toString() || "-" },
          ]
        : [],
    [data],
  );

  const statusDisplay = getStatusDisplay(data?.orderStatus);

  return (
    <div className="order-detail-container">
      <Card className="order-detail-card">
        <Spin spinning={loading} tip="Loading Order Details...">
          {!loading && data ? (
            <>
              <Flex align="center" gap={12} className="order-header">
                <ArrowLeftOutlined
                  className="back-icon"
                  onClick={handleNavigate}
                />

                <Typography className="order-title">
                  {data.billingParty?.name || "Unknown Company"} -{" "}
                  {data.orderNumber}
                </Typography>

                <Tag color={statusDisplay.color}>{statusDisplay.text}</Tag>
              </Flex>
              <div className="detail-grid">
                {detailItems.map((item) => (
                  <DetailItem
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    full={item.full}
                  />
                ))}
              </div>
            </>
          ) : null}
        </Spin>
      </Card>
    </div>
  );
};

export default OrderDetail;
