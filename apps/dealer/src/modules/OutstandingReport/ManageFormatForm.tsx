import { Button, Checkbox, Flex, Input, Modal, Select, Typography } from "antd";
import React, { useState, type Dispatch, type SetStateAction } from "react";

import { FORMAT_FIELDS, formatOptions } from "./constant";
import type { ManageFormatData, ModalState } from "./types";
import "./ManageFormatForm.scss";

type Props = {
  modalState: ModalState;
  setModalState: Dispatch<SetStateAction<ModalState>>;
  onSubmit: (data: ManageFormatData) => void;
};

const formatSelectOptions = [
  ...formatOptions,
  {
    value: "new_format",
    label: "New Format",
  },
];

const ManageFormatModal: React.FC<Props> = ({
  modalState,
  setModalState,
  onSubmit,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formatName, setFormatName] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<string | undefined>();
  const [isNewFormat, setIsNewFormat] = useState(false);
  const [selectedFields, setSelectedFields] = useState<string[]>([
    "Company Name",
    "Branch Code",
    "Transaction Code",
  ]);
  const [groupByFields, setGroupByFields] = useState<string[]>([
    "Party Name",
    "Area Name",
  ]);

  const closeModal = () => {
    setModalState({ isVisible: false });
    setStep(1);
    setIsNewFormat(false);
    setSelectedFormat(undefined);
  };

  const handleSubmit = () => {
    onSubmit({
      formatName: isNewFormat ? formatName : selectedFormat,
      format: selectedFields,
      groupBy: groupByFields,
    });
    closeModal();
  };

  const handleSelectChange = (value: string) => {
    if (value === "new_format") {
      setIsNewFormat(true);
      setFormatName("");
    } else {
      setIsNewFormat(false);
      setSelectedFormat(value);
    }
  };

  return (
    <Modal
      open={modalState.isVisible}
      onCancel={closeModal}
      footer={null}
      width={760}
      title="Manage Format"
      className="manage-format-modal"
    >
      <div className="step-indicator">
        <div className={`step-track ${step === 2 ? "completed" : ""}`}>
          <span className="step-dot left" />
          <span className="step-dot right" />
        </div>
        <div className="step-labels">
          <Typography.Text className={step === 1 ? "active" : ""}>
            Format
          </Typography.Text>
          <Typography.Text className={step === 2 ? "active" : ""}>
            Group By
          </Typography.Text>
        </div>
      </div>

      {/* STEP 1 - FORMAT */}
      {step === 1 && (
        <>
          <Typography.Text className="format-label">
            Format Name
          </Typography.Text>
          <Select
            placeholder="Select"
            options={formatSelectOptions}
            value={isNewFormat ? "new_format" : selectedFormat}
            onChange={handleSelectChange}
            className="format-select"
          />

          {isNewFormat ? (
            <Input
              placeholder="Search & Select"
              className="format-input"
              value={formatName}
              onChange={(e) => setFormatName(e.target.value)}
            />
          ) : null}

          <Checkbox.Group
            value={selectedFields}
            onChange={(val) =>
              setSelectedFields(
                val.filter((item): item is string => typeof item === "string"),
              )
            }
            className="checkbox-grid"
          >
            {FORMAT_FIELDS.map((item) => (
              <Checkbox key={item} value={item}>
                {item}
              </Checkbox>
            ))}
          </Checkbox.Group>

          <Flex justify="end" className="button-group">
            <Button type="primary" onClick={() => setStep(2)}>
              Next
            </Button>
          </Flex>
        </>
      )}

      {/* STEP 2 - GROUP BY */}
      {step === 2 && (
        <>
          <Checkbox.Group
            value={groupByFields}
            onChange={(val) =>
              setGroupByFields(
                val.filter((item): item is string => typeof item === "string"),
              )
            }
            className="checkbox-grid group-by-checkbox"
          >
            {FORMAT_FIELDS.map((item) => (
              <Checkbox key={item} value={item}>
                {item}
              </Checkbox>
            ))}
          </Checkbox.Group>

          <Flex justify="end" gap={8} className="button-group">
            <Button onClick={() => setStep(1)}>Back</Button>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Flex>
        </>
      )}
    </Modal>
  );
};

export default ManageFormatModal;
