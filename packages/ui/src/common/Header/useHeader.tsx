import type { MenuProps } from "antd";
import { Button, Divider, Flex, Typography } from "antd";
import { useState } from "react";
import "./HeaderComponent.scss";

const { Text } = Typography;

export const UserRoles = {
  DEALER: "Dealer",
  MANUFACTURER: "Manufacturer",
  ADMIN: "Admin",
} as const;

const useHeader = () => {
  //state managment
  const { manufacturerName, dealerName, email, mobileNumber } = JSON.parse(
    localStorage.getItem("userDetails") ?? "{}",
  );
  const userRole = localStorage.getItem("role");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [userDetails] = useState({
    name: manufacturerName || dealerName || "John Doe",
    email: email || "john.doe@example.com",
    mobile: mobileNumber || "9876543210",
  });
  const role = UserRoles[userRole as keyof typeof UserRoles] || "User";

  // modal of logout confirmation
  const showModal = () => {
    setIsOpen(true);
    setIsDropdownOpen(true);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <Flex gap={10} vertical className="user-details-wrapper">
            <Text>{userDetails.name}</Text>
            <Text>
              {userDetails.mobile
                ? `+91 ${userDetails.mobile}`
                : userDetails.email}
            </Text>
          </Flex>
          <Divider className="header-divider" />
          <div className="logout-btn-wrapper">
            <Button className="logout-btn" onClick={showModal}>
              Logout
            </Button>
          </div>
        </div>
      ),
    },
  ];
  return {
    states: {
      items,
      isOpen,
      setIsOpen,
      setIsDropdownOpen,
      isDropdownOpen,
      userDetails,
      role,
    },
  };
};

export default useHeader;
