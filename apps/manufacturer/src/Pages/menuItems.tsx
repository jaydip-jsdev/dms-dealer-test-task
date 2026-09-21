import type { MenuProps } from "antd";

import { HideMenuItem } from "../../../../packages/ui/src/utils";
import { MODULE_PATHS } from "../Router/routerPath";

import { menuConfig } from "./constant";

type MenuItem = Required<MenuProps>["items"][number];

export const allMenuItem: MenuItem[] = menuConfig.map((item) => ({
  key: item.key,
  icon: <img src={item.icon} alt={item.alt} />,
  label: item.label,
}));

const itemsToSplit: string[] = (
  import.meta.env.VITE_MANUFACTURER_HIDE_MODULE || ""
).split(",");

export const menuItems = HideMenuItem({
  itemsToSplit,
  menuItem: allMenuItem,
  path: MODULE_PATHS,
});
