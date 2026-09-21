import { Modal } from "antd";
import type { Dispatch, FC, SetStateAction } from "react";

import "./HeaderComponent.scss";
import { onUnauthorized } from "../../utils";

interface IState {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
}
const LogoutConfirmationModal: FC<IState> = ({
  setIsOpen,
  isOpen,
  setIsDropdownOpen,
}: IState) => {
  //handle ok in logout modal
  const handleOk = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    onUnauthorized();
  };

  //handle cancle in logout modal
  const handleCancel = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <Modal
      title="Are you sure you want to logout?"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      classNames={{ footer: "modal-button" }}
    />
  );
};

export default LogoutConfirmationModal;
