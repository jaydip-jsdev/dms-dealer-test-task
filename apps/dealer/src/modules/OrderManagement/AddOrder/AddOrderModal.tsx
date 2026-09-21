import { Button, Flex, Form, Input, Modal, Select, message, Spin } from "antd";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import "./AddOrderModal.scss";
import type {
  DropdownBillingPartyData,
  DropdownPartyGroupData,
  DropdownPartyNameData,
  DropdownItemNameData,
  DropdownLotNoData,
  DropdownGradeData,
  DropdownSubGradeData,
  OrderConfigData,
  EditingOrderData,
} from "src/types";

import {
  fetchDropdownBillingParty,
  fetchDropdownPartyGroup,
  fetchDropdownPartyName,
  fetchDropdownItemName,
  fetchDropdownLotNo,
  fetchDropdownGrade,
  fetchDropdownSubGrade,
  fetchDropdownRate,
  fetchOrderConfig,
  createOrder,
  updateOrder,
} from "../../../api/services/orderManagementService";
import { getManufacturerCodeFromLocal } from "../../../utils/index";

import { orderFormRules } from "./addOrderValidationRules";

type AddOrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingOrder: EditingOrderData | null;
};

const handleApiError = (error: unknown) => {
  if (isAxiosError(error)) {
    message.error(error.response?.data?.message || "Failed to fetch data");
  } else if (error instanceof Error) {
    message.error(error.message);
  } else {
    message.error("An unknown error occurred");
  }
};

const AddOrderModal = ({
  isOpen,
  onClose,
  onSuccess,
  editingOrder,
}: AddOrderModalProps) => {
  const [form] = Form.useForm();
  const manufacturerCode = getManufacturerCodeFromLocal();

  const [config, setConfig] = useState<OrderConfigData | null>(null);
  const [isConfigLoading, setIsConfigLoading] = useState<boolean>(true);

  const [billingParties, setBillingParties] =
    useState<DropdownBillingPartyData>([]);
  const [partyGroups, setPartyGroups] = useState<DropdownPartyGroupData>([]);
  const [partyNames, setPartyNames] = useState<DropdownPartyNameData>([]);
  const [itemNames, setItemNames] = useState<DropdownItemNameData>([]);
  const [lotNos, setLotNos] = useState<DropdownLotNoData>([]);
  const [grades, setGrades] = useState<DropdownGradeData>([]);
  const [subGrades, setSubGrades] = useState<DropdownSubGradeData>([]);

  const selectedItemCode = Form.useWatch("itemCode", form);
  const selectedGradeCode = Form.useWatch("itemGrade", form);
  const selectedSubGradeCode = Form.useWatch("subGradeCode", form);

  useEffect(() => {
    if (isOpen) {
      setIsConfigLoading(true);

      Promise.all([
        fetchOrderConfig()
          .then((res) => setConfig(res.data))
          .catch(handleApiError),
        fetchDropdownBillingParty()
          .then((res) => setBillingParties(res.data))
          .catch(handleApiError),
        fetchDropdownPartyGroup()
          .then((res) => setPartyGroups(res.data))
          .catch(handleApiError),
        fetchDropdownItemName()
          .then((res) => setItemNames(res.data))
          .catch(handleApiError),
        fetchDropdownGrade()
          .then((res) => setGrades(res.data))
          .catch(handleApiError),
      ])
        .catch(handleApiError)
        .finally(() => setIsConfigLoading(false));

      if (editingOrder) {
        const mappedInitialValues = {
          ...editingOrder,
          groupCode: editingOrder.partyGroup || editingOrder.groupCode,
          itemCode: editingOrder.itemName || editingOrder.itemCode,
          itemGrade: editingOrder.grade || editingOrder.itemGrade,
        };
        form.setFieldsValue(mappedInitialValues);

        if (mappedInitialValues.groupCode) {
          fetchDropdownPartyName(mappedInitialValues.groupCode.toString())
            .then((res) => setPartyNames(res.data))
            .catch(handleApiError);
        }
        if (mappedInitialValues.itemCode) {
          fetchDropdownLotNo(mappedInitialValues.itemCode.toString())
            .then((res) => setLotNos(res.data))
            .catch(handleApiError);
        }
        if (mappedInitialValues.itemGrade) {
          fetchDropdownSubGrade(mappedInitialValues.itemGrade.toString())
            .then((res) => setSubGrades(res.data))
            .catch(handleApiError);
        }
      }
    } else {
      setPartyNames([]);
      setLotNos([]);
      setSubGrades([]);
      form.resetFields();
    }
  }, [isOpen, editingOrder, form]);

  useEffect(() => {
    const getRate = async () => {
      if (
        selectedItemCode &&
        selectedGradeCode &&
        selectedSubGradeCode &&
        grades.length > 0
      ) {
        const selectedGradeObj = grades.find(
          (g) => g.gradeCode === selectedGradeCode,
        );

        if (selectedGradeObj) {
          try {
            const res = await fetchDropdownRate({
              itemCode: selectedItemCode,
              gradeName: selectedGradeObj.gradeName,
              subGradeCode: selectedSubGradeCode,
            });
            form.setFieldsValue({ rate: res.data.itemRate });
          } catch (error) {
            handleApiError(error);
          }
        }
      }
    };
    getRate();
  }, [selectedItemCode, selectedGradeCode, selectedSubGradeCode, grades, form]);

  const handleGroupCodeChange = async (value: number) => {
    form.setFieldsValue({ partyCode: undefined, address: undefined });
    setPartyNames([]);
    try {
      const res = await fetchDropdownPartyName(value.toString());
      setPartyNames(res.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handlePartyCodeChange = (value: string) => {
    const selectedParty = partyNames.find((p) => p.partyCode === value);
    if (selectedParty && config?.address?.isActive) {
      form.setFieldsValue({ address: selectedParty.address });
    }
  };

  const handleItemCodeChange = async (value: string) => {
    form.setFieldsValue({ lotNumber: undefined, rate: undefined });
    setLotNos([]);
    try {
      const res = await fetchDropdownLotNo(value);
      setLotNos(res.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleItemGradeChange = async (value: string) => {
    form.setFieldsValue({ subGradeCode: undefined, rate: undefined });
    setSubGrades([]);
    try {
      const res = await fetchDropdownSubGrade(value);
      setSubGrades(res.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleSubGradeCodeChange = () => {
    form.setFieldsValue({ rate: undefined });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = { ...values };
      delete payload.address;

      if (editingOrder) {
        const orderId = editingOrder.orderNumber?.split("/")[1];

        if (!orderId) {
          message.error("Cannot edit: Order ID is missing or invalid format");
          return;
        }

        const response = await updateOrder(manufacturerCode, orderId, payload);
        message.success(response.message || "Order updated successfully");
      } else {
        const finalPayload = {
          ...payload,
          manufacturerCode,
        };

        const response = await createOrder(finalPayload);
        message.success(response.message || "Order created successfully");
      }

      form.resetFields();
      onSuccess();
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "errorFields" in error
      ) {
        message.error("Please fill in all required fields correctly.");
      } else {
        handleApiError(error);
      }
    }
  };

  return (
    <Modal
      open={isOpen}
      title={editingOrder ? "Edit Order" : "Add Order"}
      onCancel={onClose}
      width={900}
      footer={
        <Flex justify="end">
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={isConfigLoading}
          >
            Submit
          </Button>
        </Flex>
      }
      className="add-order-modal"
    >
      <Spin spinning={isConfigLoading} tip="Loading Configuration...">
        {config ? (
          <Form form={form} layout="vertical" className="add-order-form">
            {/* Row 1: Party Details */}
            <Flex className="form-grid" gap={16} wrap="wrap">
              {config?.company?.isActive ? (
                <Form.Item
                  label={config.company.label}
                  name="billingPartyId"
                  rules={orderFormRules.billingPartyId}
                >
                  <Select
                    placeholder="Search & Select"
                    options={billingParties.map((p) => ({
                      value: p.id,
                      label: p.name,
                    }))}
                    showSearch
                  />
                </Form.Item>
              ) : null}

              {config?.orderRefNo?.isActive ? (
                <Form.Item
                  label={config.orderRefNo.label}
                  name="orderRefNumber"
                >
                  <Input placeholder="Enter" />
                </Form.Item>
              ) : null}

              {config?.partyGroup?.isActive ? (
                <Form.Item
                  label={config.partyGroup.label}
                  name="groupCode"
                  rules={orderFormRules.groupCode}
                >
                  <Select
                    placeholder="Search & Select"
                    onChange={handleGroupCodeChange}
                    options={partyGroups.map((p) => ({
                      value: p.groupCode,
                      label: p.groupName,
                    }))}
                    showSearch
                    optionFilterProp="label"
                  />
                </Form.Item>
              ) : null}

              {config?.party?.isActive ? (
                <Form.Item
                  label={config.party.label}
                  name="partyCode"
                  rules={orderFormRules.partyCode}
                >
                  <Select
                    placeholder={
                      !partyNames.length
                        ? "Select Party Group first"
                        : "Search & Select"
                    }
                    onChange={handlePartyCodeChange}
                    options={partyNames.map((p) => ({
                      value: p.partyCode,
                      label: p.partyName,
                    }))}
                    disabled={!partyNames.length}
                    showSearch
                    optionFilterProp="label"
                  />
                </Form.Item>
              ) : null}
            </Flex>

            {/* Address */}
            {config?.address?.isActive ? (
              <Form.Item label={config.address.label} name="address">
                <Input.TextArea
                  placeholder="Auto-fills upon Party selection"
                  rows={1}
                  disabled
                />
              </Form.Item>
            ) : null}

            {/* Row 2: Item Core Details */}
            <Flex className="form-grid" gap={16} wrap="wrap">
              {config?.itemName?.isActive ? (
                <Form.Item
                  label={config.itemName.label}
                  name="itemCode"
                  rules={orderFormRules.itemCode}
                >
                  <Select
                    placeholder="Search & Select"
                    onChange={handleItemCodeChange}
                    options={itemNames.map((i) => ({
                      value: i.itemCode,
                      label: i.itemName,
                    }))}
                    showSearch
                    optionFilterProp="label"
                  />
                </Form.Item>
              ) : null}

              {config?.lotNo?.isActive ? (
                <Form.Item
                  label={config.lotNo.label}
                  name="lotNumber"
                  rules={orderFormRules.lotNumber}
                >
                  <Select
                    placeholder={
                      !lotNos.length
                        ? "Select Item Name first"
                        : "Search & Select"
                    }
                    options={lotNos.map((l) => ({
                      value: l.lotNumber,
                      label: l.lotName,
                    }))}
                    disabled={!lotNos.length}
                    showSearch
                    optionFilterProp="label"
                  />
                </Form.Item>
              ) : null}

              {config?.grade?.isActive ? (
                <Form.Item
                  label={config.grade.label}
                  name="itemGrade"
                  rules={orderFormRules.itemGrade}
                >
                  <Select
                    placeholder="Search & Select"
                    onChange={handleItemGradeChange}
                    options={grades.map((g) => ({
                      value: g.gradeCode,
                      label: g.gradeName,
                    }))}
                    showSearch
                    optionFilterProp="label"
                  />
                </Form.Item>
              ) : null}

              {config?.subGrade?.isActive ? (
                <Form.Item
                  label={config.subGrade.label}
                  name="subGradeCode"
                  rules={orderFormRules.subGradeCode}
                >
                  <Select
                    placeholder={
                      !subGrades.length
                        ? "Select Grade first"
                        : "Search & Select"
                    }
                    onChange={handleSubGradeCodeChange}
                    options={subGrades.map((s) => ({
                      value: s.subGradeCode,
                      label: s.subGradeName,
                    }))}
                    disabled={!subGrades.length}
                    showSearch
                    optionFilterProp="label"
                  />
                </Form.Item>
              ) : null}
            </Flex>

            {/* Row 3: Quantities & Pricing */}
            <Flex className="form-grid" gap={16} wrap="wrap">
              {config?.pieceBox?.isActive ? (
                <Form.Item
                  label={config.pieceBox.label}
                  name="boxPieces"
                  rules={orderFormRules.boxPieces}
                >
                  <Input type="number" placeholder="Enter" />
                </Form.Item>
              ) : null}

              {config?.quantity?.isActive ? (
                <Form.Item
                  label={config.quantity.label}
                  name="itemQuantity"
                  rules={orderFormRules.itemQuantity}
                >
                  <Input type="number" step="any" placeholder="Enter" />
                </Form.Item>
              ) : null}

              {config?.copsCheese?.isActive ? (
                <Form.Item
                  label={config.copsCheese.label}
                  name="copsPieces"
                  rules={orderFormRules.copsPieces}
                >
                  <Input type="number" placeholder="Enter" />
                </Form.Item>
              ) : null}

              {config?.rate?.isActive ? (
                <Form.Item
                  label={config.rate.label}
                  name="rate"
                  rules={orderFormRules.rate}
                >
                  <Input
                    disabled
                    placeholder="Auto-calculated after selections"
                  />
                </Form.Item>
              ) : null}
            </Flex>

            {/* Row 4: Specifications */}
            <Flex className="form-grid" gap={16} wrap="wrap">
              {config?.design?.isActive ? (
                <Form.Item label={config.design.label} name="itemDesign">
                  <Input placeholder="Enter" />
                </Form.Item>
              ) : null}

              {config?.colour?.isActive ? (
                <Form.Item label={config.colour.label} name="itemColor">
                  <Input placeholder="Enter" />
                </Form.Item>
              ) : null}
            </Flex>

            {/* Row 5: Beam Details */}
            <Flex className="form-grid" gap={16} wrap="wrap">
              {config?.shade?.isActive ? (
                <Form.Item label={config.shade.label} name="shadeName">
                  <Input placeholder="Enter" />
                </Form.Item>
              ) : null}
              {config?.ends?.isActive ? (
                <Form.Item label={config.ends.label} name="beamEnds">
                  <Input type="number" placeholder="Enter" />
                </Form.Item>
              ) : null}

              {config?.width?.isActive ? (
                <Form.Item label={config.width.label} name="beamWidth">
                  <Input type="number" step="any" placeholder="Enter" />
                </Form.Item>
              ) : null}

              {config?.length?.isActive ? (
                <Form.Item label={config.length.label} name="beamLength">
                  <Input type="number" step="any" placeholder="Enter" />
                </Form.Item>
              ) : null}
            </Flex>

            {/* Remark */}
            {config?.remark?.isActive ? (
              <Form.Item
                label={config.remark.label}
                name="orderRemark"
                rules={orderFormRules.orderRemark}
              >
                <Input.TextArea placeholder="Enter" rows={2} />
              </Form.Item>
            ) : null}
          </Form>
        ) : null}
      </Spin>
    </Modal>
  );
};

export default AddOrderModal;
