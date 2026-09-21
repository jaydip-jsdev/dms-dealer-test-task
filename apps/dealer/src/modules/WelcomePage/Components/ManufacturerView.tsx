import { Button, Card, Flex, Skeleton, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ManufacturerView.scss";

import {
  fetchAllManufacturer,
  requestManufacturerByCode,
} from "../../../api/services/manufacturerList";
import { MODULE_PATHS } from "../../../Routers/routerPath";
import {
  SELECTED_MANUFACTURER,
  type ManufacturerListData,
} from "../../../types";

const { Text } = Typography;

const ManufacturerView = () => {
  const navigate = useNavigate();

  const [manufacturers, setManufacturers] = useState<ManufacturerListData[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [requestApprovalLoading, setRequestApprovalLoading] = useState<{
    isLoading: boolean;
    manufacturerCode: string | null;
  }>({
    isLoading: false,
    manufacturerCode: null,
  });

  const getManufacturers = async () => {
    try {
      const res = await fetchAllManufacturer();
      setManufacturers(res.data);
    } catch (error) {
      console.error("Error fetching manufacturers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getManufacturers();
  }, []);

  const handleAction = async (manufacturer: ManufacturerListData) => {
    try {
      setRequestApprovalLoading({
        isLoading: true,
        manufacturerCode: manufacturer.manufacturerCode,
      });
      if (manufacturer.requestedStatus === "approved") {
        localStorage.setItem(
          SELECTED_MANUFACTURER,
          manufacturer.manufacturerCode,
        );
        navigate(MODULE_PATHS.HOME);
        return;
      }

      if (
        manufacturer.requestedStatus === "rejected" ||
        !manufacturer.requestedStatus
      ) {
        await requestManufacturerByCode(manufacturer.manufacturerCode);
        getManufacturers();
      }
    } catch (error) {
      console.error("Request approval failed", error);
    } finally {
      setRequestApprovalLoading({
        isLoading: false,
        manufacturerCode: null,
      });
    }
  };

  if (loading) {
    return (
      <Flex className="manufacturer-view-container" wrap gap={16}>
        {[
          ...Array(20)
            .fill(null)
            .map((_, i) => i + 1),
        ].map((item) => (
          <Card key={item} className="manufacturer-card">
            <Skeleton active />
          </Card>
        ))}
      </Flex>
    );
  }

  const isRequestingApproval = (manufacturerCode: string) => {
    return (
      requestApprovalLoading.isLoading &&
      requestApprovalLoading.manufacturerCode === manufacturerCode
    );
  };

  return (
    <Flex className="manufacturer-view-container" wrap gap={16}>
      {manufacturers.map((manufacturer) => (
        <Card key={manufacturer.manufacturerCode} className="manufacturer-card">
          <Flex className="manufacturer-card-header" justify="space-between">
            <Text className="manufacturer-name">
              {manufacturer.manufacturerName}
            </Text>

            {manufacturer.requestedStatus === "approved" && (
              <Text
                className="manufacturer-action"
                onClick={() => handleAction(manufacturer)}
              >
                Open
              </Text>
            )}

            {(manufacturer.requestedStatus === "rejected" ||
              !manufacturer.requestedStatus) && (
              <Button
                type="link"
                className="manufacturer-action"
                onClick={() => handleAction(manufacturer)}
                loading={
                  isRequestingApproval(manufacturer.manufacturerCode) || false
                }
                disabled={
                  isRequestingApproval(manufacturer.manufacturerCode) || false
                }
              >
                Request Approval
              </Button>
            )}

            {manufacturer.requestedStatus === "pending" && (
              <Text className="status-chip pending">Pending</Text>
            )}

            {manufacturer.requestedStatus === "blacklisted" && (
              <Text className="status-chip blacklisted">Blacklisted</Text>
            )}
          </Flex>

          <Flex className="manufacturer-card-details">
            <Flex vertical className="manufacturer-detail-item">
              <Text className="manufacturer-label">GST No.</Text>
              <Text className="manufacturer-value">
                {manufacturer.gstNumber}
              </Text>
            </Flex>

            <Flex vertical className="manufacturer-detail-item">
              <Text className="manufacturer-label">Address</Text>
              <Text className="manufacturer-value">{manufacturer.address}</Text>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default ManufacturerView;
