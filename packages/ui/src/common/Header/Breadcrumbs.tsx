import { Breadcrumb } from "antd";
import type { FC } from "react";
import { useLocation } from "react-router-dom";

const Breadcrumbs: FC = () => {
  const location = useLocation();
  const currentOpenKey = location.pathname;

  if (currentOpenKey === "/") {
    return (
      <Breadcrumb>
        <Breadcrumb.Item key="home">Dashboard</Breadcrumb.Item>
      </Breadcrumb>
    );
  }

  const modifiedPath = currentOpenKey
    .split("/")
    .filter((item) => item)
    .map((item, index) => {
      const formattedItem = item
        .replace(/([A-Z])/g, " $1")
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .replace(/-/g, " ")
        .trim();
      return { title: formattedItem || null, key: index.toString() };
    });

  return (
    <Breadcrumb>
      {modifiedPath.map((breadcrumb) => (
        <Breadcrumb.Item key={breadcrumb.key}>
          {decodeURIComponent(breadcrumb.title ?? "")}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
